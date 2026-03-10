const { v4: uuidv4 } = require('uuid');

class Waypoint {
  constructor({ system, label = null, notes = '' }) {
    this.id = uuidv4();
    this.system = system; // System object
    this.label = label || system.name;
    this.notes = notes;
    this.visited = false;
    this.createdAt = new Date().toISOString();
  }

  markVisited() {
    this.visited = true;
  }
}

module.exports = Waypoint;
