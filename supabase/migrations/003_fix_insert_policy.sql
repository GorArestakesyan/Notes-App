-- Drop and recreate the INSERT policy to fix the RLS issue
DROP POLICY IF EXISTS "Users can insert their own notes" ON notes;

-- Create a more permissive INSERT policy that allows users to insert notes
-- where the user_id matches their authenticated user ID
CREATE POLICY "Users can insert their own notes"
  ON notes FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL 
    AND user_id = auth.uid()
  );

