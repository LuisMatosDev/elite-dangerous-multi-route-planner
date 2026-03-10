import React from 'react';
import { AppProvider } from './store/AppContext';
import { StatusBar } from './components/StatusBar/StatusBar';
import { SystemSearch } from './components/SystemSearch/SystemSearch';
import './styles/global.css';

function App() {
  const handleSystemSelect = (system) => {
    console.log('System selected:', system);
  };

  return (
    <AppProvider>
      <div className="app">
        <StatusBar />
        <main className="app__main">
          <div className="app__search-demo">
            <p className="app__search-label">ADD WAYPOINT</p>
            <SystemSearch onSelect={handleSystemSelect} />
          </div>
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
