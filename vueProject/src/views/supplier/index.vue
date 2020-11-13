<template>
  <div>
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchMap"
      style="margin-top: 20px;"
    >
      <el-form-item prop="name">
        <el-input
          v-model="searchMap.name"
          placeholder="商品名称"
          style="width: 200px;"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="!isDialog">
        <el-input
          v-model="searchMap.code"
          placeholder="商品编号"
          style="width: 200px;"
        ></el-input>
      </el-form-item>
      <el-form-item prop="supplierName" v-if="!isDialog">
        <el-input
          v-model="searchMap.supplierName"
          placeholder="供应商"
          style="width: 200px;"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item v-if="!isDialog">
        <el-button type="primary" @click="handleAdd('pojoForm')"
          >新增</el-button
        >
      </el-form-item>
      <el-form-item v-if="!isDialog">
        <el-button type="primary" @click="resetFild('searchForm')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="list" height="380" border-style="width: 100%" highlight-current-row @current-change="clickCurrentChange">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="name" label="供应商名称"></el-table-column>
      <el-table-column
        prop="linkman"
        label="联系人"
        width="120"
      ></el-table-column>
      <el-table-column prop="mobile" label="联系电话" v-if="!isDialog"></el-table-column>
      <el-table-column prop="remark" label="备注" v-if="!isDialog"></el-table-column>
      <el-table-column label="操作" width="150" v-if="!isDialog">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
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
      :layout="!isDialog==true?'total, sizes, prev, pager, next, jumper':'prev, pager, next'"
      :total="total"
    >
    </el-pagination>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form
        :rules="rules"
        status-icon
        ref="pojoForm"
        :model="pojo"
        label-width="100px"
        label-position="right"
        style="width: 400px;"
      >
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="pojo.name" />
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="pojo.linkman" />
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="pojo.mobile" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="pojo.remark"
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
import SupplierApi from "@/api/supplier.js";
export default {
  props:{
    isDialog:Boolean
  },
  data() {
    return {
      list: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      searchMap: {
        name: "",
        linkman: "",
        supplierName: ""
      },
      dialogFormVisible: false,
      pojo: {
         id: null,
            name: '',
            linkman: '',
            mobile: '',
            remark: ''
      },
      title: "供应商新增",
      rules: {
         name: [{ required: true, message: '供应商名称不能为空', trigger: 'blur' }],
            linkman: [{ required: true, message: '联系人不能为空', trigger: 'blur' }],
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      SupplierApi.getPaginationData(
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
    handleEdit(id) {
       this.dialogFormVisible = true;
      this.title = "供应商编辑";
      SupplierApi.getByIdData(id)
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
    handleDelete(id) {
       this.$confirm("是否要删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          SupplierApi.deleteMember(id).then(response => {
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
          SupplierApi.addData(this.pojo)
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
     editUpdata(form) {
      SupplierApi.putByIdData(this.pojo).then(response => {
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
    ,handleAdd(form) {
      this.dialogFormVisible = true;
      this.pojo.id = null
      this.$nextTick(() => {
        this.$refs[form].resetFields();
      });
    },
    clickCurrentChange(currentRow){
      this.$emit("current-option",currentRow)
    }
  },
  
};
</script>

<style scoped >
</style>