const express = require('express');
const app = express();

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'MessengerApp',
});

app.get('/get_user/', (req, res) => {
    connection.query('select * from user', (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/get_friend/', (req, res) => {
    connection.query('select * from friendship where(user_id = \'test1\' or friend_id = \'test1\')', (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/get_message/', (req, res) => {
    connection.query('select * from message where (user_from = \'test1\' and user_to = \'test2\') or (user_from = \'test2\' and user_to = \'test1\')', (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

app.post('/send_message/', (req, res) => {
    const {user_from, user_to, text, send_date} = req.body;
    connection.query(`insert into message(user_from,user_to,text,send_date) values ('${user_from}','${user_to}','${text}',${send_date})`, (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

app.listen(3000, () => console.log('Server listening on port 3000!'));

module.exports = {
    path: '/server',
    handler: app
};
