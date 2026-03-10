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
    this.lastProcessedLine = {};
  }

  async initialize(customPath = null) {
    this.journalPath = customPath || this._findJournalPath();

    if (!this.journalPath) {
      this.emit('error', new Error('Elite Dangerous journal path not found'));
      return false;
    }

    console.log(`[JournalWatcher] Monitoring: ${this.journalPath}`);
    await this._readLatestJournal();
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

  async _readLatestJournal() {
    try {
      const files = fs.readdirSync(this.journalPath)
        .filter(f => f.startsWith('Journal.') && f.endsWith('.log'))
        .sort()
        .reverse();

      if (files.length === 0) {
        console.warn('[JournalWatcher] No journal files found');
        return;
      }

      const latestFile = path.join(this.journalPath, files[0]);
      console.log(`[JournalWatcher] Reading latest journal: ${files[0]}`);

      const content = fs.readFileSync(latestFile, 'utf8');
      const lines = content.split('\n').filter(l => l.trim());

      for (const line of lines) {
        this._processEntry(JSON.parse(line));
      }

      this.lastProcessedLine[latestFile] = lines.length;
    } catch (err) {
      console.error('[JournalWatcher] Error reading journal:', err.message);
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
        console.log(`[JournalWatcher] New journal file detected: ${path.basename(filePath)}`);
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
          // Linha incompleta, ignora
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
        this.currentSystem = {
          name: entry.StarSystem,
          coords: entry.StarPos ? {
            x: entry.StarPos[0],
            y: entry.StarPos[1],
            z: entry.StarPos[2],
          } : null,
          allegiance: entry.SystemAllegiance || null,
          security: entry.SystemSecurity_Localised || null,
        };
        console.log(`[JournalWatcher] Jumped to: ${this.currentSystem.name}`);
        this.emit('locationUpdate', this.currentSystem);
        break;

      case 'Location':
        this.currentSystem = {
          name: entry.StarSystem,
          coords: entry.StarPos ? {
            x: entry.StarPos[0],
            y: entry.StarPos[1],
            z: entry.StarPos[2],
          } : null,
          allegiance: entry.SystemAllegiance || null,
          security: entry.SystemSecurity_Localised || null,
        };
        this.emit('locationUpdate', this.currentSystem);
        break;

      case 'Loadout':
        this.currentShip = {
          name: entry.Ship,
          shipName: entry.ShipName || entry.Ship,
          jumpRange: parseFloat(entry.MaxJumpRange || entry.JumpRange || 0).toFixed(2),
          fuelCapacity: entry.FuelCapacity?.Main || null,
        };
        console.log(`[JournalWatcher] Ship loaded: ${this.currentShip.shipName} | Jump range: ${this.currentShip.jumpRange} LY`);
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

  getState() {
    return {
      system: this.currentSystem,
      ship: this.currentShip,
      journalPath: this.journalPath,
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
