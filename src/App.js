import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import {Route, Routes} from 'react-router-dom'
// import Users from './pages/Users/Users';
// import Mentions from './pages/Mentions/Mentions';
// import Accounts from './pages/Accounts/Accounts';
import { MenuTab } from './Components/Menu/MenuTab';

const App = () => {
  return (
    <BrowserRouter>
      <MenuTab />
      {/* <Routes>
        <Route exact path='/usuarios' element={<Users />} />
        <Route exact path='/menciones' element={<Mentions />} />
        <Route exact path='/cuentas-sociales' element={<Accounts />} />
      </Routes> */}
    </BrowserRouter>
  )
}

export default App;