import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AmbientBubbles from './AmbientBubbles';

export default function Layout() {
  return (
    <>
      <AmbientBubbles count={30} />
      <Navbar />
      <main style={{ paddingTop: '70px' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
