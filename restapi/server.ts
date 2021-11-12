import express from 'express';
import cors from 'cors';

import db from './db/db.js';
import userRouter from './routes/user';

const PORT = process.env.port || 4010;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.listen(PORT, async () => {
        db.authenticate()
        .then(() =>  console.log('Connection has been established successfully.'))
        .catch(console.error)
});
