  /* eslint-disable eol-last */
  <template>
  <div class="home">
    <div class="HeroBlock">
      <div class="container flex justify-center items-center h-64">
        <reservation-form/>
      </div>
    </div>
    <div class="container">
      <bike-list/>
    </div>
  </div>
</template>

<script>
import ReservationForm from '../components/ReservationForm'
import BikeList from '../components/BikeList'
// import MiniRental from '../components/MiniRental'
export default {
  name: 'Home',
  components: {
    ReservationForm,
    BikeList
    // MiniRental
  }
}
</script>
