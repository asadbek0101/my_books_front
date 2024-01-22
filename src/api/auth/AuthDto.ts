export interface LoginProps {
  readonly email: string;
  readonly password: string;
}

export interface RegisterProps {
  readonly email: string;
  readonly password: string;
  readonly confirmPassword: string;
}
