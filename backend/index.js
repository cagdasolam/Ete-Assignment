const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRouter = require('./router/userRouter');
const companyRouter = require('./router/companyRouter');
const productRouter = require('./router/productRouter');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.method, req.path, res.statusCode);
  next();
})

app.use('/api', userRouter)
app.use('/api/company', companyRouter);
app.use('/api/product', productRouter);

mongoose.connect(process.env.DB_URL,)
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log('Server is running on port ' + process.env.PORT + '...')
    });
  })
  .catch((err) => {
    console.log(err)
  })