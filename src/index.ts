import 'reflect-metadata';

import app from './app';
import mongoose from 'mongoose';
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const LOCAL_DB = 'mongodb://127.0.0.1:27017/project-work';

mongoose.set('debug', true);
mongoose.connect(LOCAL_DB)
  .then(_ => {
    console.log('Connected to db');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error(err);
  })
