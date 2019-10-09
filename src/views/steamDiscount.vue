<template>
    <div class="message left">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="排名" width="50">
            </el-table-column>
            <el-table-column prop="name" label="游戏名字" width="600">
            </el-table-column>
            <el-table-column prop="discount_pct" label="折扣">
            </el-table-column>
            <el-table-column prop="discount_original_price" label="原价">
            </el-table-column>
            <el-table-column prop="discount_final_price" label="现价">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import axios from "axios"
export default {
    data() {
        return {

            tableData: [],
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData: function() {
            console.log("gggg");
            let self = this;
            axios.get("http://127.0.0.1:3000/steam").then(res => {
                console.log(res.data);

                //NProgress.done();
                let { code, data } = res.data;

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