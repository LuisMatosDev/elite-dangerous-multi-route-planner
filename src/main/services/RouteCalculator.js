class RouteCalculator {
  constructor() {}

  calculateDistance(systemA, systemB) {
    if (!systemA?.coords || !systemB?.coords) return null;
    const dx = systemB.coords.x - systemA.coords.x;
    const dy = systemB.coords.y - systemA.coords.y;
    const dz = systemB.coords.z - systemA.coords.z;
    return parseFloat(Math.sqrt(dx * dx + dy * dy + dz * dz).toFixed(2));
  }

  estimateJumps(distance, jumpRange) {
    if (!distance || !jumpRange || jumpRange <= 0) return null;
    return Math.ceil(distance / jumpRange);
  }

  estimateTime(jumps) {
    if (!jumps) return null;
    // ~45s per jump including FSD cooldown and supercruise
    const seconds = jumps * 45;
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    return `${minutes}m ${remaining}s`;
  }

  calculateMultiRoute(waypoints, currentSystem, jumpRange) {
    const allPoints = currentSystem
      ? [currentSystem, ...waypoints.map(w => w.system)]
      : waypoints.map(w => w.system);

    if (allPoints.length < 2) {
      return { legs: [], totalDistance: 0, totalJumps: 0, totalTime: null };
    }

    let totalDistance = 0;
    let totalJumps = 0;
    const legs = [];

    for (let i = 0; i < allPoints.length - 1; i++) {
      const from = allPoints[i];
      const to = allPoints[i + 1];
      const distance = this.calculateDistance(from, to);
      const jumps = this.estimateJumps(distance, jumpRange);

      if (distance !== null) totalDistance += distance;
      if (jumps !== null) totalJumps += jumps;

      legs.push({
        from: from.name,
        to: to.name,
        distance,
        jumps,
        estimatedTime: this.estimateTime(jumps),
      });
    }

    return {
      legs,
      totalDistance: parseFloat(totalDistance.toFixed(2)),
      totalJumps,
      totalTime: this.estimateTime(totalJumps),
    };
  }

  // Nearest neighbour TSP heuristic for waypoint reordering
  optimizeWaypointOrder(waypoints, startSystem) {
    if (waypoints.length <= 2) return waypoints;

    const remaining = [...waypoints];
    const ordered = [];
    let current = startSystem;

    while (remaining.length > 0) {
      let nearestIndex = 0;
      let nearestDistance = Infinity;

      for (let i = 0; i < remaining.length; i++) {
        const dist = this.calculateDistance(current, remaining[i].system);
        if (dist !== null && dist < nearestDistance) {
          nearestDistance = dist;
          nearestIndex = i;
        }
      }

      ordered.push(remaining[nearestIndex]);
      current = remaining[nearestIndex].system;
      remaining.splice(nearestIndex, 1);
    }

    return ordered;
  }
}

module.exports = RouteCalculator;
