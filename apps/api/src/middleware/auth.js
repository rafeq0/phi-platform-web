import { jwtVerify } from 'jose';
import { env } from '../config/env.js';

export async function requireAdmin(req, res, next) {
  try {
    const token = req.cookies.phi_admin_token || req.headers.authorization?.replace(/^Bearer\s+/i, '');
    if (!token) return res.status(401).json({ message: 'Authentication required' });
    const { payload } = await jwtVerify(token, env.jwtSecret);
    if (payload.role !== 'admin') return res.status(403).json({ message: 'Administrator access required' });
    req.user = payload;
    next();
  } catch { res.status(401).json({ message: 'Invalid or expired session' }); }
}
