export function notFound(_req, res) { res.status(404).json({ message: 'Resource not found' }); }
export function errorHandler(error, _req, res, _next) {
  if (error.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ message: 'File exceeds the allowed size' });
  if (error.name === 'MulterError') return res.status(400).json({ message: error.message });
  if (error.name === 'ZodError') return res.status(422).json({ message: 'Invalid input', errors: error.flatten() });
  console.error(error);
  res.status(500).json({ message: 'An unexpected server error occurred' });
}
