if(process.env.NODE_ENV = "production"){
    module.exports = {mongoURI: "mongodb+srv://Albert_Lima:Albertlima123@blogapp.4aetozb.mongodb.net/?retryWrites=true&w=majority&appName=BlogApp"}
}else{
    module.exports = {mongoURI: "mongodb://127.0.0.1:27017/BlogApp"}
}