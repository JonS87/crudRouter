import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../../hooks/usePosts';
import avatarPic from '../../assets/avatar.jpg';
import styles from './PostForm.module.css';

interface PostFormProps {
  existingContent?: string;
  postId?: number;
}

export const PostForm: React.FC<PostFormProps> = ({ existingContent, postId }) => {
  const [content, setContent] = useState(existingContent || '');
  const { createPost, updatePost } = usePosts();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (postId) {
      await updatePost(postId, content);
    } else {
      await createPost(content);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className={styles['post-form']}>
      <div className={styles['avatar-container']}>
        <div className={styles['avatar']}>
          <img src={avatarPic} alt="Avatar" className={styles['avatar']} />
        </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Введите текст поста"
            required
          />
      </div>
      <button type="button" className={styles['emoji-button']}>😊</button>
      <div className={styles['publish-block']}>
        <button className={styles['submit']} type="submit">{postId ? 'Сохранить' : 'Опубликовать'}</button>
      </div>
    </form>
  );
};
