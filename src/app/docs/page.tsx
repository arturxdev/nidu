'use client';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

import { z } from 'zod';
import { ZodOpenApiOperationObject, createDocument, extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

const file = z.string().openapi({
  description: 'Job title',
  example: 'My job',
});
const proccessFile: ZodOpenApiOperationObject = {
  operationId: 'proccessBbvaCredit',
  summary: 'Get Job',
  responses: {
    '200': {
      description: 'Successful operation',
      content: {
        'multipart/form-data': { schema: z.object({ file }) },
      },
    },
  },
};

const document = createDocument({
  openapi: '3.1.0',
  info: {
    title: 'Nidu API',
    version: '1.0.0',
  },
  paths: {
    '/process/bbva/credit': {
      post: proccessFile
    },
    '/process/bbva/debit': {
      post: proccessFile
    },
    '/process/amex/credit': {
      post: proccessFile
    },
  },
});
export default function App() { return <SwaggerUI spec={document} /> }
