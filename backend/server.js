const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes')
const path =require('path');

const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
connectDB();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(cors());

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);


app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

app.use(errorHandler);
app.listen(port, () => console.log(`SERVER IS RUNNING ON ${port}`));
