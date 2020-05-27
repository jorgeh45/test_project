import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import {Config}  from  './../config/config';

@Injectable()
export class AppHttpService {
 

  constructor(private http: Http) { 
    // this.server = Config.server;
    
  }



  getHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    
    // TODO: add token

    return headers;
  }

  getRequestOptions(): RequestOptions {
    const options = new RequestOptions();
    options.headers = this.getHeaders();

    return options;
  }

  get(url: string) {
    let server_url = Config.server;
    return this.http.get(server_url+url, this.getRequestOptions());
  }

  post(url: string, data: any) {

    let server_url = Config.server;
    return this.http.post(server_url+url, data, this.getRequestOptions());
  }

  put(url: string, data: any) {

    let server_url = Config.server;
    return this.http.put(server_url+url, data, this.getRequestOptions());
  }

  delete(url: string) {

    let server_url = Config.server;
    return this.http.delete(server_url+url, this.getRequestOptions());
  }
}