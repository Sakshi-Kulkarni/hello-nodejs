const express =require("express");
const mysql =require("mysql");
const dotenv=require("dotenv");
const path=require('path');

dotenv.config({path:'./.env'});
const app = express();

const db=mysql.createConnection({
    host:process.env.DADATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});

const publicDirectory=path.join(__dirname,'./public')

app.use(express.static(publicDirectory));

//parse url-encoded bodies (as sent by html forms)
app.use(express.urlencoded({extended:false}));
//parse json bodies (as sent by api clients)
app.use(express.json())
app.set('view engine','hbs');


db.connect((error)=>{
if(error){
    console.log(error)
}else{
    console.log("MYSQl CONNECTed......")
}
})


 //define routes
 app.use('/',require('./routes/paages'));
 app.use('/auth',require('./routes/auth'));



app.listen(5000,()=>{
    console.log("server started on port 5000");
})