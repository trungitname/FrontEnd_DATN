<template>
  <v-app>
    <SideBar />
    <Top-bar />
    <v-main>
      <SanPhamVue />
      <UsersVue />
    </v-main>
  </v-app>
</template>
<script>
import SideBar from "@/components/Admin/SideBar.vue";
import TopBar from "@/components/Admin/TopBar.vue";
import SanPhamVue from "../Product/SanPham.vue";
import UsersVue from "./UserView.vue";
export default {
  components: { TopBar, SideBar, SanPhamVue, UsersVue },
};
</script>
<style>
</style>