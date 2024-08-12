import { useEffect } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import Navigation from './Navigation';

export default function HomeView() {

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
