<template>
  <el-collapse v-model="activeNames"  style="margin-left: 20px">
    <el-collapse-item title="我是谁 WHO AM I" name="1">
      <div>这是一款特殊的商城系统,包括 会员商城 秒杀系统 商城后台管理系统</div>
      <div>采用微服务架构 三个模块分属不同的系统</div>
    </el-collapse-item>
    <el-collapse-item title="技术栈 Technology" name="2">
      <div>会员商城 基于SpringBoot开发,前端使用Thymeleaf</div>
      <div>秒杀系统：基于令牌桶,AOP锁,数据库悲观锁完成,用redis缓存数据</div>
      <div>后台系统：基于SpringCloud,前后端分离实现,前端为Vue,后端为SpringBoot</div>
    </el-collapse-item>
    <el-collapse-item title="将来要做的事 TODO" name="3">
      <div>增加go的项目模块,实现同一系统,多个语言模块</div>
      <div>部署至服务器</div>
      <div>引入kafka</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      activeNames: ['1']
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
