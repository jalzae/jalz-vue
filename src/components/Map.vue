<template>
  <div style="height: 100vh" class="w-full">
    <LMap @click="handleMapClick" ref="map" :zoom="zoom" :center="[lat ?? 47.21322, long ?? -1.559482]">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap" />
      <l-marker :draggable="true" ref="marker" @dragend="handleMarkerDragend"
        :lat-lng="[lat ?? 55.9464418, long ?? 8.1277591]">
        <l-popup>Lokasi</l-popup>
      </l-marker>
    </LMap>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
  setup() {
    const zoom = ref(10);
    return { zoom };
  },
  mixins: [],
  components: {},
  props: {
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
  },
  methods: {
    handleMarkerDragend(event: any) {
      const marker = event.target._latlng;
      const latlng = marker;
      const lat = latlng.lat;
      const long = latlng.lng;
      this.$emit("moveLocation", { lat, lng: long });
    },
    handleMapClick(event) {
      const { lat, lng } = event.latlng;
      this.$emit("moveLocation", { lat, lng });
    }
  },
  data() {
    return {};
  },
  mounted() { },
  computed: {},
  watch: {},
  created() { },
});
</script>

<style>
body {
  margin: 0;
}
</style>
