<template>
    <v-app>
        <NavBar />
        <div class="main-container">
            <div id="page-wrap" v-if="product">
                <h1>Sản phẩm <v-icon class="mdi mdi-hanger"></v-icon></h1>
                <div id="img-wrap">
                    <img :src="product.imageurl">
                </div>
                <div id="product-details">
                    <h1>{{ product.productname }}</h1>
                    <h3 id="price">${{ product.price }}</h3>
                    <div>
                        <p>Chọn Kích cỡ:</p>
                        <v-select v-model="selectedSize" :items="product.size" label="Size" outlined return-object></v-select>
                    </div>
                    <div>
                        <p>Màu sắc:</p>
                        <v-select v-model="selectedColor" :items="product.color" label="Color" outlined return-object></v-select>
                    </div>
                    <div>
                        <v-text-field label="Số lượng" v-model="selectedQuantity" :items="product.quantity"
                            type="number" clearable outlined></v-text-field>
                    </div>
                    <button id="add-to-cart" v-if="!itemIsInCart && !showSuccessMessage" @click="addToCart">Thêm vào giỏ
                        hàng</button>
                    <button id="add-to-cart" class="green-button" v-if="!itemIsInCart && showSuccessMessage">Hoàn
                        thành!</button>
                    <button id="add-to-cart" class="grey-button" v-if="itemIsInCart">Đã được thêm vào giỏ hàng</button>

                </div>
            </div>
            <div id="feedback">
                <h3>Feedback <v-icon class="mdi mdi-image-auto-adjust"></v-icon></h3>
                <v-carousel height="500" show-arrows="hover" cycle hide-delimiter-background>
                    <v-carousel-item v-for="(slide, i) in slides" :key="i">
                        <v-img :src="require(`@/assets/${slide}`)" height="100%">
                            <div class="d-flex fill-height justify-center align-center"></div>
                        </v-img>
                    </v-carousel-item>
                </v-carousel>
                <div class="text-center">
                    <v-rating v-model="rating" hover></v-rating>
                </div>
                <div>
                    <h4>Mô tả</h4>
                    <p>{{ product.description }}</p>
                </div>
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
    name: 'ProductDetailPage',
    data() {
        return {
            product: {},
            cartItems: [],
            showSuccessMessage: false,
            selectedSize: null,
            selectedColor: null,
            selectedQuantity: 1,
            slides: [
                'image1.jpg',
                'image2.jpg',
                'image3.jpg',
            ],
            rating: 4,
        };
    },
    computed: {
        itemIsInCart() {
            return this.cartItems.some(item => item.productid === this.product.productid);
        }
    },
    methods: {
        // async addToCart() {
        //     try {
        //         await axios.post(`/api/shopping/u01/cart`, {
        //             productid: this.product.productid,
        //             quantity: 1 // Số lượng mặc định khi thêm vào giỏ hàng
        //         });
        //         this.showSuccessMessage = true;
        //         setTimeout(() => {
        //             this.showSuccessMessage = false;
        //         }, 1500);
        //     } catch (error) {
        //         console.error('Error while adding item to cart:', error);
        //     }
        // },
        async addToCart() {
            try {
                await axios.post(`/api/shopping/u01/cart`, {
                    productid: this.product.productid,
                    quantity: this.selectedQuantity,
                    price: this.product.price,
                    size: this.selectedSize,
                    color: this.selectedColor
                });
                this.showSuccessMessage = true;
                setTimeout(() => {
                    this.showSuccessMessage = false;
                }, 1500);
            } catch (error) {
                console.error('Error while adding item to cart:', error);
            }
        },
    },
    async created() {
        const { data: product } = await axios.get(`/api/products/${this.$route.params.productid}`);
        this.product = product;

        const { data: cartItems } = await axios.get('/api/shopping/u01/cart');
        this.cartItems = cartItems;
    },
    components: {
        NavBar,
        FooterView,
    },
};
</script>

<style scoped>
.main-container {
    display: flex;
    justify-content: space-between;
    padding: 16px;
}

#page-wrap {
    flex: 1;
    margin-right: 16px;
    padding: 16px;
    max-width: 600px;
}

#feedback {
    flex: 1;
    margin-left: 16px;
    padding: 16px;
}

#img-wrap {
    text-align: center;
}

img {
    width: 400px;
}

#product-details {
    padding: 16px;
    position: relative;
}

#add-to-cart {
    width: 100%;
}

#price {
    position: absolute;
    top: 24px;
    right: 16px;
}

.green-button {
    color: green;
    /* Màu chữ */
    border: 1px solid green;
    /* Viền ngoài */
    background-color: transparent;
    /* Nền trong suốt */
    /* Các thuộc tính khác */
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}

.grey-button {
    background-color: #888;
    border: 1px solid green;
    /* Viền ngoài */
    background-color: transparent;
    /* Nền trong suốt */
    /* Các thuộc tính khác */
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}
</style>
