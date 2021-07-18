const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware');
const path = require('path');

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

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

// routes
app.use(express.static(path.join(__dirname, '..', 'public')));
// app.use(express.static(path.join(__dirname, 'build')));
app.use(authRoutes);
app.get('*', requireAuth, (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  // res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
