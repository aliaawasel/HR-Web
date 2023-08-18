import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceReportService {
baseUrl:string="https://localhost:7180/api/Attendance"
//https://localhost:7180/api/Attendance/Update

  constructor(private http:HttpClient) {
  }
  GetAllAttendances(){
    return this.http.get(`${this.baseUrl}/all`)
  }
  GetAttendancById(id:number){
    return this.http.get(`${this.baseUrl}/${id}`)
  }
  AddAttendances(data:any){
    return this.http.post(`${this.baseUrl}/Insert`,data)  }
  DeleteAttendance(id:number){
    return this.http.delete(`${this.baseUrl}/Delete/${id}`)
  }
  Uploadfile(file:any){
    return this.http.post(`${this.baseUrl}/upload`,file)
  }
  GetByName(name:string){
    return this.http.get(`${this.baseUrl}/name?name=${name}`)
  }
  GetByDate(date1:string,date2:string){
    return this.http.get(`${this.baseUrl}/date?d1=${date1}&d2=${date2}`)
  }

  UpdateAttendance(data:any){
    return this.http.put(`${this.baseUrl}/Update`,data)
  }
}
