export default {
  namespace: 'report',
  state: {
    search: null,
    detail: null
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveMore(state, { payload: list }) {
      return { ...state, list: [...state.list, ...list] };
    },
  },
  effects: {
    *search(_, { all, call, put }) {
      try {
        let loadPro = yield put(action("load"));
      } catch (err) {
        console.log(err)
      }
    },
  },
};