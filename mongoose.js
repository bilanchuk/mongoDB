var mongoose = require('mongoose');
mongoose.connect('mongodb://user1:user22@ds135952.mlab.com:35952/mybase');
console.log('mongoDB connected!!');
module.exports=mongoose;