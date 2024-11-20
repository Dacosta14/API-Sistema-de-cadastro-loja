import Sequelize from "sequelize";


const conexaoSequelize = new Sequelize("cadastro_cliente", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

conexaoSequelize
  .authenticate()
  .then(() => {
    console.log("------------------------");
    console.log("Conexão com banco: ok");
  })
  .catch((err) => {
    console.error("Conexão com banco: erro", err);
  });

  

  export const Cliente = conexaoSequelize.define("Cliente", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,  // O 'id' continua com autoIncrement
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tel: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cpf: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    codCli: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,  // Garantir que o 'codCli' seja único
    }
  }, {
    hooks: {
      beforeCreate: (cliente, options) => {
        cliente.id = undefined; // Garantir que o id não seja definido
        // Gerar o 'codCli' automaticamente antes de criar
        cliente.codCli = `CLI-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      },
      beforeUpdate: (cliente, options) => {
        cliente.id = undefined; // Garantir que o id não seja alterado
      }
    }
  });

  export const Funcionario = conexaoSequelize.define("Funcionario", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // Garante que o e-mail seja único
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false, // Armazena a senha criptografada
    },
    cargo: {
      type: Sequelize.ENUM("funcionario", "gerente"),
      allowNull: false,
    },
  });
  // Sincronizar com o banco
  // Funcionario.sync({ force: true }) // Usa 'false' para não recriar a tabela se ela já existir
  // Cliente.sync({ force: true }); // Execute apenas uma vez para criar a tabela

//  Cliente.create ({
//   nome: 'Gabriela',
//   email: 'abritoo@gmail.com',
//   senha: 'juuuuu2222',
//   tel: '123477789',
//   cpf: '08098827312',
//   codCli: '123jjajj12'

// });

// Cliente.create({
//   nome: 'Carlos Souza',
//   email: 'carlos.souza@gmail.com',
//   senha: 'senha12345',
//   tel: '987654321',
//   cpf: '12345678901',
//   codCli: 'asdjh1234'
// });

// Cliente.create({
//   nome: 'Maria Oliveira',
//   email: 'maria.oliveira@yahoo.com',
//   senha: 'maria2024!',
//   tel: '459876123',
//   cpf: '34567890123',
//   codCli: 'oiuwr3456'
// });

// Cliente.create({
//   nome: 'João Pedro',
//   email: 'joao.pedro@hotmail.com',
//   senha: 'joaopass123',
//   tel: '562349821',
//   cpf: '56789012345',
//   codCli: 'kpqwer6789'
// });

// Cliente.create({
//   nome: 'Fernanda Alves',
//   email: 'fernanda.alves@outlook.com',
//   senha: 'fernandinha99',
//   tel: '55129873456',
//   cpf: '78901234567',
//   codCli: 'qwxl34567'
// });

// Cliente.create({
//   nome: 'Lucas Martins',
//   email: 'lucas.martins@gmail.com',
//   senha: 'lucas9876',
//   tel: '456789012',
//   cpf: '89012345678',
//   codCli: 'vbnmp12345'
// });

// Funcionario.create({
//   nome: "Gabriela",
//   email: "admin@empresa.com",
//   senha: "senha123", 
//   cargo: "Gerente",
// });

// Funcionario.create({
//   nome: "Julia",
//   email: "funcionario@empresa.com",
//   senha:  "Pistache2008@", 
//   cargo: "Atendente",
// });
