<template>
  <el-select v-model="index" placeholder="请选择">
    <el-option
        v-for="(item ,index) in companyScales"
        :key="index"
        :label="item | format"
        :value="index">
    </el-option>
  </el-select>
</template>

<script>
import axios from "@/config/axiosConfig";

export default {
  name: "CompanyType.vue",
  props: {companyId: {type: Number, require: false}},
  data() {
    return {
      companyScales: [],
      index: null,
    }
  },
  watch: {
    index(val) {
      this.$emit("select", JSON.parse(JSON.stringify(this.companyScales[val])));
    },
    companyId() {
      this.getCompanyScale();
    },
  },
  methods: {
    getCompanyScale() {
      axios.get(`/api/company-scale/getByCompanyId?id=${this.companyId}`).then(({code, data}) => {
        if (code === 10000) {
          this.companyScale = data;
          this.id = data.id;
        }
      })
    },
  },
  mounted() {
    axios.get("/api/company-scale/list").then(({code, data}) => {
      if (code === 10000) {
        this.companyScales = data;
      }
    });
  },
  filters: {
    format(companyScale) {
      if (companyScale.min && companyScale.max) {
        return `${companyScale.min} <= 人数 < ${companyScale.max}`;
      }
      if (companyScale.min) {
        return `${companyScale.min} <= 人数`
      }
      if (companyScale.max) {
        return `人数 < ${companyScale.max}`
      }
    },
  },

}
</script>
<style scoped>

</style>