<template>
  <a-table :columns="columns" :dataSource="rankingList" bordered>
    <template slot="name" slot-scope="text">
      <a href="javascript:;">{{text}}</a>
    </template>
    <span slot="customTitle"><a-icon type="smile-o" /> Name</span>

    <span v-if="user.role=='admin'" slot="action" slot-scope="text, record">
      <a @click="de(record.id)">删除成绩</a>
    </span>
    <template slot="title" slot-scope="currentPageData">
      排行榜
    </template>
    <template slot="footer" slot-scope="currentPageData">
      Footer
    </template>
  </a-table>
</template>
<script>
  const columns = [{
    title: '用户',
    dataIndex: 'username',
    scopedSlots: { customRender: 'username' },
  }, {
    title: '成绩',
    className: 'column-money',
    dataIndex: 'scote',
  }, {
    title: '游戏难度',
    dataIndex: 'holeNumber',
  }, {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  }];

  const data = [{
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  }];


  export default {
    name: "rankingList",
    data: function () {
      return {
        data,
        columns,
        rankingList: [],

      }
    }, mounted() {
      this.getRankingList();
    },computed: {
      user() {
        // console.log(this.$store.state.user)
        return this.$store.state.user;
      },
      routes() {
        return this.$store.state.routesstore
      }
    }, methods: {
      getRankingList: function () {
        this.getRequest("/xserver/user/scote").then(res => {
          this.rankingList = res.data.obj;
          console.log(this.rankingList);
        })
      },de:function (key) {
        console.log(key);
        this.postRequest("/xserver/user/scotedelete",{"id":key}).then(res => {
          this.rankingList = res.data.obj;
          console.log(this.rankingList);
          this.getRankingList();
        })
      }
    }
  }
</script>
<style>
  th.column-money,
  td.column-money {
    text-align: right !important;
  }
</style>
