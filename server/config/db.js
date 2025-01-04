const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'akash231002@',
    database: 'practical_tech'
});

db.connect((error) => {
    if(error){
        console.error("Database not connected", error);
        return;
    }
    console.log("Database Connected");
});

module.exports = db;