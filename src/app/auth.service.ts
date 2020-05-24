import { Injectable} from "@angular/core";


@Injectable()
export class Authservice{
    isLoggedIn =false; //默认为false
    暂时注释
    login(val:any):boolean{
        if(val=="true"){
            this.isLoggedIn=true;
            alert('登录成功');
            return true;

        }
        else
        {
            console.log("val="+val);
            
            this.logout();
            alert('用户名密码有误');
            return false;
        }
        
    }
    logout(){
        this.isLoggedIn=true;//默认为true
    }

    LoggedIn(){
        return this.isLoggedIn;
    }
}