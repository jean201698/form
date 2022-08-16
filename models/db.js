const Sequelize = require('sequelize')
const sequelize = new Sequelize('cadastro', 'root', 'jean201698', {
    host: 'localhost',
    dialect: 'mysql'
})

// sequelize.authenticate()
//  .then(()=>{
//      console.log('conectado com sucesso');
//  })
//  .catch()

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};