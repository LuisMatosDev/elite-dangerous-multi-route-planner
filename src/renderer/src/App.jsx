import React from 'react';
import { AppProvider } from './store/AppContext';
import { StatusBar } from './components/StatusBar/StatusBar';
import './styles/global.css';

function App() {
  return (
    <AppProvider>
      <div className="app">
        <StatusBar />
        <main className="app__main">
          <p className="app__placeholder">Route planner coming soon...</p>
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
