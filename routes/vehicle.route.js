import express from "express";
import vehicles from "../database/vehicles.json";
import id from "../database/id.json";
import fs from 'fs';
import { vehicleSchema } from '../models/vehicle.model.js';

const router = express.Router();

router.get("/", (req, resp) => {
    resp.json(vehicles);
});

//Rota para buscar todos os valores de chassi, modelo, marca e ano dos veículos cadastrados
//Essa rota é usada para popular as opções de filtro na página principal do frontend
router.get("/filter", (req, resp) => {
    var filter = {
        chassis: vehicles.filter(
            (option, i, arr) => arr.findIndex(o => o.chassi === option.chassi) === i
        ),
        modelos: vehicles.filter(
            (option, i, arr) => arr.findIndex(o => o.modelo === option.modelo) === i
        ),
        marcas: vehicles.filter(
            (option, i, arr) => arr.findIndex(o => o.marca === option.marca) === i
        ),
        anos: vehicles.filter(
            (option, i, arr) => arr.findIndex(o => o.ano === option.ano) === i
        ),
    }

    var filterToSend = {
        chassis: [],
        modelos: [],
        marcas: [],
        anos: []
    }

    for(var i=0; i<filter.chassis.length; i++) {
        filterToSend.chassis.push(filter.chassis[i].chassi);
    }
    for(var i=0; i<filter.modelos.length; i++) {
        filterToSend.modelos.push(filter.modelos[i].modelo);
    }
    for(var i=0; i<filter.marcas.length; i++) {
        filterToSend.marcas.push(filter.marcas[i].marca);
    }
    for(var i=0; i<filter.anos.length; i++) {
        filterToSend.anos.push(filter.anos[i].ano);
    }

    resp.status(200).send(filterToSend);
});


router.post("/", vehicleSchema, (req, resp) => {
    var newVehicle = req.body;
    newVehicle["id"] = id.currentID;
    vehicles.push(req.body);

    try {
        fs.writeFileSync("./database/vehicles.json", JSON.stringify(vehicles));
        id.currentID++;
        fs.writeFileSync("./database/id.json", JSON.stringify({currentID: id.currentID}));
        resp.status(200).send(vehicles);
    } catch(err) {
        resp.status(500).send(err);
    }
});


router.put("/:id", vehicleSchema, (req, resp) => {
    var indexToUpdate = null;

    console.log(req.body);
    console.log(req.params.id)

    for(var i=0; i<vehicles.length; i++) {
        if(req.params.id == vehicles[i].id) {
            var idToUpdate = vehicles[i].id;
            vehicles[i] = req.body;
            vehicles[i]["id"] = idToUpdate;
            indexToUpdate = i;
            i = vehicles.length;
        }
    }

    if(indexToUpdate != null) {
        try {
            fs.writeFileSync("./database/vehicles.json", JSON.stringify(vehicles));
            resp.status(200).send(vehicles);
        } catch(err) {
            resp.status(500).send(err);
        }
    } else {
        resp.status(404).send({message: "Vehicle not found"});
    }
});


router.delete("/:id", (req, resp) => {
    var indexToDelete = null;

    for(var i=0; i<vehicles.length; i++) {
        if(req.params.id == vehicles[i].id) {
            indexToDelete = i;
            i = vehicles.length;
        }
    }

    if(indexToDelete != null) {
        vehicles.splice(indexToDelete, 1);

        try {
            fs.writeFileSync("./database/vehicles.json", JSON.stringify(vehicles));
            resp.status(200).send(vehicles);
        } catch(err) {
            resp.status(500).send(err);
        }
    } else {
        resp.status(404).send({message: "Vehicle not found"});
    }
});

export default router;