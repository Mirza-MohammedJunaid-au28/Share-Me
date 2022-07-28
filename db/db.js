const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'root',
    database: 'ShareMe'
});

connection.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('[ Connection Established ] . . .');
    }
})

module.exports = connection;