const mongoose = require('mongoose');

const mongoDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(
      `Mongodb connected : ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (err) {
    console.log(`Database Errr ${err.message}`);
  }
};

module.exports = mongoDb;
