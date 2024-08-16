const express = require("express");
const session = require("express-session");
const path = require("path");
const pool = require("./config/database");
const authRoute = require("./routes/authRoute");
const webRoute = require("./routes/webRoute");
const errorRoute = require("./routes/errorRoute");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

pool.getConnection()
  .then((connection) => {
    connection.release();
  })
  .catch((err) => {
    console.error("Error connecting database:", err);
});
  
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", authRoute(pool));
app.use("/", webRoute(pool));
app.use(errorRoute());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
