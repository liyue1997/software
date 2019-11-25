export default {
  currentUser: undefined,
  subwareCode: '',
  get(key) {
    var value =localStorage.getItem(key + 'b4huodong-web');
    if (value===undefined || value ==="undefined")
    {
       return {};
       

    }
    return JSON.parse(value);
  },
  set(key, value) {
    localStorage.setItem(key + 'b4huodong-web', JSON.stringify(value));
  },
  menusFlat: {},
  kv: {},
  oldhistory: undefined,
  history: undefined,
};
