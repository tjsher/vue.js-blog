<template>
  <Dialog title="登录"
          width="60%"
          :visible="dialogVisible"
          @close="cancel">
    <Form>
      <FormItem label="用户名"
                placeholder="用户名"
                :label-width="formLabelWidth">
        <Input v-model="params.adminName"
               autocomplete="off"></Input>
      </FormItem>
      <FormItem label="密码"
                :label-width="formLabelWidth">
        <Input type="password"
               placeholder="密码"
               v-model="params.adminPass"
               autocomplete="off"></Input>
      </FormItem>
    </Form>
    <div slot="footer"
         class="dialog-footer">
      <Button type="primary"
              @click="handleOk">确 定</Button>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { Dialog, Form, FormItem, Input, Button, Message } from "element-ui";
import config from "@/utils/config";
import axios from "axios";
@Component({
  components: {
    Dialog,
    Form,
    FormItem,
    Input,
    Button
  }
})
export default class Login extends Vue {
  @Prop({ default: false }) visible!: boolean;

  // initial data
  btnLoading: boolean = false;
  loading: boolean = false;
  formLabelWidth: string = "60px";
  params: any = {
    adminName: "",
    adminPass: "",
    avatar :"../assets/user.png",
  };

  // lifecycle hook
  mounted() {
    // this.greet();
  }

  // computed
  get dialogVisible() {
    return this.visible;
  }

  // method

  handleOk() {
    

    if (!this.params.adminName) {
      Message.warning("账号不能为空！");
      return;
    }  else if (!this.params.adminPass) {
      Message.warning("密码不能为空");
      return;
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
    const res: any = await this.$https.post(this.$urls.login, this.params);
    console.log("res :", res);
    if (res.status === 200) {
      if (res.data.code === 200) {
        const data: any = res.data.data;
        const userInfo: object = {
          name: data.name,
          avatar: this.params.avatar,
        };
        window.sessionStorage.userInfo = JSON.stringify(userInfo);
        Message.success(res.data.message);
        return false;
      } else {
        Message.error("用户名或密码错误！");
      }
    } else {
      Message.error("网络错误");
    }
  }
}
</script>