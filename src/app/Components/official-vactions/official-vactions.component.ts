import { SalaryService } from './../../../services/salary.service';
import { OfficialVocationsService } from './../../../services/official-vocations.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-official-vactions',
  templateUrl: './official-vactions.component.html',
  styleUrls: ['./official-vactions.component.css'],
})
export class OfficialVactionsComponent implements OnInit {
  constructor(private OfficialVocationsService: OfficialVocationsService) {}

  Vocations: any;
  isEdited: boolean = false;
  selectedID: any;
  nameExist: boolean = false;
  DateExist: boolean = false;
  ngOnInit() {
    this.GetAllVocations();
    this.selectedID=0;
  }

  vocationForm = new FormGroup({
    vocationName: new FormControl('', [Validators.required]),
    vocationDate: new FormControl('', [Validators.required]),
  });
  get vocationName() {
    return this.vocationForm.controls['vocationName'];
  }
  get vocationDate() {
    return this.vocationForm.controls['vocationDate'];
  }
  GetAllVocations() {
    this.OfficialVocationsService.GetAllVocations().subscribe((result: any) => {
      this.Vocations = result;
    });
  }

  DeleteVocation() {
    this.OfficialVocationsService.DeleteVocation(this.selectedID).subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }
  AddVocation() {
    const newVocation = {
      name: this.vocationForm.value.vocationName,
      date: this.vocationForm.value.vocationDate,
    };
    this.OfficialVocationsService.AddVocation(newVocation).subscribe(()=>{
      this.ngOnInit();
      this.back();
    })
  }

  SelectID(id: number) {
    this.selectedID = id;
  }
  EditeVocation(id: number) {
    this.isEdited = true;
    this.selectedID = id;
    this.OfficialVocationsService.GetByid(id).subscribe((result: any) => {
      const vocation = result;
      this.vocationForm.patchValue({
        vocationName: vocation.name,
        vocationDate:vocation.date,
      }
      );

    });
  }
  SaveEdite() {
    const vocation = {
      id: this.selectedID,
      name: this.vocationForm.value.vocationName,
      date: this.vocationForm.value.vocationDate,
    };
    this.OfficialVocationsService.UpdateVocation(vocation).subscribe(() => {
    this.ngOnInit();
    this.back();
  })
}

  back() {
    this.vocationForm.reset();
    this.isEdited = false;
    this.nameExist=false;
    this.DateExist=false;
    this.selectedID=0;
  }

  checkNameExist(name:string) {
    this.OfficialVocationsService.CheckName(this.selectedID,name).subscribe((result: any) => {
      if (result != null) {
        const jsonString = JSON.stringify(result); // Convert object to JSON string
        const parsedData = JSON.parse(jsonString);
        console.log(parsedData.message);
        if ((parsedData.message = 'NameExist')) {
          this.nameExist = true;
        }
      }
      if (result == null) {
        this.nameExist = false;
      }
    });
  }
  checkDateExist(date:any) {
    this.OfficialVocationsService.CheckDate(this.selectedID,date).subscribe((result: any) => {
      if (result != null) {
        const jsonString = JSON.stringify(result); // Convert object to JSON string
        const parsedData = JSON.parse(jsonString);
        console.log(parsedData.message);
       if ((parsedData.message = 'DateExist')) {
          this.DateExist = true;
          console.log(this.DateExist);
        }
      }
      if (result == null) {
        this.DateExist = false;
        console.log(this.DateExist);
      }
    });
  }
}
