<template>
  <div class="admin-list">
    <extended-table :tableData="tableData"
                    :messageList="messageList"
                    :totalRecord="totalRecord"
                    :width="width">
      <el-table-column slot="dlc"
                       :label="messageList[3].label"
                       :prop="messageList[3].prop">
      </el-table-column>
    </extended-table>
  </div>
</template>

<script>
import admin from '../../../../../public/json/admin.json';
import ExtendedTable from '../../../../components/content/table/ExtendedTable.vue';
import { formatDate } from '../../../../utils/time';

export default {
  components: {
    ExtendedTable,
  },
  data () {
    return {
      tableData: [],
      messageList: [
        {
          label: '姓名',
          prop: 'username',
        },
        {
          label: '注册日期',
          prop: 'time'
        },
        {
          label: '地址',
          prop: 'address'
        },
        {
          label: '权限',
          prop: 'Authority'
        }
      ],
      totalRecord: 0,
      width:220
    }
  },
  created () {
    this.getOrderData()
  },
  mounted () {
    this.getTableDate()

    this.getRegister()
  },
  methods: {
    // 监听事件
    getTableDate () {
      this.totalRecord = this.tableData.length
    },
    getRegister () {
      this.tableData.find(item => {
        let data = new Date(item.time)
        item.time = formatDate(data, 'yyyy-MM-dd hh:mm')
      })
    },

    // 获取数据
    getOrderData () {
      this.tableData = admin.admin
    },
  },
}
</script>

<style scoped>
</style>