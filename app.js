const express= require('express');
const app= express();
const path=require('path');
const PORT= process.env.APP_PORT || 3000;

//routes'
const storeRouters= require("./routes/storeRouter")

//stylesheets
const assetsPath=path.join(__dirname,"public");
app.use(express.static(assetsPath));

//veiw engine 
app.set("view engine", "ejs");

app.use(express.urlencoded({extended:true}));

app.use("/",storeRouters);

app.listen(PORT,()=>{
    `The server is listening at PORT ${PORT}`
})

