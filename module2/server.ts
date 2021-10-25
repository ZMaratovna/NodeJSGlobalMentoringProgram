import express from 'express';
import cors from 'cors';

import userRouter from './routes/user';

const PORT = process.env.port || 4010;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
