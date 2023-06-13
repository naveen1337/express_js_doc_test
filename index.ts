import 'reflect-metadata';
import Express, { Request, Response } from "express";
import { createExpressServer,getMetadataArgsStorage } from 'routing-controllers';
import AppController from "./src/Controllers/AppController"
import UserController from "./src/Controllers/UserController"
import { routingControllersToSpec } from 'routing-controllers-openapi'
import swaggerUi from 'swagger-ui-express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { defaultMetadataStorage } from 'class-transformer/cjs/storage'

const routingControllersOptions = {
  controllers: [AppController,UserController], // we specify controllers we want to use
}

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer(routingControllersOptions);

app.get("/",(req:Request,res:Response)=>{
  return res.json({"hello":"world"})
})

const schemas:any = validationMetadatasToSchemas({
  classTransformerMetadataStorage: defaultMetadataStorage,
  refPointerPrefix: '#/components/schemas/',
})


const storage = getMetadataArgsStorage()
const spec = routingControllersToSpec(storage, routingControllersOptions, {
  components: {
    schemas,
    securitySchemes: {
      bearerAuth: {
        scheme: 'bearer',
        type: 'http',
      },
    },
  },
  info: {
    description: 'Generated with `routing-controllers-openapi`',
    title: 'A sample API',
    version: '1.0.0',
  },
})
app.use('/docs', swaggerUi.serve,swaggerUi.setup(spec));

app.get('/spec', (req:Request, res:Response) => {
  res.json(spec)
})


app.listen(5000,()=>console.log('listening on 5000'))