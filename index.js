const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const cors = require('cors');


dotenv.config()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar con MongoDB..', err));


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.get('/', (req, res) => {
    res.send('API IS RUNNING');
})

app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)


const PORT = process.env.PORT || 5000


app.listen(PORT, console.log(`server up 5000 ${process.env.NODE_ENV}`));