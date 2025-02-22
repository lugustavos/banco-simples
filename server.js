const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let accounts = [];

app.post('/accounts', (req, res) => {
    const { numero, ag_numero, ag_nome, tipo } = req.body;
    const newAccount = {
        numero,
        ag_numero,
        ag_nome,
        tipo,
        saldo: 0.0
    };
    accounts.push(newAccount);
    res.status(201).json(newAccount);
});

app.post('/accounts/:numero/credit', (req, res) => {
    const { numero } = req.params;
    const { valor } = req.body;
    const account = accounts.find(acc => acc.numero === parseInt(numero));
    if (account && account.tipo !== 4) {
        account.saldo += valor;
        res.status(200).json(account);
    } else {
        res.status(404).json({ message: 'Conta não encontrada ou encerrada' });
    }
});

app.post('/accounts/:numero/debit', (req, res) => {
    const { numero } = req.params;
    const { valor } = req.body;
    const account = accounts.find(acc => acc.numero === parseInt(numero));
    if (account && account.tipo !== 4) {
        account.saldo -= valor;
        res.status(200).json(account);
    } else {
        res.status(404).json({ message: 'Conta não encontrada ou encerrada' });
    }
});

app.get('/accounts/:numero/balance', (req, res) => {
    const { numero } = req.params;
    const account = accounts.find(acc => acc.numero === parseInt(numero));
    if (account) {
        res.status(200).json({ saldo: account.saldo });
    } else {
        res.status(404).json({ message: 'Conta não encontrada' });
    }
});

app.post('/accounts/:numero/close', (req, res) => {
    const { numero } = req.params;
    const account = accounts.find(acc => acc.numero === parseInt(numero));
    if (account && account.saldo >= 0) {
        account.tipo = 4;
        res.status(200).json({ message: 'Conta encerrada com sucesso', saldo: account.saldo });
    } else {
        res.status(400).json({ message: 'Não é possível encerrar a conta com saldo negativo' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});