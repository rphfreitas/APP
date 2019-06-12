if(process.env.NODE_ENV == "production"){
module.exports={mongoURI:"mongodb+srv://raphaelfreitas:<rph9141>@cluster0-gmr2g.mongodb.net/test?retryWrites=true&w=majority"}
}else{
module.exports={mongoURI:"mongodb://localhost/blogapp"}
}