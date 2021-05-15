import express from "express";
import morgan from 'morgan';

const server = express();
const PORT = 3000;

const createUrl = (version, path) => "/api/"+version+"/"+path;
const VEHICLE_URL = createUrl("v1", "vehicle");

const jsonErrorHandler = async (err, req, res, next) => {
    res.status(500).send({ error: err });
}

server.use(express.json());
server.use(morgan("tiny"));
server.use(jsonErrorHandler);

server.listen(PORT, () => {
    console.log("Server running on port "+PORT);
});