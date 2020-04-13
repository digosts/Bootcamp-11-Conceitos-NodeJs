const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  try{
    const repositorie = {
      id:uuid(), 
      title, 
      url, 
      techs, 
      likes: 0
    }

    repositories.push(repositorie);
  
    return response.json(repositorie);
  }catch(e){
    return response.status(500).json({error:'Não foi possível realizar essa operação'});
  }
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;
  
  try{
    const repositorieIndex = repositories.findIndex(repo => repo.id === id);

    if(repositorieIndex < 0){
      return response.status(400).json({error:'Id não encontrado!'});
    }

    const repositorie = {
      title,
      url,
      techs
    }

    repositories[repositorieIndex] = repositorie;

    return response.json(repositorie);
  }catch(e){
    return response.status(500).json({error:'Não foi possível realizar essa operação'});
  }
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  try{
    const repositorieIndex = repositories.findIndex(repo => repo.id === id);

    if(repositorieIndex < 0){
      return response.status(400).json({error:'Id não encontrado!'});
    }

    repositories.splice(repositorieIndex, 1);

    return response.status(204).send();
  }catch(e){
    return response.status(500).json({error:'Não foi possível realizar essa operação'});
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  
  try{
    const repositorieIndex = repositories.findIndex(repo => repo.id === id);

    if(repositorieIndex < 0){
      return response.status(400).json({error:'Id não encontrado!'});
    }

    repositories[repositorieIndex].likes++;

    return response.json(repositories[repositorieIndex]);
  }catch(e){
    return response.status(500).json({error:'Não foi possível realizar essa operação'});
  }
});

module.exports = app;
