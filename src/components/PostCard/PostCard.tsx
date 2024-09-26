import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../../types/Post';
import avatarPic from '../../assets/avatar.jpg';

import styles from './PostCard.module.css';

interface PostCardProps {
  post: Post;
  // onDelete: (id: number) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post/*, onDelete*/ }) => {
  const timeAgo = Math.floor((Date.now() - new Date(post.created).getTime()) / 60000);

  const navigate = useNavigate();

  const handlePostClick = (id: number) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className={styles['post-card']} onClick={() => handlePostClick(post.id)}>
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
        {/* <button onClick={() => onDelete(post.id)}>Удалить</button>
        <button>Комментировать</button> */}
      </div>
      <div className={styles['comment-section']}>        
        <div className={styles['comment-input']}>
          <img src={avatarPic} alt="Avatar" className={styles['avatar']} />
          <input type="text" placeholder="Введите комментарий..." />
          <div className={styles['emoji-buttons']}>
            <button>😊</button>
            <button>📷</button>
            <button>GIF</button>
            <button>🎉</button>
          </div>
        </div>
      </div>
    </div>
  );
};
