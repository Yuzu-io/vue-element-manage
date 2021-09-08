<template>
  <div class="merchant-list">
    <extended-table :tableData="tableData"
                    :messageList="messageList"
                    :totalRecord="totalRecord"
                    :width="width">
      <el-table-column slot="expand"
                       type="expand">
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">
            <el-form-item label="店铺名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="店铺介绍">
              <span>{{ props.row.introduce }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.tel }}</span>
            </el-form-item>
            <el-form-item label="评分">
              <span>{{ props.row.score }}</span>
            </el-form-item>
            <el-form-item label="销售量">
              <span>{{ props.row.sellamount }}</span>
            </el-form-item>
            <el-form-item label=" 分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column slot="dlc"
                       label="操作"
                       width="248">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini"
                     @click="handleEditFood(scope.$index, scope.row)">添加食品</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </extended-table>

    <popover-dialog :title="title"
                    :dialogFormVisible.sync="dialogFormVisible"
                    @isdialogFormVisible="dialogFormVisible = $event">
      <el-form ref="form"
               :model="tableData[index]"
               label-width="80px">
        <el-form-item label="店铺名称">
          <el-input v-model="tableData[index].name"></el-input>
        </el-form-item>

        <el-form-item label="详细地址">
          <el-select v-model="tableData[index].address"
                     placeholder="详细地址">
            <el-option label="上海"
                       value="shanghai"></el-option>
            <el-option label="北京"
                       value="beijing"></el-option>
            <el-option label="广西"
                       value="guangxi"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="店铺介绍">
          <el-input v-model="tableData[index].introduce"></el-input>
        </el-form-item>

        <el-form-item label="联系电话">
          <el-input v-model="tableData[index].tel"></el-input>
        </el-form-item>

        <el-form-item label="店铺分类">
          <el-cascader v-model="tableData[index].category"
                       :options="options"
                       @change="handleChange"></el-cascader>
        </el-form-item>

        <el-form-item label="商铺图片">
          <el-upload class="avatar-uploader"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <img v-if="tableData[index].imageUrl"
                 :src="tableData[index].imageUrl"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </popover-dialog>
  </div>
</template>

<script>
import merchant from '../../../../../public/json/merchant.json';
import PopoverDialog from '../../../../components/common/dialog/PopoverDialog.vue';
import ExtendedTable from '../../../../components/content/table/ExtendedTable.vue';

export default {
  components: { PopoverDialog, ExtendedTable },
  data () {
    return {
      tableData: [],
      messageList: [
        {
          label: '店铺名称',
          prop: 'name',
        },
        {
          label: '店铺地址',
          prop: 'address'
        },
        {
          label: '店铺介绍',
          prop: 'introduce'
        }
      ],
      totalRecord: 0,
      width: 330,
      dialogFormVisible: false,

      title: '修改店铺信息',
      index: 0,
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
    }
  },
  created () {
    this.getMerchantData()
  },
  mounted () {
    this.getTableDate()
  },
  methods: {
    // 监听事件
    handleEdit (index, row) {
      this.dialogFormVisible = !this.dialogFormVisible
      this.index = index
      // console.log(index, row);
    },
    handleEditFood (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      console.log(index, row);
      this.tableData.splice(index, 1)
    },
    getTableDate () {
      this.totalRecord = this.tableData.length
    },


    // 获取数据
    getMerchantData () {
      this.tableData = merchant.merchant
    },

    // 联级选择器
    handleChange (value) {
      console.log(value);
    },

    // 店铺图片
    handleAvatarSuccess (res, file) {
      this.tableData.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }

  }
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

/* 店铺图片 */
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>