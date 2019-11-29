// const mongodb = require('mongodb');
// const getDB = require('../util/database').getDB;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/athena', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;

const ConteudoSchema = new Schema(
    {
        nome: {
            type: String,
            required: true
        },
        nivel: {
            type: Number,
            required: true
        }
    }
);

module.exports = mongoose.model('Conteudo', ConteudoSchema);