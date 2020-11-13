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
      <el-form-item prop="code">
        <el-input
          v-model="searchMap.code"
          placeholder="商品编号"
          style="width: 200px;"
        ></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <el-input
          v-model="searchMap.supplierName"
          placeholder="供应商"
          style="width: 200px;"
          readonly
          @click.native="dialogFormVisible=true"
        ></el-input>
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
     <el-table :data="list" height="380" border style="width: 100%" highlight-current-row>
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="code" label="商品编码"></el-table-column>
            <el-table-column prop="spec" label="商品规格"></el-table-column>
            <el-table-column prop="retailPrice" label="零售价"></el-table-column>
            <el-table-column prop="purchasePrice" label="进货价"></el-table-column>
            <el-table-column prop="storageNum" label="库存数量"></el-table-column>
            <el-table-column prop="supplierName" label="供应商"></el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页，添加在div里面 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    <el-dialog
      title="选择供应商"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <supplier :isDialog='true' @current-option="handleOption"></supplier>
    </el-dialog>

     <el-dialog :title="title" :visible.sync="dialogEditVisible" width="500px">
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
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="pojo.name" />
        </el-form-item>
        <el-form-item label="商品编号" prop="code">
          <el-input v-model="pojo.code" />
        </el-form-item>
        <el-form-item label="商品规格" prop="spec">
          <el-input v-model="pojo.spec" />
        </el-form-item>
        <el-form-item label="零售价" prop="retailPrice">
          <el-input v-model="pojo.retailPrice"/>
        </el-form-item>
        <el-form-item label="进货价" prop="purchasePrice">
          <el-input v-model="pojo.purchasePrice"/>
        </el-form-item>
        <el-form-item label="库存数量" prop="storageNum">
          <el-input v-model="pojo.storageNum"/>
        </el-form-item>
        <el-form-item label="供应商" prop="supplierName">
          <el-input
            readonly
            @click.native="isclickNewData"
            v-model="pojo.supplierName"
            placeholder="供应商"
            style="width: 200px;"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="pojo.id === null ? addData('pojoForm') : editUpdata('pojoForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import GoodsApi from "@/api/goods.js";
import Supplier from "@/views/supplier"
export default {
   components:{
       Supplier
   },
  data() {
    return {
      list: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      isEdit:false,
      searchMap: {
        name: "",
        linkman: "",
        supplierName: ""
      },
      dialogFormVisible: false,
      dialogEditVisible:false,
      pojo: {
         id: null,
            name: '',
            code: '',
            spec: '',
            retailPrice: 0.0,
            purchasePrice: 0.0,
            storageNum: 0,
            supplierName: '',
            supplierId: null
      },
      title: "商品新增",
      rules: {
           name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
            code: [{ required: true, message: '商品编码不能为空', trigger: 'blur' }],
            retailPrice: [{ required: true, message: '零售价不能为空', trigger: 'blur' }],
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      GoodsApi.getPaginationData(
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
       this.dialogEditVisible = true;
       this.isEdit = true;
      this.title = "供应商编辑";
      GoodsApi.getByIdData(id)
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
          GoodsApi.deleteMember(id).then(response => {
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
          GoodsApi.addData(this.pojo)
            .then(response => {
              if (response.data.flag) {
                this.dialogEditVisible = false;
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
      GoodsApi.putByIdData(this.pojo).then(response => {
        if (response.data.flag) {
          this.$message({
            type: "success",
            message: response.data.message
          });
          this.getData();
          this.dialogEditVisible = false;
        } else {
          this.$message({
            message: resp.message,
            type: "warning"
          });
        }
      });
    }
    ,handleAdd(form) {
       this.pojo.id = null
      this.dialogEditVisible = true;
      console.log(this.pojo);
      this.$nextTick(() => {
        this.$refs[form].resetFields();
      });
    },
    handleOption(row){
        if(this.isEdit){
            this.pojo.supplierName = row.name;
            // this.pojo.id = row.id
        }else{
            this.searchMap.supplierName = row.name
            // this.searchMap.id = row.id
        }
        this.isEdit = false
        this.dialogFormVisible = false
    },
    isclickNewData(){
        this.isEdit = true;
        this.dialogFormVisible = true
    }
  },
  
};
</script>

<style scoped >
</style>