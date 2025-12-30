-- Create function to automatically set user_id from auth.uid()
CREATE OR REPLACE FUNCTION set_user_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically set user_id on insert
DROP TRIGGER IF EXISTS set_notes_user_id ON notes;
CREATE TRIGGER set_notes_user_id
  BEFORE INSERT ON notes
  FOR EACH ROW
  WHEN (NEW.user_id IS NULL)
  EXECUTE FUNCTION set_user_id();

-- Update the INSERT policy to allow inserts where user_id will be set automatically
DROP POLICY IF EXISTS "Users can insert their own notes" ON notes;
CREATE POLICY "Users can insert their own notes"
  ON notes FOR INSERT
  WITH CHECK (auth.uid() = COALESCE(user_id, auth.uid()));

