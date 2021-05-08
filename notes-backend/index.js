const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
require('dotenv/config');
const postsRoute = require('./routes/posts');
const cors = require('cors');


//MiddleWares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}))

app.use('/api', postsRoute);





mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;

db.on('Error', console.error.bind(console, 'MongoDB connection error:'));


app.get('/', (req, res) => {
	res.send('Hello World!');
});



app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
