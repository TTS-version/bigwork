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
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {
  myForm: FormGroup;
  UserForm: FormGroup;
  userName: AbstractControl;
  password: AbstractControl;
  users$: Observable<User>;
  baseUrl = 'http://127.0.0.1:8000/';
  currentUser: User;
  /////////////////////////////模态框组件
  modalRef: BsModalRef;

  constructor(private fb: FormBuilder, private httpClient: HttpClient,private modalService: BsModalService) {
    this.myForm = this.fb.group({
      'userName': [''],
      'password': ['']
    });


    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
  }

  ngOnInit(): void {
    this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'login');

  }
  search() {
    if (this.userName.value) {
      this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'login/' + this.userName.value);
      console.log(this.userName.value);


    } else {
      this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'login');
    }
  }

  chickuser() {

  }




  add() {
    console.log(this.myForm.value);

    if (!this.password.value || !this.password.value || !this.userName.value) {
      alert('数据不能为空')
      return 0;
    }



    this.httpClient.post(this.baseUrl + 'login', this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('添加成功');
          this.flashlist();
          this.ngOnInit();
        }
      }
    )

  }

  delete() {
    if (!this.currentUser) {
      alert('必须选择用户');
    }
    else if(!this.password.value || !this.password.value || !this.userName.value){
      alert('必须选择用户');
    }
    else {
      this.httpClient.delete(this.baseUrl + 'login/' + this.currentUser.userName).subscribe(
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
    console.log(this.currentUser);
  }

  update() {
    
    
      this.httpClient.put(this.baseUrl + 'login/',
        this.myForm.value).subscribe(
          (val: any) => {
            if (val.succ) {
              alert('修改成功!');
              this.flashlist();
            }
          }
        )
    
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

 flashlist(){
  this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'login');
 }



}
