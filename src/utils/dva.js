import { create } from 'dva-core';
import createLoading from 'dva-loading';
import { Provider } from '@tarojs/redux'
import models from '../models'

const middlewares = []
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const initialOptions = {
  initialState: {},
  models,
  onAction: middlewares,
  onError(e, dispatch) {
    // TODO: global error handling with dispath
    console.error(error)
  },
}

const init = (option = initialOptions) => {
  const app = create(option)

  // HMR workaround
  if (!global.registered) option.models.forEach(model => app.model(model));
  global.registered = true;

  // dva loading
  app.use(createLoading())

  // get store
  app.getStore = () => app._store;
  app.start()
  return app;
}

export default init