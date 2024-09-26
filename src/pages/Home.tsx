import React from 'react';
import { usePosts } from '../hooks/usePosts';
import { PostCard } from '../components/PostCard';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  const { posts, loading } = usePosts();

  if (loading) return <div>Загрузка...</div>;

  return (
    <>
      <div className={styles['new-post']}>
        <Link to="/posts/new">Создать пост</Link>
      </div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};
