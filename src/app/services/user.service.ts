import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLink = "http://localhost:3000/users";
  constructor(private http: HttpClient) { }

  getUsers(){
    const res = this.http.get(this.userLink);
    return res;
  }


 
}
