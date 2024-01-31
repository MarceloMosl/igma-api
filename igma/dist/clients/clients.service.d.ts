import { CreateClientDto } from './dtos/clientsDtos';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ClientsService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(clientData: CreateClientDto): Promise<string>;
    getClientByCpf(cpf: string): Promise<{
        id: number;
        nome: string;
        nascimento: string;
        cpf: string;
        created_at: Date;
    }>;
    getAllClients(take: number, skip: number): Promise<{
        id: number;
        nome: string;
        nascimento: string;
        cpf: string;
        created_at: Date;
    }[]>;
}
