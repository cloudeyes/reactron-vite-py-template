import isElectron from 'is-electron';
import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import { get, getPort } from './utils/requests';

import styles from './styles/App.module.scss';

function App() {
  const [count, setCount] = useState(0);
  const [sampleResponse, setSampleResponse] = useState({
    message: 'loading...',
  });
  useEffect(() => {
    const loadData = async () => {
      setSampleResponse(await get('/example'));
    };
    if (isElectron()) {
      loadData();
    }
  }, []);

  return (
    <>
      <div className={styles.app}>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className={styles.logo} alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img
              src={reactLogo}
              className={`${styles.logo} ${styles.react}`}
              alt="React logo"
            />
          </a>
        </div>
        <h1>Vite + React</h1>
        <h2>FastAPI Response from {getPort()}</h2>
        <pre>{JSON.stringify(sampleResponse)}</pre>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className={styles.readTheDocs}>
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  );
}

export default App;
