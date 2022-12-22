const mod = require('../packages');
const mongoose = mod.mongoose;

// DB Connectivity
const db = process.env.DB;

mongoose.set('strictQuery', true);

module.exports = mongoose.connect(db)
                    .then(res => {
                        console.log('Database is connected ' + res);
                    }).catch(err => {
                        console.log(err);
                    })