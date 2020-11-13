<template>
  <div>
    <el-form
      :inline="true"
      :model="searchMap"
      class="demo-form-inline"
      ref="searchForm"
    >
      <el-form-item prop="cardNum">
        <el-input
          v-model="searchMap.cardNum"
          placeholder="会员卡号"
          style="width: 200px;"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="searchMap.name"
          placeholder="会员名称"
          style="width: 200px;"
        ></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="searchMap.payType" placeholder="支付类型">
          <el-option
            v-for="item in payTypeOptions"
            :key="item.type"
            :label="item.name"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="birthday">
        <el-date-picker
          v-model="searchMap.birthday"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd('pojoForm')"
          >新增</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetFild('searchForm')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="list" height="380" border style="width: 100%">
      <!--type="index" 获取索引值，从1开始； label 显示的标题; prop 数据字段名； width 列的宽度 -->
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
      <el-table-column prop="name" label="会员姓名"></el-table-column>
      <el-table-column prop="birthday" label="会员生日"></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号码"
        width="110"
      ></el-table-column>
      <el-table-column prop="integral" label="可用积分"></el-table-column>
      <el-table-column prop="money" label="开卡金额"></el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          <span>{{ scope.row.payType | payTypeFiler }} </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="会员地址"
        width="180"
      ></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handleDele(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px">
      <!-- status-icon 当表单校验不通过时, 输入框右侧有个 x 小图标 -->
      <el-form
        status-icon
        ref="pojoForm"
        :model="pojo"
        label-width="100px"
        label-position="right"
        style="width: 400px;"
        :rules="rules"
      >
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="pojo.cardNum" />
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="pojo.name" />
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker
            v-model="pojo.birthday"
            type="date"
            placeholder="请点击选择"
          />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="pojo.phone" />
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model="pojo.money" />
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
          <el-input v-model="pojo.integral"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select
            v-model="pojo.payType"
            class="filter-item"
            placeholder="请点击选择"
          >
            <el-option
              v-for="option in payTypeOptions"
              :key="option.type"
              :label="option.name"
              :value="option.type"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input
            v-model="pojo.address"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入地址"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            pojo.id === null ? addData('pojoForm') : editUpdata('pojoForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MemberApi from "@/api/member.js";
const payTypeOptions = [
  { type: "1", name: "现金" },
  { type: "2", name: "微信" },
  { type: "3", name: "支付宝" },
  { type: "4", name: "银行卡" }
];
export default {
  data() {
    return {
      list: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      searchMap: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: ""
      },
      payTypeOptions,
      dialogFormVisible: false,
      pojo: {
        id: null,
        cardNum: "",
        name: "",
        birthday: "",
        phone: "",
        money: 0,
        integral: 0,
        payType: "",
        address: ""
      },
      title: "会员新增",
      rules: {
        cardNum: [{ required: true, message: "卡号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        payType: [
          { required: true, message: "请选择支付类型", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleEdit(id) {
      this.dialogFormVisible = true;
      this.title = "会员编辑";
      MemberApi.getByIdData(id)
        .then(response => {
          this.pojo = response.data.data;
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "获取数据错误"
          });
        });
    },
    handleDele(id) {
      this.$confirm("是否要删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          MemberApi.deleteMember(id).then(response => {
            if (response.data.flag) {
              this.getData();
              } 
              this.$message({
                type: response.data.flag===true?"success":"error",
                message: response.data.message
              });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getData() {
      // this.handleAdd();
      MemberApi.getPaginationData(
        this.currentPage,
        this.pageSize,
        this.searchMap
      ).then(response => {
        var req = response.data;
        if (req.flag) {
          this.total = req.data.total;
          this.list = req.data.rows;
        } else {
          this.$message({
            type: "error",
            message: "获取数据错误"
          });
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    onSubmit() {
      this.getData();
    },
    resetFild(form) {
      this.$refs[form].resetFields();
    },
    addData(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          MemberApi.addData(this.pojo)
            .then(response => {
              if (response.data.flag) {
                this.dialogFormVisible = false;
                this.getData();
              } else {
                this.$message({
                  type: "error",
                  message: "添加错误"
                });
              }
            })
            .catch(err => {});
        }
      });
    },
    handleAdd(form) {
       this.pojo.id = null
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs[form].resetFields();
      });
    },
    editUpdata(form) {
      MemberApi.putByIdData(this.pojo).then(response => {
        if (response.data.flag) {
          this.$message({
            type: "success",
            message: response.data.message
          });
          this.getData();
          this.dialogFormVisible = false;
        } else {
          this.$message({
            message: resp.message,
            type: "warning"
          });
        }
      });
    }
  },
  filters: {
    payTypeFiler(value) {
      return payTypeOptions.find(item => item.type === value).name;
    }
  }
};
</script>

<style scoped >
</style>