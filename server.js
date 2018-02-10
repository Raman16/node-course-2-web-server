
const fs=require('fs');
const express=require('express');
const hbs=require('hbs');
var app=express();

const port=process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');
app.set('view enginee','hbs');//setting up hbs enginee

app.use((req,res,next)=>{//defining Middleware
  var log=`${new Date().toString()} method:${req.method} url:${req.url}`;
  fs.appendFile('server.log',log+'\n');
  next();//without next(), application does not move forward in middleware
  //next() stops page untill request response is done like above.
})

app.use((req,res,next)=>{//middleware   //should always be on top, if we want to stop all files executed
    //i.e to exact execute remaining pages that is under public folder, we have to push
    //app.use(express.static(__dirname+'/public'));// below this code else help.html will be executed

   res.render('maintaince.hbs');//maintaince middleware
   next();  
   
});

app.use(express.static(__dirname+'/public'));//this also middleware

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase()
})


app.get('/',(req,res)=>{
    res.render('home.hbs',{
        PageTitle:'Home Page',
        Message:'Welcome to Home Page'
    })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        PageTitle:'About Page'
    })
});

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});
