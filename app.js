const app = require('./index'); 

// starting server
app.listen(process.env.PORT, () => {
  console.log(`server started on PORT: ${process.env.PORT}`);
});
