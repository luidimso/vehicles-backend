import express from "express";
import vehicles from "../database/vehicles.json";
import fs from 'fs';
import { createVehicleSchema, updateVehicleSchema } from '../models/vehicle.model.js';

const router = express.Router();

router.get("/", (req, resp) => {
    resp.json(vehicles);
});

router.post("/", createVehicleSchema, (req, resp) => {
    vehicles.push(req.body);
    fs.writeFileSync("./data/books.json", JSON.stringify(vehicles));
    resp.status(200).send("OK");
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