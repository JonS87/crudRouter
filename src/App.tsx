import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreatePost } from './pages/CreatePost';
import { ViewPost } from './pages/ViewPost';
import { EditPost } from './pages/EditPost';
import { Page404 } from './pages/Page404';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/new" element={<CreatePost />} />
        <Route path="/posts/:id" element={<ViewPost />} />
        <Route path="/posts/edit/:id" element={<EditPost />} />
        <Route path="*" element={<Page404 />}/>
      </Routes>
    </Router>
  );
};

export default App;
