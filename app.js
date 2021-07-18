const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const path = require('path');

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.get('*', checkUser);
app.use(authRoutes);
app.use(express.static(path.join(__dirname, 'build')));
// app.get('/*', (req, res) => {
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// database connection
const dbURI =
  'mongodb+srv://yaron:PsyKYGaiIZBPFZOu@cluster0.vx4mi.mongodb.net/node-auth';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(process.env.PORT || 5000))
  .catch((err) => console.log(err));
