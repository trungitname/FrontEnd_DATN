<template>
    <v-app>
        <NavBar />
        <div class="main-container">
            <div id="page-wrap">
                <h1>Đơn hàng của tôi <v-icon class="mdi mdi-shopping-search"></v-icon></h1>
                <!-- Hiển thị danh sách đơn hàng -->
                <v-row>
                    <v-col cols="10" offset="1">
                        <v-card v-for="(orderdetail, index) in orderdetails" :key="orderdetail.orderdetailid" class="mb-4">
                            <v-card-title>Đơn hàng #{{ index + 1 }}</v-card-title>
                            <v-card-subtitle class="pb-0">Thông tin nhận hàng</v-card-subtitle>
                            <v-card-text>
                                <v-list dense>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>Tên khách hàng</v-list-item-title>
                                            <v-list-item-subtitle>{{ orderdetail.infor[0].username }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>Địa chỉ</v-list-item-title>
                                            <v-list-item-subtitle>{{ orderdetail.infor[0].adress }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>Số điện thoại</v-list-item-title>
                                            <v-list-item-subtitle>{{ orderdetail.infor[0].phonenumber }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>Phương thức thanh toán</v-list-item-title>
                                            <v-list-item-subtitle>{{ orderdetail.paymentmethod }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>Trạng thái đơn hàng</v-list-item-title>
                                            <v-list-item-subtitle>{{ orderdetail.status }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                            <!-- Phần stepper -->
                            <v-stepper v-model="orderdetail.status" alt-labels class="custom-stepper">
                                <v-stepper-header>
                                    <v-stepper-item v-for="(step, i) in stepperSteps" :key="i" :value="step"
                                        :icon="getIconName(step)" :color="getIconColor(step)">
                                        <template v-slot:title>
                                            {{ step }}
                                        </template>
                                    </v-stepper-item>
                                </v-stepper-header>
                            </v-stepper>
                            <v-divider></v-divider>
                            <v-card-subtitle class="pb-0">Sản phẩm</v-card-subtitle>
                            <v-card-text>
                                <v-list dense>
                                    <v-list-item v-for="product in orderdetail.order" :key="product.productid">
                                        <v-list-item-content>
                                            <v-list-item-avatar>
                                                <v-img :src="getImageUrl(product.productid)" class="product-image"></v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-title>{{ product.productname }}</v-list-item-title>
                                            <v-list-item-subtitle>Size: {{ product.size }}, Màu sắc: {{ product.color }}</v-list-item-subtitle>
                                            <v-list-item-subtitle>Giá: ${{ product.price }}, Số lượng: {{ product.quantity }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                            <v-card-text>
                                <v-list-item-content>
                                    <v-list-item-title>Tổng tiền</v-list-item-title>
                                    <v-list-item-subtitle>${{ orderdetail.subtotal }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
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
    name: 'OrderPage',
    components: {
        NavBar,
        FooterView,
    },
    data() {
        return {
            orderdetails: [],
            imageurl: {},
            stepperSteps: ["Đang xử lý", "Đang giao", "Đã giao", "Đã hoàn thành", "Đã huỷ"],
            stepIcons: {
                "Đang xử lý": "mdi mdi-circle-outline",
                "Đang giao": "mdi mdi-truck",
                "Đã giao": "mdi mdi-check-circle-outline",
                "Đã hoàn thành": "mdi mdi-check-all",
                "Đã huỷ": "mdi mdi-cancel"
            }
        }
    },
    methods: {
        async fetchOrderdetails() {
            try {
                const response = await axios.get("/api/orderdetails");
                this.orderdetails = response.data;
                // Tải ảnh sản phẩm cho tất cả các sản phẩm trong đơn hàng
                await this.fetchProductImages();
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu orderdetail:", error);
            }
        },
        // Tải ảnh sản phẩm cho tất cả các sản phẩm trong đơn hàng
        async fetchProductImages() {
            try {
                const productIds = this.orderdetails.flatMap(order => order.order.map(p => p.productid));
                const uniqueProductIds = [...new Set(productIds)];
                const productRequests = uniqueProductIds.map(productId => axios.get(`/api/products/${productId}`));
                const responses = await Promise.all(productRequests);
                responses.forEach(response => {
                    const product = response.data;
                    this.imageurl[product.productid] = product.imageurl;
                });
            } catch (error) {
                console.error("Lỗi khi lấy ảnh sản phẩm:", error);
            }
        },
        // Phương thức để lấy tên icon cho mỗi trạng thái
        getIconName(step) {
            return this.stepIcons[step];
        },
        getIconColor(step) {
            // Trả về class CSS tương ứng với mỗi bước
            switch (step) {
                case "Đang xử lý":
                    return "blue";
                case "Đang giao":
                    return "green";
                case "Đã giao":
                    return "success";
                case "Đã hoàn thành":
                    return "primary";
                case "Đã huỷ":
                    return "red";
                default:
                    return ""; // Hoặc trả về class mặc định nếu không có màu sắc nào được chỉ định
            }
        },
        getImageUrl(productid) {
            return this.imageurl[productid] || ''; // Trả về URL ảnh sản phẩm hoặc chuỗi rỗng nếu chưa có
        }
    },
    async created() {
        await this.fetchOrderdetails();
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
    justify-content: center;
    padding: 16px;
}

#page-wrap {
    flex: 1;
    padding: 16px;
} 

.product-container {
    align-content: center;
    border-bottom: 1px solid #ddd;
    display: flex;
    padding: 10px;
    width: 100%;
    margin: 10px auto;
    align-items: center;
}

.product-image {
    flex: 1;
    height: 70px; /* Adjust the height as needed */
    max-width: 70px; /* Adjust the width as needed */
    border-radius: 8px; /* To make it slightly larger than an avatar */
}

.details-wrap {
    padding: 0 16px;
    flex: 3;
}

.order-info {
    margin-bottom: 20px;
    margin-top: 20px;
}



</style>
