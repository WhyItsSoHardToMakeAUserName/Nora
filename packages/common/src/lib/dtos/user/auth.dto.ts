export class LoginDto {
  email!: string;
  password!: string;
}

export class RegisterDto extends LoginDto {
  name!: string;
  otp!: string;
}

export interface JwtPayload {
  email: string;
  name: string;
}
