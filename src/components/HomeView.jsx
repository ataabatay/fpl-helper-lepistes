import { Outlet } from 'react-router-dom';

export default function HomeView() {
  return (
    <>
      <h1>This will be the home view</h1>
      <Outlet />
    </>
  );
}
