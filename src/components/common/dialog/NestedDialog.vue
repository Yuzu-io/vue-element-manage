<template>
  <div>
    <el-dialog width="50%"
               :title="nestedTitle"
               :visible.sync="getInnerVisible"
               @close="closedialog"
               append-to-body>
      <slot></slot>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="isinnerVisible(false)">取 消</el-button>
        <el-button type="primary"
                   @click="isinnerVisible(false,newData)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    innerVisible: {
      type: Boolean,
      default: false
    },
    nestedTitle: {
      type: String,
      default: ''
    },
    newData: {
      type: Object,
      default: {}
    }
  },
  computed: {
    getInnerVisible: {
      get () {
        return this.innerVisible
      },
      set (newValue) {
        this.newValue = newValue
      }
    }
  },
  methods: {
    isinnerVisible (val,newData) {
      this.$emit('isinnerVisible', val,newData)
    },
    closedialog () {
      this.$emit('isinnerVisible', this.newValue)
    }
  },
}
</script>

<style scoped>
</style>