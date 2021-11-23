import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MenuTab } from './Components/Menu/MenuTab';

const App = () => {

  useEffect(() => {
    localStorage.removeItem('key');
  }, []);

  return (
    <BrowserRouter>
      <MenuTab />
    </BrowserRouter>
  )
}

export default App;