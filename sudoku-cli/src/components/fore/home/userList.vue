<template>
  <a-table :columns="columns" :dataSource="data">
    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
    <span slot="customTitle"><a-icon type="smile-o" /> Name</span>

    <span slot="action" slot-scope="text, record">
      <a @click="logout(record.username)">下线</a>
       <a-divider type="vertical" />
      <a @click="logout(record.username)">升为会员</a>
    </span>
  </a-table>
</template>
<script>
  const methods = require("babel-plugin-transform-runtime");
  const columns = [{
    dataIndex: 'username',
    key: 'username',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'username' },
  }, {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  }];

  export default {
    data:function ()  {
      return {
        data:[],
        columns,
      }
    },mounted() {
      this.getData();
    },methods: {
      logout(key){
        this.postRequest("/xserver/user/adminlogout",{"username":key}).then(()=>{
          this.getData();
        })
      },getData:function () {
        this.postRequest("/xserver/user/userList").then(resp=>{
          this.data=resp.data.obj;
        })
      }
    }
  }
</script>
