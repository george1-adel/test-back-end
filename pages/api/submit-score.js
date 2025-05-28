// API route: /api/submit-score
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { username, score } = req.body;
  if (!username || typeof score !== 'number') {
    return res.status(400).json({ error: 'Invalid data' });
  }
  // أضف أو حدث نتيجة المستخدم
  const { data, error } = await supabase
    .from('leaderboard')
    .upsert([{ username, score }], { onConflict: ['username'] });
  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: error.message, details: error });
  }
  return res.status(200).json({ success: true });
}
