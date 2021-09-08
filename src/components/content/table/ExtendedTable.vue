<template>
  <div class="table-sorting">
    <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              style="width: 100%">
      <slot name="expand"></slot>
      <el-table-column :label="messageList[0].label"
                       :prop="messageList[0].prop"
                       :width="width">
      </el-table-column>
      <el-table-column :label="messageList[1].label"
                       :prop="messageList[1].prop"
                       :width="width">
      </el-table-column>
      <el-table-column :label="messageList[2].label"
                       :prop="messageList[2].prop"
                       :width="width">
      </el-table-column>
      <slot name="dlc"></slot>
    </el-table>
    <pagination v-if="isPagination" @handleCurrentChange="handleCurrentChange"
                :currentPage="currentPage"
                :pageSize="pageSize"
                :totalRecord="totalRecord"></pagination>
  </div>
</template>

<script>
import Pagination from '../pagination/Pagination.vue'
export default {
  components: { Pagination },
  props: {
    tableData: {
      type: Array,
      default: []
    },
    messageList: {
      type: Array,
      default: []
    },
    totalRecord: {
      type: Number,
      default: 0
    },
    isPagination:{
      type:Boolean,
      default:true
    },
    width:{
      type:Number,
      default:0
    }
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 20
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
    }
  },
}
</script>

<style scoped>
</style>