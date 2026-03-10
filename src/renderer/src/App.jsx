import React from 'react';
import { AppProvider } from './store/AppContext';
import { StatusBar } from './components/StatusBar/StatusBar';
import { RoutePanel } from './components/RoutePanel/RoutePanel';
import './styles/global.css';

function App() {
  return (
    <AppProvider>
      <div className="app">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <StatusBar />
        <main className="app__main" id="main-content">
          <RoutePanel />
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
