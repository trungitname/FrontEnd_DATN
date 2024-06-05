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
                      Mã nhân viên
                    </th>
                    <th
                      class="text-left"
                      style="opacity: 0.5"
                      width="96px"
                      height="15px"
                    >
                      Tên nhân viên
                    </th>
                    <th
                      class="text-left"
                      style="opacity: 0.5"
                      width="96px"
                      height="15px"
                    >
                      Chức vụ
                    </th>
                    <th
                      class="text-left"
                      style="opacity: 0.5"
                      width="96px"
                      height="15px"
                    >
                      Cửa hàng
                    </th>
                    <th
                      class="text-left"
                      style="opacity: 0.5"
                      width="96px"
                      height="15px"
                    >
                      Email
                    </th>
                    <th
                      class="text-left"
                      style="opacity: 0.5"
                      width="96px"
                      height="15px"
                    >
                      Điện thoại
                    </th>
                    <th
                      class="text-left"
                      style="opacity: 0.5"
                      width="96px"
                      height="15px"
                    >
                      Địa chỉ
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
                  <tr v-for="staff in staffs" v-bind:key="staff.staffid">
                    <td>{{ staff.staffid }}</td>
                    <td>{{ staff.staffname }}</td>
                    <td>{{ staff.position }}</td>
                    <td>{{ staff.storeid }}</td>
                    <td>{{ staff.email }}</td>
                    <td>{{ staff.phonenumber }}</td>
                    <td>{{ staff.adress }}</td>
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
  import DialogVue from "../../components/DialogStaffs.vue";
  export default {
    components: { DialogVue },
    name: "StaffsView",
    data() {
      return {
        dialog: false,
        staffs: [],
      };
    },
    async created(){
      const result = await axios.get('/api/staffs');
      const staffs = result.data;
      this.staffs = staffs;
    },
  };
  </script>
  
  <style>
  </style>