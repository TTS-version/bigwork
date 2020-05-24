import { CanActivate } from "@angular/router";
import { Authservice } from "./auth.service";
import { Injectable } from "@angular/core";


@Injectable()

export class LoginGuard implements CanActivate {
    constructor(private Authservice: Authservice) {

    }


    canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        console.log(route);
        if (!this.Authservice.LoggedIn()) {
            alert("请先登录");
        }
        return this.Authservice.LoggedIn();
    }

}