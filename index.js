const express = require('express');
const app = express();
const connectDB = require('./connection/db')
var bodyParser = require('body-parser')
const models = require('./models/index')
app.use(bodyParser.urlencoded({ extended: true }));
connectDB()
const Port = process.env.Port || 3000;
app.use(express.json({ extended: false }));
const userRoute = require('./routers/userRoute')
const loginRoute = require('./routers/loginRoute')
const productRoute = require('./routers/productRoute')
const reviewRoute = require('./routers/reviewRoute')
const shopRoute = require('./routers/shopRoute')

app.use('/signup', userRoute)
app.use('/login', loginRoute)
app.use('/product', productRoute)
app.use('/shop', shopRoute)
app.use('/review', reviewRoute)

app.listen(Port, () => console.log(`port listen on ${Port}`))