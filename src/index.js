const express =require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const authRoute=require('./routes/auth');

dotenv.config({path:'./src/.env'});
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Routes
app.use('/v1/auth', authRoute);