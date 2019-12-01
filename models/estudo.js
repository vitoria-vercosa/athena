// const mongodb = require('mongodb');
// const getDB = require('../util/database').getDB;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/athena', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;

const EstudoSchema = new Schema(
    {
        tempo: {
            type: String,
            required: true
        },
        conteudo: {
            type: [Schema.Types.ObjectId],
            ref: 'Conteudo',
            required: true
        },
        user: {
            type : Schema.Types.ObjectId,
            required: true
        },
        data: {
            type: Date,
            required: true
        }
    }
);

module.exports = mongoose.model('Disciplina', DisciplinaSchema);