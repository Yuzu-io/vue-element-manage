<template>
  <div class="order-list">
    <extended-table :tableData="tableData"
                    :messageList="messageList"
                    :totalRecord="totalRecord">
      <el-table-column slot="expand"
                       type="expand">
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">
            <el-form-item label="用户名">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label=" 店铺名称">
              <span>{{ props.row.merchant }}</span>
            </el-form-item>
            <el-form-item label="收货地址">
              <span>{{ props.row.shippingaddress }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.merchantid }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.merchantaddress }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
    </extended-table>
  </div>
</template>

<script>
import order from '../../../../../public/json/order.json';

import ExtendedTable from '../../../../components/content/table/ExtendedTable.vue'
export default {
  components: { ExtendedTable },
  data () {
    return {
      tableData: [],
      messageList: [
        {
          label: '订单 ID',
          prop: 'orderid',
        },
        {
          label: '总价格',
          prop: 'totalprice'
        },
        {
          label: '订单状态',
          prop: 'orderstatus'
        }
      ],
      totalRecord: 0,
    }
  },
  created () {
    this.getOrderData()
  },
  mounted () {
    this.getTableDate()
  },
  methods: {
    // 监听事件
    getTableDate () {
      this.totalRecord = this.tableData.length
    },

    // 获取数据
    getOrderData () {
      this.tableData = order.order
    },
  },
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>