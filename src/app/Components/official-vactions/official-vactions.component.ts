import { SalaryService } from './../../../services/salary.service';
import { OfficialVocationsService } from './../../../services/official-vocations.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-official-vactions',
  templateUrl: './official-vactions.component.html',
  styleUrls: ['./official-vactions.component.css']
})
export class OfficialVactionsComponent implements OnInit{

  constructor(private OfficialVocationsService: OfficialVocationsService) {
  }

  Vocations:any
  isEdited:boolean=false
  AddedBefore:boolean=false
  selectedID:any
  ngOnInit(){
    this.GetAllVocations();
  }

  vocationForm=new FormGroup({
    vocationName: new FormControl('',[Validators.required]),
    vocationDate: new FormControl('',[Validators.required]),
  })
  get vocationName(){
    return this.vocationForm.controls['vocationName']
  }
  get vocationDate(){
    return this.vocationForm.controls['vocationDate']
  }
  GetAllVocations(){
    this.OfficialVocationsService.GetAllVocations().subscribe((result:any)=>{
      this.Vocations=result
    })
  }

  DeleteVocation(){
    this.OfficialVocationsService.DeleteVocation(this.selectedID).subscribe(()=>{
      this.ngOnInit();
    })
  }
  AddVocation(){
    const newVocation={
      name:this.vocationForm.value.vocationName,
      date:this.vocationForm.value.vocationDate
      }
      this.OfficialVocationsService.AddVocation(newVocation).subscribe((result:any)=>{
        this.ngOnInit();
        if (result != null) {
          const jsonString = JSON.stringify(result); // Convert object to JSON string
          const parsedData = JSON.parse(jsonString);
          if ((parsedData.message = 'AddedBefore')) {
            this.AddedBefore = true;
          }
        }
        if (result == null) {
          this.AddedBefore = false;
        }
      }
    );
      }

  SelectID(id:number){
    this.selectedID=id;
  }
  EditeVocation(id:number){
    this.isEdited=true;
    this.selectedID=id;
    this.OfficialVocationsService.GetByid(id).subscribe((result:any)=>{
      const vocation= result;
      this.vocationForm.patchValue({
        vocationName:vocation.name,
        vocationDate:vocation.date,
      })
    })
  }
  SaveEdite() {
    const vocation = {
      id:this.selectedID,
      name:this.vocationForm.value.vocationName,
      date:this.vocationForm.value.vocationDate
    };
    this.OfficialVocationsService.UpdateVocation(vocation).subscribe(() => {
      this.ngOnInit();
    });
    this.isEdited = false;
    this.back();
  }

  back(){
    this.vocationForm.reset();
    this.isEdited = false;

  }
    }
