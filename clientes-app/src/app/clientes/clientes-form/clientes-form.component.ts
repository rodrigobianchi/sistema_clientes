import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../clientes';

@Component({
  selector: 'clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  showMsgSuccess: boolean = false;
  errors: String[];
  id: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = (params['id']);
      if (this.id) {
        this.service.findById(this.id)
          .subscribe(response => {
            this.cliente = response
          }
            , errorResponde => {
              this.cliente = new Cliente()
            })
      }
    });
  }

  onSubmit() {
    if (this.id) {

      this.service.update(this.cliente)
        .subscribe(response => {
          this.showMsgSuccess = true;
          this.errors = [];
        }
          , errorResponse => {
            this.showMsgSuccess = false;
            this.errors = errorResponse.error.errors;
          })

    } else {

      this.service.save(this.cliente)
        .subscribe(response => {
          this.showMsgSuccess = true;
          this.errors = [];
          this.cliente = response;
        }
          , errorResponse => {
            this.showMsgSuccess = false;
            this.errors = errorResponse.error.errors;
          })

    }
  }

  voltarConsulta() {
    this.router.navigate(['/clientes/list'])
  }

}
