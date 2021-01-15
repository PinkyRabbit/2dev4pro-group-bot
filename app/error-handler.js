async function errorHandler(context, next) {
  try {
    await next();
    const status = context.status || 404;
    if (status === 404) {
      context.throw(404, 'Route is not exists');
    }
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    context.throw(error.status, error.message);
  }
}

function initErrorHandler(app) {
  app.use(errorHandler);
}

module.exports = { initErrorHandler };
