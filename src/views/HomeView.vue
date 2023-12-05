<script setup>
import { useRouter } from 'vue-router'
import { useDirectionStore } from '@/stores/direction-store'
import { onMounted } from 'vue'
import ServiceSelectLarge from '../components/ServiceSelectLarge.vue'
import ServiceSelectSmall from '../components/ServiceSelectSmall.vue'
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'
import HomeIcon from 'vue-material-design-icons/Home.vue'
import MapMarkerIcon from 'vue-material-design-icons/MapMarker.vue'

const router = useRouter()
const direction = useDirectionStore()

onMounted(() => {
  direction.pickup = ''
  direction.destination = ''
})
</script>

<template>
  <div id="Home" class="flex flex-col h-screen">
    <div class="m-3 mb-auto">
      <div class="my-20">
        <img width="150" src="../../img/uber/uber2.svg" alt="" />
      </div>
      <div class="grid grid-cols-2 gap-3 my-3">
        <ServiceSelectLarge
          @click="router.push('/directions')"
          text="Ride"
          imageWidth="74"
          image="ride"
        />
        <ServiceSelectLarge text="Food" imageWidth="74" image="food" :promo="true" />
      </div>
      <div class="grid grid-cols-4 gap-3 my-3">
        <ServiceSelectSmall text="2 Wheels" image="2wheels" />
        <ServiceSelectSmall text="Transit" image="transit" />
        <ServiceSelectSmall text="Reserve" image="reserve" />
        <ServiceSelectSmall text="Travel" image="travel" />
      </div>
      <div
        @click="router.push('/directions')"
        class="flex items-center w-full p-3 rounded-full bg-custom-color h-14"
      >
        <MagnifyIcon :size="40" />
        <div class="ml-3 text-xs font-semibold text-gray-700">Enter pick-up point</div>
      </div>
    </div>
    <footer class="z-50 flex justify-around w-full p-1 mb-2 border-t-2 border-t-gray-200">
      <div class="grid place-items-center">
        <HomeIcon :size="30" fillColor="#1f1e1e" />
        <div class="w-full -mt-1 text-xs font-semibold text-center text-gray-800">Home</div>
      </div>
      <div @click="router.push('/directions')" class="grid place-items-center">
        <MapMarkerIcon :size="30" fillColor="#b3b1b1" />
        <div class="w-full -mt-1 text-xs font-semibold text-center text-gray-400">Destination</div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
#Home {
  .bg-custom-color {
    background-color: rgb(237, 237, 237);
  }
}
</style>
