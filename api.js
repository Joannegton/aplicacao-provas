const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); 

const app = express();
const port = 3000;

// Middleware para lidar com solicitações JSON
app.use(express.json());
app.use(cors());

// Rota para lidar com a criação de um novo registro de aluno
app.post('/adicionarAluno', (req, res) => {
    const { nome, serie, prova } = req.body;

    // Verifica se todos os campos necessários estão presentes
    if (!nome || !serie || !prova) {
        return res.status(400).json({ error: 'Dados incompletos' });
    }

    // Cria o objeto de aluno
    const aluno = { nome, serie, prova };

    // Lê os dados atuais do arquivo JSON
    let dadosAlunos = [];
    const dadosFilePath = path.join(__dirname, 'dados_alunos.json');
    try {
        const data = fs.readFileSync(dadosFilePath, 'utf8');
        dadosAlunos = JSON.parse(data);
    } catch (err) {
        console.error('Erro ao ler o arquivo de dados:', err);
    }

    // Adiciona o novo aluno ao array
    dadosAlunos.push(aluno);

    // Escreve os dados atualizados de volta no arquivo JSON
    try {
        fs.writeFileSync(dadosFilePath, JSON.stringify(dadosAlunos, null, 2));
        console.log('Dados dos alunos salvos com sucesso');
    } catch (err) {
        console.error('Erro ao salvar os dados dos alunos:', err);
    }

    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
