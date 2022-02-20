import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from '../../servicios/configuracion.service';

@Component({
  selector: 'app-cabezera',
  templateUrl: './cabezera.component.html',
  styleUrls: ['./cabezera.component.css']
})
export class CabezeraComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string | null;
  permitirRegistro: boolean | undefined;

  constructor(private loginService: LoginService,
              private router: Router,
              private configuracionServicio: ConfiguracionServicio) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }
      else{
        this.isLoggedIn = false;
      }
    });

    this.configuracionServicio.getConfiguracion().subscribe(configuracion => {
      this.permitirRegistro = configuracion.permitirRegistro;
    })
  }

  logout(){
    this.loginService.logoutUser();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
