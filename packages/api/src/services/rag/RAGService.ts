import MistralClient from '../ai/MistralClient';
import SupabaseService from '../database/SupabaseClient';
import { KnowledgeMetadata, RAGQueryResponse, RAGSource } from '../../models/types';

class RAGService {
  private mistral: MistralClient;
  private supabase: ReturnType<typeof SupabaseService.getInstance>;

  constructor() {
    this.mistral = new MistralClient();
    this.supabase = SupabaseService.getInstance();
  }

  /**
   * Ingest a document into the RAG system
   */
  async ingestDocument(
    content: string,
    metadata: KnowledgeMetadata
  ): Promise<void> {
    try {
      // Split into chunks (512 tokens ~ 2000 characters)
      const chunks = this.chunkText(content, 2000);

      for (const chunk of chunks) {
        // Generate embedding
        const embedding = await this.mistral.generateEmbedding(chunk);

        // Store in Supabase
        await this.supabase
          .from('tea_knowledge_base')
          .insert({
            content: chunk,
            embedding,
            metadata
          });
      }

      console.log(`Ingested document: ${metadata.title || 'Untitled'}`);
    } catch (error: any) {
      console.error('Error ingesting document:', error.message);
      throw error;
    }
  }

  /**
   * Query the RAG system
   */
  async query(
    query: string,
    filters?: {
      tea_type?: string;
      effect?: string;
      compound?: string;
    },
    limit: number = 5
  ): Promise<RAGQueryResponse> {
    try {
      // Generate query embedding
      const queryEmbedding = await this.mistral.generateEmbedding(query);

      // Search for similar documents
      let dbQuery = this.supabase
        .rpc('match_tea_knowledge', {
          query_embedding: queryEmbedding,
          match_threshold: 0.7,
          match_count: limit
        });

      // Apply metadata filters if provided
      if (filters) {
        if (filters.tea_type) {
          dbQuery = dbQuery.eq('metadata->tea_type', filters.tea_type);
        }
        if (filters.effect) {
          dbQuery = dbQuery.eq('metadata->effect', filters.effect);
        }
        if (filters.compound) {
          dbQuery = dbQuery.eq('metadata->compound', filters.compound);
        }
      }

      const { data: matches, error } = await dbQuery;

      if (error) {
        throw new Error(`Vector search failed: ${error.message}`);
      }

      // Build context from retrieved documents
      const retrievedContext = matches
        .map((m: any, i: number) => `[Source ${i + 1}]: ${m.content}`)
        .join('\n\n');

      // Generate answer using Mistral with retrieved context
      const prompt = `Based on the following research and information, answer this question: "${query}"

Research Context:
${retrievedContext}

Provide a detailed, accurate answer citing specific compounds, effects, and mechanisms when relevant.`;

      const answer = await this.mistral.generate(prompt, { temperature: 0.7 });

      // Prepare sources
      const sources: RAGSource[] = matches.map((m: any) => ({
        content: m.content,
        metadata: m.metadata,
        similarity: m.similarity
      }));

      return {
        answer,
        sources,
        confidence: matches[0]?.similarity || 0
      };
    } catch (error: any) {
      console.error('RAG query error:', error.message);
      throw new Error(`RAG query failed: ${error.message}`);
    }
  }

  /**
   * Retrieve relevant context for a given query (without generating answer)
   */
  async retrieveContext(
    query: string,
    limit: number = 5
  ): Promise<string> {
    try {
      const queryEmbedding = await this.mistral.generateEmbedding(query);

      const { data: matches, error } = await this.supabase
        .rpc('match_tea_knowledge', {
          query_embedding: queryEmbedding,
          match_threshold: 0.7,
          match_count: limit
        });

      if (error) {
        console.error('Context retrieval error:', error.message);
        return '';
      }

      return matches
        .map((m: any) => m.content)
        .join('\n\n');
    } catch (error: any) {
      console.error('Error retrieving context:', error.message);
      return '';
    }
  }

  /**
   * Chunk text into smaller pieces for embedding
   */
  private chunkText(text: string, chunkSize: number): string[] {
    const chunks: string[] = [];
    const paragraphs = text.split('\n\n');

    let currentChunk = '';

    for (const paragraph of paragraphs) {
      if ((currentChunk + paragraph).length > chunkSize) {
        if (currentChunk) {
          chunks.push(currentChunk.trim());
        }
        currentChunk = paragraph;
      } else {
        currentChunk += '\n\n' + paragraph;
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk.trim());
    }

    return chunks.filter(chunk => chunk.length > 100); // Filter out tiny chunks
  }

  /**
   * Bulk ingest multiple documents
   */
  async bulkIngest(
    documents: Array<{ content: string; metadata: KnowledgeMetadata }>
  ): Promise<void> {
    console.log(`Starting bulk ingest of ${documents.length} documents...`);

    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i];
      console.log(`Processing document ${i + 1}/${documents.length}`);

      try {
        await this.ingestDocument(doc.content, doc.metadata);
      } catch (error: any) {
        console.error(`Failed to ingest document ${i + 1}:`, error.message);
        // Continue with next document
      }
    }

    console.log('Bulk ingest completed');
  }
}

export default RAGService;
