import express from "express";
import vehicles from "../database/vehicles.json";
import id from "../database/id.json";
import fs from 'fs';
import { createVehicleSchema, updateVehicleSchema } from '../models/vehicle.model.js';

const router = express.Router();

router.get("/", (req, resp) => {
    resp.json(vehicles);
});

router.post("/", createVehicleSchema, (req, resp) => {
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

router.put("/", updateVehicleSchema, (req, resp) => {
    console.log(req.body);
    resp.end();
});

router.delete("/", (req, resp) => {
    console.log("Testing")
    resp.end();
});

export default router;