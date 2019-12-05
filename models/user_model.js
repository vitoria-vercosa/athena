// const mongodb = require('mongodb');
// const getDB = require('../util/database').getDB;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/athena', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        nome : String,
        nickname : String,
        dataNasc : Date,
        email : String,
        DDD : Number,
        telefone : Number,
        operadora : String,
        disciplinas : {
            type: [Schema.Types.ObjectId],
            ref: 'Disciplina'
        },
        horarios: {
            segunda: Number,
            terca: Number,
            quarta: Number,
            quinta: Number,
            sexta : Number,
            sabado: Number,
            domingo : Number
        }
    }
);

module.exports = mongoose.model('User', UserSchema);