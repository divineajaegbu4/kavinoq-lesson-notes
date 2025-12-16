import express from "express"

const app = express();

const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  
  // VERY IMPORTANT: Call next() to pass control to the next middleware
  next();
};

// Use it in your app
app.use(requestLogger);

// Now, every request will be logged to the console!
app.get('/', (req, res) => {
    res.send({
      name: "Divine",
      sex: "single",
      age: 40
    });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});


// The Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for the developer
  
  // Send a generic, safe response to the client
  res.status(500).send('Something broke!');
});
