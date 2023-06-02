import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompteService } from './compte.service';
import { TokenStorageService } from './token-storage.service';
declare var $: any;
@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})


export class CompteComponent implements OnInit {

  form: any = {
    cin: null,
    username: null,
    email: null,
    password: null,
    tel: null
  };
  
  loginForm: FormGroup;
  errorMessage = '';
  isLoginFailed = false;

  isLoggedIn = false;
  roles: string[] = [];
  router: Router;


  constructor(private fb: FormBuilder,private authService: CompteService, private tokenStorage: TokenStorageService, router: Router) { 
    this.router = router;
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    let switchCtn = document.querySelector("#switch-cnt");
    let switchC1 = document.querySelector("#switch-c1");
    let switchC2 = document.querySelector("#switch-c2");
    let switchCircle = document.querySelectorAll(".switch__circle");
    let switchBtn = document.querySelectorAll(".switch-btn");
    let aContainer = document.querySelector("#a-container");
    let bContainer = document.querySelector("#b-container");
    let allButtons = document.querySelectorAll(".submit");

    let getButtons = (e) => e.preventDefault();

    let changeForm = (e) => {
      switchCtn.classList.add("is-gx");
      setTimeout(function () {
        switchCtn.classList.remove("is-gx");
      }, 1500);

      switchCtn.classList.toggle("is-txr");
      switchCircle[0].classList.toggle("is-txr");
      switchCircle[1].classList.toggle("is-txr");

      switchC1.classList.toggle("is-hidden");
      switchC2.classList.toggle("is-hidden");
      aContainer.classList.toggle("is-txl");
      bContainer.classList.toggle("is-txl");
      bContainer.classList.toggle("is-z200");
    };

    let mainF = (e) => {
      for (var i = 0; i < allButtons.length; i++)
        allButtons[i].addEventListener("click", getButtons);
      for (var i = 0; i < switchBtn.length; i++)
        switchBtn[i].addEventListener("click", changeForm);
    };

    window.addEventListener("load", mainF);


  }

  onSubmit(): void {
    const { cin, username, email, password, tel } = this.form;
    this.authService.register(cin, username, email, password, tel,'Admin').subscribe(
      data => {
        console.log(data);
        this.showNotification('top','center','register');
      },
      err => {
        this.errorMessage = err.error.message;
        console.log()
      }
    );
  }

  onSubmit2(){
    if (this.loginForm.invalid) {
      this.errorMessage = "Veuillez remplir tous les champs.";
      this.isLoginFailed = true;
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      data => {
          localStorage.setItem('Role', data.role);
          if (localStorage.getItem('Role') === 'Admin') {
            localStorage.setItem('cin', data.cin)
            this.router.navigate(['./dashboard']);
            this.showNotification('top','center','login');
          }
          console.log(data)
          console.log(data.principal.role)
        
      },
      err => {
        this.errorMessage = "Nom d'utilisateur et/ou Mot de passe sont incorrectes!";
        this.isLoginFailed = true;
        this.router.navigate(['./compte']);

      }
    );
  }



  showNotification(from, align, ch){
  
    var message:String="null";
   
    if(ch==="register"){
      message="votre compte a été crée avec succés !";
    }
  
    if(ch==="login"){
      message="Bienvenue !";
    }
  
  
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

}

export class User {
  cin!: number;
  username!: string;
  email!: string;
  tel!: string;
  password!: string;
  role!: string;
}

