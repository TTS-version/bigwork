import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';

import { Authservice} from '../auth.service';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {LoginUser} from './loginuser';
import {Router} from'@angular/router';



function userNameValidator(control:FormControl):{[s:string]:boolean}{
  if(!control.value.match(/^a/))
  return{invalidUser:true}
}

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  myForm: FormGroup;
  userName: AbstractControl;
  password: AbstractControl;
  name$:Observable<string>;
  LoginUser$:Observable<LoginUser>;
  baseUrl = 'http://127.0.0.1:8000/';

  constructor(private fb:FormBuilder,private authservice:Authservice,private httpClient: HttpClient,private router:Router) { 
    this.myForm =this.fb.group(
      { 
        'userName': ['sss',Validators.compose([Validators.required,userNameValidator])],
        'password': ['',Validators.compose([Validators.required,Validators.minLength(5)])]
      }
          );
          this.userName =this.myForm.controls['userName'];
          this.password=this.myForm.controls['password'];
          this.name$=this.userName.valueChanges;
          this.userName.valueChanges.subscribe(val=>{console.log(val)});



  }

  ngOnInit(): void {
  }
  onSubmit(value:any){
    console.log(value); 
   }

   login():void{
    
    console.log(this.myForm.value);
    
    
    this.httpClient.post(this.baseUrl+'loginconfirm',this.myForm.value).subscribe(
      
      (val)=>
      {
        if(this.authservice.login(val)){
          this.router.navigate(['/management']);
        }
        
      }
    )
    
  }
  
  
}

