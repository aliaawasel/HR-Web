import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  constructor(private UserService:UserService) {}

  ngOnInit(): void {}
  UserForm=new FormGroup({
    UserName:new FormControl('',[Validators.required]),
    FullName:new FormControl('',[Validators.required]),
    Password:new FormControl('',[Validators.required]),
    Email:new FormControl('',[Validators.required]),
    Groups:new FormControl('',[Validators.required])
  })

  AddUser(){
    const user={
      username:this.UserForm.value.UserName,
      fullName:this.UserForm.value.FullName,
      password:this.UserForm.value.Password,
      email:this.UserForm.value.UserName,
      groupId:this.UserForm.value.Groups
    }
    console.log(user)
    this.UserService.AddUser(user).subscribe(()=>{
      this.ngOnInit();
      this.UserForm.reset();
    })
  }
  
}
