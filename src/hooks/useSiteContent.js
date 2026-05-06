import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useSiteContent() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('site_content')
        .select('*');

      if (fetchError) throw fetchError;

      const contentMap = {};
      (data || []).forEach((row) => {
        contentMap[row.key] = row.value;
      });
      setContent(contentMap);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching site content:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const updateContent = async (key, value) => {
    try {
      const { error: upsertError } = await supabase
        .from('site_content')
        .upsert(
          { key, value, updated_at: new Date().toISOString() },
          { onConflict: 'key' }
        );

      if (upsertError) throw upsertError;
      setContent((prev) => ({ ...prev, [key]: value }));
    } catch (err) {
      throw err;
    }
  };

  const updateMultiple = async (updates) => {
    try {
      const rows = Object.entries(updates).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString(),
      }));

      const { error: upsertError } = await supabase
        .from('site_content')
        .upsert(rows, { onConflict: 'key' });

      if (upsertError) throw upsertError;
      setContent((prev) => ({ ...prev, ...updates }));
    } catch (err) {
      throw err;
    }
  };

  return { content, loading, error, fetchContent, updateContent, updateMultiple };
}
