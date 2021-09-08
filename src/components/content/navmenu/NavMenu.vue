<template>
  <div class="nav-menu">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu :default-active="getMenuRoute"
                 class="el-menu-vertical-demo"
                 @select="handleSelect"
                 background-color="#304156"
                 text-color="#bfcbd9"
                 router
                 active-text-color="#409EFF">
          <!--  -->

          <el-menu-item index="home">
            <i class="el-icon-s-marketing"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>数据管理</span>
            </template>
            <el-menu-item index="userlist">用户列表</el-menu-item>
            <el-menu-item index="merchantlist">商家列表</el-menu-item>
            <el-menu-item index="foodlist">食品列表</el-menu-item>
            <el-menu-item index="orderlist">订单列表</el-menu-item>
            <el-menu-item index="adminlist">管理员列表</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-plus"></i>
              <span>添加数据</span>
            </template>
            <el-menu-item index="addshop">添加商铺</el-menu-item>
            <el-menu-item index="addinggoods">添加商品</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>图表</span>
            </template>
            <el-menu-item index="4-1">用户分布</el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>编辑</span>
            </template>
            <el-menu-item index="5-1">文本编辑</el-menu-item>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>设置</span>
            </template>
            <el-menu-item index="6-1">管理员设置</el-menu-item>
          </el-submenu>

          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-warning"></i>
              <span>说明</span>
            </template>
            <el-menu-item index="7-1">说明</el-menu-item>
          </el-submenu>
          <!--  -->
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script> 
export default {
  data () {
    return {
      menuRoute: ''
    }
  },
  computed: {
    getMenuRoute() {
      return this.menuRoute = this.$store.getters.getRouteData
    },
  },
  mounted () {
    this.meroute()
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath);
    },
    handleSelect(key, keyPath){
      this.$store.commit('menuRoute',key)
    },
    meroute(){
      this.menuRoute = this.$route.path.substring(1)
      this.$store.commit('menuRoute',this.menuRoute)
    },
  }
}
</script>

<style scoped>
.nav-menu {
  height: 100%;
  background-color: #304156;
}

i {
  color: #bfcbd9;
  margin: 0 16px 0 0 !important;
}

.el-submenu .el-menu-item {
  background-color: #1f2d3d !important;
}
.el-submenu .el-menu-item:hover {
  background-color: #001528 !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
  height: 100%;
}
</style>