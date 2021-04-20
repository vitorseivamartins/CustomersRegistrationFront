import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ICustomer } from '../interfaces/ICustomer';

@Injectable({
  providedIn: 'root'
})
export class Service {
  
  private url: string = environment.urlCustomerApi; 

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<ICustomer[]>{

    return this.http.get<ICustomer[]>(this.url);
  }

  postCustomer(body: ICustomer): Observable<string>{
    return this.http.post<string>(this.url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
         })
    });
  }

  putCustomer(body: ICustomer): Observable<string>{
    return this.http.put<string>(this.url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
         })
    });
  }
}