const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
   director_id: Schema.Types.ObjectId,
   title:{
       type: String,
       required: [true, '`{PATH}` IS REQUIRED'],
       maxlength: 15,
       minLength: 1,
   },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
    createdAT: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movies', MovieSchema);