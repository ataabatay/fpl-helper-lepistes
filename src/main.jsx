import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeView from './components/MainView.jsx';
import MyTeam from './components/MyTeamView.jsx';
import Fixtures from './components/FixturesPage.jsx';
import Login from './components/Login.jsx';
import {
  getAllData,
  getRawFixturesData,
} from './utils/Loaders.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomeScreen from './components/HomeScreen.jsx';
import PlayersIndex from './components/PlayersIndex.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeView />,
    loader: async () => {
      const [allData, rawFixtures] = await Promise.all([
        queryClient.fetchQuery('allData', getAllData),
        queryClient.fetchQuery('rawFixtures', getRawFixturesData),
      ]);
      return { allData, rawFixtures };
    },
    children: [
      {
        path: '/home',
        element: <HomeScreen />,
      },
      {
        path: '/players',
        element: <PlayersIndex />,
      },
      {
        path: '/myteam',
        element: <MyTeam />,
      },
      {
        path: '/fixtures',
        element: <Fixtures />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
