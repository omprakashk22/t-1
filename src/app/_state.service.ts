import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class StateService {

  private User_Url = "https://jsonplaceholder.typicode.com/users";
  private Todo_Url = "https://jsonplaceholder.typicode.com/todos";

  constructor(private http: HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get(this.User_Url);
  }

  getTodo(){
    return this.http.get(this.Todo_Url);
  }
}
