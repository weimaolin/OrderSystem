<template>
  <div class="ordersystem">
    <el-row>
      <el-col :span="7" class="order-list" id="orderlist">
        <el-tabs>
          <el-tab-pane label="点餐">
            <el-table :data="tableData" border style="width:100%;" height="800">
              <el-table-column prop="goodsName" label="商品名称" width="180px"></el-table-column>
              <el-table-column prop="count" label="数量" width="90px"></el-table-column>
              <el-table-column prop="goodsPrice" label="金额" width="120px"></el-table-column>
              <el-table-column label="操作" width="130px" fixed="right">
                <!-- fixed="right" 操作按钮固定在右边 -->
                <template slot-scope="scope">
                  <el-button type="button" size="small" @click="addOrderList(scope.row)">+</el-button>
                  <el-button
                    type="button"
                    size="small"
                    @click="reduceOrderList(scope.row,scope.$index)"
                  >-</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="totalDiv">
              <small>数量:{{totalCount}}</small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <small>总额:{{totalMoney}}</small>
            </div>
            <div class="button">
              <el-button type="warning">挂单</el-button>
              <el-button type="danger" @click="deleteAll()">删除</el-button>
              <el-button type="success" @click="checkout()">结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单"></el-tab-pane>
          <el-tab-pane label="外卖"></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="17" class="product-list" id="productlist">
        <div class="product-box">
          <div class="prodct-title">常用商品</div>
          <div class="display-product">
            <ul>
              <li v-for="(item,key) in oftenGoods" :key="key" @click="addOrderList(item)">
                <span>{{item.goodsName}}</span>
                <span class="product-price">${{item.goodsPrice}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="product-select">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <div class="food">
                <el-scrollbar style="height:100%">
                  <ul class="cookList">
                    <li v-for="(item,key) in type0Goods" :key="key" @click="addOrderList(item)">
                      <span>
                        <img :src="item.goodsImg" alt="汉堡" />
                      </span>
                      <span class="foodName">{{item.goodsName}}</span>
                      <span class="foodPrice">${{item.goodsPrice}}</span>
                    </li>
                  </ul>
                </el-scrollbar>
              </div>
            </el-tab-pane>
            <el-tab-pane label="小吃">
              <div class="food">
                <el-scrollbar style="height:100%">
                  <ul class="cookList">
                    <li v-for="(item,key) in type1Goods" :key="key" @click="addOrderList(item)">
                      <span>
                        <img :src="item.goodsImg" alt="汉堡" />
                      </span>
                      <span class="foodName">{{item.goodsName}}</span>
                      <span class="foodPrice">${{item.goodsPrice}}</span>
                    </li>
                  </ul>
                </el-scrollbar>
              </div>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <div class="food">
                <el-scrollbar style="height:100%">
                  <ul class="cookList">
                    <li v-for="(item,key) in type2Goods" :key="key" @click="addOrderList(item)">
                      <span>
                        <img :src="item.goodsImg" alt="汉堡" />
                      </span>
                      <span class="foodName">{{item.goodsName}}</span>
                      <span class="foodPrice">${{item.goodsPrice}}</span>
                    </li>
                  </ul>
                </el-scrollbar>
              </div>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <div class="food">
                <el-scrollbar style="height:100%">
                  <ul class="cookList">
                    <li v-for="(item,key) in type3Goods" :key="key" @click="addOrderList(item)">
                      <span>
                        <img :src="item.goodsImg" alt="汉堡" />
                      </span>
                      <span class="foodName">{{item.goodsName}}</span>
                      <span class="foodPrice">${{item.goodsPrice}}</span>
                    </li>
                  </ul>
                </el-scrollbar>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      tableData: [],
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      totalMoney: 0,
      totalCount: 0
    };
  },
  mounted: function() {
    var orderHeight = document.body.clientHeight; //利用JavaScript通过生命周期来改变它的height
    var productHeight = document.body.clientHeight;
    // console.log(orderHeight)
    document.getElementById("orderlist").style.height = orderHeight + "px";
    document.getElementById("productlist").style.height = productHeight + "px";
  },
  methods: {
    addOrderList: function(item) {
      // 判断商品是否已经存在订单列表中(默认不存在)
      this.totalMoney = 0;
      this.totalCount = 0;
      let isHave = false;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].goodsID == item.goodsID) {
          isHave = true;
        }
      }
      if (isHave) {
        //如果存在 就改变列表中商品数量
        let arr = this.tableData.filter(o => o.goodsID == item.goodsID);
        arr[0].count++;
      } else {
        let newGoods = {
          goodsID: item.goodsID,
          goodsName: item.goodsName,
          goodsPrice: item.goodsPrice,
          count: 1
        };
        this.tableData.push(newGoods);
      }
      // // 计算金额 数量
      // this.tableData.forEach(element => {
      //   this.totalCount += element.count;
      //   this.totalMoney = this.totalMoney + element.count * element.price;
      // });
      this.getAllMoney();
    },
    reduceOrderList: function(item, index) {
      if (item.count != 0) {
        item.count = item.count - 1;
        this.getAllMoney();
      } else if (item.count == 0) {
        var goodsList = this.tableData;
        goodsList.splice(index, 1);
        // this.tableData=this.tableData.filter(o=>o.goodsID!=item.goodsID)
      }
    },
    getAllMoney: function(item) {
      this.totalCount = 0;
      this.totalMoney = 0;
      if (this.tableData) {
        // 计算金额 数量
        this.tableData.forEach(element => {
          this.totalCount += element.count;
          this.totalMoney =
            this.totalMoney + element.count * element.goodsPrice;
        });
      }
    },
    // 删除所有商品
    deleteAll: function() {
      this.tableData = [];
      this.totalCount = 0;
      this.totalMoney = 0;
    },
    // 结账
    checkout: function() {
      if (this.totalCount != 0) {
        this.tableData = [];
        this.totalCount = 0;
        this.totalMoney = 0;
        this.$message({
          message: "下单成功，正在为您打印小票",
          type: "success"
        });
      } else {
        this.$message.error("了解您急切的心情,可您不能空结帐吖!!");
      }
    }
  },
  created: function() {
    this.axios
      .get("http://localhost:3000/Array")
      .then(response => {
        // this.tableData = response.data[0];
        this.oftenGoods = response.data[0];
        this.type0Goods = response.data[1];
        this.type1Goods = response.data[2];
        this.type2Goods = response.data[3];
        this.type3Goods = response.data[4];
        console.log(response);
      })
      .catch(error => {
        console.log("error");
      });
  }
};
</script>
<style scoped>
/* .ordersystem {
  text-align: center;
} */
.order-list {
  background-color: #f9fafc;
  border-right: 1px solid #c0ccda;
  height: 100%;
  /*无法改变height*/
}

.product-list {
  background-color: #f9fafc;
}

.button {
  margin-top: 10px;
}

/* 常用商品 */
.prodct-title {
  border-bottom: 2px solid #d3dce6;
  height: 18px;
  padding: 10px;
  text-align: left;
  background-color: #f9fafc;
}

.display-product ul li {
  list-style-type: none;
  float: left;
  border: 1px solid #e5e9f2;
  padding: 10px;
  margin: 10px;
  background-color: #fff;
  cursor: pointer;
}

.product-price {
  color: blue;
}

.product-select {
  clear: both;
  /* 清除浮动 */
}

.food {
  height: 730px;
  /* border: 1px solid red; */
  width: 100%;
}

.cookList li {
  list-style-type: none;
  width: 23%;
  border: 1px solid #e5e9f2;
  height: auto;
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  float: left;
  margin: 5px;
  cursor: pointer;
}

.cookList li span {
  display: block;
  float: left;
}

img {
  width: 100%;
  height: 200px;
}

.foodName {
  font-size: 18px;
  padding-left: 80px;
  color: brown;
}

.foodPrice {
  font-size: 16px;
  padding-left: 10px;
  color: green;
}
</style>

