import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/clientes';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestado } from '../servico-prestado';

@Component({
  selector: 'servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  showMsgSuccess: boolean = false;
  errors: String[];
  clientes: Cliente[] = [];
  servicoPrestado: ServicoPrestado;

  constructor(
    private clienteService: ClientesService,
    private service: ServicoPrestadoService) {
    this.servicoPrestado = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.clienteService.findAll().subscribe(
      response => this.clientes = response
    );
  }

  onSubmit() {
    this.service.save(this.servicoPrestado)
      .subscribe(response => {
        this.showMsgSuccess = true;
        this.errors = [];
        this.servicoPrestado = response;
      }
        , errorResponse => {
          this.showMsgSuccess = false;
          this.errors = errorResponse.error.errors;
        })
  }

}
