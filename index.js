// index.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Libera o acesso para qualquer front-end (resolve o problema de CORS)
app.use(cors());

// Rota que seu front-end vai chamar
app.get('/api/assets', async (req, res) => {
  try {
    // Repassa todos os parâmetros (ex: ?limit=10&include=something)
    const resposta = await axios.get('https://community-api.coinmetrics.io/v4/reference-data/assets', {
      params: req.query
    });
    
    // Devolve os dados da CoinMetrics para o seu front-end
    res.json(resposta.data);
  } catch (erro) {
    console.error('Erro no proxy:', erro.message);
    // Se a CoinMetrics devolveu erro, repassa o status
    res.status(erro.response?.status || 500).json({
      erro: 'Falha ao buscar dados da CoinMetrics'
    });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Proxy rodando em http://localhost:${PORT}`);
});
