import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from '../config/api-constants';

@Injectable()
export class APIService {

  constructor(private httpClient: HttpClient) { }

  protected apiGet<T>(path: string, params: HttpParams = null, hasToken: boolean = true): Observable<T> {
    // set url
    const url = this.appendUrl(path);

    // set header
    let headers = new HttpHeaders();
    headers = headers.set(ApiConstants.HEADER_ACCEPT, ApiConstants.HEADER_JSON);

    if (hasToken) {
      headers = this.appendAuthorizationHeader(headers);
    }

    // return http client
    return this.httpClient.get<T>(url, {
      headers: headers,
      params: params
    });
  }

  protected apiPost<T>(path: string, body: any = null, params: HttpParams = null, hasToken: boolean = true): Observable<T> {
    // set url
    const url = this.appendUrl(path);

    // set header
    let headers = new HttpHeaders();
    headers = headers.set(ApiConstants.HEADER_ACCEPT, ApiConstants.HEADER_JSON);
    
    if (hasToken) {
      headers = this.appendAuthorizationHeader(headers);
    }
    // return http client
    return this.httpClient.post<T>(url, body, {
      params: params,
      headers: headers
    });
  }

  private appendUrl(path: string) {
    if (path.startsWith('/')) {
      return `${ApiConstants.URL}${path}`;
    }
    return `${ApiConstants.URL}/${path}`;
  }

  private appendAuthorizationHeader(headers: HttpHeaders) {
    //let token = localStorage.getItem('token');
    let token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNhYmVhMjNkYWM3NmU4YTJjOTllYjE5MjFmZGVjMjVjNTY2OTY1MGM3ZjA3YzM5MzhkZjQxNTYwZjdiMmJiMmZiNDA4Yjc5MWM4ODkzMzA5In0.eyJhdWQiOiIzIiwianRpIjoiM2FiZWEyM2RhYzc2ZThhMmM5OWViMTkyMWZkZWMyNWM1NjY5NjUwYzdmMDdjMzkzOGRmNDE1NjBmN2IyYmIyZmI0MDhiNzkxYzg4OTMzMDkiLCJpYXQiOjE1MzkyNzAxOTMsIm5iZiI6MTUzOTI3MDE5MywiZXhwIjoxNTcwODA2MTkzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Yqb5ILo6ElWoTpAMt5H0zcuAm96jyEAiCIMkd2YTBS7MiN1jLFzqe8cs12SDzcCKrWJ0BgMz-friC1QVI8NX3_kwcUeiosTAv45RWMdd68C4i6rJhyvxRUn5iMwOfbLRK0lDLw8n9nHeTNpCEfp52im_3OTT7int9_6cgFkN9lsu3z80QRLEe7u88yiihkutr00YpjHtuHAgbqJyh5ns2uJThoiEk0a3IyzD2Vv6vRNSJI6NXSzD-HLc0YtL5wAdXOh32KJag_LQqdDiN0DKh5Mh63A6qBdfuhNS11otlPCh0SJ8vLZoIe5bA4ugF4GO9UFETpFXI4X2m-nsJQcxze_7Dbfe8leii1zMM4dTmrcRbRNYG1AYFqD1if1oWapfsXi_j3ZjxQjPshTycgS83R9RX8_R5kmKeRHqjKrn4pkvWld4TqQ_wpxaWx0CZ_9IW31AnolcoYHmM9pwmaAR3sz-JIswmzaC_7vJwCQgQZO9FhtblckEd0-PvOEeTqkPBNT6fqW_TK9vQacDoK9ipWNbfvkLWdCy0xxLR9uoVeSDiyU1L9vMt4Wz3kaHhDSlVovqrBe03tpig4bIjg0OgdaoeIBwy5xFjKWH9aeyB1Q1bMkNxJx15t9PhxoUInvhlkeOEC1ejJ8YeAWeoqq4__N3Mv6S1yP1OSHGR68bFUg';
    if (token != null) {
      headers = headers.set(ApiConstants.HEADER_AUTH, token);
    }
    return headers;
  }

}
