import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})


export class UsersComponent implements OnInit{


  constructor(private UserService:UserService) {}
  Users:any
  isEdited:boolean=false
  selectedID:any
  groups:any
  AddedBefore:boolean=false
  Addedonce:boolean=false

  ngOnInit(): void {
    this.GetAllUsers();
    this.getGroups();
  }

  formHandler(e:any){

  }

  UserForm=new FormGroup({
    UserName:new FormControl('',[Validators.required,Validators.minLength(3)]),
    FullName:new FormControl('',[Validators.required,Validators.minLength(5)]),
    Password:new FormControl('',[Validators.required,Validators.minLength(8)]),
    Email:new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    Groups:new FormControl('',[Validators.required])
  })

  get UserName(){
    return this.UserForm.controls['UserName'];
  }
  get FullName() {
    return this.UserForm.controls['FullName'];
  }
  get Password() {
    return this.UserForm.controls['Password'];
  }
  get Email() {
    return this.UserForm.controls['Email'];
  }
  get Groups() {
    return this.UserForm.controls['Groups'];
  }

  GetAllUsers(){
    this.UserService.GetAllUsers().subscribe((result)=>{
    this.Users=result;
    }
    )
  }
  AddUser(){
    this.isEdited=false;
    const user={
      username:this.UserForm.value.UserName,
      fullName:this.UserForm.value.FullName,
      password:this.UserForm.value.Password,
      email:this.UserForm.value.Email,
      groupId:this.UserForm.value.Groups
    }
    console.log(user)
    this.UserService.AddUser(user).subscribe(()=>{
      this.ngOnInit();
      this.UserForm.reset();
    })
  }
  DeleteUser(){
    this.UserService.DeleteUSer(this.selectedID).subscribe(()=>{
    this.ngOnInit();
  }
    )
  }
  UpdateUSer(id:string){
    this.isEdited=true;
    this.selectedID=id;
    this.UserService.GetById(id).subscribe((result:any)=>{
      const User= result;
      this.UserForm.patchValue({
        UserName:User.username,
        FullName:User.fullName,
        Password:User.password,
        Email:User.email,
        Groups:User.groupID
      })
      console.log(this.selectedID)
    })
  }
    getGroups(){
      this.UserService.GetGroups().subscribe((result:any)=>{
        this.groups=result
      })
    }

  SaveEdite(){
    const user={
      id:this.selectedID,
      username:this.UserForm.value.UserName,
      fullName:this.UserForm.value.FullName,
      password:this.UserForm.value.Password,
      email:this.UserForm.value.Email,
      groupID:this.UserForm.value.Groups
    }
    console.log(user)
    this.UserService.UpdateUser(user).subscribe(()=>{
      this.ngOnInit();
    })
    this.UserForm.reset();
    this.isEdited=false;

  }
  back(){
    this.UserForm.reset();
    this.isEdited=false;
    this.AddedBefore=false;
  }
  SelectID(id:string){
    this.selectedID=id;
  }
checkFounding(username:any){
  this.UserService.CheckFound(username).subscribe((result:any)=>{
    if (result != null) {
      const jsonString = JSON.stringify(result); // Convert object to JSON string
      const parsedData = JSON.parse(jsonString);
      if ((parsedData.message = 'Found')) {
        this.AddedBefore = true;
      }
    }
    if (result == null) {
      this.AddedBefore = false;
    }
  })
}

checkMail(mail:any){
  this.UserService.CheckEmail(mail).subscribe((result:any)=>{
    if (result != null) {
      const jsonString = JSON.stringify(result); // Convert object to JSON string
      const parsedData = JSON.parse(jsonString);
      if ((parsedData.message = 'Found')) {
        this.Addedonce = true;
      }
    }
    if (result == null) {
      this.Addedonce = false;
    }
  })
}


myFunction(){
  var x = document.getElementById("myInput") as HTMLInputElement;
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
}
