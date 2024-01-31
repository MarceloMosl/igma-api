import { ClientsService } from './clients.service';
import { CreateClientDto, GetClientDto } from './dtos/clientsDtos';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    createClient(body: CreateClientDto): Promise<string>;
    getAllClients(take?: number, skip?: number): Promise<{
        id: number;
        nome: string;
        nascimento: string;
        cpf: string;
        created_at: Date;
    }[]>;
    getClientByCpf(params: GetClientDto): Promise<{
        id: number;
        nome: string;
        nascimento: string;
        cpf: string;
        created_at: Date;
    }>;
}
