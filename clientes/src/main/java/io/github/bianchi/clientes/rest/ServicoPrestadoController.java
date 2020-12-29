package io.github.bianchi.clientes.rest;

import io.github.bianchi.clientes.model.entity.Cliente;
import io.github.bianchi.clientes.model.entity.ServicoPrestado;
import io.github.bianchi.clientes.model.repository.ClienteRepository;
import io.github.bianchi.clientes.model.repository.ServicoPrestadoRepository;
import io.github.bianchi.clientes.rest.dto.ServicoPrestadoDTO;
import io.github.bianchi.clientes.util.BigDecimalConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/servicos-prestados")
@RequiredArgsConstructor
/*RequiredArgsConstructor - cria um construtor com os atributos declarados na classe*/
public class ServicoPrestadoController {

    private final ClienteRepository clienteRepository;
    private final ServicoPrestadoRepository servicoPrestadoRepository;
    private final BigDecimalConverter bigDecimalConverter;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServicoPrestado save(@RequestBody @Valid ServicoPrestadoDTO dto) {
        LocalDate data = LocalDate.parse(dto.getData(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        Cliente cliente = clienteRepository.findById(dto.getIdCliente())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

        ServicoPrestado servicoPrestado = new ServicoPrestado();
        servicoPrestado.setDescricao(dto.getDescricao());
        servicoPrestado.setData(data);
        servicoPrestado.setCliente(cliente);
        servicoPrestado.setValor(bigDecimalConverter.converter(dto.getValor()));

        return servicoPrestadoRepository.save(servicoPrestado);
    }

    @GetMapping
    /*defaultValue = "" informa valor padrãp para query*/
    public List<ServicoPrestado> find(
            @RequestParam(value = "nome", required = false, defaultValue = "") String nome,
            @RequestParam(value = "mes", required = false) Integer mes
    ) {
        return servicoPrestadoRepository.findByNomeClienteAndMes("%" + nome + "%", mes);
    }
}
