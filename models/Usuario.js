const db = require('./db')

const Usuario = db.sequelize.define('DADOSUSUARIOS', {
    nome: {
        type: db.Sequelize.TEXT
    },
    sobrenome: {
        type: db.Sequelize.TEXT
    },
    cep: {
        type: db.Sequelize.TEXT
    },
    localidade: {
        type: db.Sequelize.TEXT
    },
    uf: {
        type: db.Sequelize.TEXT
    },
    bairro: {
        type: db.Sequelize.TEXT
    }
})

Usuario.sync({force: true})

module.exports = Usuario;