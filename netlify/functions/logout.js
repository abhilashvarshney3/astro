import { supabase } from '../../src/lib/supabase';

export default async function handler(req, res) {
  await supabase.auth.signOut();
  return res.status(200).json({ message: 'Logged out successfully' });
}
