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

const Cliente = conexaoSequelize.define("Cliente", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senha: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  tel: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  cpf: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  codCli: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

 //Cliente.sync({ force: true }); // Execute apenas uma vez para criar a tabela
 Cliente.create ({
  nome: 'Gabriela',
  email: 'abritoo@gmail.com',
  senha: 'juuuuu2222',
  tel: '123477789',
  cpf: '08098827312',
  codCli: '123jjajj12'

});

Cliente.create({
  nome: 'Carlos Souza',
  email: 'carlos.souza@gmail.com',
  senha: 'senha12345',
  tel: '987654321',
  cpf: '12345678901',
  codCli: 'asdjh1234'
});

Cliente.create({
  nome: 'Maria Oliveira',
  email: 'maria.oliveira@yahoo.com',
  senha: 'maria2024!',
  tel: '459876123',
  cpf: '34567890123',
  codCli: 'oiuwr3456'
});

Cliente.create({
  nome: 'João Pedro',
  email: 'joao.pedro@hotmail.com',
  senha: 'joaopass123',
  tel: '562349821',
  cpf: '56789012345',
  codCli: 'kpqwer6789'
});

Cliente.create({
  nome: 'Fernanda Alves',
  email: 'fernanda.alves@outlook.com',
  senha: 'fernandinha99',
  tel: '55129873456',
  cpf: '78901234567',
  codCli: 'qwxl34567'
});

Cliente.create({
  nome: 'Lucas Martins',
  email: 'lucas.martins@gmail.com',
  senha: 'lucas9876',
  tel: '456789012',
  cpf: '89012345678',
  codCli: 'vbnmp12345'
});


export default Cliente;
