export default {
  currentUser: undefined,
  subwareCode: '',
  get(key) {
    if (localStorage.getItem(key + 'b2mapshop-web')) return JSON.parse(localStorage.getItem(key + 'b2mapshop-web'));
  },
  set(key, value) {
    localStorage.setItem(key + 'b2mapshop-web', JSON.stringify(value));
  },
  menusFlat: {},
  kv: {},
  oldhistory: undefined,
  history: undefined,
};
