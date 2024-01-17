import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import createPersistedState from 'vuex-persistedstate'
import VueSimpleAlert from 'vue-simple-alert'

Vue.use(Vuex)
Vue.use(VueSimpleAlert, { reverseButtons: true })

const rental = window.localStorage.getItem('rental')

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    bikes: [],
    rentals: [],
    locations: [],
    filteredBikes: [],
    types: [],
    currentBike: {},
    currentRental: {},
    location: null,
    pickup: '',
    dropoff: '',
    user: {},
    token: '',
    loginErrors: [],
    invalidCredentials: '',
    rental: rental ? JSON.parse(rental) : []

  },
  getters: {
    allBikes: state => state.bikes,
    allLocations: state => state.locations,
    allTypes: state => state.types,
    allRentals: state => state.rentals,
    filteredBikes: state => state.filteredBikes,
    currentBike: state => state.currentBike,
    currentRental: state => state.currentRental,
    pickupReservation: state => state.pickup,
    dropOffReservation: state => state.dropoff,
    user: state => state.user,
    token: state => state.token,
    loginErrors: state => state.loginErrors,
    invalidCredentials: state => state.invalidCredentials

  },
  mutations: {
    GET_BIKES: (state, bikes) => {
      state.bikes = bikes
    },
    GET_LOCATIONS: (state, locations) => {
      state.locations = locations
    },
    GET_TYPES: (state, types) => {
      state.types = types
    },
    SET_FILTERED: (state, bikes) => {
      state.filteredBikes = bikes
    },
    SET_BIKE: (state, bike) => {
      state.currentBike = bike
    },
    GET_RENTALS: (state, rentals) => {
      state.rentals = rentals
    },
    SET_RENTAL: (state, rental) => {
      state.rental = rental
    },
    SET_LOCATION: (state, location) => {
      state.location = location
    },
    SET_PICKUP: (state, reservation) => {
      state.pickup = reservation
    },
    SET_DROPOFF: (state, reservation) => {
      state.dropoff = reservation
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_LOGIN_ERRORS: (state, loginErrors) => {
      state.loginErrors = loginErrors
    },
    SET_INVALID_CREDENTIALS: (state, invalidCredentials) => {
      state.invalidCredentials = invalidCredentials
    },
    LOGOUT: (state) => {
      state.token = ''
    },
    addToRental (state, bike) {
      state.rental.push(bike)
      this.commit('saveData')
    },
    saveData (state) {
      window.localStorage.setItem('rental', JSON.stringify(state.rental))
    },
    removeFromRental (state, bike) {
      const index = state.rental.indexOf(bike)
      state.rental.splice(index, 1)
    }
  },
  actions: {
    getBikes ({ commit }) {
      axios.get('http://127.0.0.1:8000/bikes').then(response => {
        commit('GET_BIKES', response.data)
      })
    },
    getRentals ({ commit }) {
      axios.get('http://127.0.0.1:8000/rentals').then(response => {
        commit('GET_RENTALS', response.data)
      })
    },
    getLocations ({ commit }) {
      axios.get('http://127.0.0.1:8000/locations/list').then(response => {
        commit('GET_LOCATIONS', response.data)
      })
    },
    getTypes ({ commit }) {
      axios.get('http://127.0.0.1:8000/types').then(response => {
        commit('GET_TYPES', response.data)
      })
    },
    getBike ({ commit }, slug) {
      const bike = this.state.bikes.find(bike => bike.slug === slug)
      commit('SET_BIKE', bike)
    },
    filterBikes ({ commit, state }) {
      const filtered = state.bikes.filter(bike => {
        const foundLocations = bike.locations.findIndex(location => {
          return location.id === this.state.location
        })
        return foundLocations !== -1
      })
      const filteredBikes = []
      filtered.forEach(bike => {
        if (bike.reservations.length > 0) {
          const overlaps = []

          bike.reservations.forEach(reservation => {
            const startDate1 = new Date(reservation.pickup)
            const endDate1 = new Date(reservation.dropoff)
            const startDate2 = new Date(this.state.pickup)
            const endDate2 = new Date(this.state.dropoff)

            overlaps.push((startDate1 < endDate2) && (startDate2 < endDate1))
          })
          if (!overlaps.includes(true)) {
            filteredBikes.push(bike)
          }
          return
        }

        filteredBikes.push(bike)
      })

      commit('SET_FILTERED', filteredBikes)
    },
    setLocation ({ commit }, value) {
      commit('SET_LOCATION', value)
    },
    setRental ({ commit }, value) {
      commit('SET_RENTAL', value)
    },
    filterOnAPI ({ commit }, value) {
      axios.get('http://127.0.0.1:8000/bikes/filter/' + value).then(response => {
        commit('SET_FILTERED', response.data)
      })
    },
    setDates ({ commit }, reservation) {
      if (reservation.type === 'pickup') {
        commit('SET_PICKUP', reservation.value)
        localStorage.setItem('pickup', reservation.value)
        return
      }
      commit('SET_DROPOFF', reservation.value)
      localStorage.setItem('dropoff', reservation.value)
    },
    addBikeToReservation (context, bike) {

    },

    registerUser ({ commit, state }, user) {
      axios
        .post('http://127.0.0.1:8000/api/auth/register',
          user
        )
        .then(response => {
          alert('Rejestracja przebiegła poprawnie')
        })
        .catch(error => {
          alert(error)
        })
    },

    logout ({ commit }) {
      commit('LOGOUT')
      router.push({ name: 'Home' })
      location.reload()
      // router.push({ name: 'Home' })
    },

    loginUser ({ commit, state }, user) {
      axios
        .post('http://127.0.0.1:8000/api/auth/login', user)
        .then(response => {
          commit('SET_TOKEN', response.data.token)
          commit('SET_USER', response.data.user)

          router.push({ name: 'Confirmation' })
        })
        .catch(error => {
          commit('SET_INVALID_CREDENTIALS', '')
          commit('SET_LOGIN_ERRORS', [])

          if (error.response.data.error) {
            commit('SET_INVALID_CREDENTIALS', error.response.data.error)
          } else {
            const errors = []

            for (const key of Object.keys(error.response.data.errors)) {
              error.response.data.errors[key].forEach(err => {
                errors.push(err)
              })
            }
            commit('SET_LOGIN_ERRORS', errors)
          }
        })
    },
    loginEmployee ({ commit, state }, user) {
      axios
        .post('http://127.0.0.1:8000/api/auth/login', user)
        .then(response => {
          commit('SET_TOKEN', response.data.token)
          commit('SET_USER', response.data.user)

          router.push({ name: 'Dashboard' })
        })
        .catch(error => {
          commit('SET_INVALID_CREDENTIALS', '')
          commit('SET_LOGIN_ERRORS', [])
          if (error.response.data.error) {
            commit('SET_INVALID_CREDENTIALS', error.response.data.error)
          } else {
            const errors = []

            for (const key of Object.keys(error.response.data.errors)) {
              error.response.data.errors[key].forEach(err => {
                errors.push(err)
              })
            }
            commit('SET_LOGIN_ERRORS', errors)
          }
        })
    },

    makeReservation ({ commit, state }, reservationData) {
      const authorization = {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      }
      axios
        .post(
          'http://127.0.0.1:8000/create-reservation', reservationData, authorization
        )
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },

    deleteRental ({ commit, state }, value) {
      const authorization = {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      }
      const blank = ''
      axios
        .post(
          'http://127.0.0.1:8000/rental-delete/' + value,
          blank,
          authorization
        )
        .then(response => {
          location.reload()
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    markReturned ({ commit, state }, value) {
      const authorization = {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      }
      const blank = ''
      axios
        .post(
          'http://127.0.0.1:8000/rental-mark/' + value, blank, authorization
        )
        .then(response => {
          location.reload()
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },

    deleteBike ({ commit, state }, value) {
      const authorization = {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      }
      const blank = ''
      axios
        .post(
          'http://127.0.0.1:8000/bike-delete/' + value,
          blank,
          authorization
        )
        .then(response => {
          location.reload()
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },

    markBikeAvailable ({ commit, state }, value, available) {
      const authorization = {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      }
      const blank = ''
      axios
        .post(
          'http://127.0.0.1:8000/bike-mark-available/' + value,
          blank,
          authorization
        )
        .then(response => {
          location.reload()
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },

    markBikeNotAvailable ({ commit, state }, value, available) {
      const authorization = {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      }
      const blank = ''
      axios
        .post(
          'http://127.0.0.1:8000/bike-mark-not-available/' + value,
          blank,
          authorization
        )
        .then(response => {
          location.reload()
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },

    addLocation ({ commit, state }, locationData) {
      const authorization = {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      }
      axios
        .post(
          'http://127.0.0.1:8000/add-location',
          locationData,
          authorization
        )
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },

    deleteLocation ({ commit, state }, value) {
      const authorization = {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      }
      const blank = ''
      axios
        .post(
          'http://127.0.0.1:8000/location-delete/' + value,
          blank,
          authorization
        )
        .then(response => {
          location.reload()
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    editLocation ({ commit, state }, locationData) {
      const authorization = {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      }
      axios
        .post(
          'http://127.0.0.1:8000/location-edit',
          locationData,
          authorization
        )
        .then(response => {
          console.log(response)
          router.push({ name: 'LocationsList' })
        })
        .catch(error => {
          console.log(error)
        })
    },
    addType ({ commit, state }, typeData) {
      const authorization = {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      }
      axios
        .post(
          'http://127.0.0.1:8000/add-type',
          typeData,
          authorization
        )
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteType ({ commit, state }, value) {
      const authorization = {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      }
      const blank = ''
      axios
        .post(
          'http://127.0.0.1:8000/type-delete/' + value,
          blank,
          authorization
        )
        .then(response => {
          location.reload()
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
