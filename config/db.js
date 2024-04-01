if(process.env.NODE_ENV = "production"){
    module.exports = {mongoURI: "mongodb+srv://albertsousalima:albertlima123@cluster0.rwrarpg.mongodb.net/"}
}else{
    module.exports = {mongoURI: "mongodb://127.0.0.1:27017/BlogApp"}
}