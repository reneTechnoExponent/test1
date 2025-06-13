import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'

// Initialize development tools in dev mode only
if (import.meta.env.DEV) {
  import('/src/utils/dev-helper.ts').then(({ initializeCodegenDevTools }) => {
    initializeCodegenDevTools();
  });
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)