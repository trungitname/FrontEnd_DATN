<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-text-field style="background-color: white; font-size: 15px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);"
            density="compact" variant="outlined" label="Tìm kiếm" append-inner-icon="mdi mdi-magnify" single-line
            hide-details class="mr-2"></v-text-field>
        </v-col>
        <v-col cols="9" class="text-right">
          <v-btn @click="dialog = true" color="primary" prepend-icon="mdi mdi-plus" class="text-uppercase">
            Tạo mới
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-table density="compact">
              <thead>
                <tr>
                  <th class="text-left" style="opacity: 1">Mã đơn hàng chi tiết</th>
                  <th class="text-left" style="opacity: 1">Tên khách hàng <v-icon color="error">mdi
                      mdi-account-heart</v-icon></th>
                  <th class="text-left" style="opacity: 1; width: 120px;">Địa chỉ <v-icon color="error">mdi
                      mdi-map-marker</v-icon></th>
                  <th class="text-left" style="opacity: 1">Số điện thoại <v-icon color="error">mdi mdi-phone</v-icon>
                  </th>
                  <th class="text-left" style="opacity: 1; width: 180px;">Sản phẩm đặt mua <v-icon color="info">mdi
                      mdi-shopping</v-icon></th>
                  <th class="text-left" style="opacity: 1">Thành tiền <v-icon color="green">mdi mdi-cash</v-icon></th>
                  <th class="text-left" style="opacity: 1; width: 140px;">Phương thức thanh toán</th>
                  <th class="text-left" style="opacity: 1; width: 140px;">Trạng thái</th>
                  <th class="text-left" style="opacity: 1">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(orderdetail, index) in orderdetails" :key="orderdetail.orderdetailid">
                  <td>{{ orderdetail.orderdetailid }}</td>
                  <td>{{ orderdetail.infor[0].username }}</td>
                  <td>{{ orderdetail.infor[0].adress }}</td>
                  <td>{{ orderdetail.infor[0].phonenumber }}</td>
                  <td>
                    <div v-for="item in orderdetail.order" :key="item.productid" class="product-item">
                      <div>Product ID: {{ item.productid }}</div>
                      <div>Số lượng: {{ item.quantity }}</div>
                      <div>Giá: ${{ item.price }}</div>
                      <div>Size: {{ item.size }}</div>
                      <div>Color: {{ item.color }}</div>
                    </div>
                  </td>
                  <td>${{ orderdetail.subtotal }}</td>
                  <td>{{ orderdetail.paymentmethod }}</td>
                  <td>{{ orderdetail.status }} <v-icon :color="statusIconMap[orderdetail.status].color">
                      {{ statusIconMap[orderdetail.status].icon }}
                    </v-icon>
                  </td>
                  <td>
                    <div style="display: flex">
                      <v-icon @click="showConfirmDialog(orderdetail, index)" class="mr-3"
                        style="opacity: 0.5; cursor: pointer;">
                        mdi mdi-update
                      </v-icon>
                      <v-icon @click="updateOrderStatusCancelled(orderdetail, index)"
                        style="opacity: 0.5; cursor: pointer; color: red">
                        mdi mdi-trash-can-outline
                      </v-icon>
                    </div>
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
                <v-pagination active-color="#0F60FF" variant="text" density="compact" :length="5"></v-pagination>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Dialog Confirm Update Status -->
    <v-dialog v-model="confirmDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Xác nhận</v-card-title>
        <v-card-text>
          Bạn có muốn cập nhật trạng thái đơn hàng từ {{ currentStatus }} thành {{ nextStatus }} không?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="confirmUpdate">Có</v-btn>
          <v-btn color="grey darken-1" text @click="confirmDialog = false">Không</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="confirmCancelDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Xác nhận huỷ đơn hàng</v-card-title>
        <v-card-text>
          Bạn có chắc chắn muốn huỷ đơn hàng này không?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="confirmCancelUpdate">Có</v-btn>
          <v-btn color="grey darken-1" text @click="confirmCancelDialog = false">Không</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <DialogVue v-model="dialog" />
  </div>
</template>

<script>
import axios from "axios";
import DialogVue from "../../components/DialogOrderdetails.vue";

export default {
  components: { DialogVue },
  name: "OrderdetailsView",
  data() {
    return {
      dialog: false,
      confirmDialog: false,
      confirmCancelDialog: false,
      currentIndex: -1,
      currentStatus: '',
      nextStatus: '',
      orderdetails: [],
      statusIconMap: {
        "Đang xử lý": { icon: "mdi mdi-progress-clock", color: "grey" },
        "Đang giao": { icon: "mdi mdi-truck", color: "blue" },
        "Đã giao": { icon: "mdi mdi-check-circle", color: "green" },
        "Hoàn thành": { icon: "mdi mdi-check-circle-outline", color: "green" },
        "Đã huỷ": { icon: "mdi mdi-cancel", color: "red" }
      }
    };
  },
  async created() {
    // Lấy danh sách orderdetails từ API khi component được tạo
    await this.fetchOrderdetails();
  },
  methods: {
    async fetchOrderdetails() {
      try {
        const response = await axios.get("/api/orderdetails");
        this.orderdetails = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu orderdetails:", error);
      }
    },
    async deleteOrderdetail(orderdetailid, index) {
      try {
        // Gửi yêu cầu xóa đơn hàng chi tiết với orderdetailid tương ứng
        await axios.delete(`/api/orderdetails/${orderdetailid}`);
        // Xóa orderdetail khỏi danh sách orderdetails hiện tại
        this.orderdetails.splice(index, 1);
        // Hiển thị thông báo hoặc cập nhật giao diện theo nhu cầu
      } catch (error) {
        console.error("Lỗi khi xóa đơn hàng chi tiết:", error);
        // Xử lý lỗi nếu cần
      }
    },
    showConfirmDialog(orderdetail, index) {
      const nextStatusMap = {
        "Đang xử lý": "Đang giao",
        "Đang giao": "Đã giao",
        "Đã giao": "Hoàn thành"
      };
      this.currentOrder = orderdetail;
      this.currentIndex = index;
      this.currentStatus = orderdetail.status;
      this.nextStatus = nextStatusMap[orderdetail.status] || "Đang xử lý";
      this.confirmDialog = true;
    },
    async confirmUpdate() {
      this.confirmDialog = false;
      await this.updateOrderStatus(this.currentOrder.orderdetailid, this.currentStatus, this.currentIndex);
      await this.fetchOrderdetails();
    },
    async updateOrderStatus(orderdetailid, currentStatus, index) {
      const nextStatusMap = {
        "Đang xử lý": "Đang giao",
        "Đang giao": "Đã giao",
        "Đã giao": "Hoàn thành"
      };

      try {
        const response = await axios.put(`/api/orderdetails/${orderdetailid}`, {
          status: nextStatusMap[currentStatus] || "Pending"
        });
        this.$set(this.orderdetails, index, response.data);
      } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
      }
    },
    async updateOrderStatusCancelled(orderdetail, index) {
      try {
        // Hiển thị dialog confirm trước khi cập nhật trạng thái
        this.confirmCancelDialog = true;
        // Gán orderdetailid và index cho biến tạm để sử dụng khi xác nhận cập nhật
        this.tempOrderdetailId = orderdetail.orderdetailid;
        this.tempIndex = index;
        
      } catch (error) {
        console.error("Lỗi khi xác nhận huỷ đơn hàng:", error);
      }
    },
    async confirmCancelUpdate() {
      try {
        this.confirmCancelDialog = false; // Đóng dialog
        const { tempOrderdetailId: orderdetailid, tempIndex: index } = this;
        // Gửi yêu cầu cập nhật trạng thái đơn hàng
        const response = await axios.put(`/api/orderdetails/${orderdetailid}`, {
          status: "Đã huỷ"
        });
        // Cập nhật trạng thái mới trong mảng orderdetails
        this.orderdetails[index] = response.data;
        await this.fetchOrderdetails();
      } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái đơn hàng thành 'Đã huỷ':", error);
      }
    }
  },
};
</script>

<style>
.product-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>

<!-- <template>
    <div>
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-text-field
              style="
                background-color: white;
                font-size: 15px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              "
              density="compact"
              variant="outlined"
              label="Tìm kiếm"
              append-inner-icon="mdi mdi-magnify"
              single-line
              hide-details
              class="mr-2"
            ></v-text-field>
          </v-col>
          <v-col cols="9" class="text-right">
            <v-btn
              @click="dialog = true"
              color="primary"
              prepend-icon="mdi mdi-plus"
              class="text-uppercase"
              >Tạo mới</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-table density="compact">
                <thead>
                  <tr>
                    <th
                      class="text-left"
                      style="opacity: 0.5"
                      width="96px"
                      height="15px"
                    >
                      Mã đơn hàng chi tiết
                    </th>
                    <th
                      class="text-left"
                      style="opacity: 0.5"
                      width="96px"
                      height="15px"
                    >
                      Mã đơn hàng
                    </th>
                    <th
                      class="text-left"
                      style="opacity: 0.5"
                      width="96px"
                      height="15px"
                    >
                      Khách hàng
                    </th>
                    <th
                      class="text-left"
                      style="opacity: 0.5"
                      width="96px"
                      height="15px"
                    >
                      Sản phẩm đặt mua
                    </th>
                    <th
                      class="text-left"
                      style="opacity: 0.5"
                      width="96px"
                      height="15px"
                    >
                      Thành tiền
                    </th>
                    <th
                      class="text-left"
                      style="opacity: 0.5"
                      width="96px"
                      height="15px"
                    >
                      <p class="">Hành động</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="orderdetail in orderdetails" v-bind:key="orderdetail.orderdetailid">
                    <td>{{ orderdetail.orderdetailid }}</td>
                    <td>{{ orderdetail.orderid }}</td>
                    <td>{{ orderdetail.userid }}</td>
                    <td>{{ orderdetail.productid }}</td>
                    <td>{{ orderdetail.subtotal }}</td>
                    <td class="text-left">
                      <div style="display: flex">
                        <v-icon class="mr-3" style="opacity: 0.5; cursor: pointer;"
                          >mdi mdi-square-edit-outline</v-icon
                        >
                        <v-icon style="opacity: 0.5; cursor: pointer;"
                          >mdi mdi-trash-can-outline</v-icon
                        >
                      </div>
                    </td>
                  </tr>
                </tbody>
              </v-table>
              <v-row class="ma-2">
                <v-col cols="8">
                  <v-row>
                    <p class="mt-5 opacity">Showing</p>
                    <v-col cols="2">
                      <v-select
                        density="compact"
                        :items="['10', '20', '25', '30', 'All']"
                        variant="outlined"
                      ></v-select>
                    </v-col>
                    <p class="mt-5 opacity">of 50</p>
                  </v-row>
                </v-col>
                <v-col cols="4" class="text-right">
                  <v-pagination
                    active-color="#0F60FF"
                    variant="text"
                    density="compact"
                    :length="5"
                  ></v-pagination>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <DialogVue v-model="dialog" />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import DialogVue from "../../components/DialogOrderdetails.vue";
  export default {
    components: { DialogVue },
    name: "OrderdetailsView",
    data() {
      return {
        dialog: false,
        orderdetails: [],
      };
    },
    async created(){
      const result = await axios.get('/api/orderdetails');
      const orderdetails = result.data;
      this.orderdetails = orderdetails;
    },
  };
  </script>
  
  <style>
  </style> -->