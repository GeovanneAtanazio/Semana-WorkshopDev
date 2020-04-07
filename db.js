const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function(){
    //Cria a tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );`)
    //Insere dado na tabela
    
        const query = 
            `INSERT INTO ideas(image,
                               title,
                               category,
                               description,
                               link) 
                               VALUES (?,?,?,?,?);`

        const values = [
            "https://image.flaticon.com/icons/svg/2729/2729007.svg",
            "Cursos de Programação",
            "Estudo",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis fuga labore dolores fugit quibusdam earum commodi praesentium deserunt in a ducimus accusamus voluptatem et ratione, iste magnam aspernatur! Similique, cumque!",
            "#"]
        
        db.run(query,values, function(err){
            if(err) return console.log(err)
            console.log(this)
        })
       
    //Consultar dados na tabela
    /*
    db.all(`SELECT * FROM ideas`,function(err,rows){
        if(err) return console.log(err)
        console.log(rows)        

    })
    */
    //Deletar um dado na tabela
    /*
    db.run(`DELETE FROM ideas WHERE id = ?`,[1],function(err) {
        if(err) return console.log(err)
        console.log('DELETEI',this)
        
    })
    */

})

module.exports = db