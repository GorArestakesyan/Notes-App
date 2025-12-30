import { supabase } from '@config/supabase';
import type { INote } from '@types';

export const notesService = {
  async getNotes(
    userId: string,
  ): Promise<{ data: INote[] | null; error: any }> {
    try {
      const { data, error } = await supabase!
        .from('notes')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });
      return { data, error };
    } catch (error) {
      console.error('Error fetching notes:', error);
      return {
        data: null,
        error: { message: 'Failed to fetch notes', details: error },
      };
    }
  },

  async createNote(
    note: Omit<INote, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<{ data: INote | null; error: any }> {
    try {
      // Don't pass user_id - let the database function set it from auth.uid()
      const { data, error } = await supabase!
        .from('notes')
        .insert([note])
        .select()
        .single();
      if (error) {
        console.error('Error creating note:', error);
      }
      return { data, error };
    } catch (error) {
      console.error('Exception creating note:', error);
      return {
        data: null,
        error: { message: 'Failed to create note', details: error },
      };
    }
  },

  async updateNote(
    id: string,
    updates: Partial<Pick<INote, 'title' | 'content'>>,
  ): Promise<{ data: INote | null; error: any }> {
    const { data, error } = await supabase!
      .from('notes')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  async deleteNote(id: string): Promise<{ error: any }> {
    const { error } = await supabase!.from('notes').delete().eq('id', id);
    return { error };
  },
};
