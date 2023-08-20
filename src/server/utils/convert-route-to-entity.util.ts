const mapping: Record<string, string> = {
  bookings: 'booking',
  platforms: 'platform',
  routes: 'route',
  transactions: 'transaction',
  trucks: 'truck',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
