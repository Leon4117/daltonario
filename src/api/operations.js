const mysql = require('mysql');

function buscar(con){
    let selectQuery = "select * from inductive_sensors where model = 'IS-08-A2-03';"
    con.query(selectQuery, function(err, result){
        if(err) throw err
        console.log(result)
    })
}

function nombreTablas(con, callback){
    let tablaQuery = "select table_name, column_name from information_schema.columns where table_schema = 'cotizador';"
    
    con.query(tablaQuery, function(err, result){
        if(err) throw err
        callback(result)
    })
}

module.exports = {nombreTablas}