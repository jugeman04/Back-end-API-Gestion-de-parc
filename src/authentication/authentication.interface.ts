import { IUser } from '../user/user.interface';

export interface IAuthenticationResponse {
  user: { id: number; username: string; email: string };
  token: string;
}
