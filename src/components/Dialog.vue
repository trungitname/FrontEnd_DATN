<template>
  <v-dialog max-width="500px" v-model="showDialog">
    <v-card>
      <v-card-title style="font-weight: bold;">
        <h4>Tạo mới sản phẩm</h4>
      </v-card-title>
      <v-container style="background-color: rgb(247, 247, 247);">
        <v-row>
          <v-col cols="12" style="font-size: 13px;">
            <p>Mã sản phẩm</p>
            <v-text-field v-model="newProduct.productid" placeholder="Nhập mã sản phẩm" style="background-color: white;"
              density="compact" single-line hide-details variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12" style="font-size: 13px;">
            <p>Tên sản phẩm</p>
            <v-text-field v-model="newProduct.productname" placeholder="Nhập tên sản phẩm"
              style="background-color: white;" density="compact" single-line hide-details
              variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12" style="font-size: 13px;">
            <p>Mã SKU</p>
            <v-text-field v-model="newProduct.sku" placeholder="Nhập mã SKU" style="background-color: white;"
              density="compact" single-line hide-details variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12" style="font-size: 13px;">
            <p>Giá</p>
            <v-text-field v-model="newProduct.price" placeholder="Nhập giá sản phẩm" style="background-color: white;"
              density="compact" single-line hide-details variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12" style="font-size: 13px;">
            <p>Loại sản phẩm</p>
            <v-text-field v-model="newProduct.categoryid" placeholder="Nhập loại sản phẩm"
              style="background-color: white;" density="compact" single-line hide-details
              variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12" style="font-size: 13px;">
            <p>Mô tả</p>
            <v-textarea v-model="newProduct.description" placeholder="Nhập mô tả" style="background-color: white;"
              density="compact" single-line hide-details variant="outlined"></v-textarea>
          </v-col>
          <v-col cols="12" style="font-size: 13px;">
            <p>Số lượng</p>
            <v-text-field v-model="newProduct.quantity" placeholder="Nhập số lượng sản phẩm"
              style="background-color: white;" density="compact" single-line hide-details
              variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12" style="font-size: 13px;">
            <p>Màu sắc</p>
            <v-textarea v-model="newProduct.color" placeholder="Nhập màu sắc (mỗi màu một dòng)"
              style="background-color: white;" dense outlined></v-textarea>
          </v-col>
          <v-col cols="12" style="font-size: 13px;">
            <p>Size</p>
            <v-textarea v-model="newProduct.size" placeholder="Nhập size (mỗi size một dòng)"
              style="background-color: white;" dense outlined></v-textarea>
          </v-col>
          <v-col cols="12" style="font-size: 13px;">
            <p>Ảnh sản phẩm</p>
            <v-file-input v-model="selectedImage" accept="image/*" label="Chọn ảnh sản phẩm"
              style="background-color: white;" dense outlined @change="handleImageChange"></v-file-input>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions class="pr-4">
        <v-spacer></v-spacer>
        <v-btn text="Hủy" @click="closeDialog"></v-btn>
        <v-btn color="primary" variant="elevated" text="Thêm" @click="addProduct"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DialogView',
  props: ['dialog'],
  data() {
    return {
      // Khai báo biến dùng để lưu thông tin sản phẩm mới
      newProduct: {
        productid: '',
        productname: '',
        sku: '',
        price: 0,
        categoryid: '',
        description: '',
        imageurl: '',
        color: [],
        size: [],
        quantity: 0
      },
      selectedImage: null
    };
  },
  computed: {
    ShowDialog: {
      get() {
        return this.dialog;
      },
      set(value) {
        if (!value) {
          this.$emit('close');
        }
      }
    }
  },
  methods: {
    closeDialog() {
      this.ShowDialog = false;
    },
    addProduct() {
      axios.post('/api/products', this.newProduct)
        .then(response => {
          console.log('Thêm sản phẩm thành công:', response.data);
          this.closeDialog();
        })
        .catch(error => {
          console.error('Lỗi khi thêm sản phẩm:', error);
          // Xử lý lỗi và hiển thị thông báo cho người dùng
          // ...
        });
    },
    handleImageChange(event) {
      this.selectedImage = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        // Hiển thị trước ảnh đã chọn nếu cần
        // Ví dụ: this.previewImage = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  },
  
}
</script>

<style></style>