<template>
  <el-dialog :title="title"
             :visible.sync="getDialogFormVisible"
             @close="closedialog">
    <slot></slot>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="isdialogFormVisible(false)">取 消</el-button>
      <el-button type="primary"
                 @click="isdialogFormVisible(false)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      newValue: false
    }
  },
  computed: {
    getDialogFormVisible: {
      get () {
        return this.dialogFormVisible
      },
      set (newValue) {
        this.newValue = newValue
      }
    }
  },
  methods: {
    isdialogFormVisible (val) {
      this.$emit('isdialogFormVisible', val)
      this.$emit('sureData')
    },
    closedialog () {
      this.$emit('isdialogFormVisible', this.newValue)
    }
  },
}
</script>

<style scoped>
</style>