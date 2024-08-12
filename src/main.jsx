import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeView from './components/HomeView.jsx';
import PlayersIndex from './components/PlayersIndex.jsx';
import MyTeam from './components/MyTeamView.jsx';
import Fixtures from './components/Fixtures.jsx';
import Login from './components/Login.jsx';
import { getFDRsByWeek, createPlayerObjects, getFDRsByTeam, LogUserIn } from './utils/Loaders.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeView />,
    loader: getFDRsByWeek,
    children: [
      {
        path: '/players',
        element: <PlayersIndex />,
        loader: createPlayerObjects,
      },
      {
        path: '/myteam',
        element: <MyTeam />,
      },
      {
        path: '/fixtures',
        element: <Fixtures />,
        loader: getFDRsByTeam,
      },
      {
        path: '/login',
        element: <Login />,
        action: LogUserIn,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
