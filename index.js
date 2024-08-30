const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

// Use port 0 to let the OS assign an available port
const PORT = 0;

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Set the 'views' directory for any views being rendered
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Function to get the latest release file URLs
async function getLatestFileUrls() {
    const repo = 'ScriptBlocks/ScriptBlocks';
    const filenames = ['scriptblocks.exe', 'scriptblocks.dmg', 'scriptblocks.tar.gz'];
    const apiUrl = `https://api.github.com/repos/${repo}/releases/latest`;

    try {
        const response = await axios.get(apiUrl);
        const assets = response.data.assets;

        const fileUrls = {};
        filenames.forEach(filename => {
            const file = assets.find(asset => asset.name === filename);
            fileUrls[filename] = file ? file.browser_download_url : null;
        });

        return fileUrls;
    } catch (error) {
        console.error('Error fetching the latest release data:', error);
        return {};
    }
}

// Define routes
app.get('/', async (req, res) => {
    const fileUrls = await getLatestFileUrls();
    res.render('index', { title: 'Home', fileUrls });
});

app.get('/store', async (req, res) => {
    res.render('store', { title: 'Store' });
});

// Start the server
const server = app.listen(PORT, () => {
    // Retrieve the dynamically assigned port
    const port = server.address().port;
    console.log(`Server is running on http://localhost:${port}`);
});