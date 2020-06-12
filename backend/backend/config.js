const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      path = require('path')
      cors = require('cors'),
      routes = require('./routes'),
      databaseUrl = "mongodb://localhost:27017/todoAppData"


mongoose.connect(databaseUrl,{ useNewUrlParser: true,useUnifiedTopology: true });
mongoose.connection.on('connected', ()=> {
    console.log('Connected to Database '+databaseUrl);
});

mongoose.connection.on('error', (err)=> {
    console.log('Database error '+err);
});
const todoApi = express();

todoApi.use(bodyParser.json());

todoApi.use(cors());
todoApi.use(express.static(path.join(__dirname,'client')));
todoApi.use('/',routes);

// todoApi.get('*',(req,res) => {
//     res.sendFile(path.join(__dirname,'client/index.html'));
// });

todoApi.set('port', 3000);
todoApi.set('publicHost', '0.0.0.0');

module.exports = { todoApi }
