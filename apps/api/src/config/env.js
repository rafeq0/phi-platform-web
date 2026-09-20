import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
dotenv.config({ path: new URL('../../../../.env', import.meta.url) });

const required = ['DATABASE_URL', 'JWT_SECRET'];
for (const key of required) if (!process.env[key]) throw new Error(`Missing required environment variable: ${key}`);

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: new TextEncoder().encode(process.env.JWT_SECRET),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  uploadsDir: process.env.UPLOADS_DIR || fileURLToPath(new URL('../../../../storage/uploads', import.meta.url))
};
