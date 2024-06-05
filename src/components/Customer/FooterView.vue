<template>
  <v-footer id="custom-footer" class="bg-indigo-lighten-1 text-center d-flex flex-column" style="background-color: black;">
    <div>
      <v-btn v-for="icon in icons" :key="icon" :icon="icon" class="mx-4" variant="text"></v-btn>
    </div>

    <div class="pt-0">
      since 2023
    </div>

    <v-divider></v-divider>

    <div>
      {{ new Date().getFullYear() }} — <strong>Rolling Base</strong>
    </div>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      'mdi mdi-facebook',
      'mdi mdi-twitter',
      'mdi mdi-linkedin',
      'mdi mdi-instagram',
    ],
  }),
}
</script>

<style>
/* .v-footer {
    padding: 8px 0 !important;
} */
#custom-footer {
    background-color: black !important;
}
</style>