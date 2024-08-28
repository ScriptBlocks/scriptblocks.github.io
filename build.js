const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const fsExtra = require('fs-extra');

// Define paths
const outputDir = path.join(__dirname, 'build');
const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');  // Source for static assets

// Function to render EJS templates to static HTML
const renderEjsToHtml = async (template, data = {}, outputFile) => {
  try {
    const html = await ejs.renderFile(path.join(viewsDir, template), data);
    fs.writeFileSync(path.join(outputDir, outputFile), html);
    console.log(`Rendered ${template} to ${outputFile}`);
  } catch (err) {
    console.error(`Error rendering ${template}:`, err);
  }
};

// Function to copy all files from the public folder to the build folder
const copyPublicFolder = async () => {
  try {
    if (fs.existsSync(publicDir)) {
      await fsExtra.copy(publicDir, outputDir, { overwrite: true });
      console.log('Copied public folder to build directory');
    } else {
      console.warn('Public directory does not exist:', publicDir);
    }
  } catch (err) {
    console.error('Error copying public folder:', err);
  }
};

// Build function
const build = async () => {
  // Create the output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log('Created output directory:', outputDir);
  }

  // Render EJS templates with dynamic title data
  await renderEjsToHtml('index.ejs', { title: 'Home' }, 'index.html');
  await renderEjsToHtml('downloads.ejs', { title: 'Downloads' }, 'downloads.html');

  // Copy static files from public folder to build folder
  await copyPublicFolder();
};

// Run the build process
build().catch(console.error);
