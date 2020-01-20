const { Schema, model} = require('mongoose');
const pointSchema = require('./utils/pointSchema');

const devSchema = new Schema({
    github_username: String,
    name: String,
    avatar_url: String,
    bio: String,
    techs: [String],
    location: {
        type: pointSchema,
        index: '2dsphere'
    }
},
{
    timestamps: true
});

module.exports = model('Dev', devSchema);