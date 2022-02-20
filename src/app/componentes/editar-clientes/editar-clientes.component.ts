import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../model/cliente.model';
import { ClienteServicio } from '../../servicios/cliente.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.css']
})
export class EditarClientesComponent implements OnInit {

  clientes!: Cliente[];
  cliente: Cliente={
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }
  id: string;

  constructor(private clienteServicio: ClienteServicio, private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clienteServicio.getCliente(this.id).subscribe(cliente => {
      this.cliente = cliente;
    });
  }

  guardar({value, valid}:NgForm){
    if (!valid) {
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass:'alert-danger', timeout: 4000
      });
    } else {
      value.id = this.id;
      //Modificar el cliente
      this.clienteServicio.putCliente(value);
      this.router.navigate(['/']);
    }
  }

  eliminar(){
    if (confirm('¿Seguro que desea elimiar el cliente?')) {
      //Eliminar cliente
      this.clienteServicio.deleteCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }

}
