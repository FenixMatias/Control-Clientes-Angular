import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from '../../servicios/configuracion.service';
import { Configuracion } from '../../model/configuracion.model';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  permitirRegistro: boolean | undefined;

  constructor(private router: Router,
              private configuracionServicio: ConfiguracionServicio) { }

  ngOnInit(): void {
    this.configuracionServicio.getConfiguracion().subscribe(
      (configuracion: Configuracion) => {
        this.permitirRegistro = configuracion.permitirRegistro;
      }
    )
  }

  save(){
    let Configuracion = {permitirRegistro: this.permitirRegistro}
    this.configuracionServicio.putConfiguracion(Configuracion);
    this.router.navigate(['/']);
  }

}
