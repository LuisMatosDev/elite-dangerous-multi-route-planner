class System {
  constructor({ name, coords = null, allegiance = null, security = null }) {
    this.name = name;
    this.coords = coords; // { x, y, z }
    this.allegiance = allegiance;
    this.security = security;
  }

  distanceTo(otherSystem) {
    if (!this.coords || !otherSystem.coords) return null;
    const dx = this.coords.x - otherSystem.coords.x;
    const dy = this.coords.y - otherSystem.coords.y;
    const dz = this.coords.z - otherSystem.coords.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
}

module.exports = System;
