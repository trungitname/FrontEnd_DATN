<template>
  <v-app>
    <NavBar />
    <!-- <v-parallax src="@/assets/slide3.jpg">
      <div class="d-flex flex-column fill-height justify-center align-center text-white">
        <h1 class="text-h3 font-weight-thin mb-4">
          Rolling Base
        </h1>
        <h4 class="subheading">
          Drip Star
        </h4>
      </div>
    </v-parallax> -->
    <v-parallax src="@/assets/slide6.jpg">
      <div class="d-flex flex-column fill-height justify-center align-center text-white">
        <h1 class="text-h3 font-weight-thin mb-4">
          Rolling Base
        </h1>
        <h4 class="subheading">
          Drip Star
        </h4>
      </div>
    </v-parallax>
    <v-container fluid>
      <v-row class="mr-3 ml-3 mt-3">
        <v-col cols="12">
          <v-chip variant="text">Related</v-chip>
          <v-chip class="mr-2 mt-2">
            Rolling Short
          </v-chip>
          <v-chip class="mr-2 mt-2">
            under $50
          </v-chip>
          <v-chip class="mr-2 mt-2">
            kitten
          </v-chip>
          <v-chip class="mr-2 mt-2">
            plastic plugs
          </v-chip>
          <v-chip class="mr-2 mt-2">
            pucker shoes
          </v-chip>
          <v-chip class="mr-2 mt-2">
            vintage typewriter
          </v-chip>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="3" v-for="product in products" v-bind:key="product.productid">
          <v-card height="auto" align="center" variant="flat" hover>
            <v-img v-bind:src="product.imageurl" style="width: 100%" height="200" contain></v-img>
            <v-card-text class="mt-n1 text-left" style="font-size: 16px">
              <strong>{{ product.productname }}</strong>
            </v-card-text>
            <v-card-text class="mt-n4 text-left" style="font-size: 24px">
              <strong>${{ product.price }}</strong>
            </v-card-text>
            <v-card-text class="mt-n4 text-left">
              <!-- <strong style="opacity: 0.5">{{ product.description }}</strong> -->
              <v-spacer></v-spacer>
              <v-row>
                <v-col cols="5">
                  <v-icon color="black" size="small">mdi mdi-star</v-icon>
                  <v-icon color="black" size="small">mdi mdi-star</v-icon>
                  <v-icon color="black" size="small">mdi mdi-star</v-icon>
                  <v-icon color="black" size="small">mdi mdi-star</v-icon>
                  <v-icon color="black" size="small">mdi mdi-star-half</v-icon>
                </v-col>
                <v-col cols="3"></v-col>
                <v-col cols="3">
                  <router-link v-bind:to="'/products/' + product.productid">
                    <v-btn class="text-capitalize mb-2" size="small" color="black" variant="outlined">
                      Xem
                    </v-btn>
                  </router-link>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-spacer></v-spacer>
    </v-container>
    <FooterView />
  </v-app>
</template>

<script>
import { defineComponent } from "vue";
import axios from 'axios';
// Components
import NavBar from "@/components/Customer/NavBar.vue";
import FooterView from "@/components/Customer/FooterView.vue";

export default defineComponent({
  name: "HomeView",
  data() {
    return {
      products: [],
    };
  },
  async created() {
    const result = await axios.get('/api/products');
    const products = result.data.map(product => {
      console.log(product.imageurl); // Kiểm tra URL của hình ảnh
      return {
        ...product,
        imageurl: product.imageurl
      };
    });
    this.products = products;
  },
  components: {
    NavBar,
    FooterView,
  },
});
</script>
<style scoped>
.v-container {
  width: 100%;
  padding: 16px 0px !important;
  margin-right: auto;
  margin-left: auto;
}

.v-card.borderme {
  border: 2px solid black !important;
}

.v-card.borderout {
  border: 1px solid #d5f0db !important;
}
</style>
