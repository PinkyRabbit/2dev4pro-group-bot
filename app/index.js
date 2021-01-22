const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const { handlerFor } = require('./handlers');
const { initErrorHandler } = require('./error-handler');
const initTelegramBot = require('./bot');

const { CORS, KOA_KEY, KOA_PORT, NODE_ENV } = process.env;

const app = new Koa();
const router = new Router();

app.use(bodyParser());

if (NODE_ENV === 'production') {
  app.use(helmet());
}

const origin = CORS ? CORS.split(',') : '*';
app.use(cors({ origin }));

function validateHeaders(context, next) {
  const key = context.headers['x-telegram-key'];
  if (!key || key !== KOA_KEY) {
    context.throw(403, 'A secret key is mandatory for KOA API!');
  }
  next();
}

initTelegramBot((bot) => {
  function addBotToContext(context, next) {
    context.request.bot = bot;
    next();
  }

  router
    .post('/reward', validateHeaders, addBotToContext, handlerFor.reward)
    .post('/topic', validateHeaders, addBotToContext, handlerFor.topic);

  app
    .use(router.routes())
    .use(router.allowedMethods());

  initErrorHandler(app);

  const PORT = Number.parseInt(KOA_PORT, 10);
  app.listen(PORT);
});

