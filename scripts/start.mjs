import axios from 'axios';
import { spawn, spawnSync } from 'child_process';
import getPort, { portNumbers } from 'get-port';

/**
 * @namespace Starter
 * @description - Scripts to start Electron, React, and Python.
 */
export class Starter {
  /**
   * @description - Starts developer mode.
   * @memberof Starter
   */
  developerMode = async () => {
    // Child spawn options for console
    const spawnOptions = {
      hideLogs: { detached: false, shell: true, stdio: 'pipe' },
      showLogs: { detached: false, shell: true, stdio: 'inherit' }
    };

    /**
     * Method to get first port in range of 3001-3999,
     * Remains unused here so will be the same as the
     * port used in main.js
     */
    const port = await getPort({
      port: portNumbers(3001, 3999)
    });

    // Kill anything that might using required React port
    spawnSync(`kill-port ${port}`, spawnOptions.hideLogs);

    // Start & identify React & Electron processes
    spawn(`vite --port=${port} --no-open .`, spawnOptions.showLogs);
    spawn(`cross-env VITE_PORT=${port} electron .`, spawnOptions.showLogs);

    // Kill processes on exit
    const exitOnEvent = (event) => {
      process.once(event, () => {
        try {
          // These errors are expected since the connection is closing
          const expectedErrors = ['ECONNRESET', 'ECONNREFUSED'];

          // Send command to FastAPI server to quit and close
          axios.post(`http://localhost:${port}/quit`).catch(
            (error) => !expectedErrors.includes(error.code) && console.log(error)
          );
        } catch (error) {
          // This errors is expected since the process is closing
          if (error.code !== 'ESRCH') console.error(error);
        }
      });
    };

    // Set exit event handlers
    [
      'exit',
      'SIGINT',
      'SIGTERM',
      'SIGUSR1',
    ].forEach(exitOnEvent);
  };
}
