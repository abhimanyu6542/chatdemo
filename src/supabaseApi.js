import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://jqxyquswkvchzzxfqdml.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxeHlxdXN3a3ZjaHp6eGZxZG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQyOTYxNDksImV4cCI6MTk4OTg3MjE0OX0.QTNcGw9juPPlFeMVUI3_VqyTC69nD_kemYWZDgPrxlU"
);