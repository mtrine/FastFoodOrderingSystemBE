const express =require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const authRoute=require('./routes/auth');
const cartRoute=require('./routes/cart');
const foodRoute=require('./routes/food');
const foodTypesRoute=require('./routes/foodType');
const orderRoute=require('./routes/order');
const favaoriteRoute=require('./routes/favorite');
const userRoute=require('./routes/user')
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
app.use('/v1/carts', cartRoute);
app.use('/v1/foods', foodRoute);
app.use('/v1/foodTypes', foodTypesRoute);
app.use('/v1/orders', orderRoute);
app.use('/v1/favorites', favaoriteRoute);
app.use('/v1/users',userRoute);