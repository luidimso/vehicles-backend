import express from "express";
import vehicles from "../database/vehicles.json";
import id from "../database/id.json";
import fs from 'fs';
import { vehicleSchema } from '../models/vehicle.model.js';

const router = express.Router();

router.get("/", (req, resp) => {
    resp.json(vehicles);
});

router.post("/", vehicleSchema, (req, resp) => {
    var newVehicle = req.body;
    newVehicle["id"] = id.currentID;
    vehicles.push(req.body);

    try {
        fs.writeFileSync("./database/vehicles.json", JSON.stringify(vehicles));
        id.currentID++;
        fs.writeFileSync("./database/id.json", JSON.stringify({currentID: id.currentID}));
        resp.status(200).send("OK");
    } catch(err) {
        resp.status(500).send(err);
    }
});

router.put("/:id", vehicleSchema, (req, resp) => {
    var indexToUpdate = null;
    var idToUpdate = null;

    for(var i=0; i<vehicles.length; i++) {
        if(req.params.id == vehicles[i].id) {
            indexToUpdate = i;
            idToUpdate = vehicles[i].id;
        }
    }

    if(indexToUpdate != null) {
        vehicles[idToUpdate] = req.body;
        vehicles[idToUpdate]["id"] = idToUpdate;

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

router.delete("/", (req, resp) => {
    console.log("Testing")
    resp.end();
});

export default router;