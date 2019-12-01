// const mongodb = require('mongodb');
// const getDB = require('../util/database').getDB;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/athena', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;

const RevisaoSchema = new Schema(
    {
        conteudo: {
            type: Schema.Types.ObjectId,
            ref:'Conteudo',
            required: true
        },
        tempoPrevisto: {
            type: Number,
            required: true
        },
        tempoRevisado: Number,
        status:{
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('Conteudo', ConteudoSchema);