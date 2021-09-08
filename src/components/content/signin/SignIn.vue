<template>
  <el-form ref="ruleForm"
           class="signin">
    <el-form-item>
      <el-input placeholder="用户名"
                v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password"
                placeholder="密码"
                v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 class="el-btn"
                 @click="signInClick">登陆</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signInClick () {
      this.$emit('signInClick',this.ruleForm)
    }
  },
}
</script>

<style scoped>
.signin {
  width: 320px;
  height: 210px;
  padding: 25px;
  border-radius: 5px;
  background-color: #fff;
}
.el-btn {
  width: 100%;
}
</style>