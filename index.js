import express from "express";
import path from "path";
import cors from "cors";
import Sequelize from "sequelize";
import Cliente from "./conexão_sequelize.js"; // Corrigir extensão

const server = express(); // Instância do express
const __dirname = path.resolve(); // Para usar __dirname com módulos ES6

server.use(cors());

// Rotas
server.get("/", (req, res) => {
  return res.send("Página inicial");
});

server.get("/cliente/:nome/:tel/:email/:cpf/:codCli", (req, res) => {
  res.send({
    nome: req.params.nome,
    email: req.params.email,
    senha: req.params.senha,
    tel: req.params.tel,
    cpf: req.params.cpf,
    codCli: req.params.codCli,
  });
});

server.get("/cliente", (req, res) => {
  Cliente.findAll()
    .then((dados) => {
      res.json(dados);
    })
    .catch((erro) => {
      console.log("Erro ao pegar Clientes: ", erro);
      res.status(500).json({ error: "Erro ao pegar Clientes" });
    });
});

server.get("/consulta/:id", (req, res) => {
  let idDigitado = req.params.id;
  Cliente.findOne({ where: { id: idDigitado } })
    .then((dados) => {
      res.json(dados);
    })
    .catch((erro) => {
      console.log("Erro ao achar o cliente com ID", erro);
    });
});

server.get("/html", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // Usa path.join para construir o caminho
});

// Inicialização do servidor
server.listen(3000, () => {
  console.log("------------------------");
  console.log("PORTA: 3000");
  console.log("------------------------");
  console.log("Conexão com o servidor: ok");
  console.log("------------------------");
});
