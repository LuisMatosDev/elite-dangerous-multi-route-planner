const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

class JournalWatcher extends EventEmitter {
  constructor() {
    super();
    this.watcher = null;
    this.journalPath = null;
    this.currentSystem = null;
    this.currentShip = null;
    this.visitedSystems = new Map(); // name -> system object
    this.lastProcessedLine = {};
  }

  async initialize(customPath = null) {
    this.journalPath = customPath || this._findJournalPath();

    if (!this.journalPath) {
      this.emit('error', new Error('Elite Dangerous journal path not found'));
      return false;
    }

    console.log(`[JournalWatcher] Monitoring: ${this.journalPath}`);
    await this._readAllJournals();
    this._startWatcher();
    return true;
  }

  _findJournalPath() {
    const username = require('os').userInfo().username;
    const candidates = [
      path.join('C:\\Users', username, 'Saved Games', 'Frontier Developments', 'Elite Dangerous'),
      path.join('C:\\Users', username, 'OneDrive', 'Saved Games', 'Frontier Developments', 'Elite Dangerous'),
      path.join('C:\\Users', username, 'OneDrive - Personal', 'Saved Games', 'Frontier Developments', 'Elite Dangerous'),
    ];

    for (const candidate of candidates) {
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }
    return null;
  }

  async _readAllJournals() {
    try {
      const files = fs.readdirSync(this.journalPath)
        .filter(f => f.startsWith('Journal.') && f.endsWith('.log'))
        .sort();

      console.log(`[JournalWatcher] Found ${files.length} journal files`);

      for (const file of files) {
        const filePath = path.join(this.journalPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n').filter(l => l.trim());

        for (const line of lines) {
          try {
            this._processEntry(JSON.parse(line));
          } catch (e) {
            // linha incompleta, ignora
          }
        }

        this.lastProcessedLine[filePath] = lines.length;
      }

      console.log(`[JournalWatcher] Visited systems loaded: ${this.visitedSystems.size}`);
    } catch (err) {
      console.error('[JournalWatcher] Error reading journals:', err.message);
    }
  }

  _startWatcher() {
    this.watcher = chokidar.watch(this.journalPath, {
      persistent: true,
      ignoreInitial: true,
      depth: 0,
    });

    this.watcher.on('change', (filePath) => {
      if (filePath.endsWith('.log')) {
        this._processNewLines(filePath);
      }
    });

    this.watcher.on('add', (filePath) => {
      if (filePath.endsWith('.log')) {
        console.log(`[JournalWatcher] New journal file: ${path.basename(filePath)}`);
        this._processNewLines(filePath);
      }
    });

    console.log('[JournalWatcher] Watcher started');
    this.emit('ready', { path: this.journalPath });
  }

  _processNewLines(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n').filter(l => l.trim());
      const lastProcessed = this.lastProcessedLine[filePath] || 0;
      const newLines = lines.slice(lastProcessed);

      for (const line of newLines) {
        try {
          this._processEntry(JSON.parse(line));
        } catch (e) {
          // linha incompleta, ignora
        }
      }

      this.lastProcessedLine[filePath] = lines.length;
    } catch (err) {
      console.error('[JournalWatcher] Error processing new lines:', err.message);
    }
  }

  _processEntry(entry) {
    if (!entry || !entry.event) return;

    switch (entry.event) {
      case 'FSDJump':
      case 'CarrierJump':
      case 'Location':
        const system = {
          name: entry.StarSystem,
          coords: entry.StarPos ? {
            x: entry.StarPos[0],
            y: entry.StarPos[1],
            z: entry.StarPos[2],
          } : null,
          allegiance: entry.SystemAllegiance || null,
          security: entry.SystemSecurity_Localised || null,
        };

        // Acumular sistemas visitados
        if (!this.visitedSystems.has(system.name)) {
          this.visitedSystems.set(system.name, system);
        }

        this.currentSystem = system;

        if (entry.event !== 'Location') {
          console.log(`[JournalWatcher] Jumped to: ${system.name}`);
        }

        this.emit('locationUpdate', this.currentSystem);
        break;

      case 'Loadout':
        this.currentShip = {
          name: entry.Ship,
          shipName: entry.ShipName || entry.Ship,
          jumpRange: parseFloat(entry.MaxJumpRange || entry.JumpRange || 0).toFixed(2),
          fuelCapacity: entry.FuelCapacity?.Main || null,
        };
        console.log(`[JournalWatcher] Ship: ${this.currentShip.shipName} | Jump range: ${this.currentShip.jumpRange} LY`);
        this.emit('shipUpdate', this.currentShip);
        break;

      case 'Undocked':
        this.emit('undocked', entry);
        break;

      case 'Docked':
        this.emit('docked', entry);
        break;

      case 'Died':
        this.emit('died', entry);
        break;
    }
  }

  searchVisitedSystems(query) {
    if (!query || query.trim().length < 2) return [];
    const lower = query.toLowerCase();
    const results = [];
    for (const [name, system] of this.visitedSystems) {
      if (name.toLowerCase().includes(lower)) {
        results.push(system);
      }
      if (results.length >= 10) break;
    }
    return results;
  }

  getVisitedSystems() {
    return Array.from(this.visitedSystems.values());
  }

  getState() {
    return {
      system: this.currentSystem,
      ship: this.currentShip,
      journalPath: this.journalPath,
      visitedSystemsCount: this.visitedSystems.size,
    };
  }

  destroy() {
    if (this.watcher) {
      this.watcher.close();
      console.log('[JournalWatcher] Watcher stopped');
    }
  }
}

module.exports = JournalWatcher;
