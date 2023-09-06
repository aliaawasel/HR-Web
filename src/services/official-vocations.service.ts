import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfficialVocationsService {
baseUrl:string="https://localhost:7180/api/OfficialVocation"
  constructor(private http:HttpClient) {}
    GetAllVocations(){
      return this.http.get(`${this.baseUrl}/all`)
    }
    GetByid(id:number){
      return this.http.get(`${this.baseUrl}/ById/${id}`)
    }
    AddVocation(data:any){
      return this.http.post(`${this.baseUrl}/Insert`,data)
    }
    DeleteVocation(id:number){
      return this.http.delete(`${this.baseUrl}/Delete/${id}`)
    }
    UpdateVocation(data:any){
      return this.http.put(`${this.baseUrl}/Update`,data)
    }
    CheckName(id:any,name:any){
      return this.http.get(`${this.baseUrl}/ExistName?id=${id}&name=${name}`)
    }
    CheckDate(id:any,date:any){
      return this.http.get(`${this.baseUrl}/ExistDate?id=${id}&date=${date}`)
    }

}
