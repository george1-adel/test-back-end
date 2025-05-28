// API route: /api/leaderboard
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  // جلب أعلى 10 متصدرين
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('score', { ascending: false })
    .limit(10);
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
}
