<template>
  <div ref="myChart"
       :style="{width: '700px', height: '450px'}"></div>
</template>

<script>
import { getTime, formatDate, getDecrease } from '../../../utils/time';

export default {
  props: {
    tlData: {
      typeof: Object,
      default: {}
    }
  },
  data () {
    return {
      newData: {
        adminData: [],
        userData: [],
        orderData: []
      },
      chartDate:[]
    }
  },
  mounted () {
    this.getAdminDate()
    this.getUserData()
    this.getOrderData()

    this.getChartDate()

    this.myChart()
  },
  methods: {
    getAdminDate () {
      let day1 = 0
      let day2 = 0
      let day3 = 0
      let day4 = 0
      let day5 = 0
      let day6 = 0
      let day7 = 0
      this.tlData.admin.find(item => {
        let date = new Date(item.time)
        switch (parseInt(formatDate(date, 'dd'))) {
          case getTime('dd') - 6:
            day1++
            break;
          case getTime('dd') - 5:
            day2++
            break;
          case getTime('dd') - 4:
            day3++
            break;
          case getTime('dd') - 3:
            day4++
            break;
          case getTime('dd') - 2:
            day5++
            break;
          case (getTime('dd') - 1):
            day6++
            break;
          case parseInt(getTime('dd')):
            day7++
            break;
        }
      })
      let arr = [day1, day2, day3, day4, day5, day6, day7]
      this.newData.adminData = arr
    },
    getUserData () {
      let day1 = 0
      let day2 = 0
      let day3 = 0
      let day4 = 0
      let day5 = 0
      let day6 = 0
      let day7 = 0
      this.tlData.user.find(item => {
        let date = new Date(item.time)
        switch (parseInt(formatDate(date, 'dd'))) {
          case getTime('dd') - 6:
            day1++
            break;
          case getTime('dd') - 5:
            day2++
            break;
          case getTime('dd') - 4:
            day3++
            break;
          case getTime('dd') - 3:
            day4++
            break;
          case getTime('dd') - 2:
            day5++
            break;
          case (getTime('dd') - 1):
            day6++
            break;
          case parseInt(getTime('dd')):
            day7++
            break;
        }
      })
      let arr = [day1, day2, day3, day4, day5, day6, day7]
      this.newData.userData = arr
    },
    getOrderData () {
      let day1 = 0
      let day2 = 0
      let day3 = 0
      let day4 = 0
      let day5 = 0
      let day6 = 0
      let day7 = 0
      this.tlData.order.find(item => {
        let date = new Date(item.time)
        switch (parseInt(formatDate(date, 'dd'))) {
          case getTime('dd') - 6:
            day1++
            break;
          case getTime('dd') - 5:
            day2++
            break;
          case getTime('dd') - 4:
            day3++
            break;
          case getTime('dd') - 3:
            day4++
            break;
          case getTime('dd') - 2:
            day5++
            break;
          case (getTime('dd') - 1):
            day6++
            break;
          case parseInt(getTime('dd')):
            day7++
            break;
        }
      })
      let arr = [day1, day2, day3, day4, day5, day6, day7]
      this.newData.orderData = arr
    },

    getChartDate(){
      for(let i = 6;i>=0;i--){
        this.chartDate.push(getDecrease(i,'yyyy-MM-dd'))
      }
    },

    // ECharts
    myChart () {
      let chartDom = this.$refs.myChart
      let myChart = this.$echarts.init(chartDom)

      let option = {
        title: {
          text: '走势图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['新注册用户', '新增订单', '新增管理员']
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: { show: false }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.chartDate
        },
        yAxis: [
          {
            name: '用户',
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            name: '订单',
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '新注册用户',
            type: 'line',
            data: this.newData.userData,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
          },
          {
            name: '新增订单',
            type: 'line',
            yAxisIndex: 1,
            data: this.newData.orderData,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
          },
          {
            name: '新增管理员',
            type: 'line',
            data: this.newData.adminData,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
          }
        ]
      };

      myChart.setOption(option);

    }
  },
}
</script>

<style scoped>
</style>