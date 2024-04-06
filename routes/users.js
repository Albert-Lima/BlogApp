const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

//recebendo model de usuários
require("../modules/usuarios")
const Usuarios = mongoose.model("usuarios")

//recebendo model de postagens
require("../modules/postagem")
const Postagens = mongoose.model("usuarios")

//rota principal após login como usuário
router.get("/", (req, res)=>{
    Postagens.find().populate().sort({data: "desc"}).lean().then((postagens)=>{
        res.render("usuarios/home", {postagens: postagens})
     }).catch((err)=>{
        req.flash("error_msg", "houve um erro interno")
        res.redirect("/404")
     })
})

//resposta ao tentar ver a postagem completa sem estar cadastrado
router.get("/cadastre-se", (req, res)=>{
    res.render("usuarios/resposta")
})
router.get("/sobre", (req, res)=>{
    res.render("usuarios/about")
})

//rota para cadastro
router.get("/cadastro", (req, res)=>{
    res.render("usuarios/cadastro")
})
router.post("/cadastro", (req, res)=>{
    var erros = []
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "nome inválido"})
    }
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "email inválido"})
    }
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "senha inválida"})
    }
    if(req.body.senha.length < 8){
        erros.push({texto: "senha muito pequena(pelo menos 8 caracteres)"})
    }
    if(req.body.senha != req.body.senha2){
        erros.push({texto: "senhas não compatíveis"})
    }
    if(erros.length > 0){
        res.render("usuarios/cadastro", {erros: erros})
    }else{
        //fazendo verificação se o email já consta no banco de dados
        Usuarios.findOne({email: req.body.email}).lean().then((usuarios)=>{
            if(usuarios){
                req.flash("error_msg", "email já cadastrado!")
                req.redirect("/user/cadastro")
            }else{

                const novoUsuario = new Usuarios({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                })

                //encripitando a senha
                bcrypt.genSalt(10, (erro, salt)=>{
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash)=>{
                        if(erro){
                            req.flash("error_msg", "houve um erro durante o salvamento")
                            res.redirect("/")
                        }else{
                            novoUsuario.senha = hash
                            novoUsuario.save().then(()=>{
                                console.log("cadastro realizado")
                                req.flash("success_msg", "usuário cadastrado")
                                req.login(usuario, err => {
                                    if (err) {
                                        console.error(err);
                                        return next(err);
                                    }
                                    return res.redirect('/'); // Redirecionar para a página de logado
                                });
                            }).catch((err)=>{
                                req.flash("error_msg","houve um erro ao criar novo usuário")
                                res.redirect("/cadastro")
                            })
                        }
                    })
                })

            }
        }).catch((err)=>{
            res.redirect("/user/cadastro")
        })
    }
})

//rota para login
require("../config/auth")
const passport = require("passport")

router.get("/login", (req, res)=>{
    res.render("usuarios/login")
})
router.post("/login", (req, res, next)=>{
    passport.authenticate("local", (err, user, info)=> {
        if (err) {
            return next(err);
        }
        if (!user) {
            // Se a autenticação falhar, redireciona para a página de login com uma mensagem de erro
            return res.redirect("/user/login");
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            // Verifica o campo eAdmin do usuário para determinar o redirecionamento
            if (user.eAdmin === 1) {
                return res.redirect("/admin/postagens");
            } else {
                return res.redirect("/user");
            }
        });
    })(req, res, next)
})


//rota para renderizar a vizualização completa das postagens
router.get("/postagens", (req, res)=>{
    Postagens.find().populate("categoria").sort({data: "desc"}).lean().then((postagens)=>{
        res.render("usuarios/postagens", {postagens: postagens})
    }).catch((err)=>{
        req.flash('error_msg', 'erro ao listar postagens')
    })
})



module.exports = router