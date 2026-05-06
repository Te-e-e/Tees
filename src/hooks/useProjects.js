import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useProjects(publicOnly = true) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (publicOnly) {
        query = query.eq('visible', true);
      }

      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;
      setProjects(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  }, [publicOnly]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (projectData, imageFile, beforeImageFile) => {
    try {
      let image_url = projectData.image_url || '';
      let image_before_url = projectData.image_before_url || '';

      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, imageFile, { cacheControl: '3600', upsert: false });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName);
        image_url = urlData.publicUrl;
      }

      if (beforeImageFile) {
        const fileName = `before-${Date.now()}-${beforeImageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, beforeImageFile, { cacheControl: '3600', upsert: false });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName);
        image_before_url = urlData.publicUrl;
      }

      const { data, error: insertError } = await supabase
        .from('projects')
        .insert([{ ...projectData, image_url, image_before_url }])
        .select()
        .single();

      if (insertError) throw insertError;
      await fetchProjects();
      return data;
    } catch (err) {
      throw err;
    }
  };

  const updateProject = async (id, projectData, imageFile, beforeImageFile) => {
    try {
      const updates = { ...projectData };

      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, imageFile, { cacheControl: '3600', upsert: false });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName);
        updates.image_url = urlData.publicUrl;
      }

      if (beforeImageFile) {
        const fileName = `before-${Date.now()}-${beforeImageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, beforeImageFile, { cacheControl: '3600', upsert: false });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName);
        updates.image_before_url = urlData.publicUrl;
      }

      const { data, error: updateError } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;
      await fetchProjects();
      return data;
    } catch (err) {
      throw err;
    }
  };

  const deleteProject = async (id) => {
    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;
    await fetchProjects();
  };

  const toggleVisibility = async (id, visible) => {
    const { error: updateError } = await supabase
      .from('projects')
      .update({ visible })
      .eq('id', id);

    if (updateError) throw updateError;
    await fetchProjects();
  };

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    toggleVisibility,
  };
}
