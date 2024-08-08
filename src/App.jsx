import { useEffect } from 'react';
import { getFDRsByTeam } from './utils/Loaders';

function App() {
  useEffect(() => {
    async function getFDRS() {
      try {
        await getFDRsByTeam();
      } catch (error) {
        console.log(error);
      }
    }
    getFDRS();
  }, []);

  return (
    <>
      <h1>Hello world, a beginning to better player filtering</h1>
    </>
  );
}

export default App;
