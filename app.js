// Import Express
const express = require('express');
const app = express();
const path = require('path');
app.set('view engine', "ejs");
const db = require ("./database/database.ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ GET Route for Login Page
app.get('/login', (req, res) => {
    res.render('signin');  
});

// ✅ POST Route for Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: '❌ Please enter both username and password.' });
    }

    db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, user) => {
        if (err) {
            return res.status(500).json({ message: '❌ Database error.' });
        }
        if (!user) {
            return res.status(401).json({ message: '❌ Invalid credentials.' });
        }
        res.json({ message: '✅ Login successful!', user });
    });
});

// ✅ GET Route for Signup Page
app.get('/signup', (req, res) => {
    res.render('signin');  
});

// ✅ POST Route for Signup
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: '❌ All fields are required.' });
    }

    db.run(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`, [username, email, password], function (err) {
        if (err) {
            return res.status(500).json({ message: '❌ User already exists or database error.' });
        }
        res.json({ message: '✅ Signup successful!', userId: this.lastID });
    });
});





// ✅ GET Route for Admin Login Page
app.get('/admin/login', (req, res) => {
    res.render('adminlogin'); 
});

// ✅ POST Route for Admin Login
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: '❌ Please enter both username and password.' });
    }

    db.get(`SELECT * FROM admins WHERE username = ? AND password = ?`, [username, password], (err, user) => {
        if (err) {
            return res.status(500).json({ message: '❌ Database error.' });
        }
        if (!user) {
            return res.status(401).json({ message: '❌ Invalid credentials.' });
        }
        // res.json({ message: '✅ Login successful!', user });
        res.redirect("/dashboard");
    });
});




// ✅ GET Route for Admin Signup Page
app.get('/admin/signup', (req, res) => {

    res.render('adminsignup');  
});

// ✅ POST Route for Admin Signup (Without bcrypt)
app.post('/admin/signup', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send("❌ All fields are required.");
    }

    
    

    db.run(
        `INSERT INTO admins (username, email, password) VALUES (?, ?, ?)`,
        [username, email, password],
        (err) => {
            if (err) {
                return res.send("❌ Error: " + err.message);
            }
            res.send(`
                <script>
                    alert('✅ Admin signup successful! Redirecting to login page...');
                    window.location.href = '/admin/login';
                </script>
            `);
        }
    );
});




// ✅ GET Route for Admin Dashboard (After Login)
app.get('/admin/dashboard', (req, res) => {
    res.send('<h1>Welcome to the Admin Dashboard!</h1>');
});


app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;

    // Dummy authentication (replace with actual user authentication logic)
    if (username === 'admin' && password === 'password') {
        // Redirect to the admin dashboard after successful login
        res.redirect('/admin/dashboard');
    } else {
        res.send('Invalid credentials! <a href="/login">Try again</a>');
    }
});









// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'assets')));

// Define a route
app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/adopt', (req, res) => {
    res.render('adopt');
});


app.get('/browse_pet', (req, res) => {
    res.render('browse_pet');
});


app.get('/get_involved', (req, res) => {
    res.render('get_involved');
});

app.get('/pet_care', (req, res) => {
    res.render('pet_care');
});


app.get('/success_stories', (req, res) => {
    res.render('success_stories');
});

app.get('/signin', (req, res) => {
    res.render('signin');  
  });
  

app.get('/donate', (req, res) => {
    res.render('donate');
});

app.get('/meet', (req, res) => {
    res.render('meet');
});


app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});


app.get('/addpet', (req, res) => {
    res.render('addpet');
});

app.get('/user_panel', (req, res) => {
    res.render('user_panel');
});

app.get('/add_pet', (req, res) => {
    res.render('add_pet');
});


// Start the server
app.listen(3001, () => {
    console.log('Server is running on http:/localhost:3001');
});