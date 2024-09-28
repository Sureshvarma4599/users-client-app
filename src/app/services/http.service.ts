// src/app/http/http.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  // Example GET request method
  getApi<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
  }

  createUser(payload:any){
    return this.http.post(this.baseUrl+environment.routes.createUser,payload)
  }

  getUser(){
    return this.http.get(this.baseUrl+environment.routes.getUsersList)
  }

  createRole(payload:any){
    return this.http.post(this.baseUrl+environment.routes.createRole,payload)
  }

  getRole(){
    return this.http.get(this.baseUrl+environment.routes.getRolesList)
  }

  assignRolesToUsers(body:any){
    return this.http.post(this.baseUrl+environment.routes.assignRolesToUsers,body)
  }
  getMappingData(){
    return this.http.get(this.baseUrl+environment.routes.swapMapping)
  }
}
