import Koa from 'koa';
import koaRouter from 'koa-router';
import helmet from 'koa-helmet';
import winston from 'winston';
import { errorResponder } from './middleware/error-responder';
import { REQUEST_LOGS } from './project-env';
import { fibonacciController } from './fibonacci.controller';

// Entry point for all modules.
const api = koaRouter()
  .get('/', fibonacciController);

// Top level server configuration.
export const app = new Koa();

if (REQUEST_LOGS) {
  app.use(require('koa-morgan')('combined'));
}

app
  .use(helmet())
  .use(errorResponder)
  .use(api.routes())
  .use(api.allowedMethods());

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  winston.info(`Starting server on port ${PORT}`);
  app.listen(PORT);
}
