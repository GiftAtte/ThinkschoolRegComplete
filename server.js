const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, () => {
    console.log('db connected..')
})




const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`app running on http://localhost:${PORT}`);
})