const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');


module.exports = function(){
    mongoose.connect('mongodb://divya:divya506@cluster0-shard-00-00.1z97m.mongodb.net:27017,cluster0-shard-00-01.1z97m.mongodb.net:27017,cluster0-shard-00-02.1z97m.mongodb.net:27017/Vidlyproject?ssl=true&replicaSet=atlas-t6irig-shard-0&authSource=admin&retryWrites=true&w=majority',{useUnifiedTopology: true,useUnifiedTopology: true,useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false }  )
    // mongoose.connect('mongodb://localhost/vidlyproject')
  .then(() => winston.info('Connected to MongoDB...'))

}


