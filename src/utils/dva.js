import { create } from 'dva-core';
import createLoading from 'dva-loading';
import { autoRehydrate } from 'redux-persist';
import models from '../models'
import { set as setGlobalData } from './global'

const middlewares = []
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const initialOptions = {
  initialState: {},
  models,
  onAction: middlewares,
  extraEnhancers: [autoRehydrate()],
  onError(e, dispatch) {
    // TODO: global error handling with dispath
    console.error(error)
  },
}

export const init = (option = initialOptions) => {
  const app = create(option)

  // HMR workaround
  if (!global.registered) option.models.forEach(model => app.model(model));
  global.registered = true;

  // dva loading
  app.use(createLoading())

  // get store
  app.getStore = () => app._store;
  app.start()

  setGlobalData('dva', app)
}