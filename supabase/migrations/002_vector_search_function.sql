-- ============================================
-- VECTOR SEARCH FUNCTION FOR RAG
-- ============================================

CREATE OR REPLACE FUNCTION match_tea_knowledge(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id int,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    tea_knowledge_base.id,
    tea_knowledge_base.content,
    tea_knowledge_base.metadata,
    1 - (tea_knowledge_base.embedding <=> query_embedding) AS similarity
  FROM tea_knowledge_base
  WHERE 1 - (tea_knowledge_base.embedding <=> query_embedding) > match_threshold
  ORDER BY tea_knowledge_base.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

COMMENT ON FUNCTION match_tea_knowledge IS 'Semantic search using cosine similarity for RAG queries';
