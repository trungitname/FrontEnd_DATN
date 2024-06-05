<template>
    <v-dialog max-width="500px" v-model="showEditDialog">
        <v-card>
            <v-card-title style="font-weight: bold;">
                <h4>Chỉnh sửa sản phẩm</h4>
            </v-card-title>
            <v-container style="background-color: rgb(247, 247, 247);">
                <v-row>
                    <v-col cols="12" style="font-size: 13px;">
                        <p>Mã sản phẩm</p>
                        <v-text-field v-model="editedProduct.productid" placeholder="Nhập mã sản phẩm"
                            style="background-color: white;" density="compact" single-line hide-details
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" style="font-size: 13px;">
                        <p>Tên sản phẩm</p>
                        <v-text-field v-model="editedProduct.productname" placeholder="Nhập tên sản phẩm"
                            style="background-color: white;" density="compact" single-line hide-details
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" style="font-size: 13px;">
                        <p>Mã SKU</p>
                        <v-text-field v-model="editedProduct.sku" placeholder="Nhập mã SKU"
                            style="background-color: white;" density="compact" single-line hide-details
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" style="font-size: 13px;">
                        <p>Giá</p>
                        <v-text-field v-model="editedProduct.price" placeholder="Nhập giá sản phẩm"
                            style="background-color: white;" density="compact" single-line hide-details
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" style="font-size: 13px;">
                        <p>Loại sản phẩm</p>
                        <v-text-field v-model="editedProduct.categoryid" placeholder="Nhập loại sản phẩm"
                            style="background-color: white;" density="compact" single-line hide-details
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" style="font-size: 13px;">
                        <p>Mô tả</p>
                        <v-textarea v-model="editedProduct.description" placeholder="Nhập mô tả"
                            style="background-color: white;" density="compact" single-line hide-details
                            variant="outlined"></v-textarea>
                    </v-col>
                    <v-col cols="12" style="font-size: 13px;">
                        <p>Số lượng</p>
                        <v-text-field v-model="editedProduct.quantity" placeholder="Nhập số lượng sản phẩm"
                            style="background-color: white;" density="compact" single-line hide-details
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" style="font-size: 13px;">
                        <p>Màu sắc</p>
                        <v-textarea v-model="editedProduct.color" placeholder="Nhập màu sắc (mỗi màu một dòng)"
                            style="background-color: white;" dense outlined></v-textarea>
                    </v-col>
                    <!-- <v-col cols="12" style="font-size: 13px;">
                        <p>Size</p>
                        <v-textarea v-model="editedProduct.size" placeholder="Nhập size (mỗi size một dòng)"
                            style="background-color: white;" dense outlined></v-textarea>
                    </v-col> -->
                    <v-col cols="12">
            <v-combobox v-model="editedProduct.size" :items="items" label="Chọn sizes" chips multiple style="background-color: white;" dense outlined></v-combobox>
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
                <v-btn text="Hủy" @click="closeEditDialog"></v-btn>
                <v-btn color="primary" variant="elevated" text="Lưu thay đổi" @click="saveChanges"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DialogEditView',
    props: {
        value: Boolean, // Thuộc tính prop để điều khiển hiển thị dialog
        selectedProduct: Object, // Thuộc tính prop để nhận dữ liệu sản phẩm được chọn
    },
    data() {
        return {
            editedProduct: {
                productid: this.selectedProduct.productid,
                productname: this.selectedProduct.productname,
                sku: this.selectedProduct.sku,
                price: this.selectedProduct.price,
                categoryid: this.selectedProduct.categoryid,
                description: this.selectedProduct.description,
                quantity: this.selectedProduct.quantity,
                color: this.selectedProduct.color,
                size: this.selectedProduct.size,
            },
            selectedImage: null,
            items: ['S', 'M', 'L', 'XL'],
        };
    },
    methods: {
        saveChanges() {
            // Gửi yêu cầu cập nhật sản phẩm tới API
            axios.put(`/api/products/${this.editedProduct.productid}`, this.editedProduct)
                .then(() => {
                    // Xử lý khi cập nhật thành công
                    this.$emit('input', false); // Đóng dialog
                    // Cập nhật lại danh sách sản phẩm  
                    this.$emit('productEdited');
                })
                .catch(error => {
                    // Xử lý khi có lỗi xảy ra
                    console.error('Error updating product:', error);
                });
        },
    }

}
</script>

<style></style>