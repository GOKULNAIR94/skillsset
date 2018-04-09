'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const restService = express();
var https = require('https');
var fs = require('fs'),
    path = require('path');
restService.use(bodyParser.urlencoded({
    extended: true
}));
restService.use(bodyParser.json());

restService.get('/', onRequest);
restService.use(express.static(path.join(__dirname, '/')));


function onRequest(request, response) {
    response.sendFile(path.join(__dirname, '/index.html'));
}

restService.get('/api/skills', function(request, response) {
    var data = fs.readFileSync('./data/data.json');
    let skills = JSON.parse(data);
    console.log("skills : " + skills);
    response.json(skills);
});

restService.post('/api/skills', function(request, response) {
    var data = request.body;
    console.log("Input : " + data);
    var skillSet = require('./data/data.json');
    skillSet.push(data);
    fs.writeFileSync('./data/data.json', JSON.stringify(skillSet));
    response.json({
        "Status": "200"
    });
});

restService.put('/api/skills/:id/update', function(request, response) {
    var id = request.params.id;
    var name = request.body.skill.name;
    var status = request.body.skill.status;
    console.log("id : " + id);
    var skillSet = require('./data/data.json');
    var skill = skillSet.filter(x => {
        return x.id == id
    });
    skill[0].name = name;
    skill[0].status = status;
    console.log(JSON.stringify(skill))
    fs.writeFileSync('./data/data.json', JSON.stringify(skillSet));
    response.json({
        "Status": "200"
    });
});

restService.listen((process.env.PORT || 8888), function() {
    console.log("Server up and listening");
});