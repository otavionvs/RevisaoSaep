import express from "express"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const app = express()
const port = 3000

app.use(express.json());

const usuarios = [];

//Buscar Todos
app.get('/usuarios', async (req, res) => {
    res.send(await prisma.user.findMany())
});

//Buscar por Id
app.get('/usuarios/:id', async (req, res) => {
    const userId = parseInt(req.params.id);

    res.send(await prisma.user.findUnique({
        where: { id: userId }
    }
    ))
});

//Criar
app.post('/usuarios', async (request, respose) => {
    const user = await prisma.user.create({
        data: {
            name: request.body.nome,
            idade: request.body.idade
        },
    })

    respose.send(user)
});

//Atualizar
app.put('/usuarios/:id', async (req, res) => {
    const idUser = parseInt(req.params.id);

    const user = await prisma.user.update({
        where: { id: idUser },
        data: {
            name: req.body.nome,
            idade: req.body.idade
        }
    })

    res.send(user);
})

//Deletar
app.delete('/usuarios/:id', async (req, res) => {
    const idUser = parseInt(req.params.id);

    try {
        await prisma.user.delete({
            where: { id: idUser }
        })
        res.send("Usuário deletado com sucesso")
    } catch (e) {
        console.log("O erro foi: " + e.meta.cause)
        res.send("Usuário não deletado!")
    }
})


app.listen(port, () => console.log(`Rodando em http://localhost:3000/`))