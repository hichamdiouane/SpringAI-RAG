-- Create pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create vector_store table
CREATE TABLE IF NOT EXISTS vector_store (
                                            id VARCHAR PRIMARY KEY,
                                            content TEXT,
                                            embedding VECTOR(1024), -- Match your embedding dimension
    metadata JSON
    );