import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import Cliente from "./conexão_sequelize.js"; // Importa o modelo Cliente

const server = express();
const __dirname = path.resolve();

// Middlewares
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Página inicial
server.get("/", (req, res) => {
  return res.send("Página inicial");
});

// ** CREATE - Rota para criar um novo cliente **
server.post("/cliente", async (req, res) => {
  try {
    const { nome, email, senha, tel, cpf, codCli } = req.body;
    const novoCliente = await Cliente.create({ nome, email, senha, tel, cpf, codCli });
    res.status(201).json(novoCliente);
  } catch (error) {
    console.error("Erro ao criar cliente: ", error);
    res.status(500).json({ error: "Erro ao criar cliente" });
  }
});

// ** READ - Rota para listar todos os clientes **
server.get("/cliente", async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    console.log("Erro ao pegar clientes: ", error);
    res.status(500).json({ error: "Erro ao pegar clientes" });
  }
});

// ** READ - Rota para pegar um cliente pelo ID **
server.get("/cliente/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findOne({ where: { id } });
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: "Cliente não encontrado" });
    }
  } catch (error) {
    console.log("Erro ao achar o cliente com ID", error);
    res.status(500).json({ error: "Erro ao pegar cliente" });
  }
});

// ** UPDATE - Rota para atualizar um cliente pelo ID **
server.put("/cliente/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha, tel, cpf, codCli } = req.body;
    const cliente = await Cliente.findOne({ where: { id } });

    if (cliente) {
      await cliente.update({ nome, email, senha, tel, cpf, codCli });
      res.json(cliente);
    } else {
      res.status(404).json({ error: "Cliente não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao atualizar cliente: ", error);
    res.status(500).json({ error: "Erro ao atualizar cliente" });
  }
});

// ** DELETE - Rota para excluir um cliente pelo ID **
server.delete("/cliente/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findOne({ where: { id } });

    if (cliente) {
      await cliente.destroy();
      res.json({ message: "Cliente excluído com sucesso" });
    } else {
      res.status(404).json({ error: "Cliente não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao deletar cliente: ", error);
    res.status(500).json({ error: "Erro ao deletar cliente" });
  }
});

// ** Página HTML de exemplo para formulário **
server.get("/html", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Inicialização do servidor
server.listen(3000, () => {
  console.log("------------------------");
  console.log("PORTA: 3000");
  console.log("------------------------");
  console.log("Conexão com o servidor: ok");
  console.log("------------------------");
});
