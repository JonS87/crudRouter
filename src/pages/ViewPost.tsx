import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Post } from '../types/Post';
import avatarPic from '../assets/avatar.jpg';
import styles from './Home.module.css';

export const ViewPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:7070/posts/${id}`);
        if (!response.ok) {
          throw new Error('Ошибка при загрузке поста');
        }
        const data = await response.json();
        setPost(data.post);
      } catch (error) {
        console.error(error);
        setError('Не удалось загрузить пост');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const deletePost = async (id: number) => {
    await fetch(`http://localhost:7070/posts/${id}`, { method: 'DELETE' });
    navigate('/');
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>; 
  if (!post) return <div>Пост не найден</div>;

  const timeAgo = Math.floor((Date.now() - new Date(post.created).getTime()) / 60000);
  return (
    <div className={styles['post-card']}>
      <div className={styles['user-block']}>
        <img src={avatarPic} alt="Avatar" className={styles['avatar']} />
        <div className={styles['group-founder']}>
          <div className={styles['user-name']}>Иванов Иван Иванович</div>
          <div className={styles['user-info']}>
            <span role="img" aria-label="plant" className={styles['plant-icon']}>🌱</span>
            <div>Основатель группы  • {timeAgo} мин.</div>
          </div>
        </div>
      </div>
      <div className={styles['content']}>{post.content}</div>
      <div className={styles['footer']}>
        <button>👍 Нравится</button>
        <button>💬 Комментировать</button>
      </div>
      <div className={styles['editor']}>
          <Link to={`/posts/edit/${post.id}`}>Изменить</Link>
          <button onClick={() => deletePost(post.id)}>Удалить</button>
        </div>
    </div>
  );
};
