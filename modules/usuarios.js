const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Usuarios = new Schema({
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    eAdmin:{
        type: Number,
        default: 0
    },
    senha:{
        type: String,
        required: true
    }
})
mongoose.model("usuarios", Usuarios)