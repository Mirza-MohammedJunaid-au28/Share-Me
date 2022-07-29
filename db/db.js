const mysql = require('mysql2');

// Creating a Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'root',
    database: 'ShareMe'
});

// Connecting the Connection
connection.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('[ Connection Established ] . . .');
    }
})

module.exports = connection;