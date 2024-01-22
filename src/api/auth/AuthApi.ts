import { BaseApi } from "../BaseApi";
import { LoginProps, RegisterProps } from "./AuthDto";

export class AuthApi extends BaseApi {
  public Register(json: RegisterProps) {
    return this.post("Register", {
      json,
    });
  }

  public Login(json: LoginProps) {
    console.log(json)
    return this.post("Login", {
      json,
    });
  }
}
