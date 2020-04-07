//Configuração do servidor via express
const express = require('express')
const server = express()
const db = require('./db')
/*
const ideas = [
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
*/
//configurar arquivos estáticos
server.use(express.static("public"))

//Habilitar uso do req.body
server.use(express.urlencoded({extended: true}))

//configuração nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('views',{
    express: server,
    noCache: true,
})

//Vriação de rota
server.get('/',function(req, res){
    db.all(`SELECT * FROM ideas`,function(err,rows){
        if(err) return console.log(err)
        const reversedIdeas = [...rows].reverse();
        let lastIdeas = [];
        for(let idea of reversedIdeas){
            if(lastIdeas.length<2){
                lastIdeas.push(idea)
            }    
        }
        return res.render("index.html", {ideas: lastIdeas})        
        })
})
server.get('/ideas',function(req, res){
    db.all(`SELECT * FROM ideas`,function(err,rows){
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
        const reversedIdeas = [...rows].reverse();
        return res.render("ideias.html", {ideas: reversedIdeas})        

    })   
})

server.post('/',function(req, res){
    const query = 
    `INSERT INTO ideas(image,
                       title,
                       category,
                       description,
                       link) 
                       VALUES (?,?,?,?,?);`

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query,values, function(err){
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
        return res.redirect("/ideas")
    })

})

//Ligar o servidor
server.listen(3000)