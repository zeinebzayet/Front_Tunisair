import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { FormBuilder } from '@angular/forms';
import { User } from 'app/compte/compte.component';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;
  updateUser:User;
  constructor(private userService: UserService,private router: Router) { }
  ngOnInit(): void {
    this.userService.getUser(+localStorage.getItem("cin")).subscribe((data: User) => {
      console.log(data);
      this.user = data;
    });
  }

  public onUpdateProfile( user: User): void {
    this.userService.updateUser(+localStorage.getItem("cin"), user).subscribe(
      (response: User) => {
        console.log(response);
        this.showNotification('top','center');
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
      }


    );
  }

  showNotification(from, align){
  
    var message:String="null";
   
    
    message="Profil modifié avec succés !";

  
  
  
    const type = ['success'];
    $.notify({
        icon: "notifications",
        message: message
  
    },{
        type: type[0],
        timer: 10,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  
  }
  public onOpenModal(user:User,mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');


    if (mode === 'update') {
      this.updateUser=user;
      button.setAttribute('data-target', '#update');
    }


 

    container.appendChild(button);
    button.click();
  }

}
