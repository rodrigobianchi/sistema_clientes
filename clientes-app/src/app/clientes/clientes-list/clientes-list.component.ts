import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../clientes';

@Component({
  selector: 'clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {

  clientes : Cliente[] = [];
  clienteSelected: Cliente;
  msgSuccess: string;
  msgError: string;

  constructor(
    private service: ClientesService) { 
  }

  ngOnInit(): void {
    this.service.findAll()
    .subscribe( response => this.clientes = response);
  }

  prepareDelete(cliente: Cliente) {
    this.clienteSelected = cliente;
  }

  deleteCliente() {
    this.service.delete(this.clienteSelected)
    .subscribe( response => {
      this.msgSuccess = 'Registro excluído com sucesso!', this.ngOnInit()
    }
    ,error => this.msgError = 'Ocorreu um erro excluir o registro.'
    )
  }

}
