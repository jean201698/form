// importação dos pacotes
const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const Usuario = require('./models/Usuario')
const session = require('express-session')
const falsh = require('connect-flash')


// confi session
app.use(session({
    secret: 'form',
    resave: true,
    saveUninitialized: true
}))
// config flash
app.use(falsh())
app.use((req, res, next)=>{

    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})
// config arquivos estaticos
app.use(express.static(path.join('public')))
// config hbs
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main'
})); app.set('view engine', 'hbs')
// config body parser
app.use(bodyParser.urlencoded({extended: true}))

//rota incial
app.get('/', (req, res)=>{
    res.render('formulario')
})

// rota das listas
app.get('/list', (req, res)=>{
    Usuario.findAll().then((valores)=>{
     const values = valores.map((dados)=> dados.toJSON())
     res.render('lista', {valores: values})
        
    })
})

// recebendo dados do formulário e salvando no banco de dados 
app.post('/form', (req, res)=>{
     
    let erros = []
    if(!req.body.cep || !req.body.nome || !req.body.sobrenome || !req.body.localidade || !req.body.uf || !req.body.bairro){
         erros.push({texto: 'Campos precisam ser preenchidos'})
    }
    
    if(erros.length > 0){
        res.render("formulario", {erros: erros})
    }else{
        Usuario.create({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            cep: req.body.cep,
            localidade: req.body.localidade,
            uf: req.body.uf,
            bairro: req.body.bairro
            
    
        }).then(()=>{
            req.flash("success_msg", 'Usuarios criado com sucesso')
            res.redirect('/')
        })
        

    }
     
                    
    
   
})

// deletando dados do banco de dados 
app.post('/del', (req, res)=>{
   Usuario.destroy({
    where: {
        id: req.body.id
    }
   }).then(()=>{
    res.redirect('/list')
   })
})

// editando dados 
app.post('/editar', (req, res)=>{
let id  = req.body.id
  Usuario.findByPk(id).then(dados=>{
    res.render('editar', {id: dados.id, cep: dados.cep, nome: dados.nome, sobrenome: dados.sobrenome, localidade: dados.localidade, uf: dados.uf, bairro: dados.bairro})
  })
})

// atualizando dados no banco de dados
app.post('/update', (req, res)=>{
    
    Usuario.update({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        cep: req.body.cep,
        localidade: req.body.localidade,
        uf: req.body.uf,
        bairro: req.body.bairro
    },

    {
        where: {
            id: req.body.id
        }
    }

    
    
    
    ).then(()=>{
        req.flash('success_msg', 'dados salvo com sucesso')
        res.redirect('/')
    })

  

})





// servidor aberto na porta 8080
app.listen(8080, ()=>{
    console.log('servidor rodando na porta 8080');
})