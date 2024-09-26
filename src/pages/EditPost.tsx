import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { PostForm } from '../components/PostForm';
import avatarPic from '../assets/avatar.jpg';
import styles from './Home.module.css'; 

export const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [existingContent, setExistingContent] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:7070/posts/${id}`);
      const data = await response.json();
      setExistingContent(data.post.content);
    };

    fetchPost();
  }, [id]);

  const handleSave = async () => {
    await fetch (`http://localhost:7070/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: parseInt(id!), content: existingContent }),
    });
    navigate(`/posts/${id}`);
  };

  return (
    <div className={styles['edit-body']}>
      <div className={styles['header']}>
        <h3>Редактировать публикацию</h3>
        <button onClick={() => navigate(-1)} className={styles['close-button']}>✖</button>
      </div>

      <div className={styles['input-block']}>
        <img src={avatarPic} alt="Avatar" className={styles['avatar']} />
        <textarea
          value={existingContent}
          onChange={(e) => setExistingContent(e.target.value)}
          className={styles['text-area']}
        />
        <button className={styles['emoji-button']}>😊</button>
      </div>

      <div className={styles['button-block']}>
        <div className={styles['button-column']}>
          <button className={styles['action-button']}>🖼 Фото/видео</button>
          <button className={styles['action-button']}>😂 Чувства/действия</button>
          <button className={styles['action-button']}>🎉 GIF</button>
        </div>
        <div className={styles['button-column']}>
          <button className={styles['action-button']}>👤 Ометить друзей</button>
          <button className={styles['action-button']}>📍 Ометить посещение</button>
        </div>
      </div>

      <div className={styles['save-block']}>
        <button onClick={handleSave} className={styles['save-button']}>Сохранить</button>
      </div>
    </div>
  );
};
