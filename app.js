const express= require('express');
const app= express();
const path=require('path');
const PORT= process.env.APP_PORT || 3000;

//routes'
const storeRouters= require("./routes/storeRouter")

//stylesheets
app.use(express.static(path.join(__dirname,'public')));

//veiw engine 
app.set('views',path.join(__dirname,'views'));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended:true}));

app.use("/",storeRouters);

app.listen(PORT,()=>{
    console.log(`The server is listening at PORT ${PORT}`)
})

