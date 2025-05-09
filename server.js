import express from "express"
const app = express()
const port = 3000

app.use(express.json());

const usuarios = [];

app.get('/usuarios', (req, res) => {
     res.send(usuarios)
    });

app.post('/usuarios', (request, respose) => {
    usuarios.push(request.body);
    respose.send('Usuário adicionado!')
});

    
app.listen(port, () => console.log(`Rodando em http://localhost:3000/`))