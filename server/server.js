const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const userRouter = require('./routes/userRouter');
const serverRouter = require('./routes/serverRouter');
const commentRouter = require('./routes/commentRouter');
const orderRouter = require('./routes/orderRouter');
const purchaseRouter = require('./routes/purchaseRouter');
const ratingRouter = require('./routes/ratingRouter');
const pocketRouter = require('./routes/pocketRouter');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  credentials: true,
  origin: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
}));

app.use('/api/user', userRouter);
app.use('/api/server', serverRouter);
app.use('/api/comment', commentRouter);
app.use('/api/order', orderRouter);
app.use('/api/purchase', purchaseRouter);
app.use('/api/rating', ratingRouter);
app.use('/api/pocket', pocketRouter);

app.listen(PORT, () => console.log(`Happy to see you, my Lord, on port ${PORT}`));
