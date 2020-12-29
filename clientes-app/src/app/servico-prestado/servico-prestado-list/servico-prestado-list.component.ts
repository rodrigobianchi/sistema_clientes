import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestadoDTO } from './servico-prestado-dto';

@Component({
  selector: 'servico-prestado-list',
  templateUrl: './servico-prestado-list.component.html',
  styleUrls: ['./servico-prestado-list.component.css']
})
export class ServicoPrestadoListComponent implements OnInit {

  nome: string;
  mes: number;
  meses: number[];
  servicosPesquisados: ServicoPrestadoDTO[] = [];
  msgConsulta: string;

  constructor(private service: ServicoPrestadoService) {
    this.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }

  ngOnInit(): void {
  }

  find() {
    this.service.find(this.nome, this.mes).subscribe(response => {
      this.servicosPesquisados = response;
      if (this.servicosPesquisados.length == 0) {
        this.msgConsulta = "Nenhum registro encontrado";
      } else {
        console.log('entrou')
        this.msgConsulta = null;
      }
    });
  }


}
