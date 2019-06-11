const mongoose = require('mongoose')
const Shema = mongoose.Schema

const Usuario = new Schema({
    nome:{
        type : String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    senha: {
        type: String,
        required: true
    }
})

mongoose.model("usuarios", Usuario)