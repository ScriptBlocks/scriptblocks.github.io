const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Set the 'views' directory for any views being rendered
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/', (req, res) => {
    res.render('downloads', { title: 'Downloads' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
