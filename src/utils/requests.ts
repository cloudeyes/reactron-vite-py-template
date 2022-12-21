import isElectron from 'is-electron';

// Electron Inter Process Communication and dialog
let _port = 0;
export const getPort = () => {
  if (!isElectron()) {
    return 0;
  }
  if (!_port) {
    const { ipcRenderer } = (window as any).require('electron');
    _port = ipcRenderer.sendSync('get-port-number');
  }
  return _port;
};

export const get = (route: any) => {
  const port = getPort();
  return fetch(`http://localhost:${port}${route}`).then((response) =>
    response.json()
  );
};

/**
 * @description - Helper POST method for sending requests to and from the Python/FastAPI services.
 * @param body - request body of data that you want to pass.
 * @param route - URL route of the Python/FastAPI service you want to use.
 * @param callback - optional callback function to be invoked if provided.
 * @return response data from Python/FastAPI service.
 * @memberof Requests
 */
export const post = (body: any, route: any) => {
  const port = getPort();
  fetch(`http://localhost:${port}${route}`, {
    body,
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
  }).then((response) => response.json());
};
