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

export default Cliente;
