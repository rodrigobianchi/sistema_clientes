import { Cliente } from "src/app/clientes/clientes";

export class ServicoPrestadoDTO {
    descricao: string;
    valor: number;
    data: string;
    cliente: Cliente;
}