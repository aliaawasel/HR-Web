import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralSettingsService {
  baseUrl:string="https://localhost:7180/api/GeneralSettings"
  constructor(private readonly http:HttpClient) { }
  GetSettings(id:number){
    return this.http.get(`${this.baseUrl}/${id}`)
  }
  UpdateSetting(data:any){
    return this.http.put(`${this.baseUrl}/Update`,data)
  }
  // DeleteSetting(id:number){
  //   return this.http.delete(`${this.baseUrl}/Delete/${id}`)
  // }
}
