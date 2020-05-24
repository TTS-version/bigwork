import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
//////////////////////////////////////////////模态框组件
import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
  selector: 'app-student-component',
  templateUrl: './student-component.component.html',
  styleUrls: ['./student-component.component.css']
})
export class StudentComponentComponent implements OnInit {
  myForm: FormGroup;
  UserForm: FormGroup;
  userName: AbstractControl;
  id: AbstractControl;
  password: AbstractControl;
  users$: Observable<User>;
  baseUrl = 'http://127.0.0.1:8000/';
  currentUser: User;
 /////////////////////////////模态框组件
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  //-------------------------------------------用户

  constructor(private fb: FormBuilder, private httpClient: HttpClient ,private modalService: BsModalService) {
    this.myForm = this.fb.group({
      'userName': [''],
      'password': [''],
      'id': [''],

    });


    this.userName = this.myForm.controls['userName'];
    this.id = this.myForm.controls['id'];
    this.password = this.myForm.controls['password'];
  }

  ngOnInit(): void {
    this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users');

  }
  search() {
    if (this.id.value) {
      this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users/' + this.id.value);

    } else {
      this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users');
    }
  }

  chickuser() {

  }




  add() {
    console.log(this.myForm.value);

    if (!this.id.value || !this.password.value || !this.userName.value) {
      alert('数据不能为空')
      return 0;
    }
    else if(!this.password.value || !this.password.value || !this.userName.value){
      alert('必须选择用户');
    }

    if(this.password.value<=100&&this.password.value>=0)
    {

    

    this.httpClient.post(this.baseUrl + 'user', this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('添加成功');
          this.flashlist();
        }
      }
    )
  }
  else{
    alert('成绩范围有误');
  
  }

  }

  delete() {
    if (!this.currentUser) {
      alert('必须选择用户');
    }
    else {
      this.httpClient.delete(this.baseUrl + 'user/' + this.currentUser.id).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('删除成功')
            this.flashlist();

          }
        }
      )

    }

  }

  select(u: User) {
    this.currentUser = u;
    this.myForm.setValue(this.currentUser);
  }

  update() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    }
    else {
      this.httpClient.put(this.baseUrl + 'user/',
        this.myForm.value).subscribe(
          (val: any) => {
            if (val.succ) {
              alert('修改成功!');
              this.flashlist();
            }
          }
        )
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

 flashlist(): void{
  this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users');
  try
     {
         this.myForm.controls['id'].reset();
         this.myForm.controls['userName'].reset();
         this.myForm.controls['password'].reset();
     } catch (error)
     {
       console.log(error);
     }
 }

 


}
