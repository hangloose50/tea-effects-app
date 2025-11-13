import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface OllamaGenerateResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

interface OllamaEmbeddingResponse {
  embedding: number[];
}

class MistralClient {
  private client: AxiosInstance;
  private model: string;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.OLLAMA_URL || 'http://localhost:11434';
    this.model = process.env.OLLAMA_MODEL || 'mistral';

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 120000, // 2 minutes
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Generate text completion from Mistral
   */
  async generate(
    prompt: string,
    options: {
      temperature?: number;
      max_tokens?: number;
    } = {}
  ): Promise<string> {
    try {
      const response = await this.client.post<OllamaGenerateResponse>(
        '/api/generate',
        {
          model: this.model,
          prompt,
          stream: false,
          options: {
            temperature: options.temperature || 0.7,
            num_predict: options.max_tokens || 1000
          }
        }
      );

      return response.data.response;
    } catch (error: any) {
      console.error('Mistral generation error:', error.message);
      throw new Error(`Failed to generate response: ${error.message}`);
    }
  }

  /**
   * Generate embeddings for RAG
   */
  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.client.post<OllamaEmbeddingResponse>(
        '/api/embeddings',
        {
          model: this.model,
          prompt: text
        }
      );

      return response.data.embedding;
    } catch (error: any) {
      console.error('Embedding generation error:', error.message);
      throw new Error(`Failed to generate embedding: ${error.message}`);
    }
  }

  /**
   * Chat completion (conversational)
   */
  async chat(
    messages: Array<{ role: string; content: string }>,
    options: {
      temperature?: number;
    } = {}
  ): Promise<string> {
    try {
      // Convert messages to a single prompt
      const prompt = messages
        .map(m => `${m.role}: ${m.content}`)
        .join('\n') + '\nassistant:';

      return await this.generate(prompt, options);
    } catch (error: any) {
      console.error('Chat error:', error.message);
      throw new Error(`Chat failed: ${error.message}`);
    }
  }

  /**
   * Check if Ollama is running and model is available
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.client.get('/api/tags');
      const models = response.data.models || [];
      return models.some((m: any) => m.name.includes(this.model));
    } catch (error) {
      return false;
    }
  }
}

export default MistralClient;
