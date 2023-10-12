const app = require('./app');
const dotenv = require('dotenv');
dotenv.config('./config.env');
const PORT = process.env.RUNNING_PORT || 5050;

app.listen(PORT, ()=>{
    console.log(`App running at port ${PORT}`);
})