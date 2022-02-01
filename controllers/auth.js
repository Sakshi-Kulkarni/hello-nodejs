const mysql =require("mysql");
const jwt =require('jsonwebtoken');
const bcrypt= require('bcryptjs');

const db=mysql.createConnection({
    host:process.env.DADATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});
exports.register=(req,res)=>{
    console.log(req.body);

    //const name=req.body.name;
    //const email=req.body.email;
    //const password=req.body.password;
    //const passwardConfirm=req.body.passwardConfirm;

    //restruct above code into one line below like this and it destructure in js

    const{name,email,password,passwardConfirm}=req.body;

//this db query states that one user should add their account only once in database

    db.query('SELECT email FROM users WHERE email=?',[email], async(error,result)=>{
        if(error){
            console.log(error);
        }
        if(result.length > 0){
            return res.render('register',{
                message:'That email already exists please try to login with another email'
            });
        }else if(password == passwardConfirm){
            return res.render('register',{
                message:'Please fill same password on both feilds'
            });
        }


         let hashedPassword=await bcrypt.hash(password,8);
         console.log(hashedPassword);

         db.query('INSERT INTO users SET ?',{name: name,email:email,password:hashedPassword},(error,result)=>{
             if(error){
                 console.log(error);
             }else{
                 console.log(result);
                return res.render('register',{
                    message:'user register successfully'
                });
             }
         })
  
    })

 }