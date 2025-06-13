import React from 'react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
      <p>Edit src/App.tsx and save to test HMR</p>
    </header>
  );
};