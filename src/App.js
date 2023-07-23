import React from 'react';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Search from './components/Search/Search';

const App = () => {
  return (
    <div className='px-7 mt-2'>
      <NavigationBar />
      <div className='flex justify-center mt-4'>
        <Search />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;