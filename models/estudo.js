// const mongodb = require('mongodb');
// const getDB = require('../util/database').getDB;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/athena', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;

const EstudoSchema = new Schema(
    {
        
        tempoEstudado: {
            horas : Number,
            min : Number,
            seg : Number
        },
        conteudo: {
            type: [Schema.Types.ObjectId],
            ref: 'Conteudo',
            required: true
        },
        user: {
            type : Schema.Types.ObjectId,
            ref:'User',
            required: true
        },
        data: {
            type: Date,
            required: true
        }
    }
);

module.exports = mongoose.model('Disciplina', DisciplinaSchema);