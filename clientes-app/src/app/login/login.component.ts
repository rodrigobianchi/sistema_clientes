import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  cadastro: boolean;
  mensagemSucesso: string;
  errors: string[];

  constructor(
    private router: Router,
    private authService: AuthService) { }

  onSubmit() {
    if (!this.username || !this.password) {
      this.errors = ['Login e senha são obrigatórios.']
    } else {

      this.authService.login(this.username, this.password)
        .subscribe(response => {
          const access_token = JSON.stringify(response);
          localStorage.setItem('access_token', access_token);
          this.router.navigate(['/home']);

        }, errorResponse => {
          this.errors = ['Login ou senha inválidos.']
        })
    }
  }

  prepararCadastro(event) {
    event.preventDefault();
    this.cadastro = true;
  }

  cancelarCadastro() {
    this.cadastro = false;
  }

  save() {
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService.save(usuario).subscribe(response => {
      this.mensagemSucesso = "Usuário Cadastrado com sucesso.";
      this.cadastro = false;
      this.username = '';
      this.password = '';
      this.errors = [];
    }, errorResponse => {
      this.mensagemSucesso = null;
      this.errors = errorResponse.error.errors;

    })
  }

}
