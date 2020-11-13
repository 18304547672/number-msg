<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <h4>会员管理系统</h4>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getToken, getInfo } from "@/api/login.js";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
             if (valid) {
                this.$store.dispatch('Login',this.form).then(response => {
                  if(response.flag){
                     this.$router.push('/');
                  }else{
                    this.$message({
                     showClose: true,
                     message: "错了哦，这是一条错误消息",
                     type: "error"
                     });
                  }
                })
               } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.el-form {
  width: 320px;
  margin: 200px auto;
  padding: 20px;
  border: 1px solid;
  border-radius: 20px;
  text-align: center;
  background: rgb(255, 255, 255, 0.8);
}
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/login.jpg");
  background-size: cover;
}
</style>