import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  link = "http://api.weatherapi.com/v1/current.json?key=077ba26a07dd47f1bbc223702212304&q=";
  restLink="&aqi=no";

  zhlink="http://api.weatherapi.com/v1/timezone.json?key=077ba26a07dd47f1bbc223702212304&q=";
  constructor(private http: HttpClient) { }

  getCountries(pais: string){
    const res = this.http.get(this.link+pais+this.restLink);
    return res;
  }

  getZH(zone: string){
    const res =this.http.get(this.zhlink+zone);
    return res;
  }
}
