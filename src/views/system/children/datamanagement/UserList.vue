<template>
  <div class="user-list">
    <extended-table :tableData="tableData"
                    :messageList="messageList"
                    :totalRecord="totalRecord"
                    :width="width">
      <el-table-column slot="expand"
                       type="index"
                       label="#"
                       width="100"
                       :index="indexMethod">
      </el-table-column>
    </extended-table>
  </div>
</template>

<script>
import ExtendedTable from '../../../../components/content/table/ExtendedTable.vue';

import { formatDate } from '../../../../utils/time';

export default {
  components: {
    ExtendedTable
  },
  data () {
    return {
      tableData: [],
      messageList: [
        {
          label: '注册日期',
          prop: 'time'
        },
        {
          label: '用户名',
          prop: 'username'
        },
        {
          label: '地址',
          prop: 'address'
        }
      ],
      totalRecord: 0,
      width:220
    }
  },
  methods: {
    indexMethod (index) {
      return index + 1;
    },
    getTableDate () {
      this.$store.state.totalData.user.find(item => {
        let data = new Date(item.time)
        item.time = formatDate(data, 'yyyy-MM-dd')
        this.tableData.push(item)
        this.totalRecord++
      })
    }
  },
  mounted () {
    this.getTableDate()
  },

}
</script>

<style scoped>
</style>