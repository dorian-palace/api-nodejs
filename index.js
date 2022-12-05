const mysql = require('mysql');
const mysqlConnection  =  mysql.createConnection({  
    host: 'localhost',  
    user: 'root',   
    password: 'root',
    database: 'api-nodejs',
    port: 8889
});

mysqlConnection.connect((err) => {
      if (err) {
        console.error('error connecting: ' + err.stack);
        console.log('disconnected');
      }else{
        console.log("connecté à ma db");
        // console.log(`connecté via l'id: ${mysqlConnection.threadId}`);
    }
});
