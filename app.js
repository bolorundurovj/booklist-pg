const express = require('express');

const app = express();

let PORT = 5005;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);    
});