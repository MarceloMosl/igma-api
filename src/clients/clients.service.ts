import { Injectable } from '@nestjs/common';
import { CreateClientDto, GetClientDto } from './dtos/clientsDtos';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientsService {

    constructor(private prisma: PrismaService) { }


    async createUser(clientData: CreateClientDto) {
        const clientDataCpfFormat = clientData
        clientDataCpfFormat.cpf = clientDataCpfFormat.cpf.replace(/\D/g, '')
        await this.prisma.clients.create({ data: clientDataCpfFormat })
        return "Cliente criado com sucesso"
    }

    async getClientByCpf(cpf: string) {
        return await this.prisma.clients.findFirst({where: {cpf: cpf.replace(/\D/g, '')}});
    }

    async getAllClients(take: number, skip: number) {
        return await this.prisma.clients.findMany({
            take: Number(take), 
            skip: Number(skip),
            orderBy: {id: 'asc'}
        })
    }


}
