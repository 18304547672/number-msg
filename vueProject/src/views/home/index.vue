<template>
  <div>
    <h1>欢迎登录会员管理系统</h1>
    <el-carousel :interval="4000" type="card" height="230px">
      <el-carousel-item v-for="item in 5" :key="item"> </el-carousel-item>
    </el-carousel>
    <div class="text">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="会员量化" name="1">
            <span>我们对会员的福利是嗷嗷大的，666！！！</span>
          <div class="jindu">
            <span>持续5年会员</span><el-progress :percentage="70"></el-progress>
            <span>持续4年会员</span><el-progress :percentage="90" ></el-progress>
            <span>持续3年会员</span><el-progress :percentage="100" status="success"></el-progress>
            <span>持续2年会员</span><el-progress :percentage="90" status="warning" ></el-progress>
            <span>持续1年会员</span><el-progress :percentage="95" status="exception"></el-progress>
          </div>
        </el-collapse-item>
        <el-collapse-item title="员工评估" name="2">
          <div>
            <el-progress type="circle" :percentage="0"></el-progress>
            <el-progress type="circle" :percentage="25"></el-progress>
            <el-progress
              type="circle"
              :percentage="100"
              status="success"
            ></el-progress>
            <el-progress
              type="circle"
              :percentage="70"
              status="warning"
            ></el-progress>
            <el-progress
              type="circle"
              :percentage="50"
              status="exception"
            ></el-progress>
          </div>
        </el-collapse-item>
        <el-collapse-item title="商品测试" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>
            清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
          </div>
          <div>
            帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
          </div>
        </el-collapse-item>
        <el-collapse-item title="供应商交流" name="4">
          <div>
            用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
          </div>
          <div>
            结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ["1"]
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    format(percentage) {
      return (percentage = 100?"满":percentage);
    }
  }
};
</script>

<style scoped >
div {
  text-align: center;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(n + 3) {
  background: url("../../assets/react.jpg") no-repeat;
  box-sizing: border-box;
  background-size: 60% 100%;
}
.el-carousel__item:nth-child(n + 4) {
  background: url("../../assets/vue.jpg") no-repeat;
  box-sizing: border-box;
  background-size: 60% 100%;
}
.el-carousel__item:nth-child(n + 5) {
  background: url("../../assets/node.jpg") no-repeat;
  box-sizing: border-box;
  background-size: 60% 100%;
}
.el-carousel__item:nth-child(n + 6) {
  background: url("../../assets/jquery.jpg") no-repeat;
  box-sizing: border-box;
  background-size: 60% 100%;
}
.el-carousel__item:nth-child(n + 7) {
  background: url("../../assets/ajax.jpg") no-repeat;

  box-sizing: border-box;
  background-size: 60% 100%;
}
.jindu {
  width: 300px;
  float: right;

}

.text {
  width: 400px;
  float: left;
}
</style>