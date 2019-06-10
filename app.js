
//Carregando Módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const admin = require("./routes/admin")
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
require("./models/Postagem")
const Postagem= mongoose.model("postagens")
//Configurações
//Sessão
app.use(session({
  secret:"cursodenode",
  resave:true,
  saveUninitialized: true
}))
app.use(flash())

//Middleware
app.use((req,res,next)=>{
  res.locals.success_msg =req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
  next()
})
//BodyParser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blogapp").then(()=>{
  console.log("Banco Conectado")
}).catch((err)=>{
  console.log("Erro ao se conectar"+err)
})
//Public

app.use(express.static(path.join(__dirname,"public")))

//Rotas
  app.get("/", (req,res)=>{
    Postagem.find().populate("categoria").sort({data:"desc"}).then((postagens)=>{
      res.render("index", {postagens: postagens})
    }).catch((err)=>{
      req.flash("error_msg", "Houve um erro interno")
      res.redirect("/404")
    })
 
  })
  app.get("/404", (req,res)=>{
    res.send("Erro 404!")
  })
  app.use('/admin', admin)
//Outros
const Port = 8081
app.listen(Port, ()=>{
  console.log("Servidor Rodando")
})
