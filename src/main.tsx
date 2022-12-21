import ReactDOM from 'react-dom/client';
import App from './App';
import TitleBar from './components/titlebar/TitleBar';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <TitleBar />
    <div id="contents">
      <App />
    </div>
  </>
);
