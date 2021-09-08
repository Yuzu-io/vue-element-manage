<template>
  <el-form :model="ruleForm"
           :rules="rules"
           ref="ruleForm"
           label-width="100px"
           class="demo-ruleForm">

    <el-form-item label="店铺名称"
                  prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="详细地址"
                  prop="address">
      <el-select v-model="ruleForm.address"
                 placeholder="请输入地址">
        <el-option label="上海"
                   value="shanghai"></el-option>
        <el-option label="北京"
                   value="beijing"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="联系电话"
                  prop="tel">
      <el-input v-model="ruleForm.tel"></el-input>
    </el-form-item>

    <el-form-item label="店铺简介"
                  prop="introduce">
      <el-input v-model="ruleForm.introduce"></el-input>
    </el-form-item>

    <el-form-item label="店铺标语"
                  prop="slogan">
      <el-input v-model="ruleForm.slogan"></el-input>
    </el-form-item>

    <el-form-item label="店铺分类">
      <el-cascader v-model="ruleForm.category"
                   :options="options"
                   @change="handleChange"></el-cascader>
    </el-form-item>

    <el-form-item class="features"
                  label="店铺特点">
      <span>
        品牌保证
        <el-switch v-model="ruleForm.Features1"></el-switch>
      </span>
      <span>
        蜂鸟专送
        <el-switch v-model="ruleForm.Features2"></el-switch>
      </span>
      <span>
        新开店铺
        <el-switch v-model="ruleForm.Features3"></el-switch>
      </span>
      <br>
      <span>
        外卖保
        <el-switch v-model="ruleForm.Features4"></el-switch>
      </span>
      <span>
        准时达
        <el-switch v-model="ruleForm.Features5"></el-switch>
      </span>
      <span>
        开发票
        <el-switch v-model="ruleForm.Features6"></el-switch>
      </span>
    </el-form-item>

    <el-form-item label="配送费"
                  prop="deliveryfee">
      <el-input-number v-model="ruleForm.deliveryfee"
                       @change="deliveryFee"
                       :min="0"
                       label="描述文字"></el-input-number>
    </el-form-item>

    <el-form-item label="起送价"
                  prop="startingprice">
      <el-input-number v-model="ruleForm.startingprice"
                       @change="startingPrice"
                       :min="1"
                       label="描述文字"></el-input-number>
    </el-form-item>

    <el-form-item label="营业时间"
                  prop="businesstime">
      <el-time-select class="time-celect"
                      placeholder="起始时间"
                      v-model="ruleForm.startTime"
                      :picker-options="{
      start: '05:30',
      step: '00:15',
      end: '23:30'
    }">
      </el-time-select>
      <el-time-select placeholder="结束时间"
                      v-model="ruleForm.endTime"
                      :picker-options="{
      start: '05:30',
      step: '00:15',
      end: '23:30',
      minTime: ruleForm.startTime
    }">
      </el-time-select>
    </el-form-item>

    <el-form-item label="上传店铺头像"
                  prop="shopavatar">
      <extend-upload :imageUrl="ruleForm.shopavatar"></extend-upload>
    </el-form-item>

    <el-form-item label="上传营业执照"
                  prop="businesslicense">
      <extend-upload :imageUrl="ruleForm.businesslicense"></extend-upload>
    </el-form-item>

    <el-form-item label="上传餐饮服务许可证"
                  prop="servicelicense">
      <extend-upload :imageUrl="ruleForm.servicelicense"></extend-upload>
    </el-form-item>

    <el-form-item label="优惠活动"
                  prop="discount">
      <el-select v-model="discountvalue"
                 placeholder="请选择">
        <el-option v-for="item in discount"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value"
                   @click.native="addDiscount">
        </el-option>
      </el-select>
    </el-form-item>

    <popover-dialog :title="title"
                    :dialogFormVisible.sync="dialogFormVisible"
                    @isdialogFormVisible="dialogFormVisible = $event"
                    @sureData="sureData">
      <el-form ref="form"
               :model="activity"
               label-width="120px">
        <el-form-item label="请输入活动详情">
        </el-form-item>
        <el-input v-model="activity.activityintroduce"></el-input>
      </el-form>
    </popover-dialog>

    <extended-table :tableData="ruleForm.Promotions"
                    :messageList="messageList"
                    :width="width"
                    :isPagination="false">
      <el-table-column slot="dlc"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </extended-table>

    <el-form-item>
      <el-button type="primary"
                 @click="submitForm('ruleForm')">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import PopoverDialog from '../../common/dialog/PopoverDialog.vue';
import ExtendUpload from '../extendupload/ExtendUpload.vue';
import ExtendedTable from './ExtendedTable.vue';
export default {
  components: { ExtendUpload, ExtendedTable, PopoverDialog },
  data () {
    return {
      ruleForm: {
        name: '',
        address: '',
        tel: '',
        introduce: '',
        slogan: '',
        category: '',
        Features1: false,
        Features2: false,
        Features3: false,
        Features4: false,
        Features5: false,
        Features6: false,
        deliveryfee: 0,
        startingprice: 15,
        startTime: '',
        endTime: '',
        // 头像
        shopavatar: '',
        businesslicense: '',
        servicelicense: '',
        Promotions: [
          {
            activitytitle: '减',
            activityname: '满减优惠',
            activityintroduce: '满30减5，满60减8'
          }
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        tel: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的电话号码', trigger: 'blur' }
        ],
      },
      // 分类
      options: [
        {
          value: 'yiguoliaoli',
          label: '异国料理',
          children: [
            {
              value: 'rihanliaoli',
              label: '日韩料理',
            },
            {
              value: 'xichan',
              label: '西餐',
            }
          ]
        }
      ],
      // 开关
      value: true,
      discount: [{
        value: '满减优惠',
        label: '满减优惠'
      }, {
        value: '优惠大酬宾',
        label: '优惠大酬宾'
      }, {
        value: '新用户立减',
        label: '新用户立减'
      }, {
        value: '进店领劵',
        label: '进店领劵'
      }],
      discountvalue: '',
      // tabledata
      messageList: [
        {
          label: '活动标题',
          prop: 'activitytitle',
        },
        {
          label: '活动名称',
          prop: 'activityname'
        },
        {
          label: '活动详情',
          prop: 'activityintroduce'
        }
      ],
      width: 200,
      // dialog
      title: '提示',
      activity: {
        activitytitle: '',
        activityname: '',
        activityintroduce: ''
      },
      dialogFormVisible: false
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 联级选择器
    handleChange (value) {
      console.log(value);
    },

    // 事件监听
    deliveryFee (value) {
      console.log(value);
    },
    startingPrice (value) {
      console.log(value);
    },
    handleDelete (index, row) {
      console.log(index, row);
      this.ruleForm.Promotions.splice(index, 1)
    },
    addDiscount () {
      this.dialogFormVisible = !this.dialogFormVisible
    },
    sureData(){
      console.log('sureData');
    }
  }
}
</script>

<style scoped>
.time-celect {
  margin: 0 10px 0 0;
}
</style>