<template>
  <div class="system">
    <el-container>
      <el-aside width="210px">
        <nav-menu></nav-menu>
      </el-aside>
      <el-container>
        <el-header>
          <nav-title></nav-title>
        </el-header>
        <el-main>
          <router-view :tlData="tlData"
                       :totalData="totalData"
                       :newData="newData"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from '../../components/content/navmenu/NavMenu.vue'
import NavTitle from '../../components/content/navtitle/NavTitle.vue'

import { getTime, formatDate } from '../../utils/time';

import admin from '../../../public/json/admin.json';
import user from '../../../public/json/user.json';


export default {
  components: {
    NavMenu,
    NavTitle,
  },
  data () {
    return {
      tlData: {
        admin: [],
        user: [],
        order: []
      },
      totalData: {
        adminNumber: 0,
        userNumber: 0,
        orderNumber: 0
      },
      newData: {
        adminNumber: 0,
        userNumber: 0,
        orderNumber: 0
      },
    }
  },
  created () {
    this.adminNum()
    this.userNum()

    this.newAdmin()
    this.newUser()
  },
  methods: {
    // 获取数据
    adminNum () {
      this.$store.commit('totalAdmin', admin.admin)
      this.tlData.admin = admin.admin
      this.totalData.adminNumber = admin.admin.length
    },
    userNum () {
      this.$store.commit('totalUser', user.user)
      this.tlData.user = user.user
      this.totalData.userNumber = user.user.length
    },

    // 处理数据
    newAdmin () {
      admin.admin.filter(item => {
        const data = new Date(item.time)
        return formatDate(data, 'yyyy-MM-dd') === getTime('yyyy-MM-dd') ? this.newData.adminNumber++ : false
      })
    },
    newUser () {
      user.user.filter(item => {
        const data = new Date(item.time)
        return formatDate(data, 'yyyy-MM-dd') === getTime('yyyy-MM-dd') ? this.newData.userNumber++ : false
      })
    },
  },
}
</script>

<style scoped>
.system,
.el-container {
  height: 100%;
}
.el-aside {
  overflow: auto;
}
.el-aside::-webkit-scrollbar{
  display: none;
}
.el-header {
  padding: 0;
}
</style>