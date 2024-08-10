import { useEffect } from 'react';
import { createPlayerObjects  } from './utils/Loaders';

function App() {
  // Load players
  useEffect(() => {
    const getPlayers = async () => {
      try {
        await createPlayerObjects();
      } catch (error) {
        console.log(error);
      }
    };
    getPlayers();
  }, []);

  return (
    <>
      <h1>Hello world, a beginning to better player filtering</h1>
    </>
  );
}

export default App;
