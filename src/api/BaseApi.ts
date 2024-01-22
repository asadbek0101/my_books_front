import qs from "qs";
import { pathParams } from "../utils/PathParams";
import ky, { Hooks, Options as KYOptions, ResponsePromise } from "ky";

import { toCamelCase } from "../utils/CaseUtils";
import { AppError, AppErrorProps } from "../helpers/AppError";

export interface ApiProps {
  readonly my_key?: string;
  readonly logout?: () => void;
  readonly secret?: string;
  readonly host?: string;
}

export interface Options extends KYOptions {
  readonly query?: object;
  readonly params?: object;
}

export class BaseApi {
  private readonly host?: string;
  private readonly my_key?: string;
  private readonly secret?: string;
  private readonly logout?: () => void;

  constructor({ secret, my_key, host }: ApiProps) {
    this.my_key = my_key;
    this.secret = secret;
    this.host = host;
  }

  private queryToString(query = {}): string {
    return qs.stringify(query);
  }

  private createRequestUrl(url: string, query = {}, params = {}): string {
    const formattedUrl = pathParams(url, params);

    return [formattedUrl, this.queryToString(query)].filter(Boolean).join("?");
  }

  private createRequestOptions(options: KYOptions): KYOptions {
    const { hooks = {} as Hooks, headers: optionHeaders = [] as any } = options;

    const headers = new Headers(optionHeaders);

    headers.set("sign", "a04dfc0a2cad6d0665aedc00dcd29698");

    if (this.my_key) {
      headers.set("my_key", this.my_key);
    }

    if (this.secret) {
      headers.set("secret", this.secret);
    }

    return {
      timeout: 120000,
      prefixUrl: this.host,
      ...options,
      headers: [...(headers as any), ...optionHeaders],
      hooks: {
        ...hooks,
        beforeRequest: [...(hooks?.beforeRequest || [])],
        afterResponse: [
          ...(hooks?.afterResponse || []),
          async (_, __, response) => {
            if (
              (response.status === 403 || response.status === 401) &&
              this.logout
            ) {
              this.logout();
            }
          },
        ],
      },
    };
  }

  private request(url: string, options: Options = {}): ResponsePromise {
    const { query, params, ...kyOptions } = options;

    const formattedOptions = this.createRequestOptions(kyOptions);
    const formattedUrl = this.createRequestUrl(url, query, params);

    return ky(formattedUrl, formattedOptions);
  }

  private jsonRequest<TData>(url: string, options?: Options): Promise<TData> {
    return new Promise<TData>((resolve, reject) => {
      this.request(url, options)
        .then((response) => {
          if (response.ok) {
            return response.json().then((data: any) => {
              if (data.success && data.data) {
                return data.data;
              } else if (data) {
                return data;
              } else {
                return this.parseError(data);
              }
            });
          }

          return response
            .json()
            .then((data: any) => this.parseError(data))
            .then((error) => {
              throw error;
            });
        })
        .then(resolve)
        .catch((error) => {
          if (error instanceof AppError) {
            reject(error);
          } else if (error?.response?.json) {
            error?.response
              ?.json()
              .then((data: Response) => reject(this.parseError(data)));
          } else if (error) {
            reject(
              this.parseError({
                statusText: error.message,
                errors: [{ userMsg: error.message }],
              } as any)
            );
          } else {
            reject(
              this.parseError({
                statusText: "Unknown",
                errors: [{ userMsg: "Unknown" }],
              } as any)
            );
          }
        });
    });
  }

  private parseError(response: Response): AppError {
    const error = new Error(response.statusText) as AppErrorProps;

    error.status = response?.status;
    // @ts-ignore
    error.data = toCamelCase(response?.errors || []);

    return new AppError(error);
  }

  public get<TData = any>(url: string, options?: Options): Promise<TData> {
    return this.jsonRequest(url, { ...options, method: "get" });
  }

  protected post<TData = any>(url: string, options?: Options): Promise<TData> {
    return this.jsonRequest(url, { ...options, method: "post" });
  }

  protected put<TData = any>(url: string, options?: Options): Promise<TData> {
    return this.jsonRequest(url, { ...options, method: "put" });
  }

  protected patch<TData = any>(url: string, options?: Options): Promise<TData> {
    return this.jsonRequest(url, { ...options, method: "patch" });
  }

  protected delete<TData = any>(
    url: string,
    options?: Options
  ): Promise<TData> {
    return this.jsonRequest(url, { ...options, method: "delete" });
  }
}
