import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ConfiguracionServicio } from '../servicios/configuracion.service';
import { map, Observable } from 'rxjs';


@Injectable()
export class ConfiguracionGuard implements CanActivate{

    constructor(private router: Router,
                private configuracionServicio: ConfiguracionServicio){}

    canActivate(): Observable<boolean>{
        return this.configuracionServicio.getConfiguracion().pipe(
            map(configuracion => {
                if(configuracion.permitirRegistro){
                    return true;
                }else{
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        )
    }
}