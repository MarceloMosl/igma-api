import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto, GetClientDto } from './dtos/clientsDtos';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Post()
  createClient(@Body() body: CreateClientDto) {    
    return this.clientsService.createUser(body);
  }

  @Get("all")
  getAllClients(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
  ) {
    return this.clientsService.getAllClients(take, skip);
  }

  @Get(":cpf")
  getClientByCpf(@Param() params: GetClientDto) {    
    return this.clientsService.getClientByCpf(params.cpf);
  }

  

}
