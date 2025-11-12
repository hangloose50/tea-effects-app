# 🍵 Tea Effects App

AI-powered tea recommendation system with effects-based blending, compound science, and RAG knowledge retrieval.

## Features

- **Effect-Based Recommendations**: Get personalized tea suggestions based on desired mental/physical effects
- **Custom Blend Creator**: Design tea blends with specific compound profiles and effects
- **RAG Knowledge Base**: AI-enhanced recommendations backed by tea research and studies
- **Effect Tracking**: Log and track how different teas affect you personally
- **Compound Science**: Detailed information on caffeine, L-theanine, catechins, and more

## Tech Stack

- **Frontend**: Next.js 14 (App Router) - Deployed on Vercel
- **API**: Express + TypeScript - Deployed on Railway
- **Database**: Supabase (PostgreSQL + pgvector for RAG)
- **LLM**: Mistral via Ollama
- **RAG**: Custom vector search with semantic retrieval

## Quick Start

### Prerequisites

- Node.js 20+
- Supabase account
- Ollama installed (for local development)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd tea-effects-app

# Install dependencies
npm install

# Set up environment variables
cp packages/api/.env.example packages/api/.env
cp packages/frontend/.env.example packages/frontend/.env

# Start Ollama and pull Mistral
ollama serve
ollama pull mistral

# Set up database
npm run setup:supabase

# Seed data
npm run seed

# Start development servers
npm run dev
```

The API will run on http://localhost:3001
The frontend will run on http://localhost:3000

## Project Structure

```
tea-effects-app/
├── packages/
│   ├── api/           # Express API backend
│   └── frontend/      # Next.js frontend
├── supabase/          # Database migrations
├── docs/              # Documentation
└── data/              # Seed data and RAG sources
```

## Deployment

- **Frontend**: Auto-deploys to Vercel on push to main
- **API**: Auto-deploys to Railway on push to main
- **Database**: Hosted on Supabase

## Environment Variables

### API (.env)
```
DATABASE_URL=your_supabase_connection_string
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key
OLLAMA_URL=http://localhost:11434
JWT_SECRET=your_jwt_secret
PORT=3001
```

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Research Sources

This app is built on extensive tea research including:
- Cognitive enhancement effects of pu-erh and oolong teas
- L-theanine and caffeine synergy studies
- EGCG and catechin health benefits
- Traditional tea medicine practices

See `/data/rag-sources/` for full research compilation.

## License

MIT
