import React from 'react';
import './App.css';
import RouterList from './routes/routes';
import Toast from './components/Toast';

function App() {
  return (
    <>
      <RouterList />
      <Toast />
    </>
  );
}

export default App;
