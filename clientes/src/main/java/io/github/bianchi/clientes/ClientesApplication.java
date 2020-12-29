package io.github.bianchi.clientes;

import io.github.bianchi.clientes.model.entity.Cliente;
import io.github.bianchi.clientes.model.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ClientesApplication {

    /* Método utilitário para testar operações
    @Bean
    public CommandLineRunner run(@Autowired ClienteRepository clienteRepository){
        return args -> {
            Cliente cliente = Cliente.builder().nome("Rodrigo").cpf("34501780835").build();
            clienteRepository.save(cliente);
        };
    }
    */

    public static void main(String[] args) {
        SpringApplication.run(ClientesApplication.class, args);

    }
}
