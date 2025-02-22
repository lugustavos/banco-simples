// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Grid,
} from '@mui/material';

const App = () => {
  const [numero, setNumero] = useState('');
  const [ag_numero, setAgNumero] = useState('');
  const [ag_nome, setAgNome] = useState('');
  const [tipo, setTipo] = useState(1);
  const [saldo, setSaldo] = useState(0);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const createAccount = async () => {
    try {
      const response = await axios.post('http://localhost:5000/accounts', {
        numero: parseInt(numero),
        ag_numero: parseInt(ag_numero),
        ag_nome,
        tipo: parseInt(tipo),
      });
      setMessage(`Conta criada com sucesso: ${response.data.numero}`);
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('Erro ao criar conta');
      setOpenSnackbar(true);
    }
  };

  const creditAccount = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/accounts/${numero}/credit`, { valor: 100 });
      setSaldo(response.data.saldo);
      setMessage(`Crédito realizado. Novo saldo: ${response.data.saldo}`);
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('Erro ao creditar');
      setOpenSnackbar(true);
    }
  };

  const debitAccount = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/accounts/${numero}/debit`, { valor: 50 });
      setSaldo(response.data.saldo);
      setMessage(`Débito realizado. Novo saldo: ${response.data.saldo}`);
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('Erro ao debitar');
      setOpenSnackbar(true);
    }
  };

  const checkBalance = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/accounts/${numero}/balance`);
      setSaldo(response.data.saldo);
      setMessage(`Saldo atual: ${response.data.saldo}`);
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('Erro ao consultar saldo');
      setOpenSnackbar(true);
    }
  };

  const closeAccount = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/accounts/${numero}/close`);
      setMessage(response.data.message);
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('Erro ao encerrar conta');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '40px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sistema Bancário Simples - Luís Gustavo
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Criar Nova Conta
            </Typography>
            <TextField
              label="Número da Conta"
              fullWidth
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Número da Agência"
              fullWidth
              value={ag_numero}
              onChange={(e) => setAgNumero(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Nome da Agência"
              fullWidth
              value={ag_nome}
              onChange={(e) => setAgNome(e.target.value)}
              margin="normal"
            />
            <Select
              label="Tipo de Conta"
              fullWidth
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              margin="normal"
            >
              <MenuItem value={1}>Corrente</MenuItem>
              <MenuItem value={2}>Poupança</MenuItem>
              <MenuItem value={3}>Conjunta</MenuItem>
            </Select>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={createAccount}
              style={{ marginTop: '20px' }}
            >
              Criar Conta
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Ações
            </Typography>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={creditAccount}
              style={{ marginBottom: '10px' }}
            >
              Creditar R$ 100
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={debitAccount}
              style={{ marginBottom: '10px' }}
            >
              Debitar R$ 50
            </Button>
            <Button
              variant="contained"
              color="info"
              fullWidth
              onClick={checkBalance}
              style={{ marginBottom: '10px' }}
            >
              Consultar Saldo
            </Button>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              onClick={closeAccount}
            >
              Encerrar Conta
            </Button>
          </Grid>
        </Grid>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="info">
            {message}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default App;