export interface LoginProps {
  readonly username: string;
  readonly password: string;
}

export interface RegisterProps {
  readonly username: string;
  readonly password: string;
  readonly confirmPassword: string;
}
