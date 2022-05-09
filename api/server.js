const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();



const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);


mongoose.connect(DB, { useNewUrlParser: true }).then(() => {
    console.log('db connected')
})




const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`app running on http://localhost:${PORT}`);
})