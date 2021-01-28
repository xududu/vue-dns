<template>
  <div id="app">
    <el-container style="height: 700px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(112,128,144)">
        <el-menu router>
          <el-menu-item index="/groupdns1">
            <i class="el-icon-burger"></i>
            <span slot="title">Group Dns 6.57</span>
          </el-menu-item>

          <el-menu-item index="/Cdns1">
            <i class="el-icon-menu"></i>
            <span slot="title">Common Dns 0.217</span>
          </el-menu-item>

          <el-menu-item index="/Group4">
            <i class="el-icon-menu"></i>
            <span slot="title">Dns 14.57</span>
          </el-menu-item>

          <el-menu-item index="/Group5">
            <i class="el-icon-menu"></i>
            <span slot="title">Dns 15.57</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {},
  methods: {
    ...mapActions(["initList"]),
  },
  created() {
    this.initList();
  }
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
#app {
  height: 100%;
}
</style>

