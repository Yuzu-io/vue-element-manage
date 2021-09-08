<template>
  <div class="home">
    <div class="home-data">
      <h2>数据统计</h2>
      <div class="home-current-data">
        <div class="current-data">
          <h2>当日数据:</h2>
        </div>
        <div class="current-data">
          <span>{{newData.userNumber}}</span>新增用户
        </div>
        <div class="current-data">
          <span>{{newData.orderNumber}}</span>新增订单
        </div>
        <div class="current-data">
          <span>{{newData.adminNumber}}</span>新增管理员
        </div>
      </div>
      <div class="home-total-data">
        <div class="current-data">
          <h2>总数据:</h2>
        </div>
        <div class="current-data">
          <span>{{totalData.userNumber}}</span>注册用户
        </div>
        <div class="current-data">
          <span>{{totalData.orderNumber}}</span>订单
        </div>
        <div class="current-data">
          <span>{{totalData.adminNumber}}</span>管理员
        </div>
      </div>
    </div>
    <vue-echarts :tlData="tlData"
                 class="home-echarts"></vue-echarts>
  </div>
</template>

<script>
import VueEcharts from '../../../../components/common/echarts/VueEcharts.vue'

export default {
  components: {
    VueEcharts
  },
  data () {
    return {

    }
  },
  props: {
    tlData: {
      type: Object,
      default: {}
    },
    totalData: {
      type: Object,
      default: {}
    },
    newData: {
      type: Object,
      default: {}
    },
  },

}
</script>

<style scoped>
.home-data {
  margin: 0 0 50px 0;
}
.home-data > h2 {
  font-size: 36px;
  text-align: center;
  margin: 0 0 20px 0;
}

.home-current-data,
.home-total-data {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.current-data {
  width: 105px;
  text-align: center;
  font-size: 14px;
  color: #666;
  border-radius: 5px;
  padding: 10px;
  margin: 0 10px;
  background-color: #e5e9f2;
}
.home-current-data .current-data:first-child {
  background-color: #67c23a;
}
.home-total-data .current-data:first-child {
  background-color: #409eff;
}
.current-data > h2 {
  font-size: 24px;
  color: #fff;
}
.current-data > span {
  font-size: 20px;
  color: #000;
}

.home-echarts {
  margin: 0 auto;
}
</style>