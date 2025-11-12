import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

class SupabaseService {
  private static instance: SupabaseClient;

  static getInstance(): SupabaseClient {
    if (!this.instance) {
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase credentials not found in environment variables');
      }

      this.instance = createClient(supabaseUrl, supabaseKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: false
        }
      });
    }

    return this.instance;
  }

  // Vector similarity search
  static async vectorSearch(
    embedding: number[],
    limit: number = 5,
    filters?: Record<string, any>
  ) {
    const supabase = this.getInstance();

    let query = supabase
      .rpc('match_tea_knowledge', {
        query_embedding: embedding,
        match_threshold: 0.7,
        match_count: limit
      });

    return query;
  }
}

export default SupabaseService;
