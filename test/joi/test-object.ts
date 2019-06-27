// tslint:disable-next-line:no-implicit-dependencies
import { JSONSchema4 } from 'json-schema';
import { resolveJoiObjectSchema, generateObjectJoi } from '../../src/joi/object';
import { createLogger, TestItem, runTest } from './common';

const logger = createLogger('test-string');
// tslint:disable-next-line:naming-convention
const objectJSONSchemaTemplate: JSONSchema4 = {
  type: 'object',
};

const testItems: TestItem[] = [
  {
    title: 'properties',
    schema: {
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        address: { type: 'string' },
        telephone: { type: 'any' }
      },
      required: ['name', 'email']
    },
    targetJoiSchema: {
      type: 'object',
      keys: {
        name: {
          type: 'string',
          required: true,
        },
        email: {
          type: 'string',
          required: true,
        },
        address: {
          type: 'string',
        },
        telephone: {
          type: 'any',
        },
      },
      unknown: true,
    },
    targetJoiString:
      'Joi.object().keys({\n' +
      '  name: Joi.string().required(),\n' +
      '  email: Joi.string().required(),\n' +
      '  address: Joi.string(),\n' +
      '  telephone: Joi.any(),\n' +
      '}).unknown()',
  },
  {
    title: 'properties, additionalProperties = false',
    schema: {
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        address: { type: 'string' },
        telephone: { type: 'string' }
      },
      required: ['name', 'email'],
      additionalProperties: false,
    },
    targetJoiSchema: {
      type: 'object',
      keys: {
        name: {
          type: 'string',
          required: true,
        },
        email: {
          type: 'string',
          required: true,
        },
        address: {
          type: 'string',
        },
        telephone: {
          type: 'string',
        },
      },
      unknown: false,
    },
    targetJoiString:
      'Joi.object().keys({\n' +
      '  name: Joi.string().required(),\n' +
      '  email: Joi.string().required(),\n' +
      '  address: Joi.string(),\n' +
      '  telephone: Joi.string(),\n' +
      '}).unknown(false)',
  },
  {
    title: 'properties, additionalProperties = true',
    schema: {
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        address: { type: 'string' },
        telephone: { type: 'string' }
      },
      required: ['name', 'email'],
      additionalProperties: true,
    },
    targetJoiSchema: {
      type: 'object',
      keys: {
        name: {
          type: 'string',
          required: true,
        },
        email: {
          type: 'string',
          required: true,
        },
        address: {
          type: 'string',
        },
        telephone: {
          type: 'string',
        },
      },
      unknown: true,
    },
    targetJoiString:
      'Joi.object().keys({\n' +
      '  name: Joi.string().required(),\n' +
      '  email: Joi.string().required(),\n' +
      '  address: Joi.string(),\n' +
      '  telephone: Joi.string(),\n' +
      '}).unknown()',
  },
  {
    title: 'properties, required some properties but properties empty',
    schema: {
      required: ['name', 'email'],
    },
    targetJoiSchema: {
      type: 'object',
      keys: {
        name: {
          type: 'any',
          required: true,
        },
        email: {
          type: 'any',
          required: true,
        },
      },
      unknown: true,
    },
    targetJoiString:
      'Joi.object().keys({\n' +
      '  name: Joi.any().required(),\n' +
      '  email: Joi.any().required(),\n' +
      '}).unknown()',
  },
  {
    title: 'properties, required some properties but properties don\'t cover them',
    schema: {
      properties: {
        a: { type: 'integer' },
        b: { type: 'string' },
      },
      required: ['name', 'email'],
    },
    targetJoiSchema: {
      type: 'object',
      keys: {
        name: {
          type: 'any',
          required: true,
        },
        email: {
          type: 'any',
          required: true,
        },
        a: { type: 'number', integer: true },
        b: { type: 'string' },
      },
      unknown: true,
    },
    targetJoiString:
      'Joi.object().keys({\n' +
      '  a: Joi.number().integer(),\n' +
      '  b: Joi.string(),\n' +
      '  name: Joi.any().required(),\n' +
      '  email: Joi.any().required(),\n' +
      '}).unknown()',
  },
];

describe('joi object', () => {
  runTest(testItems, objectJSONSchemaTemplate, resolveJoiObjectSchema, generateObjectJoi, logger);
});
