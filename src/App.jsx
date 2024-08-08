import { useEffect } from 'react';
import { createPlayerObjects } from './utils/Loaders';

function App() {
  useEffect(() => {
    async function getFDRS() {
      try {
        await createPlayerObjects();
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
