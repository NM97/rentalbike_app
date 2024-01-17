<template>
  <div class="dashboard">
    <div class="w-full">
      <div class="flex bg-white">
        <div
          class="w-2/3 lg:w-full bg-gray-100 pl-0 lg:pl-64 lg:w-full min-h-screen"
          id="main-content"
        >
        <Sidebar />
          <div class="p-6 bg-gray-100 mb-20">
            <div>
              <div class="flex flex-wrap -mx-3">
                <div class="w-2/3 xl:w-2/3 px-3">
                  <p class="text-2xl font-semibold mb-4">Cześć, {{user.name}}!</p>
                </div>
                <div class="w-full xl:w-2/3 px-3">
                  <p class="text-xl font-semibold mb-4">Wypożyczenia w ostatnich 7 dniach</p>

                  <div class="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
                    <canvas id="rentals-chart" width="600" height="400"></canvas>
                  </div>
                  <div class="flex flex-no-wrap">
                    <div
                      class=" mt-6 mr-3 w-1/2 bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0"
                    >
                      <svg class="w-16 h-16 fill-current mr-4 hidden lg:block" viewBox="0 0 20 20">
                        <path
                          d="M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708"
                        />
                      </svg>

                      <div class="text-gray-700">
                        <p class="font-semibold text-3xl">{{numberOfBikesRented}}</p>
                        <p>Rowerów wypożyczonych</p>
                      </div>
                    </div>
                    <div
                      class="mt-6 ml-3 w-1/2 bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0"
                    >
                      <svg class="w-16 h-16 fill-current mr-4 hidden lg:block" viewBox="0 0 20 20">
                        <path
                          d="M17.684,7.925l-5.131-0.67L10.329,2.57c-0.131-0.275-0.527-0.275-0.658,0L7.447,7.255l-5.131,0.67C2.014,7.964,1.892,8.333,2.113,8.54l3.76,3.568L4.924,17.21c-0.056,0.297,0.261,0.525,0.533,0.379L10,15.109l4.543,2.479c0.273,0.153,0.587-0.089,0.533-0.379l-0.949-5.103l3.76-3.568C18.108,8.333,17.986,7.964,17.684,7.925 M13.481,11.723c-0.089,0.083-0.129,0.205-0.105,0.324l0.848,4.547l-4.047-2.208c-0.055-0.03-0.116-0.045-0.176-0.045s-0.122,0.015-0.176,0.045l-4.047,2.208l0.847-4.547c0.023-0.119-0.016-0.241-0.105-0.324L3.162,8.54L7.74,7.941c0.124-0.016,0.229-0.093,0.282-0.203L10,3.568l1.978,4.17c0.053,0.11,0.158,0.187,0.282,0.203l4.578,0.598L13.481,11.723z"
                        />
                      </svg>

                      <div class="text-gray-700">
                        <p class="font-semibold text-3xl">{{numberOfBookedBikeRentals}}</p>
                        <p>Zarezerwowanych wypożyczeń</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="w-full xl:w-1/3 px-3">
                  <p class="text-xl font-semibold mb-4">Najnowsze wypożyczenia</p>
                  <div class="w-full bg-white border rounded-lg p-4">
                    <div
                      class="w-full bg-gray-100 border rounded-lg flex justify-between items-center px-4 py-2 mb-4"
                      v-for="(rental, index) in rentals.slice(0,10)"
                      :key="index"
                    >
                      <div>
                        <p
                          class="font-semibold text-xl"
                        >{{rental.user.name}} {{rental.user.surname}}</p>
                        <p>{{rental.bikes.name}}</p>
                      </div>
                      <span class="text-green-500 font-semibold text-lg">{{rental.price}} PLN</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import Sidebar from '../components/Sidebar'
var moment = require('moment')
export default {
  name: 'Dashboard',
  components: {
    Sidebar
  },
  computed: {
    rentals () {
      const that = this
      function compare (a, b) {
        if (a.id < b.id) {
          return 1
        }
        if (a.id > b.id) {
          return -1
        }
        return 0
      }
      return that.$store.getters.allRentals.sort(compare)
    },
    user () {
      return this.$store.getters.user
    },
    mounted () {
      return this.$store.dispatch('getRentals')
    },
    numberOfBikesRented () {
      const that = this
      const date = moment().format('YYYY-MM-DD')
      let date2 = moment().subtract(1, 'months')
      date2 = date2.format('YYYY-MM-DD')
      return that.$store.getters.allRentals.filter(item => item.pickup <= date & item.pickup >= date2).length
    },
    numberOfBookedBikeRentals () {
      const that = this
      const date = moment().format('YYYY-MM-DD')
      return that.$store.getters.allRentals.filter(item => item.pickup > date).length
    }
  },
  data () {
    const that = this
    const date = moment().format('YYYY-MM-DD')
    const one = that.$store.getters.allRentals.filter(item => item.pickup === date).length

    let date2 = moment().subtract(1, 'days')
    date2 = date2.format('YYYY-MM-DD')
    const two = that.$store.getters.allRentals.filter(item => item.pickup === date2).length

    let date3 = moment().subtract(2, 'days')
    date3 = date3.format('YYYY-MM-DD')
    const three = that.$store.getters.allRentals.filter(item => item.pickup === date3).length

    let date4 = moment().subtract(3, 'days')
    date4 = date4.format('YYYY-MM-DD')
    const four = that.$store.getters.allRentals.filter(item => item.pickup === date4).length

    let date5 = moment().subtract(4, 'days')
    date5 = date5.format('YYYY-MM-DD')
    const five = that.$store.getters.allRentals.filter(item => item.pickup === date5).length

    let date6 = moment().subtract(5, 'days')
    date6 = date6.format('YYYY-MM-DD')
    const six = that.$store.getters.allRentals.filter(item => item.pickup === date6).length

    let date7 = moment().subtract(6, 'days')
    date7 = date7.format('YYYY-MM-DD')
    const seven = that.$store.getters.allRentals.filter(item => item.pickup === date7).length

    return {
      rentalsData: {
        type: 'bar',
        data: {
          labels: [date7, date6, date5, date4, date3, date2, date],
          datasets: [
            {
              backgroundColor: 'rgba(99,179,237,0.4)',
              strokeColor: '#63b3ed',
              pointColor: '#fff',
              pointStrokeColor: '#63b3ed',
              data: [seven, six, five, four, three, two, one]
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  display: false
                }
              }
            ]
          }
        }
      }
    }
  },
  mounted () {
    (() =>
      new Chart(document.getElementById('rentals-chart'), this.rentalsData))()
    return this.$store.dispatch('getRentals')
  }
}
</script>
