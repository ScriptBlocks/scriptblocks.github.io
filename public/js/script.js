document.querySelectorAll('.code-copy').forEach(button => {
    button.addEventListener('click', function() {
        // Find the closest .code-block ancestor of the clicked button
        const codeBlock = this.closest('.code-block');
        
        // Select the text content of the .code-block > pre > code element
        const codeText = codeBlock.querySelector('pre > code').textContent;
        
        // Copy the text to the clipboard
        navigator.clipboard.writeText(codeText)
            .then(() => {
                console.log('Code copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy code: ', err);
            });
    });
});

// Function to highlight code blocks
function highlightCode() {
    document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
    });
}

// Call the function when the document is ready
document.addEventListener('DOMContentLoaded', highlightCode);
