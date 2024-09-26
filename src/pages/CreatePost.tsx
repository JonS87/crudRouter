import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostForm } from '../components/PostForm';
import { Tab } from '../components/Tab';
import styles from './Home.module.css';

export const CreatePost: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Публикация');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  const navigate = useNavigate();

  return (
    <div className={styles['create-post-card']}>
      <div className={styles['tabs']}>
        <Tab
          icon="✏️"
          label="Публикация"
          isActive={activeTab === 'Публикация'}
          onClick={() => handleTabClick('Публикация')}
        />
        <Tab
          icon="📷"
          label="Фото/видео"
          isActive={activeTab === 'Фото/видео'} 
          onClick={() => handleTabClick('Фото/видео')} 
        />
        <Tab
          icon="📹"
          label="Прямой эфир"
          isActive={activeTab === 'Прямой эфир'} 
          onClick={() => handleTabClick('Прямой эфир')} 
        />
        <Tab
          icon="⋮"
          label="Ещё"
          isActive={activeTab === 'Ещё'} 
          onClick={() => handleTabClick('Ещё')} 
        />
        <button className={styles['close-button']} onClick={() => navigate('/')}>✖️</button>
      </div>
      {activeTab === 'Публикация' ? (
        <PostForm />
      ) : (
        <div className={styles['content-placeholder']}>Заглушка</div>
      )}
    </div>
  );
};
