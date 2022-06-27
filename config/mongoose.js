const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/codeial_development');
const db=mongoose.connection;
db.on('eror',console.error.bind(console,'error h connect krne m'));
db.once('open',function(){
    console.log('Connected to database :: MongoDB');
})
module.exports=db;