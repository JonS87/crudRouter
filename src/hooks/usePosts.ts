import { useEffect, useState } from 'react';
import { Post } from '../types/Post';

const API_URL = 'http://localhost:7070/posts';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPosts = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setPosts(data);
    setLoading(false);
  };

  const createPost = async (content: string) => {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 0, content }),
    });
    fetchPosts();
  };

  const deletePost = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchPosts();
  };

  const updatePost = async (id: number, content: string) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, content }),
    });
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, createPost, deletePost, updatePost };
};
