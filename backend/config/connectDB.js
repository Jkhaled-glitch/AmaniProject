const mongoose = require('mongoose')
const databaseUrl = "mongodb+srv://khaled123:khaled123@khaledcluster.cjhcjge.mongodb.net/amaniDB?retryWrites=true&w=majority"

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('db connected'))
  .catch(() => console.log('problem when connecting with DB'))

module.exports = mongoose;