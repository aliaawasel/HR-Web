import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  baseUrl:string="https://localhost:7180/api/Department"

  constructor(private http:HttpClient) { }
  GetAllDepts(){
    return this.http.get(`${this.baseUrl}/all`)
  }
  GetByDept(DeptID:number){
    return this.http.get(`${this.baseUrl}/${DeptID}`)
  }
  InsertDept(data:any){
    return this.http.post(`${this.baseUrl}/Insert`,data)
  }
  DeleteDept(DeptID:number){
    return this.http.delete(`${this.baseUrl}/Delete/${DeptID}`)
  }
  EditDept(data:any){
    return this.http.put(`${this.baseUrl}/Update`,data)
  }
  CheckDept(id:any,name:any){
    return this.http.get(`${this.baseUrl}/DeptExist?id=${id}&name=${name}`)
  }


}
