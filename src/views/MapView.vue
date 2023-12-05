<script setup>
// import AutoCompleteInput from '@/components/AutoCompleteInput.vue'
// import ArrowIcon from 'vue-material-design-icons/ArrowLeft.vue'
// import MapMarkerIcon from 'vue-material-design-icons/MapMarker.vue'
// import { ref } from 'vue'

// let isPickupActive = ref(true)
// let pickup = ref('')
// let destination = ref('')

import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDirectionStore } from '@/stores/direction-store'
import axios from 'axios'
import ArrowLeftIcon from 'vue-material-design-icons/ArrowLeft.vue'
import mapStyles from '../mapStyles'

const direction = useDirectionStore()
const router = useRouter()

const distance = ref({
  text: '',
  value: null
})

const duration = ref({
  text: '',
  value: null
})

const latLng = ref({
  start: {
    lat: null,
    lng: null
  },
  end: {
    lat: null,
    lng: null
  }
})

onMounted(() => {
  if (!direction.pickup || !direction.destination) {
    router.push('/')
  }
  setTimeout(() => {
    initMap()
  }, 50)
})

const goBack = () => {
  router.push('/directions')
  direction.pickup = ''
  direction.destination = ''
}

const initMap = async () => {
  const directionsService = new window.google.maps.DirectionsService()
  const directionsRenderer = new window.google.maps.DirectionsRenderer()

  const { Map } = await window.google.maps.importLibrary('maps')

  const map = new Map(document.getElementById('map'), {
    zoom: 8,
    minZoom: 3,
    maxZoom: 17,
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: false,
    styles: mapStyles()
  })
  //console.log(map)

  directionsRenderer.setOptions({
    polylineOptions: {
      strokeColor: '#212121',
      strokeWeight: 6
    }
  })

  if (direction.pickup && direction.destination) {
    getDirections(map, directionsRenderer, directionsService)
    getDistance()
  }
}

const getDirections = (map, directionsRenderer, directionsService) => {
  directionsRenderer.setMap(map)

  const request = {
    origin: direction.pickup,
    destination: direction.destination,
    optimizeWaypoints: true,
    travelMode: 'DRIVING'
  }

  directionsService.route(request, (result, status) => {
    if (status === 'OK') {
      latLng.value.start.lat = result.routes[0].legs[0].start_location.lat()
      latLng.value.start.lng = result.routes[0].legs[0].start_location.lng()
      latLng.value.end.lat = result.routes[0].legs[0].end_location.lat()
      latLng.value.end.lng = result.routes[0].legs[0].end_location.lng()

      directionsRenderer.setDirections(result)
    }
  })
}

const getDistance = async () => {
  let res = await axios.get('distance/' + direction.pickup + '/' + direction.destination)

  distance.value.text = res.data.rows[0].elements[0].distance.text
  distance.value.value = res.data.rows[0].elements[0].distance.value
  duration.value.text = res.data.rows[0].elements[0].duration.text
  duration.value.value = res.data.rows[0].elements[0].duration.value
}

const calculatePrice = (multiplier, price) => {
  let res = (price / 900) * multiplier
  return res.toFixed(2)
}

// async function initMap() {
//   const { Map } = await window.google.maps.importLibrary('maps')

//   const map = new Map(document.getElementById('map'), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8
//   })
//   console.log(map)
// }
//
</script>

<template>
  <div id="MapView">
    <div
      id="BackBtn"
      class="absolute z-50 p-1 bg-white rounded-full top-8 left-4"
      @click="goBack()"
    >
      <ArrowLeftIcon :size="40" />
    </div>
    <div id="map"></div>
    <div id="VehicleSelection" class="w-full">
      <div class="w-full h-2 border-t"></div>
      <div class="w-full text-center border-t-2 p-1.5 text-gray-700 text-lg font-semibold">
        Distance - {{ distance.text }}
      </div>
      <div class="scrollSection">
        <div class="bg-custom-gray">
          <div class="flex items-center px-4 py-5">
            <img width="75" src="img/uber/ride.png" alt="" />
            <div class="w-full ml-3">
              <div class="flex items-center justify-between">
                <div class="mb-1 text-2xl">UberX</div>
                <div class="text-xl">${{ calculatePrice(1, distance.value) }}</div>
              </div>
              <div class="text-gray-500">{{ duration.text }}</div>
            </div>
          </div>
        </div>
        <div>
          <div class="flex items-center px-4 py-5">
            <img width="75" src="img/uber/comfort.png" alt="" />
            <div class="w-full ml-3">
              <div class="flex items-center justify-between">
                <div class="mb-1 text-2xl">Comfort</div>
                <div class="text-xl">${{ calculatePrice(1.25, distance.value) }}</div>
              </div>
              <div class="text-gray-500">{{ duration.text }}</div>
            </div>
          </div>
        </div>
        <div>
          <div class="flex items-center px-4 py-5">
            <img width="75" src="img/uber/uberxl.png" alt="" />
            <div class="w-full ml-3">
              <div class="flex items-center justify-between">
                <div class="mb-1 text-2xl">UberXL</div>
                <div class="text-xl">${{ calculatePrice(1.5, distance.value) }}</div>
              </div>
              <div class="text-gray-500">{{ duration.text }}</div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="absolute bottom-0 flex items-center justify-center w-full px-4 py-6 bg-white shadow-inner"
      >
        <button class="w-full px-4 py-4 text-2xl text-white bg-black rounded-sm">
          Confirm UberX
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#MapView {
  #map {
    width: 100%;
    height: 45vh;
    top: 0px;
    left: 0px;
  }

  .gm-style-cc {
    display: none;
  }

  .bg-custom-gray {
    background-color: rgb(237, 237, 237);
  }

  #VehicleSelection {
    .scrollSection {
      height: calc(50vh - 120px);
      position: absolute;
      overflow-y: auto;
      width: 100%;
    }
  }
}
</style>
