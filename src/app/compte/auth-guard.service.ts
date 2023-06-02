import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CompteService } from './compte.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public auth: CompteService, public router: Router) { }

  canActivate() {
    if (localStorage.getItem("Role") === null) {

      this.router.navigate(['./compte']);
      return false;

    }
    if ((localStorage.getItem("Role") === "Admin")) {
      return true;
    } else {
      this.router.navigate(['./compte']);
      /* window.alert("u cant go there")  ;
       console.log(localStorage.getItem("role"));*/
      return false;

    }
  }
}
