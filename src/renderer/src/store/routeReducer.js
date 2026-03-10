export const initialState = {
  // Journal
  journalReady: false,
  journalError: null,

  // Localização atual
  currentSystem: null,

  // Nave atual
  currentShip: null,

  // Rota
  waypoints: [],
  legs: [],
  totalDistance: 0,
  totalJumps: 0,
};

export function appReducer(state, action) {
  switch (action.type) {
    case 'JOURNAL_READY':
      return { ...state, journalReady: true, journalError: null };

    case 'JOURNAL_ERROR':
      return { ...state, journalReady: false, journalError: action.payload };

    case 'LOCATION_UPDATE':
      return { ...state, currentSystem: action.payload };

    case 'SHIP_UPDATE':
      return { ...state, currentShip: action.payload };

    case 'ADD_WAYPOINT':
      return { ...state, waypoints: [...state.waypoints, action.payload] };

    case 'REMOVE_WAYPOINT':
      return {
        ...state,
        waypoints: state.waypoints.filter(w => w.id !== action.payload),
      };

    case 'REORDER_WAYPOINTS':
      const { fromIndex, toIndex } = action.payload;
      const updated = [...state.waypoints];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return { ...state, waypoints: updated };

    case 'CLEAR_WAYPOINTS':
      return { ...state, waypoints: [], legs: [], totalDistance: 0, totalJumps: 0 };

    case 'UPDATE_ROUTE':
      return {
        ...state,
        legs: action.payload.legs,
        totalDistance: action.payload.totalDistance,
        totalJumps: action.payload.totalJumps,
      };

    default:
      return state;
  }
}
