import persist from '../utils/persist'

export default {
  namespace: 'global',
  state: {},
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *init({ user }, { put, all }) {
      try {
        yield put({
          type: 'user/saveCurrent',
          payload: user
        })
        yield all([
          put({
            type: 'user/fetchUploadReport'
          }),
          put({
            type: 'rehydrate'
          })
        ])
      } catch (err) {
        console.error(err)
      }
    },
    *rehydrate(_, { call }) {
      try {
        yield call(async () => await persist())
      } catch (error) {
        console.error(error)
      }
    }
  },
};
