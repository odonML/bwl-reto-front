import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  singLink = 'http://localhost:3000/login';
  regiLink = 'http://localhost:3000/register';
  horaLink = 'http://localhost:3000/act/';

  logger = false;
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  createUser(data: User) {
    const res = this.http.post(
      this.regiLink,
      JSON.stringify(data),
      this.httpOptions
    );
    if (res) {
      this.logger = true;
    }
    return res;
  }

  singIn(data: User) {
    const res = this.http.post(
      this.singLink,
      JSON.stringify(data),
      this.httpOptions
    );
    if (res) {
      this.logger = true;
    }
    return res;
  }

  updateHora(id: string, obj: Object){
    const res = this.http.put(this.horaLink+id,obj,this.httpOptions);
    return res;
  }

  isLogger(): boolean {
    return this.logger;
  }

  esEmailValido(email: string):boolean {
    let mailValido = false;
    var EMAIL_REGEX = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    
    if (EMAIL_REGEX.test(email)) {
      mailValido = true;
    }
    console.log(mailValido);
    return mailValido;
  }

  esPassValido(pass: string):boolean {
    let passValido = false;
    var EMAIL_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    
    if (EMAIL_REGEX.test(pass)) {
      passValido = true;
    }
    return passValido;
  }

  esNombreValido(name: string):boolean {
    let nameValido = false;
    var EMAIL_REGEX =/^[A-Za-z\s]{4,15}$/;
    
    if (EMAIL_REGEX.test(name)) {
      nameValido = true;
    }
    console.log(nameValido);
    return nameValido;
  }

  
}
