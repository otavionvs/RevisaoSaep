import express from "express"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const app = express()
const port = 3000

app.use(express.json());

const usuarios = [];

app.get('/usuarios', (req, res) => {
     res.send(usuarios)
    });

app.post('/usuarios', async (request, respose) => {
    const user = await prisma.user.create({
        data: {
            name: request.body.nome,
            idade: request.body.idade
        },
    })

    respose.send(user)
});

    
app.listen(port, () => console.log(`Rodando em http://localhost:3000/`))