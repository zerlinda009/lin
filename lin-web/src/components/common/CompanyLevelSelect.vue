<template>
  <el-select v-model="index" placeholder="请选择">
    <el-option
        v-for="(item,index) in companyLevels"
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
      companyLevels: [],
      index: null,
    }
  },
  watch: {
    index(val) {
      this.$emit("select", JSON.parse(JSON.stringify(this.companyLevels[val])));
    },
  },
  methods: {},
  mounted() {
    axios.get("/api/company-level/list").then(({code, data}) => {
      if (code === 10000) {
        this.companyLevels = data;
      }
    });
  }
}
</script>
<style scoped>

</style>