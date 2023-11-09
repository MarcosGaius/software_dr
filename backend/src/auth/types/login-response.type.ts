import { User } from 'src/user/entity/user.entity';

export type LoginResponseType = Readonly<{
  token: string;
  refreshToken: string;
  tokenExpires: string;
  user: User;
}>;
