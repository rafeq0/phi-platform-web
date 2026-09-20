import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { query } from '../database/pool.js';
import { env } from '../config/env.js';
import { loginSchema, passwordSchema } from '../validation/schemas.js';

async function tokenFor(user) { return new SignJWT({ role: user.role, email: user.email }).setProtectedHeader({ alg: 'HS256' }).setSubject(user.id).setIssuedAt().setExpirationTime('8h').sign(env.jwtSecret); }
const cookieOptions = { httpOnly: true, sameSite: 'lax', secure: env.nodeEnv === 'production', maxAge: 8 * 60 * 60 * 1000, path: '/' };
export async function login(req, res) {
  const { email, password } = loginSchema.parse(req.body);
  const { rows: [user] } = await query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) return res.status(401).json({ message: 'Invalid email or password' });
  res.cookie('phi_admin_token', await tokenFor(user), cookieOptions).json({ user: { email: user.email, role: user.role } });
}
export function logout(_req, res) { res.clearCookie('phi_admin_token', { path: '/' }).status(204).end(); }
export async function me(req, res) { const { rows: [user] } = await query('SELECT email, role FROM users WHERE id = $1', [req.user.sub]); res.json({ user }); }
export async function changePassword(req, res) {
  const { currentPassword, newPassword } = passwordSchema.parse(req.body);
  const { rows: [user] } = await query('SELECT * FROM users WHERE id = $1', [req.user.sub]);
  if (!user || !(await bcrypt.compare(currentPassword, user.password_hash))) return res.status(400).json({ message: 'Current password is incorrect' });
  await query('UPDATE users SET password_hash=$1, updated_at=NOW() WHERE id=$2', [await bcrypt.hash(newPassword, 12), user.id]);
  res.status(204).end();
}
