<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-text-field style="background-color: white" density="compact" variant="outlined" label="Tìm kiếm"
            append-inner-icon="mdi mdi-magnify" single-line hide-details class="mr-2"></v-text-field>
        </v-col>
        <v-col cols="9" class="text-right">
          <v-btn @click="dialog = true" color="primary" prepend-icon="mdi mdi-plus" class="text-uppercase">Thêm</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-table density="compact">
              <thead>
                <tr>
                  <th class="text-left">Mã sản phẩm</th>
                  <th class="text-left">Tên sản phẩm</th>
                  <th class="text-left">Mã SKU</th>
                  <th class="text-left">Giá</th>
                  <th class="text-left">Loại sản phẩm</th>
                  <th class="text-left">Mô tả</th>
                  <th class="text-left">Số lượng</th>
                  <th class="text-left">Màu sắc</th>
                  <th class="text-left">Size</th>
                  <th class="text-left">Ảnh</th>
                  <th class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in products" v-bind:key="product.productid">
                  <td>{{ product.productid }}</td>
                  <td>{{ product.productname }}</td>
                  <td>{{ product.sku }}</td>
                  <td>{{ product.price }}$</td>
                  <td>{{ product.categoryid }}</td>
                  <td>{{ product.description }}</td>
                  <td>{{ product.quantity }}</td>
                  <td>{{ product.color.join(', ')  }}</td>
                  <td>{{ product.size.join(', ')  }}</td>
                  <td> <img v-bind:src="product.imageurl" alt="Product Image" class="product-image"/> </td>

                  <td class="text-center">
                    <v-btn variant="text" @click="openEditDialog(product)"><v-icon>mdi mdi-pencil-outline</v-icon></v-btn>
                    <v-btn variant="text" @click="deleteProduct(product.productid)"><v-icon>mdi mdi-trash-can-outline</v-icon></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
            <v-row class="ma-2">
              <v-col cols="8">
                <v-row>
                  <p class="mt-5 opacity">Showing</p>
                  <v-col cols="2">
                    <v-select density="compact" :items="['10', '20', '25', '30', 'All']" variant="outlined"></v-select>
                  </v-col>
                  <p class="mt-5 opacity">of 50</p>
                </v-row>
              </v-col>
              <v-col cols="4" class="text-right">
                <v-pagination variant="text" density="compact" :length="10"></v-pagination>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <DialogVue v-model="dialog" @productAdded="fetchProducts"/>
    <DialogEditView v-if="dialogEdit" v-model="dialogEdit" :selectedProduct="selectedProduct" @productEdited="fetchProducts"/>
  </div>
</template>

<script>
import axios from 'axios';
import DialogVue from "../../components/Admin/Products/Dialog.vue";
import DialogEditView from "../../components/Admin/Products/DialogEdit.vue";
export default {
  components: { DialogVue, DialogEditView },
  name: "SanPhamView",
  data() {
    return {
      dialog: false, 
      dialogEdit: false, 
      products: [],
      selectedProduct: null,
    };
  },
  methods: {
    openEditDialog(product) {
      this.selectedProduct = product; // Lưu sản phẩm cần chỉnh sửa vào selectedProduct
      this.dialogEdit = true; // Mở dialog chỉnh sửa
    },
    async deleteProduct(productId) {
      try {
        await axios.delete(`/api/products/${productId}`);
        // Sau khi xoá thành công, cập nhật danh sách sản phẩm
        this.fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },
    async fetchProducts() {
      try {
        const result = await axios.get('/api/products');
        const products = result.data.map(product => {
          console.log(product.imageurl); // Kiểm tra URL của hình ảnh
          return {
            ...product,
            imageurl: product.imageurl
          };
        });
        this.products = products;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
  },
  async created() {
    this.fetchProducts();
  },
  // data() {
  //   return {
  //     dialog: false,
  //     products: [],
  //   };
  // },
  // async created() {
  //   const result = await axios.get('/api/products');
  //   const products = result.data.map(product => {
  //   console.log(product.imageurl); // Kiểm tra URL của hình ảnh
  //   return {
  //     ...product,
  //     imageurl: product.imageurl
  //   };
  // });
  // this.products = products;
  // },
  // methods: {
  //   async deleteProduct(productId) {
  //     try {
  //       await axios.delete(`/api/products/${productId}`);
  //       // Sau khi xoá thành công, cập nhật danh sách sản phẩm
  //       const result = await axios.get('/api/products');
  //       this.products = result.data;
  //     } catch (error) {
  //       console.error('Error deleting product:', error);
  //     }
  //   }
  // },
  
};
</script>

<style>
.product-image {
  max-width: 100px; /* Giới hạn chiều rộng của ảnh */
  max-height: 100px; /* Giới hạn chiều cao của ảnh */
}
</style>