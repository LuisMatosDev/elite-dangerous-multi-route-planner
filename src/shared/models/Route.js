class Route {
  constructor() {
    this.id = Date.now().toString();
    this.waypoints = [];
    this.legs = [];
    this.totalDistance = 0;
    this.totalJumps = 0;
    this.createdAt = new Date().toISOString();
  }

  addWaypoint(waypoint) {
    this.waypoints.push(waypoint);
  }

  removeWaypoint(id) {
    this.waypoints = this.waypoints.filter(w => w.id !== id);
  }

  reorderWaypoints(fromIndex, toIndex) {
    const updated = [...this.waypoints];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    this.waypoints = updated;
  }

  getSummary() {
    return {
      waypointCount: this.waypoints.length,
      totalDistance: this.totalDistance,
      totalJumps: this.totalJumps,
    };
  }
}

module.exports = Route;
