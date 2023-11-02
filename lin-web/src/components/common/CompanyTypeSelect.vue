<template>
  <el-select v-model="index" placeholder="请选择">
    <el-option
        v-for="(item,index) in companyTypes"
        :key="index"
        :label="item.name"
        :value="index">
    </el-option>
  </el-select>
</template>

<script>
import axios from "@/config/axiosConfig";

export default {
  name: "CompanyType.vue",
  data() {
    return {
      companyTypes: [],

      index: null,
    }
  },
  watch: {
    index(val) {
      this.$emit("select", JSON.parse(JSON.stringify(this.companyTypes[val])));
    },
  },
  methods: {},
  mounted() {
    axios.get("/api/company-type/list").then(({code, data}) => {
      if (code === 10000) {
        this.companyTypes = data;
      }
    });
  }
}
</script>
<style scoped>

</style>