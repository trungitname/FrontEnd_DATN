<template>
  <v-row class="ml-3 mt-3">
    <v-col cols="4" sm="6" md="6" lg="2">
      <v-select v-model="SelectedCategory" density="compact" label="Chọn sản phẩm"
        :items="['All','giày','quần','cây cảnh']" variant="outlined"></v-select>
    </v-col>
    <v-col cols="4" sm="6" md="6" lg="2">
      <v-select v-model="selectedSort" label="Giá" density="compact" :items="['Từ cao -> thấp','Từ thấp -> cao']"
        variant="outlined"></v-select>
    </v-col>
    <v-col cols="4" sm="6" md="6" lg="2">
      <v-select density="compact" :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
        variant="outlined"></v-select>
    </v-col>
    <v-col cols="12" sm="6" md="6" lg="6" class="text-right">
      <v-btn style="background-color: #bbccf6;color:#4d4d50" class="rounded-1 text-capitalize" variant="tonal">
        Show all
      </v-btn>
      <v-btn style="font-weight: bold;color: #2264D1;" bg-color="white" class="rounded-1 text-capitalize"
        variant="elevated">
        Action
      </v-btn>
      <v-btn style="background-color: #bbccf6;color:#4d4d50" class="rounded-1 text-capitalize" variant="tonal">
        Buy now
      </v-btn>
      <v-btn  style="background-color: #adc4fe" class="ml-5" ariant="tonal">
        <v-icon>mdi mdi-menu</v-icon>
      </v-btn>
      <v-btn class="mr-5"  variant="elevated">
        <v-icon style="color: #0c5bda;">mdi mdi-microsoft</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style>
</style>