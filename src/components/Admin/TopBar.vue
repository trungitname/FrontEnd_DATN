<template>
  <v-app-bar >
    <div>
        <!-- <p>Danh sách sản phẩm</p> -->
    </div>
    <v-spacer></v-spacer>
    <v-toolbar-item>
        <v-btn>
            <!-- <v-icon> mdi mdi-fencing</v-icon> -->
        </v-btn>
        <v-btn>
                <v-icon>mdi mdi-bell</v-icon>
            <v-badge content="5+" color="red">
            </v-badge>
        </v-btn>
        <v-btn>
            <v-avatar>
            <v-img 
                src="https://alltop.vn/backend/media/images/posts/467/Tim_goc_chup_phu_hop-17057.jpg"
                alt="Duc"
                style="width: 38px; height: 38px;"
                >                              
            </v-img>
        </v-avatar>
        </v-btn>
        
    </v-toolbar-item>
  </v-app-bar>
</template>

<script>
export default {
    name:'TopBar'
}
</script>

<style>

</style>