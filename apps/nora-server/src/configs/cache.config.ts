import { Inject } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export const cacheConfig = registerAs('cache', () => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  username: process.env.REDIS_USERNAME || 'default',
  password: process.env.REDIS_PASSWORD || undefined,
}));

export const CacheConfig = Inject(cacheConfig.KEY);

export type ICacheConfig = ReturnType<typeof cacheConfig>;
