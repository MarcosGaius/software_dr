import { registerAs } from '@nestjs/config';
import { AuthConfig } from './config.type';

export default registerAs<AuthConfig>('auth', () => {
  return {
    secret: '',
    refreshSecret: '',
    expires: '',
    refreshExpires: '',
  };
});
