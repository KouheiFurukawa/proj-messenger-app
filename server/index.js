const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(
    require('express-session')({
        secret: 'secret',
        resave: true,
        saveUninitialized: false,
        cookie: {
            secure: 'auto',
            maxage: 1000 * 60 * 30
        }
    })
);

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
    connection.query(`select * from message where (user_from = '${req.query.user1}' and user_to = '${req.query.user2}') or (user_from = '${req.query.user2}' and user_to = '${req.query.user1}')`, (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

app.post('/send_message/', (req, res) => {
    const {user_from, user_to, text, send_date} = req.body;
    const query = `insert into message(user_from,user_to,text,send_date) values ('${user_from}','${user_to}','${text}','${send_date}')`;
    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

app.post('/login/', (req, res, next) => {
    const id = req.body.id;
    const password = req.body.password;
    const query = 'SELECT * FROM users WHERE user_id = "' + id + '" AND password = "' + password + '" LIMIT 1';
    connection.query(query, (err, results) => {
        const userId = results.length ? results[0].user_id : false;
        if (userId) {
            req.session.userId = userId;
            req.session.displayName = results[0].display_name;
            res.redirect('http://localhost:8080/');
        } else {
            throw new Error(err);
        }
    });
});

app.post('/signup/', (req, res, next) => {
    const id = req.body.id;
    const displayName = req.body.displayName;
    const password = req.body.password;
    const query = 'INSERT INTO users (display_name, user_id, password) VALUES ("' + displayName + '", ' + '"' + id + '", ' + '"' + password + '")';
    connection.query(query, (err, rows) => {
        if (err) {
            throw new Error(err);
        } else {
            req.session.userId = id;
            req.session.displayName = displayName;
            res.redirect('/login');
        }
    });
});

app.get('/login_info/', (req, res) => {
    if (req.session.userId) {
        res.json({id: req.session.userId, displayName: req.session.displayName})
    } else {
        throw new Error('Login info not found');
    }
});

app.get('/logout/', (req, res, next) => {
    req.session.destroy();
    res.redirect('http://localhost:8080/login');
});

app.get('/search_user/:id', (req, res) => {
    const query = `select * from users where user_id = '${req.params.id}' limit 1`;
    connection.query(query, (err, results) => {
        if (err) {
            throw new Error(err);
        } else {
            res.json(results);
        }
    });
});

app.post('/register_friend/', (req, res) => {
    const query = `insert into friendship (user_id,friend_id) values ('${req.body.user_id}','${req.body.friend_id}')`;
    connection.query(query, (err, results) => {
        if (err) {
            throw new Error(err);
        } else {
            res.json(results);
        }
    });
});

app.listen(3000, () => console.log('Server listening on port 3000!'));

module.exports = {
    path: '/server',
    handler: app
};
