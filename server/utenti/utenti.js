var express = require('express');
var router = express.Router();
var listaUtenti = require('./database.json');
var jsonfile = require('jsonfile');
var path = require('path');

router.get('/', function(req, res) {
    console.log(listaUtenti);
    res.status(200).json(listaUtenti);
});

router.get('/id/:id', function(req, res) {
    var id = req.params.id;

    var utente = listaUtenti.find(function(el) {
        return el.id == id;
    });

    if (utente) {
        res.status(200).json(utente);
    } else {
        res.status(404).send("UTENTE NON TROVATO");
    }



});

router.get('/sesso', function(req, res) {
    var sesso = req.query.sesso;
    var listaFiltrata = listaUtenti.filter(function(el) {
        return el.sesso == sesso;
    });
    if (listaFiltrata.length) {
        res.status(200).json(listaFiltrata);
    } else {
        res.status(404).send("NESSUN UTENTE CON QUEL TIPO DI SESSO: " + sesso);

    }
});

router.get('/name', function(req, res) {
    var name = req.query.name;
    var listaFiltrata = listaUtenti.filter(function(el) {
        return el.name == name;
    });
    if (listaFiltrata.length) {
        res.status(200).json(listaFiltrata);
    } else {
        res.status(404).send("NESSUN UTENTE CORRISPONDE A : " + name);

    }
});

router.delete('/id/:id', function(req, res) {
    var id = req.params.id;
    var utente = listaUtenti.find(function(el) {
        return el.id == id;
    });
    var indice = listaUtenti.indexOf(utente);
    listaUtenti.splice(indice, 1);
    res.json(listaUtenti);
    jsonfile.writeFile(path.join(__dirname, "database.json"), listaUtenti, function(err) {});
});
router.post('/', function(req, res) {
    var nuovo = req.body;
    console.log(nuovo);
    //CALCOLO MAX ID
    var max = 0;
    for (let i = 0; i < listaUtenti.length; i++) {
        if (listaUtenti[i].id >= max) {
            max = listaUtenti[i].id;
        }
    }
    //ASSEGNO IL NUOVO ID
    nuovo.id = max + 1;
    //INSERISCO L'UTENTE
    listaUtenti.push(nuovo);
    //SALVO SU FILE
    jsonfile.writeFile(path.join(__dirname, "database.json"), listaUtenti,

        function(err) {
            console.log(err);
        });
    //MANDO LA NUOVO LISTA AL CLIENT
    res.json(listaUtenti);
});

router.put('/id/:id', function(req, res) {
    var id = req.params.id;
    var aggiornato = req.body;
    var vecchio = listaUtenti.find(function(el) {
        return el.id == id;
    });
    var indice = listaUtenti.indexOf(vecchio);
    listaUtenti.splice(indice, 1, aggiornato);
    jsonfile.writeFile(path.join(__dirname, "database.json"), listaUtenti,
        function(err) {
            console.log(err);
        });
    res.json(aggiornato);
});


module.exports = router;
