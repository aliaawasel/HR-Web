import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl:string="https://localhost:7180/api/User"
  constructor(private http:HttpClient) { }
  GetAllUsers(){
    return this.http.get(`${this.baseUrl}/all`)
    }
    GetById(id:number){
      return this.http.get(`${this.baseUrl}/GetById/${id}`)
      }
  AddUser(data:any){
    return this.http.post(`${this.baseUrl}/insert`,data)
  }
  DeleteUSer(id:number){
    return this.http.delete(`${this.baseUrl}/delete/${id}`)
  }
  UpdateUser(data:any){
    return this.http.put(`${this.baseUrl}/Update`,data)
  }
  GetGroups(){
    return this.http.get("https://localhost:7180/api/Group/all")
  }
}
