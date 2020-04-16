const express = require('express');
const bodyParser = require('body-parser');
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');
const {format} = require('util');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
require('dotenv').config();

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

const server = app.listen(process.env.PORT || 3000, () => console.log('Server listening on port 3000!'));

const mysql = require('mysql');
const connection = mysql.createConnection({
    user: 'root', // e.g. 'my-db-user'
    password: '', // e.g. 'my-db-password'
    database: 'MessengerApp', // e.g. 'my-database'
    // socketPath: '/cloudsql/ardent-justice-273102:us-central1:messenger-app',
    host: 'localhost',
});

const io = require('socket.io').listen(server);
const clients = {};
io.origins('*:*');

io.on('connection', (socket) => {
    socket.on('setUserName', (param) => {
        clients[param] = socket.id;
    });
    socket.on('updateMessage', async (params) => {
        io.to(clients[params.user_to]).emit('syncMessage:receive', params);
    })
});

const storage = new Storage();

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
});
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

app.post('/server/upload_image', multer.single('file'), (req, res, next) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', err => {
        next(err);
    });

    blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        const updateIconQuery = `update users set icon_url = '${publicUrl}' where user_id = '${req.session.userId}'`;
        connection.query(updateIconQuery, (error, results) => {
           if (error) throw error;
           res.json(publicUrl);
        });
    });

    blobStream.end(req.file.buffer);
});

app.get('/server/get_user/', (req, res) => {
    connection.query('select * from users', (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/server/get_friend/:id', (req, res) => {
    connection.query(`select * from friendship where(user_id = '${req.params.id}' or friend_id = '${req.params.id}')`, (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/server/get_message/', (req, res) => {
    connection.query(`select * from message where (user_from = '${req.query.user1}' and user_to = '${req.query.user2}') or (user_from = '${req.query.user2}' and user_to = '${req.query.user1}')`, (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

app.post('/server/send_message/', (req, res) => {
    const {user_from, user_to, text, send_date} = req.body;
    const query = `insert into message(user_from,user_to,text,send_date) values ('${user_from}','${user_to}','${text}','${send_date}')`;
    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

app.post('/server/login/', (req, res, next) => {
    const id = req.body.id;
    const password = req.body.password;
    const query = 'SELECT * FROM users WHERE user_id = "' + id + '" AND password = "' + password + '" LIMIT 1';
    connection.query(query, (err, results) => {
        const userId = results.length ? results[0].user_id : false;
        if (userId) {
            req.session.userId = userId;
            req.session.displayName = results[0].display_name;
            req.session.iconUrl = results[0].icon_url;
            res.redirect('/');
        } else {
            throw new Error(err);
        }
    });
});

app.post('/server/signup/', (req, res, next) => {
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
            req.session.iconUrl = '';
            res.redirect('/login');
        }
    });
});

app.get('/server/login_info/', (req, res) => {
    if (req.session.userId) {
        res.json({id: req.session.userId, displayName: req.session.displayName, iconUrl: req.session.iconUrl})
    } else {
        throw new Error('Login info not found');
    }
});

app.get('/server/logout/', (req, res, next) => {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/server/search_user/:id', (req, res) => {
    const query = `select * from users where user_id = '${req.params.id}' limit 1`;
    connection.query(query, (err, results) => {
        if (err) {
            throw new Error(err);
        } else {
            res.json(results);
        }
    });
});

app.post('/server/register_friend/', (req, res) => {
    const query = `insert into friendship (user_id,friend_id,user_icon_url,friend_icon_url) values ('${req.body.user_id}','${req.body.friend_id}','${req.body.user_icon_url}','${req.body.friend_icon_url}')`;
    connection.query(query, (err, results) => {
        if (err) {
            throw new Error(err);
        } else {
            res.json(results);
        }
    });
});

app.post('/server/delete_friends/', (req, res) => {
    let query = 'delete from friendship where ';
    req.body.friends.forEach(friend => {
        query = query + `(user_id='${friend}' and friend_id='${req.body.userId}') or (user_id='${req.body.userId}' and friend_id='${friend}') or `
    });
    console.log(query.slice(0, -3));
    connection.query(query.slice(0, -3), (err, results) => {
        if (err) {
            throw new Error(err);
        } else {
            res.json(results);
        }
    });
});

module.exports = {
    path: '/server',
    handler: app
};
