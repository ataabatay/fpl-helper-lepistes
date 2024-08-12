import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeView from './components/MainView.jsx';
import PlayersIndex from './components/PlayersIndex.jsx';
import MyTeam from './components/MyTeamView.jsx';
import Fixtures from './components/FixturesPage.jsx';
import Login from './components/Login.jsx';
import { getAllData, getFDRsByWeek, createPlayerObjects, getFDRsByTeam, LogUserIn } from './utils/Loaders.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomeScreen from './components/HomeScreen.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeView />,
    loader: async () => {
      const [allData, fdrsByWeek] = await Promise.all([
        queryClient.fetchQuery('allData', getAllData),
        queryClient.fetchQuery('fdrsByWeek', getFDRsByWeek),
      ]);
      return { allData, fdrsByWeek };
    },
    children: [
      {
        path: '/home',
        element: <HomeScreen />
      },
      {
        path: '/players',
        element: <PlayersIndex />,
        loader: async () => {
          return queryClient.fetchQuery('playerObjects', createPlayerObjects);
        },
      },
      {
        path: '/myteam',
        element: <MyTeam />,
      },
      {
        path: '/fixtures',
        element: <Fixtures />,
        loader: async () => {
          return queryClient.fetchQuery('fdrsByTeam', getFDRsByTeam);
        },
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
