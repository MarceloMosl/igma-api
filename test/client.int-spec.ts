import { ValidationPipe } from '@nestjs/common'
import {Test} from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import { PrismaService } from 'src/prisma/prisma.service'
import * as request  from 'supertest'

describe("test", () => {

    let prisma: PrismaService
    let server: any;

    beforeAll(async () => {
        const moduleRef =  await Test.createTestingModule({
            imports: [AppModule]
        }).compile()
        prisma = moduleRef.get(PrismaService)
        const app = moduleRef.createNestApplication()
        app.useGlobalPipes(new ValidationPipe())
        await app.init()
        server = await app.getHttpServer()
    })

    afterAll(async () => {
        await prisma.clients.delete({where: {cpf: '41778023010'}})
    })

    
   describe("Should Test client creation", () => {

    it('should return 400 when missing fields', async () => {
        const response = await request(server)
        .post("/clients")
        .send({
            "nome": "",
            "nascimento": "",
            "cpf": ""
          })

        expect(response.status).toBe(400)

    })


    it('should return 422 when cpf is not valid', async () => {
        const response = await request(server)
        .post("/clients")
        .send({
            "nome": "Jonh Doe",
            "nascimento": "01/01/1999",
            "cpf": "417.780.230-11"
          })

        expect(response.status).toBe(422)

    })

    it('should return 201 when data is valid', async () => {
        const response = await request(server)
        .post("/clients")
        .send({
            "nome": "Jonh Doe",
            "nascimento": "01/01/1999",
            "cpf": "417.780.230-10"
          })

        expect(response.status).toBe(201)

    })


   })

   describe("Should test client search routes", () => {
    it('should return empty when the CPF is not register', async () => {
        const response = await request(server)
        .get("/clients/417.780.230-10")        

        expect(response.status).toBe(200)
        expect(response.body.nome).toBe('Jonh Doe')
        expect(response.body.cpf).toBe('41778023010')
    })

    it('should return only two clients using pagination', async () => {
        const response = await request(server)
        .get("/clients/all?take=2&skip=2")
        
        
    
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(2)
        expect(response.body[1].nome).toBe('Sarah')
    })

   })

  
})

