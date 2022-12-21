import { useState } from 'react';
import { app as electronApp } from '../../utils/services';
import {
  CloseButton,
  ContractButton,
  MaximizeButton,
  MinimizeButton,
} from './TitleBarButtons';

import isElectron from 'is-electron';
import favicon from './img/favicon.png';
import styles from './scss/Titlebar.module.scss';

const TitleBar = () => {
  const [maximized, setMaximized] = useState(false);
  const app = isElectron()
    ? electronApp
    : {
        maximize: () => {},
        unmaximize: () => {},
        minimize: () => {},
        quit: () => {},
      };

  const handleMaximizeToggle = () => {
    !maximized ? app.maximize() : app.unmaximize();
    setMaximized(!maximized);
  };

  return (
    <section className={styles.titlebar}>
      <div>
        <img src={favicon} alt="favicon" />
        <span id="electron-window-title-text">{document.title}</span>
      </div>

      <div id="electron-window-title-buttons">
        <MinimizeButton onClick={app.minimize} />
        {maximized ? (
          <ContractButton onClick={handleMaximizeToggle} />
        ) : (
          <MaximizeButton onClick={handleMaximizeToggle} />
        )}
        <CloseButton onClick={app.quit} />
      </div>
    </section>
  );
};

export default TitleBar;
