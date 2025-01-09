import { supabase } from '../../src/lib/supabase';

export default async function handler(req, res) {
  const { data, error } = await supabase.from('blogs').select('*');

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json(data);
}
