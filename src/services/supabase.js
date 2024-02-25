import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://tscsljgnzojzgyzofpdo.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzY3Nsamduem9qemd5em9mcGRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1Njk5NDIsImV4cCI6MjAyMjE0NTk0Mn0.D2s7AGfBfqSaOjBha6DQAgoYV-qH-L51fWYt_MV-Jf4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
