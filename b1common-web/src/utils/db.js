export default {
  currentUser: undefined,
  subwareCode: '',
  get(key) {
    if (localStorage.getItem(key + 'b1common-web')) return JSON.parse(localStorage.getItem(key + 'b1common-web'));
  },
  set(key, value) {
    localStorage.setItem(key + 'b1common-web', JSON.stringify(value));
  },
  menusFlat: {},
  kv: {},
  oldhistory: undefined,
  history: undefined,
};
