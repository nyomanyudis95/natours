const dotenv = require('dotenv'); //untuk menaruh conf.env ke dalam enviroment variable

dotenv.config({ path: './conf.env' });
const app = require('./app');
//enviroment variable
console.log(app.get('env')); // untuk melihat state enviroment development atau production
console.log(process.env); // untuk melihat seluruh enviroment variable yang tersedia
// Untuk menambahkan custom enviroment variable , bisa dilakukan di command line sebagai contoh SET NODE_ENV=Development nodemon server.js

//Http Connectioncls
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
