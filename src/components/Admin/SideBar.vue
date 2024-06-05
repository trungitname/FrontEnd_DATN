<template>
  <v-navigation-drawer>
    <v-toolbar style="background-color: white">
      <v-row>
        <v-col cols="8">
          <v-img class="product-image"
            src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/363428562_119416894563779_7953125426344180715_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=R5lo8jvKFIwQ7kNvgHBdJR1&_nc_ht=scontent.fhan14-5.fna&oh=00_AYAZ2gBPul-L9ghOYA3C0kfUMHCee8HgSDOD4ptaPqOg9g&oe=6650DA26"
          ></v-img>
        </v-col>
        <v-col cols="4" class="text-right">
          <v-icon>mdi mdi-backburger</v-icon>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-list>
      <v-list-subheader>Quản lý Rolling</v-list-subheader>
      <v-list-item
        v-for="(item, i) in links"
        :key="i"
        :value="item"
        color="primary"
        :to="item.route"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      links: [
        { icon: " mdi mdi-tshirt-crew-outline", text: "Sản Phẩm", route: "product" },
        { icon: "mdi mdi-human-queue", text: "Khách hàng", route: "users" },
        { icon: " mdi mdi-ab-testing", text: "Loại sản phẩm", route: "categories" },
        { icon: " mdi mdi-store", text: "Chuỗi cửa hàng", route: "storechains" },
        { icon: " mdi mdi-human-capacity-increase", text: "Nhân viên", route: "staffs" },
        { icon: " mdi mdi-cart", text: "Đơn hàng", route: "orders" },
        { icon: " mdi mdi-printer", text: "Chi tiết Đơn hàng", route: "orderdetails" },
      ],
    };
  },
};
</script>

<style>
.product-image {
  max-width: 60px; /* Giới hạn chiều rộng của ảnh */
  max-height: 60px; /* Giới hạn chiều cao của ảnh */
}
</style>