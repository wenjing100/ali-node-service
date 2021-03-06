define({ "api": [
  {
    "type": "get",
    "url": "/api/about/address/list",
    "title": "获取收货地址表",
    "name": "/about/address/list/",
    "group": "address",
    "parameter": {
      "examples": [
        {
          "title": "request-example",
          "content": "{\n   \"id\":1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "success-example",
          "content": "{\n   \"status\": 0,\n   \"data\": {\n   \"idtest\": 1,\n   \"name\": \"zhangsan\"\n   },\n   \"msg\": \"查询数据成功\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/about"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/about.js",
    "groupTitle": "address"
  }
] });
