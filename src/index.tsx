import { createRoot } from 'react-dom/client';
import App from '@pages/App';
import './wdyr';
import './index.css';

const container = document.getElementById('app');
if (!container) {
  throw new Error('Failed to find the root element');
}
const root = createRoot(container);
root.render(<App />);
