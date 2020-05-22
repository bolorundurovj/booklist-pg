const express = require('express');

const app = express();

let PORT = 5005;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);    
});