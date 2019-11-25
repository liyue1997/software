export default {
  currentUser: undefined,
  subwareCode: '',
  get(key) {
    if (localStorage.getItem(key + 'b3reportSystem-webNew'))
      return JSON.parse(localStorage.getItem(key + 'b3reportSystem-webNew'));
  },
  set(key, value) {
    localStorage.setItem(key + 'b3reportSystem-webNew', JSON.stringify(value));
  },
  menusFlat: {},
  kv: {},
  oldhistory: undefined,
  history: undefined,
};
