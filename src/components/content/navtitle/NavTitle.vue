<template>
  <div class="nav-title">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item @click.native="navTitlePath" :to="{ path: path }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta"
                          :key="index">
        <a href="javascript:;" >{{item}}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-dropdown>
      <el-avatar :src="imgUrl"></el-avatar>
      <el-dropdown-menu class="nav-title-dropdown"
                        slot="dropdown">
        <el-dropdown-item>首页</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>

<script>
export default {
  data () {
    return {
      path:'/home',
      imgUrl: require('../../../assets/img/title/1.png')
    }
  },
  methods: {
    navTitlePath() {
      this.$store.commit('menuRoute',this.path.substring(1))
    }
  },
}
</script>

<style scoped>
.nav-title {
  width: 100%;
  height: 60px;
  background-color: #eff2f7;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-breadcrumb {
  display: inline-block;
  line-height: 60px;
  padding: 0 0 0 20px;
}

.el-dropdown-menu {
  margin: 0 15px 0 0;
  top: 60px !important;
}
.el-avatar {
  width: 36px;
  height: 36px;
  margin: 0 37px 0 0;
}

.nav-title-dropdown >>> .popper__arrow {
  left: 50% !important;
  transform: translateX(-50%);
}
</style>