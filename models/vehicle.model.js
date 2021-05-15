import Joi from 'joi';
import { validateRequest } from '../common/schema-validator.js';

export function createVehicleSchema(req, res, next) {
    const schema = Joi.object({
        placa: Joi.string().required(),
        chassi: Joi.string().required(),
        renavam: Joi.string().required(),
        modelo: Joi.string().required(),
        marca: Joi.string().required(),
        ano: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

export function updateVehicleSchema(req, res, next) {
    const schema = Joi.object({
        placa: Joi.string().empty(''),
        chassi: Joi.string().empty(''),
        renavam: Joi.string().empty(''),
        modelo: Joi.string().empty(''),
        marca: Joi.string().empty(''),
        ano: Joi.number().empty('')
    });
    validateRequest(req, next, schema);
}