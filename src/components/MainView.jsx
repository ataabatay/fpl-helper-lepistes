import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

export default function MainView() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
