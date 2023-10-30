// import { getDb, putDb } from './database';
// import { header } from './header';

// export default class {
//   constructor() {
//     const localData = localStorage.getItem('content');
//     let initialData;

//     // Check if CodeMirror is loaded; if not, load it dynamically.
//     if (typeof CodeMirror === 'undefined') {
//       console.warn('CodeMirror is not loaded; loading it dynamically...');
//       // Dynamically load CodeMirror script here.
//     } else {
//       initialData = getDb().then((data) => {
//         console.info('Loaded data from IndexedDB, injecting into editor');
//         return data || localData || header;
//       });

//       // Initialize the editor once CodeMirror is loaded.
//       initialData.then((initialContent) => {
//         this.initEditor(initialContent);
//       });
//     }
//   }

//   initEditor(initialContent) {
//     this.editor = CodeMirror(document.querySelector('#main'), {
//       value: initialContent,
//       mode: 'javascript',
//       theme: 'monokai',
//       lineNumbers: true,
//       lineWrapping: true,
//       autofocus: true,
//       indentUnit: 2,
//       tabSize: 2,
//     });

//     this.editor.on('change', () => {
//       const newContent = this.editor.getValue();
//       this.saveContent(newContent);
//     });

//     // Save the content of the editor to IndexedDB when the editor loses focus.
//     this.editor.on('blur', () => {
//       console.log('The editor has lost focus');
//       this.saveContent(localStorage.getItem('content'));
//     });
//   }

//   async saveContent(content) {
//     localStorage.setItem('content', content);
//     await putDb(content);
//   }
// }

// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when the editor itself is loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}