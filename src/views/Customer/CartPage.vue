<template>
    <v-app>
        <NavBar />
        <div class="main-container">
            <div id="page-wrap">
                <h1>Giỏ hàng của tôi <v-icon class="mdi mdi-shopping"></v-icon></h1>
                <div v-for="product in cartItems" :key="product.productid" class="product-container">
                    <img class="product-image" :src="product.imageurl">
                    <div class="details-wrap">
                        <h3>{{ product.productname }}</h3>
                        <p>Size: {{ product.selectedSize }}</p>
                        <p>Màu sắc: {{ product.selectedColor }}</p>
                        <p>Giá: ${{ product.price }}</p>
                        <p>Số lượng: {{ product.quantity }}</p>
                    </div>
                    <button class="remove-button" @click="removeFromCart(product.productid)">
                        <v-icon class="mdi mdi-trash-can"></v-icon>
                    </button>
                </div>

                <h3 id="total-price">Tổng tiền: ${{ totalPrice }}</h3>
            </div>
            <div id="confirmation">
                <h3 id="confirmation-title">Xác nhận thông tin nhận hàng</h3>
                <form id="form" @submit.prevent="submit">
                    <v-text-field v-model="name" label="Họ và tên"></v-text-field>
                    <v-text-field v-model="address" label="Địa chỉ"></v-text-field>
                    <v-text-field v-model="phone" label="Số điện thoại"></v-text-field>
                    <v-select v-model="paymentMethod" label="Phương thức thanh toán" :items="items"></v-select>

                    <v-btn variant="outlined" class="me-4" type="submit">Đặt hàng</v-btn>
                    <v-btn variant="outlined">Bỏ</v-btn>
                </form>
            </div>
        </div>
        <FooterView />
    </v-app>
</template>

<script>
import axios from 'axios';
import NavBar from "@/components/Customer/NavBar.vue";
import FooterView from "@/components/Customer/FooterView.vue";

export default {
    name: 'CartPage',
    components: {
        NavBar,
        FooterView,
    },
    data() {
        return {
            cartItems: [],
            name: '',
            address: '',
            phone: '',
            paymentMethod: '',
            items: ['Thanh toán khi nhận hàng', 'Thanh toán PayPal', 'Chuyển khoản', 'VNPAY'],
        }
    },
    computed: {
        totalPrice() {
            return this.cartItems.reduce(
                (sum, item) => sum + (Number(item.price) * item.quantity),
                0,
            );
        }
    },
    methods: {
        async removeFromCart(productid) {
            const result = await axios.delete(`/api/shopping/u01/cart/${productid}`);
            this.cartItems = result.data;
        },
        async submit() {
            try {
                const orderData = {
                    userid: 'u01', // Thay 'your_user_id' bằng user ID của người dùng hiện tại
                    name: this.name,
                    address: this.address,
                    phonenumber: this.phone,
                    paymentmethod: this.paymentMethod,
                    cartitems: this.cartItems.map(item => ({
                        productid: item.productid,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        imageurl: item.imageurl,
                        size: item.size,
                        color: item.color
                    }))
                };
                const response = await axios.post('/api/orderdetails/checkout', orderData);
                console.log('Order submitted successfully:', response.data);
                // Xử lý thành công, ví dụ: điều hướng đến trang xác nhận đơn hàng
            } catch (error) {
                console.error('Error submitting order:', error);
                // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi cho người dùng
            }
        }
    },
    async created() {
        const result = await axios.get('/api/shopping/u01/cart');
        this.cartItems = result.data.map(item => ({
            ...item,
            size: item.selectedSize,
            color: item.selectedColor
        }));
    }
};
</script>

<style scoped>
h1 {
    border-bottom: 1px solid black;
    margin: 0;
    margin-top: 16px;
    padding: 16px;
}

.main-container {
    display: flex;
    justify-content: space-between;
    padding: 16px;
}

#page-wrap {
    flex: 1;
    padding: 16px;
}

#total-price {
    padding: 16px;
    text-align: left;
}

#confirmation {
    flex: 1;
    padding: 16px;
}

#confirmation-title {
    padding: 10px;
    text-align: left;
}

#form {
    padding: 10px;
    width: 100%;
    margin: auto;
}

#checkout-button {
    width: 100%;
}

.product-container {
    align-content: center;
    border-bottom: 1px solid #ddd;
    display: flex;
    padding: 10px;
    width: 100%;
    margin: 10px auto;
}

.product-image {
    flex: 1;
    height: 100px;
    max-width: 100px;
}

.details-wrap {
    padding: 0 16px;
    flex: 3;
}

.remove-button {
    flex: 1;
    margin: auto;
}
</style>
