export function notFound(_req, _res, next) {
  next({ statusCode: 404, message: 'Route not found' });
}
