import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { GeneralSettingsService } from './../../../services/general-settings.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.css'],
})
export class GeneralSettingsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private GeneralSettingsService: GeneralSettingsService
  ) {}
  settings: any;
  allowEdite: boolean = true;
  formHandler(e: any) {}

  ngOnInit(): void {
    // this.GetAllSettings();
    this.GetSetting();
  }


  SettingForm = this.fb.group({
    AddHour: new FormControl('', [Validators.required]),
    SubHour: new FormControl('', [Validators.required]),
    Vocation1: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    Vocation2: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
  });

  get AddHour() {
    return this.SettingForm.controls['AddHour'];
  }
  get SubHour() {
    return this.SettingForm.controls['SubHour'];
  }
  get Vocation1() {
    return this.SettingForm.controls['Vocation1'];
  }
  get Vocation2() {
    return this.SettingForm.controls['Vocation2'];
  }
  //  GetAllSettings(){
  //    this.GeneralSettingsService.GetAllSettings().subscribe((result)=>{
  //    this.settings=result;
  //    })
  //  }

  //  AddSetting(){
  //    const newSetting={
  //      add_hours:this.SettingForm.value.AddHour,
  //      sub_hours:this.SettingForm.value.SubHour,
  //      vacation1:this.SettingForm.value.Vocation1,
  //      vacation2:this.SettingForm.value.Vocation2,
  //    }
  //    this.GeneralSettingsService.AddSetting(newSetting).subscribe(()=>{
  //      this.ngOnInit();
  //      this.SettingForm.reset();
  //    })
  //  }

  //  DeleteSetting(id:number){
  //    this.GeneralSettingsService.DeleteSetting(id).subscribe(()=>{
  //      this.ngOnInit();
  //    })
  //  }
  GetSetting() {
    this.GeneralSettingsService.GetSettings(1).subscribe((result: any) => {
      const setting = result;
      this.SettingForm.patchValue({
        AddHour: setting.add_hours,
        SubHour: setting.sub_hours,
        Vocation1: setting.vacation1,
        Vocation2: setting.vacation2,
      });
      console.log(setting);
    });
  }
  saveUpdate() {
    const setting = {
      id: 1,
      add_hours: this.SettingForm.value.AddHour,
      sub_hours: this.SettingForm.value.SubHour,
      vacation1: this.SettingForm.value.Vocation1,
      vacation2: this.SettingForm.value.Vocation2,
    };
    this.GeneralSettingsService.UpdateSetting(setting).subscribe(() => {
      this.ngOnInit();
    });
  }

  openEdite() {
    this.allowEdite = false;
    this.SettingForm.controls.Vocation1.enable();
    this.SettingForm.controls.Vocation2.enable();
  }
  back() {
    this.SettingForm.reset();
  }
}
