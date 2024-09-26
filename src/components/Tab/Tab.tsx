import React from 'react';
import styles from './Tab.module.css';

interface TabProps {
  icon: string;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export const Tab: React.FC<TabProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <div className={`${styles['tab']} ${isActive ? 'active' : ''}`} onClick={onClick}>
      <span>{icon}</span>
      <span>{label}</span>
      {isActive && <div className={styles['triangle']} />}
    </div>
  );
};
