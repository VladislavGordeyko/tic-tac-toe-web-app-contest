
import { IApi, IApiResponse } from '../services/models';


export class Api implements IApi {
  private static _instance: Api;

  private constructor() { }

  public static getInstance() {
    return this._instance || (this._instance = new this());
  }

  public async get(uri: string): Promise<IApiResponse<unknown>> {
    const headers:{ [key:string]:string } = {
      'Content-Type': 'application/json',
    };
    const result = await fetch(uri, {
      method: 'GET',
      headers: headers,
    });

    if (!result.ok) {
      throw new Error(result.statusText);
    }
   
    return result.json();
  }

  public async post(uri: string, body?: unknown): Promise<IApiResponse<any>> {
    const result = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
        
    if (!result.ok) {
      throw new Error(result.statusText);
    }

    return result.json();
  }
}