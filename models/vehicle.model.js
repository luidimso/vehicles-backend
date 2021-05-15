import Joi from 'joi';
import { validateRequest } from '../common/schema-validator.js';

export function vehicleSchema(req, res, next) {
    const schema = Joi.object({
        placa: Joi.string().length(7).required(),
        chassi: Joi.string().required(),
        renavam: Joi.string().required(),
        modelo: Joi.string().required(),
        marca: Joi.string().required(),
        ano: Joi.number().required()
    });
    validateRequest(req, next, schema);
}