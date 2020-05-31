"use strict"
const express = require('express');
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.json());

const USERS = [
    {id: '01',userName:'xiaoming',password:'80'},
    {id: '02',userName:'xiaohong',password:'90'},
    {id: '03',userName:'xiaogang',password:'83'},
    {id: '04',userName:'xiaoli',password:'60'},
    {id: '05',userName:'xiaozhu',password:'70'},

];

const LoginId = [
    {userName:'admin',password:'123456'},
    {userName:'admin2',password:'222222'},
    {userName:'admin3',password:'333333'},
    {userName:'admin4',password:'444444'},
    {userName:'admin5',password:'555555'},

];



app.all('*',function(req,res,next){
    res.header("access-Control-Allow-Origin","*");
    res.header("access-Control-Allow-Headers","Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    res.header("access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",'3.2.1')
    if(req.method=="OPTIONS") res.send(200);//让options请求快速返回
    else next();

})


// =======================================================登录验证部分
app.post('/loginconfirm',function(req,resp){   //登录验证
    let chick=false;
    console.log("收到请求");

    // console.log(req.params);
    // const userName =req.params.userName;

    for(let user of LoginId){
        console.log(req.body.userName+',,,'+',,,'+req.body.password);
        console.log(user.userName+',,,'+',,,'+user.password);

        if (user.userName===req.body.userName&&user.password===req.body.password) {
            chick=true;
            resp.send([chick]);
            console.log(chick);
            return;
        }             
    }
    resp.send({succ:false});
        console.log("账户名密码错误");
        resp.end();
       
    resp.end();
});
// ==================================================登录用户管理部分

app.get('/login', function (req, resp) //发送用户信息
{
    resp.send(LoginId);
    resp.end();
});

app.get('/login/:userName',function(req,resp){  //基于用户名查找   
    console.log(req.params);
    const userName =req.params.userName;
    for(let user of LoginId){
        if (user.userName===userName) {
            resp.send([user]);
            break;
        }
    }
    resp.end();
});


app.post('/login',function(req,resp){  //添加用户
    LoginId.push(req.body);
    resp.send({succ:true});
    resp.end();

});


app.put('/login',function(req,resp){  //修改密码
    let founded =false;
    for(let user of LoginId){
        if (user.userName===req.body.userName) {
            user.password=req.body.password;
            founded=true;
            break;
        }
    }
    if (founded) {
        resp.send({succ:true});
    }
    else{
        resp.send({succ:false,msg:'没有找到用户！'});
    }
    resp.end();

});


app.delete('/login/:userName',function(req,resp){  //删除成绩
    let index=0;
    let founded =false;
    
    for(let user of LoginId){
        console.log(req.params.userName);
        console.log(user.userName);

        if (user.userName===req.params.userName) {
            LoginId.splice(index,1);
            founded=true;
            break;
        }
        index++;
    }
    if (founded) {
        resp.send({
            succ : true
        });
    } else {
        resp.send({
            succ: false,
            msg: '没有找到需要删除的用户!'
        });
    }
    resp.end();
});

// =================================================学生成绩管理部分
app.get('/users', function (req, resp)//发送列表信息
{
    resp.send(USERS);
    resp.end();
});
 

app.get('/users/:id',function(req,resp){     
    console.log(req.params);
    const id =req.params.id;
    for(let user of USERS){
        if (user.id===id) {
            resp.send([user]);
            break;
        }
    }
    resp.end();
});


app.post('/user',function(req,resp){  //添加成绩
    USERS.push(req.body);
    resp.send({succ:true});
    resp.end();

});

app.put('/user',function(req,resp){  //修改成绩
    let founded =false;
    for(let user of USERS){
        if (user.id===req.body.id) {
            user.userName=req.body.userName;
            user.password=req.body.password;
            founded=true;
            break;
        }
    }
    if (founded) {
        resp.send({succ:true});
    }
    else{
        resp.send({succ:false,msg:'没有找到用户！'});
    }
    resp.end();

});


app.delete('/user/:id',function(req,resp){  //删除成绩
    let index=0;
    let founded =false;
    for(let user of USERS){
        if (user.id===req.params.id) {
          USERS.splice(index,1);
            founded=true;
            break;
        }
        index++;
    }
    if (founded) {
        resp.send({
            succ: true
        });
    } else {
        resp.send({
            succ: false,
            msg: '没有找到需要删除的用户!'
        });
    }
    resp.end();
});


// ==================================服务器监听
app.listen(8000,function(){
    console.log('服务器在8000端口启动');
});