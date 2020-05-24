import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ManagementComponentComponent } from './management-component/management-component.component';
import { Routes, RouterModule} from '@angular/router';
import{LoginGuard} from './login.guard';
import { Authservice } from './auth.service';
import { StudentComponentComponent } from './student-component/student-component.component';
import { UserComponentComponent } from './user-component/user-component.component';
import {ModalModule} from 'ngx-bootstrap/modal';



// 设置管理页面的子路由
const mgtChildrenRoutes: Routes = [
  { path: 'student', component: StudentComponentComponent },
  { path: 'user', component: UserComponentComponent },
  { path: '', redirectTo: 'user', pathMatch: 'full' }
];


// 设置路由表
const routes: Routes = [
  { path: 'home', component: HomeComponentComponent },
  { path: '', redirectTo: 'home' , pathMatch: 'full'},
  { path: 'login', component: LoginComponentComponent },
  { path: 'management', component: ManagementComponentComponent, children :mgtChildrenRoutes ,
 canActivate:[LoginGuard]

}
  ];

  

  

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    LoginComponentComponent,
    ManagementComponentComponent,
    StudentComponentComponent,
    UserComponentComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    ModalModule.forRoot()
  ],
  providers: [LoginGuard,Authservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
