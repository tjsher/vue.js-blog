<template>
    <el-dialog title="登陆/注册" :width="isMobile ? '90%' : '50%'" :visible="dialogVisible" @close="cancel">
        <el-form>
            <el-formItem label="账号" :label-width="formLabelWidth">
                <el-input v-model="params.adminName" placeholder="账号" autocomplete="off">
                </el-input>
            </el-formItem>
            <el-formItem label="密码" :label-width="formLabelWidth">
                <el-input type="password" placeholder="密码" v-model="params.adminPass" autocomplete="off"></el-input>
            </el-formItem>
            <el-formItem v-if="handleFlag === 'register'" label="昵称" :label-width="formLabelWidth">
                <el-input v-model="params.name" placeholder="用户名或昵称" autocomplete="off"></el-input>
            </el-formItem>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button v-if="handleFlag === 'login'" :loading="btnLoading" type="primary" @click="handleOk('login')">登 录</el-button>
            <el-button v-if="handleFlag === 'register'" :loading="btnLoading" type="primary" @click="handleOk('register')">注 册</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({
    // components: {}
})
export default class RegisterAndLogin extends Vue {
    @Prop({ default: false }) visible!: boolean;
    @Prop({ default: false }) handleFlag!: string;
    @Prop({ default: false }) isMobile!: string;

    // initial data
    btnLoading: boolean = false;
    loading: boolean = false;
    formLabelWidth: string = this.isMobile ? "40px" : "60px";
    params: any = {
        adminName: "",
        name: "",
        adminPass: "",
    };

    // lifecycle hook
    mounted() {}

    // computed
    get dialogVisible() {
        return this.visible;
    }

    // method


    handleOk() {

        if (!this.params.adminName) {
            this.$message({
                message: "用户名不能为空！",
                type: "warning"
            });
            return;
        }

        if (this.handleFlag === "register") {
            if (!this.params.adminName) {
                this.$message({
                    message: "密码不能为空！",
                    type: "warning"
                });
                return;
            } else if (!this.params.name) {
                this.$message({
                    message: "账号不能为空！",
                    type: "warning"
                });
                return;
            }

        }
        this.submit();
    }

    // this.$emit
    @Emit()
    cancel() {
        return false;
    }
    @Emit("ok")
    async submit() {
        let res: any = "";
        this.btnLoading = true;
        if (this.handleFlag === "register") {
            res = await this.$https.post(this.$urls.register, this.params);
        } else {
            res = await this.$https.post(this.$urls.login, this.params);
        }
        this.btnLoading = false;
        if (res.status === 200) {
            if (res.data.code === 200) {
                console.log(res.data.code);
                const data: any = res.data.data;
                const userInfo: object = {
                    _id: data._id,
                    name: data.name,
                    avatar: data.avatar
                };
                this.$store.commit("SAVE_USER", {
                    userInfo
                });
                window.sessionStorage.userInfo = JSON.stringify(userInfo);
                this.$message({
                    message: res.data.message,
                    type: "success"
                });
                return false;
            } else {
                this.$message({
                    message:"用户名或密码错误！",
                    type: "error"
                });
                return true;
            }
        } else {
            this.$message({
                message: "网络错误!",
                type: "error"
            });
            return true;
        }
    }
}
</script>