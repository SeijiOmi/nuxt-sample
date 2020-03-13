import axios from "axios";

export const state = () => ({
  token: "",
  loginId: 0,
  auth: false,
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setAuth(state, auth) {
    state.auth = auth
  },
  setLoginId(state, id) {
    state.loginId = id
  },
}

export const actions = {
  // 引数commitは謎ルールよくわからん
  async getUsers({ commit }) {
    var callApi = async function () {
      console.log('set Users!!')
      var response = await axios.get('http://localhost:8080/users')
      commit('set', response.data)
    }
    setInterval(callApi,10000)
  },
  async signup({ dispatch }, userData) {
    var response = await axios.post('http://localhost:8080/users', userData)
    // login(commit, response.data)
    // await this.$store.dispatch("users/login", response.data)
    await dispatch("login", userData)
    // commit('setAuth', true)
  },
  async login({ commit }, userData) {

    console.log(userData)
    var response = await axios.post('http://localhost:8080/users/login', userData)
    console.log(response.data)

    commit('setToken', response.data.token)
    commit('setLoginId', response.data.id)
    commit('setAuth', true)
  },
  async logout({ commit }) {
    commit('setToken', "")
    commit('setLoginId', 0)
    commit('setAuth', false)
  },
}
