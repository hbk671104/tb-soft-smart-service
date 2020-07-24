export default {
  namespace: 'global',
  state: {},
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *init({ user }, { put }) {
      try {
        yield put({
          type: 'user/saveCurrent',
          payload: user
        });
        yield put({
          type: 'user/fetchUploadReport'
        })
      } catch (err) {
        console.error(err)
      }
    },
  },
};