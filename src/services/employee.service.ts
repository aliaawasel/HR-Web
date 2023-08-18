import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl:string="https://localhost:7180/api/Employee"
  constructor(private http:HttpClient) { }
  GetAllEmps(){
    return this.http.get(`${this.baseUrl}/all`)
  }
  GetEmpByID(id:number){
    return this.http.get(`${this.baseUrl}/GetById/${id}`)
  }
  AddEmp(data:any){
    return this.http.post(`${this.baseUrl}/Insert`,data)
  }
  DeleteEmp(EmpId:number){
    return this.http.delete(`${this.baseUrl}/${EmpId}`)
  }
  GetEmpByDept(DeptID:Number){
    return this.http.get(`${this.baseUrl}/ByDepartment/${DeptID}`)
  }
  EditEmp(data:any){
    return this.http.put(`${this.baseUrl}/Update`,data)
  }

}
