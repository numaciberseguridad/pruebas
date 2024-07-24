// Vulnerable JavaScript Example Code

// 1. Import necessary modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

// 2. Setup middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 3. Database connection (potentially hardcoded credentials)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'vulnerable_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the database!');
});

// 4. Home route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Vulnerable App</h1>');
});

// 5. SQL Injection Vulnerable Route
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const query = `SELECT * FROM users WHERE id = ${userId}`;
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// 6. XSS Vulnerable Route
app.get('/greet', (req, res) => {
    const name = req.query.name;
    res.send(`<h1>Hello, ${name}</h1>`);
});

// 7. Insecure Authentication
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    connection.query(query, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send('Login successful!');
        } else {
            res.send('Invalid credentials');
        }
    });
});

// 8. Insecure Data Handling
app.post('/signup', (req, res) => {
    const { username, password, email } = req.body;
    const query = `INSERT INTO users (username, password, email) VALUES ('${username}', '${password}', '${email}')`;
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.send('User registered successfully');
    });
});

// 9. Lack of Authorization
app.get('/admin', (req, res) => {
    const query = 'SELECT * FROM admin_data';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// 10. Directory Traversal
app.get('/files/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(__dirname + '/public/' + filename);
});

// 11. Insecure Session Handling
app.post('/set-session', (req, res) => {
    req.session.username = req.body.username;
    res.send('Session set');
});

app.get('/get-session', (req, res) => {
    res.send(`Session user: ${req.session.username}`);
});

// 12. Using deprecated API (crypto.createCipher)
const crypto = require('crypto');

app.post('/encrypt', (req, res) => {
    const cipher = crypto.createCipher('aes192', 'a_password');
    let encrypted = cipher.update(req.body.text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    res.send(`Encrypted text: ${encrypted}`);
});

// 13. Hardcoded sensitive information
const apiKey = '12345-abcde-67890-fghij';

// 14. CSRF Vulnerable Route
app.post('/transfer', (req, res) => {
    const { fromAccount, toAccount, amount } = req.body;
    const query = `UPDATE accounts SET balance = balance - ${amount} WHERE account_id = ${fromAccount}`;
    connection.query(query, (err, results) => {
        if (err) throw err;
        const query2 = `UPDATE accounts SET balance = balance + ${amount} WHERE account_id = ${toAccount}`;
        connection.query(query2, (err, results) => {
            if (err) throw err;
            res.send('Transfer successful');
        });
    });
});

// 15. Insecure Randomness
app.get('/random', (req, res) => {
    const randomValue = Math.floor(Math.random() * 1000000);
    res.send(`Random value: ${randomValue}`);
});

// 16. Lack of input validation
app.post('/update-profile', (req, res) => {
    const { userId, email } = req.body;
    const query = `UPDATE users SET email = '${email}' WHERE id = ${userId}`;
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.send('Profile updated');
    });
});

// 17. Hardcoded API endpoint
const thirdPartyApi = 'https://api.example.com/data';

// 18. Information Disclosure
app.get('/debug', (req, res) => {
    res.send(`Debug info: ${JSON.stringify(process.env)}`);
});

// 19. Insecure File Upload
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded');
});

// 20. Exposing server internals
app.get('/server-info', (req, res) => {
    res.send(`Server info: ${JSON.stringify(process.versions)}`);
});

// 21. Command Injection
const { exec } = require('child_process');

app.get('/exec', (req, res) => {
    const command = req.query.command;
    exec(command, (err, stdout, stderr) => {
        if (err) {
            res.send(`Error: ${stderr}`);
        } else {
            res.send(`Output: ${stdout}`);
        }
    });
});

// 22. Unrestricted File Download
app.get('/download', (req, res) => {
    const file = req.query.file;
    res.download(file);
});

// 23. Weak Password Policy
app.post('/weak-password', (req, res) => {
    const password = req.body.password;
    if (password.length < 6) {
        res.send('Password is too weak');
    } else {
        res.send('Password is strong enough');
    }
});

// 24. Vulnerable Dependency
const vulnerableLibrary = require('vulnerable-library');

app.get('/vulnerable-lib', (req, res) => {
    vulnerableLibrary.run();
    res.send('Vulnerable library executed');
});

// 25. Insecure CORS Configuration
const cors = require('cors');
app.use(cors({ origin: '*' }));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// 26. Hardcoded secrets
const secretKey = 'mysecretkey';

// 27. Insecure Logging
app.post('/login-logging', (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt: ${username}, ${password}`);
    res.send('Login logged');
});

// 28. Insecure Redirects
app.get('/redirect', (req, res) => {
    const url = req.query.url;
    res.redirect(url);
});

// 29. Overly permissive permissions
app.post('/set-permissions', (req, res) => {
    const { userId, permissions } = req.body;
    const query = `UPDATE users SET permissions = '${permissions}' WHERE id = ${userId}`;
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.send('Permissions updated');
    });
});

// 30. Insufficient Transport Layer Protection
app.post('/insecure-transport', (req, res) => {
    res.send('Data sent over HTTP');
});
