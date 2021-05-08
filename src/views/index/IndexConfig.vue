<template>
  <div>
    <el-card class="index-container">

      <template #header>
        <div class="header">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">增加</el-button>
          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDelete"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="el-icon-delete">批量删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="configName"
          label="商品名称"
        />
        <el-table-column
          label="跳转链接"
        >
          <template #default="scope">
            <a target="_blank" :href="scope.row.redirectUrl">{{ scope.row.redirectUrl }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="configRank"
          label="排序值"
          width="120"
        />
        <el-table-column
          prop="goodsId"
          label="商品编号"
          width="200"
        />
        <el-table-column
          prop="createTime"
          label="添加时间"
          width="200"
        />
        <el-table-column
          label="操作"
          width="100"
        >
          <template #default="scope">
            <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.configId)">修改</a>
            <el-popconfirm
              title="确定删除吗？"
              @confirm="handleDeleteOne(scope.row.configId)"
            >
              <template #reference>
                <a style="cursor: pointer">删除</a>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!--总数超过一页，再展示分页器-->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="changePage"
      />
    </el-card>
    <DialogAddGood ref="addGood" :reload="getIndexConfig" :type="type" :config-type="configType" />
  </div>
</template>

<script>

import { Message } from 'element-ui'
import DialogAddGood from '@/components/DialogAddGood.vue'
import axios from '@/utils/axios'
// 首页配置类型参数
const configTypeMap = {
  hot: 3,
  new: 4,
  recommend: 5
}
export default {
  name: 'Hot',
  components: {
    DialogAddGood
  },
  data() {
    return {
      loading: false,
      tableData: [], // 数据列表
      multipleSelection: [], // 选中项
      total: 0, // 总条数
      currentPage: 1, // 当前页
      pageSize: 10, // 分页大小
      type: 'add', // 操作类型
      configType: 3 // 3-(首页)热销商品 4-(首页)新品上线 5-(首页)为你推荐
    }
  },
  // 预先声明configTypeMap可以
  mounted: function() {
    this.configType = configTypeMap[this.$route.name]
    this.getIndexConfig()
  },
  beforeDestroy: function() {
    this.$router.beforeEach((to) => {
      if (['hot', 'new', 'recommend'].includes(to.name)) {
        this.configType = configTypeMap[to.name]
        this.currentPage = 1
        this.getIndexConfig()
      }
    })
  },
  methods: {

    // 首页热销商品列表
    getIndexConfig() {
      this.loading = true

      // console.log(this.$route.name)
      axios.get('/indexConfigs', {
        params: {
          pageNumber: this.currentPage,
          pageSize: this.pageSize,
          configType: this.configType
        }
      }).then(res => {
        this.tableData = res.list
        this.total = res.totalCount
        this.currentPage = res.currPage
        this.loading = false
      }).catch((e) => {})
    },
    // 添加商品
    handleAdd() {
      this.type = 'add'
      this.$refs.addGood.open()
    },
    // 修改商品
    handleEdit(id) {
      this.type = 'edit'
      this.$refs.addGood.open(id)
    },
    // 选择项
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 删除
    handleDelete() {
      if (!this.multipleSelection.length) {
        Message.error('请选择项')
        return
      }
      axios.post('/indexConfigs/delete', {
        ids: this.multipleSelection.map(i => i.configId)
      }).then(() => {
        Message.success('删除成功')
        this.getIndexConfig()
      })
    },
    // 单个删除
    handleDeleteOne(id) {
      axios.post('/indexConfigs/delete', {
        ids: [id]
      }).then(() => {
        Message.success('删除成功')
        this.getIndexConfig()
      })
    },
    changePage(val) {
      this.currentPage = val
      this.getIndexConfig()
    }

  }
  // setup() {
  //   const router = useRouter()
  //   const route = useRoute()
  //   const multipleTable = ref(null)
  //   const addGood = ref(null)
  //   const state = reactive({
  //     loading: false,
  //     tableData: [], // 数据列表
  //     multipleSelection: [], // 选中项
  //     total: 0, // 总条数
  //     currentPage: 1, // 当前页
  //     pageSize: 10, // 分页大小
  //     type: 'add', // 操作类型
  //     configType: 3 // 3-(首页)热销商品 4-(首页)新品上线 5-(首页)为你推荐
  //   })
  //   // 监听路由变化
  //   const unwatch = router.beforeEach((to) => {
  //     if (['hot', 'new', 'recommend'].includes(to.name)) {
  //       state.configType = configTypeMap[to.name]
  //       state.currentPage = 1
  //       getIndexConfig()
  //     }
  //   })
  //   // 初始化
  //   onMounted(() => {
  //     state.configType = configTypeMap[route.name]
  //     getIndexConfig()
  //   })
  //   onUnmounted(() => {
  //     unwatch()
  //   })
  //   // 首页热销商品列表
  //   const getIndexConfig = () => {
  //     state.loading = true
  //     axios.get('/indexConfigs', {
  //       params: {
  //         pageNumber: state.currentPage,
  //         pageSize: state.pageSize,
  //         configType: state.configType
  //       }
  //     }).then(res => {
  //       state.tableData = res.list
  //       state.total = res.totalCount
  //       state.currentPage = res.currPage
  //       state.loading = false
  //     })
  //   }
  //   // 添加商品
  //   const handleAdd = () => {
  //     state.type = 'add'
  //     addGood.value.open()
  //   }
  //   // 修改商品
  //   const handleEdit = (id) => {
  //     state.type = 'edit'
  //     addGood.value.open(id)
  //   }
  //   // 选择项
  //   const handleSelectionChange = (val) => {
  //     state.multipleSelection = val
  //   }
  //   // 删除
  //   const handleDelete = () => {
  /*    if (!state.multipleSelection.length) {*/
  /*      Message.error('请选择项')*/
  /*      return*/
  /*    }*/
  /*    axios.post('/indexConfigs/delete', {*/
  /*      ids: state.multipleSelection.map(i => i.configId)*/
  /*    }).then(() => {*/
  /*      Message.success('删除成功')*/
  /*      getIndexConfig()*/
  /*    })*/
  /*  }*/
  /*  // 单个删除*/
  /*  const handleDeleteOne = (id) => {*/
  /*    axios.post('/indexConfigs/delete', {*/
  /*      ids: [id]*/
  /*    }).then(() => {*/
  /*      Message.success('删除成功')*/
  /*      getIndexConfig()*/
  /*    })*/
  /*  }*/
  /*  const changePage = (val) => {*/
  /*    state.currentPage = val*/
  /*    getIndexConfig()*/
  /*  }*/
  /*  return {*/
  /*    ...toRefs(state),*/
  //     multipleTable,
  //     handleSelectionChange,
  //     addGood,
  //     handleAdd,
  //     handleEdit,
  //     handleDelete,
  //     handleDeleteOne,
  //     changePage
  //   }
  // }
}
</script>

<style scoped>
.index-container {
  min-height: 100%;
}

.el-card.is-always-shadow {
  min-height: 100% !important;
}
</style>
