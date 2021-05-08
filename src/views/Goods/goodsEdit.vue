<template>
  <el-form ref="form" :model="form" label-width="80px" style="margin-top:20px;margin-left: 20px; ">
    <!--    选择框-->
    <el-form-item required label="商品分类">
      <el-select v-model="firstClassification" multiple placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-select
        v-model="SecondClassification"
        multiple
        collapse-tags
        style="margin-left: 20px;"
        placeholder="请选择">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-select
        v-model="ThirdClassification"
        multiple
        collapse-tags
        style="margin-left: 20px;"
        placeholder="请选择">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品名称" prop="goodsName">
      <el-input style="width: 300px" v-model="goodForm.goodsName" placeholder="请输入商品名称"></el-input>
    </el-form-item>
    <el-form-item label="商品简介" prop="goodsIntro">
      <el-input style="width: 300px" type="textarea" v-model="goodForm.goodsIntro" placeholder="请输入商品简介(100字)"></el-input>
    </el-form-item>
    <el-form-item label="商品价格" prop="originalPrice">
      <el-input type="number" min="0" style="width: 300px" v-model="goodForm.originalPrice" placeholder="请输入商品价格"></el-input>
    </el-form-item>
    <el-form-item label="商品售卖价" prop="sellingPrice">
      <el-input type="number" min="0" style="width: 300px" v-model="goodForm.sellingPrice" placeholder="请输入商品售价"></el-input>
    </el-form-item>
    <el-form-item label="商品库存" prop="stockNum">
      <el-input type="number" min="0" style="width: 300px" v-model="goodForm.stockNum" placeholder="请输入商品库存"></el-input>
    </el-form-item>
    <el-form-item label="商品标签" prop="tag">
      <el-input style="width: 300px" v-model="goodForm.tag" placeholder="请输入商品小标签"></el-input>
    </el-form-item>
    <el-form-item label="上架状态" prop="goodsSellStatus">
      <el-radio-group v-model="goodForm.goodsSellStatus">
        <el-radio label="0">上架</el-radio>
        <el-radio label="1">下架</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitAdd()">{{ id ? '立即修改' : '立即创建' }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'GoodsEdit',
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      firstClassification: ' ',
      SecondClassification: ' ',
      ThirdClassification: ' ',
      goodForm: {
        goodsName: '',
        goodsIntro: '',
        originalPrice: '',
        sellingPrice: '',
        stockNum: '',
        goodsSellStatus: '0',
        goodsCoverImg: '',
        tag: ''
      },
      rules: {
        goodsName: [
          { required: 'true', message: '请填写商品名称', trigger: ['change'] }
        ],
        originalPrice: [
          { required: 'true', message: '请填写商品价格', trigger: ['change'] }
        ],
        sellingPrice: [
          { required: 'true', message: '请填写商品售价', trigger: ['change'] }
        ],
        stockNum: [
          { required: 'true', message: '请填写商品库存', trigger: ['change'] }
        ]
      },
      options1: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]

    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
