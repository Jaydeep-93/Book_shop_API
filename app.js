const express = require('express'); 

const bookRouter = require('./router/book'); 

const app = express(); 

app.use('/book', bookRouter); 


app.listen(3000, () => {
    console.log('server started on PORT: 3000');
})