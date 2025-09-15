import { Provider } from '@nestjs/common';
import { CacheService } from './cache.service';
import Redis from 'ioredis';
import { cacheConfig, ICacheConfig } from '../configs/cache.config';

export const CacheProvider: Provider = {
  provide: CacheService,
  inject: [cacheConfig.KEY],
  useFactory: (cacheConfig: ICacheConfig) => {
    const redisInstance = new Redis({
      username: cacheConfig.username,
      password: cacheConfig.password,
      host: cacheConfig.host,
      port: cacheConfig.port,
    });

    return new CacheService(redisInstance);
  },
};
