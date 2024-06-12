import React from 'react';
import './App.css';
import RouterList from './routes/AdminRoutes';
import WebRouterList from './routes/WebRoutes';
import AuthRouterList from './routes/AuthRoutes';
import Toast from './components/Toast';

function App() {
  return (
    <>
      {/* ============== Routes ============= */}
      
      <RouterList />
      <WebRouterList />
      <AuthRouterList />

      {/* ======= Notification Toast ===========  */}
      <Toast />
    </>
  );
}

export default App;
