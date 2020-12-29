import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServicoPrestado } from './servico-prestado/servico-prestado';
import { ServicoPrestadoDTO } from './servico-prestado/servico-prestado-list/servico-prestado-dto';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL: string = environment.apiURLBase + '/api/servicos-prestados';

  constructor(private http: HttpClient) { }

  save(servicoPrestado: ServicoPrestado): Observable<ServicoPrestado> {
    return this.http.post<ServicoPrestado>(this.apiURL, servicoPrestado);
  }

  find(nome: string, mes: number): Observable<ServicoPrestadoDTO[]> {
    const httpParams = new HttpParams()
      .set("nome", nome)
      .set("mes", mes ? mes.toString() : '');
    const urlFind = this.apiURL + "?" + httpParams.toString();
    return this.http.get<ServicoPrestadoDTO[]>(urlFind);
  }

}
