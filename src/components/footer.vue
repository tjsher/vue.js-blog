
<template>
  <div class="footer">  ©2019 Created by 金涛 </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Footer extends Vue {}
</script>
<style scoped>
.footer {
  text-align: center;
  padding: 20px;
  font-weight: bold;
}
</style>

