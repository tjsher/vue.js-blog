<template>
    <div class="message left">
        <el-form :model="params" status-icon :rules="rules" ref="params" label-width="50px" class="demo-ruleForm">
            <el-form-item label="标题" prop="email">
                <el-input type="text" placeholder="必填" v-model="params.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="name">
                <el-input v-model="params.author" placeholder="必填"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input type="textarea" autosize placeholder="必填" v-model="params.content"></el-input>
            </el-form-item>
            <el-form-item label="封面" prop="content">
                <el-upload class="upload-demo" ref="upload" action="http://127.0.0.1:3000/addArticle" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>

                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="btnLoading" @click="submit;submitUpload">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios"
var checkContent = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error("内容不能为空"));
    }
};

@Component({})
export default class Message extends Vue {
    // initial data
    btnLoading: boolean = false;
    imageUrl: string = "";
    params: any = {
        title: "",
        author: "",
        content: "",
        type: "text",
    };
    rules: any = {

        content: [{ validator: checkContent, trigger: "blur" }]
    };
    fileList: any[] = [

    ];

    // use prop values for initial data

    // lifecycle hook
    mounted() {}

    // method
    submitUpload() {
        (this.$refs.upload as Vue & { submit: () => boolean }).submit();
    }
    handleRemove(file: any, fileList: any) {
        console.log(file, fileList);
    }
    handlePreview(file: any) {
        console.log(file);
    }
    submit() {
        if (!this.params.content) {
            this.$message({
                message: "内容不能为空",
                type: "warning"
            });
            return;
        }
        let res: any = "";
        this.btnLoading = true;
        res = axios.post("http://127.0.0.1:3000/addArticle", this.params).then(res => {
            this.btnLoading = false;
            if (res.status === 200) {
                if (res.data.code === 200) {
                    this.$message({
                        message: "上传成功 ！",
                        type: "success"
                    });
                } else {
                    this.$message({
                        message: res.data.message,
                        type: "error"
                    });
                }
            } else {
                this.$message({
                    message: "网络错误!",
                    type: "error"
                });
            }
        });


    }
    handleAvatarSuccess(res: any, file: any) {
        this.imageUrl = URL.createObjectURL(file.raw);
    }
    beforeAvatarUpload(file: any) {
        const isLt2M: boolean = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
    }
}
</script>
<style scoped>
.message {
    padding: 100px 20px 0 20px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>