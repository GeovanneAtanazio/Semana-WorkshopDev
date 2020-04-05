//Configuração do servidor via express
const express = require('express')
const server = express()

const ideas = [
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Cursos de Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis fuga labore dolores fugit quibusdam earum commodi praesentium deserunt in a ducimus accusamus voluptatem et ratione, iste magnam aspernatur! Similique, cumque!",
        url:"#"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis fuga labore dolores fugit quibusdam earum commodi praesentium deserunt in a ducimus accusamus voluptatem et ratione, iste magnam aspernatur! Similique, cumque!",
        url:"#"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis fuga labore dolores fugit quibusdam earum commodi praesentium deserunt in a ducimus accusamus voluptatem et ratione, iste magnam aspernatur! Similique, cumque!",
        url:"#"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaoke",
        category: "Diversão em Família",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis fuga labore dolores fugit quibusdam earum commodi praesentium deserunt in a ducimus accusamus voluptatem et ratione, iste magnam aspernatur! Similique, cumque!",
        url:"#"
    },
]

//configurar arquivos estáticos
server.use(express.static("public"))

//configuração nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('views',{
    express: server,
    noCache: true,
})

//Vriação de rota
server.get('/',function(req, res){

    const reversedIdeas = [...ideas].reverse();
    let lastIdeas = [];
    for(let idea of reversedIdeas){
        if(lastIdeas.length<2){
            lastIdeas.push(idea)
        }    
    }
    return res.render("index.html", {ideas: lastIdeas})
})
server.get('/ideas',function(req, res){
    const reversedIdeas = [...ideas].reverse();
    return res.render("ideias.html", {ideas: reversedIdeas})
})

//Ligar o servidor
server.listen(3000)