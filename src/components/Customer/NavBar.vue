<template>
  <v-row class="ml-3 mt-3 navbar"  style="height: 80px; border-bottom: 1px solid #e0e0e0; align-items: center;">
    <!-- Logo -->
    <v-col cols="auto" class="d-flex align-center">
      <v-img class="product-image"
            src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/363428562_119416894563779_7953125426344180715_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=R5lo8jvKFIwQ7kNvgHBdJR1&_nc_ht=scontent.fhan14-5.fna&oh=00_AYAZ2gBPul-L9ghOYA3C0kfUMHCee8HgSDOD4ptaPqOg9g&oe=6650DA26"
          ></v-img>
    </v-col>

    <!-- Spacer to center the menu items -->
    <v-spacer></v-spacer>

    <!-- Navigation Links -->
    <v-col cols="auto">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <router-link v-bind:to="'/' ">
          <button v-bind="attrs" v-on="on" class="nav-link">SHOP</button></router-link>
        </template>
        <v-list>
          <v-list-item link>
            <v-list-item-title>SHIRTS</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>PANTS</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>SHORTS</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>CAP</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>UNDERWARE</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>BACKPACK</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
    <v-col cols="auto">
      <span class="nav-link">BEST SELLER</span>
    </v-col>
    <v-col cols="auto">
      <span class="nav-link">NEWS</span>
    </v-col>
    <v-col cols="auto">
      <span class="nav-link">ABOUT</span>
    </v-col>

    <v-spacer></v-spacer>

    <!-- Search Bar -->
    <v-col cols="auto" class="d-flex align-center">
      <v-text-field style="background-color: white" density="compact" variant="outlined" label="Tìm kiếm"
            append-inner-icon="mdi mdi-magnify" single-line hide-details class="mr-2" ></v-text-field>
    </v-col>

    <!-- Icons -->
    <v-col cols="auto" class="d-flex align-center">
      <router-link v-bind:to="'/orderpage/' ">
        <button v-bind="attrs" v-on="on" class="nav-link">MY ORDERS</button>
      </router-link>
      
      <router-link v-bind:to="'/cart/' ">
        <v-icon color="black"  class="nav-link">mdi mdi-cart</v-icon>
      </router-link>
      <v-icon color="black">mdi mdi-account</v-icon>
    </v-col>
  </v-row>
</template>


<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const goToCart = () => {
      router.push('/cart');
      router.push('/');
    };

    return {
      goToCart
    };
  }
};
</script>

<style scoped>
.navbar .d-flex {
  height: 100%; /* Tăng chiều cao cho các phần tử dạng d-flex trong navbar */
}
.nav-link {
  cursor: pointer;
  color: black;
  margin-right: 16px;
}

.v-text-field .v-input__control .v-input__slot input {
  color: rgba(0, 0, 0, 0.54);
  height: 40px;
}

.v-text-field .v-label {
  color: rgba(0, 0, 0, 0.54);
}

.v-text-field .v-input__control {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
.v-icon {
  margin-right: 20px;
}

</style>