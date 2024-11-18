import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Cliente from "./conexão_sequelize.js"; // Importa o modelo Cliente

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.get("/", (req, res) => res.send("API de Clientes"));

// ** CREATE **
app.post("/Cliente", async (req, res) => {
  try {
    const { nome, email, senha, tel, cpf, codCli } = req.body;
    const novoCliente = await Cliente.create({ nome, email, senha, tel, cpf, codCli, });
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar cliente", detalhes: error.message });
  }
});

// ** READ ALL **
app.get("/Cliente", async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar clientes", detalhes: error.message });
  }
});

// ** READ BY ID **
app.get("/Cliente/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cliente", detalhes: error.message });
  }
});

// ** UPDATE **
app.put("/Cliente/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });

    const { nome, email, senha, tel, cpf } = req.body;
    await cliente.update({ nome, email, senha, tel, cpf });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar cliente", detalhes: error.message });
  }
});

// ** DELETE **
app.delete("/Cliente/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });

    await cliente.destroy();
    res.json({ message: "Cliente excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir cliente", detalhes: error.message });
  }
});

// Inicia o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

 