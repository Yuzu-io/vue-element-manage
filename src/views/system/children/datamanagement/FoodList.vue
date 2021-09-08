<template>
  <div class="food-list">
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
            <el-form-item label="食品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label=" 餐馆名称">
              <span>{{ props.row.merchant }}</span>
            </el-form-item>
            <el-form-item label="食品 ID">
              <span>{{ props.row.foodid }}</span>
            </el-form-item>
            <el-form-item label="餐馆 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="食品介绍">
              <span>{{ props.row.introduce }}</span>
            </el-form-item>
            <el-form-item label="餐馆地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="食品评分">
              <span>{{ props.row.score }}</span>
            </el-form-item>
            <el-form-item label="食品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="月销量">
              <span>{{ props.row.sellamount }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column slot="dlc"
                       label="操作"
                       width="209">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        <el-form-item label="食品名称">
          <el-input v-model="tableData[index].name"></el-input>
        </el-form-item>

        <el-form-item label="食品介绍">
          <el-input v-model="tableData[index].introduce"></el-input>
        </el-form-item>

        <el-form-item label="食品分类">
          <el-select v-model="tableData[index].category"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="食品图片">
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

        <extended-table :tableData="tableData[index].norm"
                        :messageList="norm"
                        :isPagination="isPagination">
          <el-table-column slot="dlc"
                           label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="danger"
                         @click="normDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </extended-table>
      </el-form>
      <!-- 添加规格 -->
      <nested-dialog :innerVisible="innerVisible"
                     @isinnerVisible="isinnerVisible(arguments)"
                     :nestedTitle="nestedTitle"
                     :newData="addNorm">
        <el-form ref="form"
                 :model="addNorm"
                 label-width="80px">
          <el-form-item label="规格"
                        :rules="[{ required: true, message: '规格不能为空'}]">
            <el-input v-model="addNorm.norm"></el-input>
          </el-form-item>
          <el-form-item label="包装费">
            <el-input-number :min="1"
                             v-model="addNorm.packagingfee"></el-input-number>
          </el-form-item>
          <el-form-item label="价格">
            <el-input-number :min="1"
                             v-model="addNorm.price"></el-input-number>
          </el-form-item>
        </el-form>
      </nested-dialog>

      <el-button class="add-norm" type="primary"
                 @click="innerVisible = true">添加规格</el-button>
    </popover-dialog>
  </div>
</template>

<script>
import food from '../../../../../public/json/food.json';
import ExtendedTable from '../../../../components/content/table/ExtendedTable.vue'
import PopoverDialog from '../../../../components/common/dialog/PopoverDialog.vue';
import NestedDialog from '../../../../components/common/dialog/NestedDialog.vue';

export default {
  components: { ExtendedTable, PopoverDialog, NestedDialog },
  data () {
    return {
      tableData: [],
      messageList: [
        {
          label: '食品名称',
          prop: 'name',
        },
        {
          label: '食品介绍',
          prop: 'introduce'
        },
        {
          label: '评分',
          prop: 'score'
        }
      ],
      norm: [
        {
          label: '规格',
          prop: 'norm',
        },
        {
          label: '包装费',
          prop: 'packagingfee'
        },
        {
          label: '价格',
          prop: 'price'
        }
      ],
      totalRecord: 0,
      width: 343,
      dialogFormVisible: false,
      isPagination: false,
      innerVisible: false,

      title: '修改食品信息',
      index: 0,
      options: [
        {
          value: '冷饮',
          label: '冷饮',
        },
        {
          value: '熟食',
          label: '熟食',
        },
        {
          value: '外卖',
          label: '外卖',
        },
        {
          value: '肉类',
          label: '肉类',
        },
      ],

      // nested
      nestedTitle: '添加规格',
      addNorm: {
        norm: '',
        packagingfee: 1,
        price: 10
      }
    }
  },
  created () {
    this.getFoodData()
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
    handleDelete (index, row) {
      console.log(index, row);
      this.tableData.splice(index, 1)
    },
    normDelete (index, row) {
      console.log(index, row);
    },

    getTableDate () {
      this.totalRecord = this.tableData.length
    },

    isinnerVisible (data) {
      try {
        this.innerVisible = data[0]
        if (data[1].norm != "") {
          this.tableData[this.index].norm.push(data[1])
        }
        this.addNorm = {
          norm: '',
          packagingfee: 1,
          price: 10
        }
      } catch (error) {
        // console.log(error);
      }
    },

    // 获取数据
    getFoodData () {
      this.tableData = food.food
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
/* 添加规格按钮 */
.add-norm{
  position: relative;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>