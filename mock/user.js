const Mock = require('mockjs')
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}
const data = Mock.mock({
  // 'items|30': [{
  //   id: '@id',
  //   title: '@sentence(10, 20)',
  //   'status|1': ['published', 'draft', 'deleted'],
  //   author: 'name',
  //   display_time: '@datetime',
  //   pageviews: '@integer(300, 5000)'
  // }],
  'list': [
    {
      'configId': 21,
      'configName': '热销商品 MacBook',
      'configType': 3,
      'goodsId': 10250,
      'redirectUrl': '##',
      'configRank': 200,
      'isDeleted': 0,
      'createTime': '2021-03-08 18:55:49',
      'createUser': 0,
      'updateTime': '2021-03-08 18:55:49',
      'updateUser': 0
    },
    {
      'configId': 33,
      'configName': '小米10至尊纪念版23',
      'configType': 3,
      'goodsId': 10902,
      'redirectUrl': '##',
      'configRank': 199,
      'isDeleted': 0,
      'createTime': '2021-03-08 18:55:49',
      'createUser': 0,
      'updateTime': '2021-05-06 15:34:10',
      'updateUser': 0
    },
    {
      'configId': 1,
      'configName': '热销商品 iPhone XR',
      'configType': 3,
      'goodsId': 10284,
      'redirectUrl': '##',
      'configRank': 198,
      'isDeleted': 0,
      'createTime': '2021-03-08 18:55:49',
      'createUser': 0,
      'updateTime': '2021-05-06 15:05:07',
      'updateUser': 0
    },
    {
      'configId': 3,
      'configName': '热销商品 华为Mate30 Pro',
      'configType': 3,
      'goodsId': 10894,
      'redirectUrl': '##',
      'configRank': 100,
      'isDeleted': 0,
      'createTime': '2021-03-08 18:55:49',
      'createUser': 0,
      'updateTime': '2021-05-06 16:42:55',
      'updateUser': 0
    },
    {
      'configId': 4,
      'configName': '热销商品 Apple AirPods',
      'configType': 3,
      'goodsId': 10159,
      'redirectUrl': '##',
      'configRank': 9,
      'isDeleted': 0,
      'createTime': '2021-03-08 18:55:49',
      'createUser': 0,
      'updateTime': '2021-05-06 16:42:33',
      'updateUser': 0
    },
    {
      'configId': 31,
      'configName': '热销商品 华为Mate40 Pro',
      'configType': 3,
      'goodsId': 10908,
      'redirectUrl': '##',
      'configRank': 7,
      'isDeleted': 0,
      'createTime': '2021-03-08 18:55:49',
      'createUser': 0,
      'updateTime': '2021-05-06 16:43:06',
      'updateUser': 0
    }
  ],
  'currPage': 1,
  'pageSize': 10,
  'totalCount': 6,
  'totalPage': 1
})
module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/indexConfigs\.*',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        message: 'SUCCESS',
        data: {
          list: data.list,
          pageSize: data.pageSize,
          totalCount: data.totalCount,
          totalPage: data.totalPage
        }
      }
    }
  }
]
