import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";
const envText = readFileSync('.env', 'utf8');
const env = envText.split(/\r?\n/).reduce((acc, line) => {
  const [k, ...vals] = line.split('=');
  if (!k) return acc;
  acc[k.trim()] = vals.join('=').trim();
  return acc;
}, {});
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
const response = await supabase.from('pg_catalog.pg_tables').select('schemaname,tablename').limit(20);
console.log(JSON.stringify(response, null, 2));
