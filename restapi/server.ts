import express from 'express';
import cors from 'cors';

import db from './db/db';
import userRouter from './routes/user';
import groupRouter from './routes/group';

const PORT = process.env.PORT || 4010;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/group', groupRouter);
app.listen(PORT, async () => {
        db.authenticate()
        .then(() =>  console.log(`Connection has been established successfully.Server listening on port ${PORT}`))
        .catch(console.error)
});
