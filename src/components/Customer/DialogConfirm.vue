<template>
    <v-dialog max-width="500px" v-model="showEditDialog">
        <v-card>
            <v-card-title style="font-weight: bold;">
                <h4>Xác nhận thông tin nhận hàng</h4>
            </v-card-title>
            <v-container style="background-color: rgb(247, 247, 247);">
                <v-row>

                    <v-col cols="12" style="font-size: 13px;">
                        <p>Họ và tên</p>
                        <v-text-field v-model="editedProduct.productid" placeholder="Nhập mã sản phẩm"
                            style="background-color: white;" density="compact" single-line hide-details
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" style="font-size: 13px;">
                        <p>Địa chỉ</p>
                        <v-text-field v-model="editedProduct.productname" placeholder="Nhập tên sản phẩm"
                            style="background-color: white;" density="compact" single-line hide-details
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" style="font-size: 13px;">
                        <p>Số điện thoại</p>
                        <v-text-field v-model="editedProduct.sku" placeholder="Nhập mã SKU"
                            style="background-color: white;" density="compact" single-line hide-details
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" style="font-size: 13px;">
                        <p>Email</p>
                        <v-text-field v-model="editedProduct.price" placeholder="Nhập giá sản phẩm"
                            style="background-color: white;" density="compact" single-line hide-details
                            variant="outlined"></v-text-field>
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
    name: 'DialogConfirm',
    props: {
        value: Boolean, // Thuộc tính prop để điều khiển hiển thị dialog
        selectedUser: Object, // Thuộc tính prop để nhận dữ liệu sản phẩm được chọn
    },
    data() {
        return {
            editedUser: {
                userid: this.selectedUser.userid,
                username: this.selectedUser.username,
                adress: this.selectedUser.adress,
                phonenumber: this.selectedUser.phonenumber,
                email: this.selectedUser.email,
                city: this.selectedUser.city,
                country: this.selectedUser.country,
                rating: this.selectedUser.rating,
                cartitems: this.selectedUser.cartitems,
            },
            selectedImage: null,
        };
    },
    methods: {
        saveChanges() {
            // Gửi yêu cầu cập nhật sản phẩm tới API
            axios.put(`/api/users/${this.editedUser.userid}`, this.editedUser)
                .then(() => {
                    // Xử lý khi cập nhật thành công
                    this.$emit('input', false); // Đóng dialog
                    // Cập nhật lại danh sách sản phẩm  
                    this.$emit('editedUser');
                })
                .catch(error => {
                    // Xử lý khi có lỗi xảy ra
                    console.error('Error updating user:', error);
                });
        },
    }

}
</script>

<style></style>