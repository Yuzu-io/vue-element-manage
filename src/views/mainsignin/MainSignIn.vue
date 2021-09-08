<template>
  <div class="main-signin">
    <div class="main-signin-text">
      <p>elm后台管理系统</p>
    </div>
    <sign-in class="main-signin-table"
             @signInClick="signInClick"></sign-in>
  </div>
</template>

<script>
import SignIn from '../../components/content/signin/SignIn.vue'

import { getSignIn } from '../../api/getdata';

export default {
  components: {
    SignIn,
  },
  data () {
    return {
      signin: {},
      status: 0,
    }
  },
  created () {
  },
  methods: {
    // 监听事件
    signInClick (val) {
      this.signin = val
      if (this.signin.username !== "" && this.signin.password !== "") {
        getSignIn().then(res => {
          res.admin.find(item => {
            if (this.signin.username === item.username && this.signin.password === item.password) {
              return this.status = 200
            }
            else {
              this.status = 400
            }

          })
          if (this.status === 200) {
            this.$router.push('/system')
          }
          else {
            this.$notify.error({
              title: '错误',
              message: '用户名不存在或者密码错误'
            });
          }
        })
      }
      else {
        this.$notify.error({
          title: '错误',
          message: '请输入用户名或者密码'
        });
      }
    },

  },
}
</script>

<style scoped>
.main-signin {
  background: #324057;
  position: relative;
  height: 100%;
}

.main-signin-text {
  color: #fff;
  font-size: 34px;
  position: absolute;
  left: 0;
  right: 0;
  top: 80px;
  text-align: center;
}
.main-signin-table {
  position: absolute;
  left: 0;
  right: 0;
  top: 200px;
  margin: auto;
}
</style>