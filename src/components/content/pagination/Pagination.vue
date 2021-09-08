<template>
  <el-pagination @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page.sync="Page"
                 :page-size="pageSize"
                 layout="total, prev, pager, next"
                 :total="totalRecord"
                 background>
  </el-pagination>
</template>

<script>
export default {
  props: {
    totalRecord: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      Page: 0
    }
  },
  computed: {
    getPage() {
      this.Page = this.currentPage
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange',val)
    },
  },
}
</script>

<style scoped>
</style>