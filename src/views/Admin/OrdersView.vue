<template>
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
                      Mã đơn hàng
                    </th>
                    <th
                      class="text-left"
                      style="opacity: 0.5"
                      width="96px"
                      height="15px"
                    >
                      Ngày đặt hàng
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
                      Tổng số lượng
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
                  <tr v-for="order in orders" v-bind:key="order.orderid">
                    <td>{{ order.orderid }}</td>
                    <td>{{ order.orderdate }}</td>
                    <td>{{ order.userid }}</td>
                    <td>{{ order.totalquantity }}</td>
                    <td>{{ order.totalvalue }}</td>
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
  import DialogVue from "../../components/DialogOrders.vue";
  export default {
    components: { DialogVue },
    name: "OrdersView",
    data() {
      return {
        dialog: false,
        orders: [],
      };
    },
    async created(){
      const result = await axios.get('/api/orders');
      const orders = result.data;
      this.orders = orders;
    },
  };
  </script>
  
  <style>
  </style>