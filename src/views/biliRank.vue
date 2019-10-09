<template>
    <div class="message left">
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="排名" width="50">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="400">
        </el-table-column>
        <el-table-column prop="url" label="链接">
          <template slot-scope="scope">
          <a :href="'http://'+scope.row.url"
            target="_blank"
            class="buttonText">{{scope.row.url}}</a>
        </template>

        </el-table-column>
        <el-table-column prop="score" label="得分">
        </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import axios from "axios"
export default {
    data() {
      return{

        tableData: [{
          id :1,
          img:"",
          title:"a",
          url:"aaa",
          score:"1010",
        },
        ],
      }
    },
    created(){
      this.getData();
    },
    methods:{
      getData : function(){
        let self = this;
            axios.get("http://127.0.0.1:3000/bilibili").then(res => {
              console.log(res.data);

              //NProgress.done();
              let {code, data } = res.data;

              if (code !== 200) {
                this.$message({
                  message: "错了错了错了", 
                  type: 'error'
                });
              } else {
                self.tableData = data;
              }
            });
      },

    },

}
</script>
<style scoped>
.message {
    padding: 100px 20px 0 20px;
}
</style>