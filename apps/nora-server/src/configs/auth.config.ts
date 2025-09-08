import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const authConfig = registerAs('auth', () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '10m',
  },
}));

export const AuthConfig = Inject(authConfig.KEY);

export type IAuthConfig = ConfigType<typeof authConfig>;
