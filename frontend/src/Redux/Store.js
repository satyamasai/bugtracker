const { legacy_createStore } = require("redux");
const { default: Reducer } = require("./Reducer");

const store = legacy_createStore(Reducer)

export default store