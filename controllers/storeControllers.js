// const db= require("../db/queries.js");

async function getAllGames(req,res){
    console.log('Hey')
}

async function getAllGenres(req, res){
    console.log('Hey')
}

function getCreateForm(req,res){
    
    res.render("createGame")
}

async function postCreateForm(req, res){
    console.log(req.body);
}

module.exports={
    getAllGames, 
    getAllGenres, 
    getCreateForm, 
    postCreateForm
}