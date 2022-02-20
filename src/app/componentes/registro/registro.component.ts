import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private router: Router,
    private flashmessagesService: FlashMessagesService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.getAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  register(){
    this.loginService.registerUser(this.email, this.password)
      .then(res => {
        this.router.navigate(['/'])
      })
      .catch(error => {
        this.flashmessagesService.show(error.message, {
          cssClass: 'alert-danger', timeout: 4000
        });
      });
  }
}
