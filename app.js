const express = require('express');
const mustacheExpress = require('mustache-express');

const app = express();

const mustache = mustacheExpress();
mustache.cache = null;
app.engine('mustache', mustache);
app.set('view-engine', 'mustache')

let PORT = 5005;

app.use(express.static('public'));

app.get('/list', (req, res) => {
    res.send('Book Lists')
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);    
});