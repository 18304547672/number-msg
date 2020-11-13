<template>
  <div class="header">
    <a href="#/">
      <img src="@/assets/logo.png" width="25px" class="logo" />
      <span class="content">会员管理系统</span>
    </a>
    <el-dropdown @command="handleCommand" class="menu">
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">修改密码</el-dropdown-item>
        <el-dropdown-item command="b">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        style="width:400px"
      >
        <el-form-item label="原始密码" prop="oldPass">
          <el-input
            type="password"
            v-model="ruleForm.oldPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleclick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LogoutApi from "@/api/logout.js";
import PwdApi from "@/api/pwd.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      PwdApi.getPwd(this.user.id, value).then(response => {
        if (response.data.flag) {
          callback();
        } else {
          callback(new Error("密码不正确"));
        }
      });
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === this.ruleForm.pass) {
        PwdApi.getEditPwd(this.user.id, value).then(response => {
          if (response.data.flag) {
            callback();
          } else {
            callback(new Error("修改密码失败"));
          }
        });
      } else {
        callback(new Error("两次密码不一样"));
      }
    };
    return {
      dialogFormVisible: false,
      user: JSON.parse(localStorage.getItem("user-infor")),
      ruleForm: {
        oldPass: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        oldPass: [
          { validator: validatePass, trigger: "blur" },
          { required: true, message: "旧密码不能为空", trigger: "blur" }
        ],
        checkPass: [
          { validator: validatePass2, trigger: "change" },
          { required: true, message: "确认密码不能为空", trigger: "blur" }
        ],
        pass: [{ required: true, trigger: "blur", message: "新密码不能为空" }]
      }
    };
  },
  methods: {
    handleCommand(command) {
      // this.$message('click on item ' + command);
      switch (command) {
        case "a":
          this.resetForm("ruleForm");
          break;
        case "b":
          this.handleLogoOut();
          break;
      }
    },
      handleLogoOut(){
        this.$store.dispatch('LogoOut').then(response =>{
          if(response.flag){
             this.$router.push("/login");
          }else{
            this.$message({
              type:'warning',
              message:response.message
            })
          }
        })
    },
    handleclick() {
      PwdApi.getEditPwd(this.user.id, this.ruleForm.checkPass).then(
        response => {
          if (response.data.flag) {
            this.$message({
              type: "success",
              message: response.data.message
            });
            this.dialogFormVisible = false;
            localStorage.removeItem("user-token");
            localStorage.removeItem("user-infor");
            this.$router.push("/login");
          } else {
            this.$message({
              type: "error",
              message: "提交失败"
            });
          }
        }
      );
    },
    resetForm(form) {
      this.dialogFormVisible = true;
      this.$nextTick(function() {
        this.$refs[form].resetFields();
      });
    }
  }
};
</script>
<style scoped>
.header {
  position: absolute;
  line-height: 50px;
  left: 0;
  right: 0;
  top: 0;
  background-color: #2d3a4b;
}
.logo {
  vertical-align: middle;
  padding: 0 10px 0 40px;
}
.content {
  color: white;
}
.menu {
  float: right;
  padding-right: 40px;
}
.el-dropdown-link {
  color: white;
}
</style>