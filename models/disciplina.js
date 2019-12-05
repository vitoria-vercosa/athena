// const mongodb = require('mongodb');
// const getDB = require('../util/database').getDB;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/athena', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;

const DisciplinaSchema = new Schema(
    {
        nome: {
            type: String,
            required: true
        },
        conteudo: {
            type: [Schema.Types.ObjectId],
            ref: 'Conteudo'
        }
    }
);

module.exports = mongoose.model('Disciplina', DisciplinaSchema);