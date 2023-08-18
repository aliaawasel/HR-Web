import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
baseUrl:string="https://localhost:7180/api/SalaryReport"
  constructor(private http:HttpClient) {}
GetAllSalaries(month:number,year:number){
  return this.http.get(`${this.baseUrl}/${month},${year}`)
}
//https://localhost:7180/api/SalaryReport/ByName/8,2023/%D8%A7%D9%84%D8%A7%D8%A1
getByNAme(month:number,year:number, name:any){
  return this.http.get(`${this.baseUrl}/ByName/${month},${year}/${name}`)
}
}
