import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../Home';
import Chat from '../Chat';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/chat" element={<Chat />}></Route>
      <Route path="/*" element={<div>404</div>}></Route>
    </Routes>
  );
}

export default AppRoutes;
