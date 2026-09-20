import { z } from 'zod';
const optionalUrl = z.string().url().max(2048).optional().or(z.literal(''));
export const loginSchema = z.object({ email: z.string().email().max(254), password: z.string().min(1).max(200) });
export const passwordSchema = z.object({ currentPassword: z.string().min(1), newPassword: z.string().min(12).max(200) });
export const projectSchema = z.object({ name: z.string().trim().min(1).max(160), description: z.string().trim().min(1).max(5000), demoUrl: optionalUrl, githubUrl: optionalUrl, technologies: z.array(z.string().trim().min(1).max(80)).max(30), category: z.string().trim().min(1).max(80), isPublished: z.boolean(), displayOrder: z.number().int().min(0).max(10000).default(0) });
export const serviceSchema = z.object({ name: z.string().trim().min(1).max(160), description: z.string().trim().min(1).max(5000), category: z.string().trim().min(1).max(80), icon: z.string().trim().max(80).optional().nullable(), features: z.array(z.string().trim().min(1).max(160)).max(20), displayOrder: z.number().int().min(0).max(10000).default(0) });
export const requestSchema = z.object({ name: z.string().trim().min(1).max(160), email: z.string().email().max(254), phone: z.string().trim().max(50).optional().or(z.literal('')), service: z.string().trim().min(1).max(120), message: z.string().trim().min(1).max(10000), budget: z.string().trim().max(80).optional().or(z.literal('')) });
export const requestStatusSchema = z.object({ status: z.enum(['new', 'in_progress', 'completed', 'archived']) });
