import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';  // Correct relative path
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <main>
        <Header />
        <Outlet />
        <Footer /> {/* Add Footer at the bottom */}
    </main>
  );
};

export default Home;
