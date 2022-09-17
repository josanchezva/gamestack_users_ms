export class BaseUserDto {
  email: string;
  username: string;
  password: string;
  role: string;
  gamePreferences: string[];
  token: string;
}
