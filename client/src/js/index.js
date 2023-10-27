import Editor from './editor';
import { openDB, indexedDB } from 'idb'; // Import openDB from idb
import '../css/style.css';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const main = document.querySelector('#main');
    main.innerHTML = '';

    const loadSpinner = () => {
      const spinner = document.createElement('div');
      spinner.classList.add('spinner');
      spinner.innerHTML = `
        <div class="loading-container">
          <div class="loading-spinner"></div>
        </div>
      `;
      main.appendChild(spinner);
    };

    const editor = new Editor();

    if (!editor) {
      loadSpinner();
    }

    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service workers are not supported in this browser.', error);
        });
    }

    const name = 'JATE';
    const version = 1;

    // Open the indexedDB database
    const db = await openDB(name, version);

    // You can use 'db' here for database operations
  } catch (error) {
    console.error('An error occurred:', error);
  }
});
