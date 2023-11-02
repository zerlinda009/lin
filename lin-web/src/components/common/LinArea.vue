<script>
import {pcaTextArr} from 'element-china-area-data'

export default {
  data() {
    return {
      pcaTextArr,
      selectedOptions1: this.selectedOptions,
    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
      this.$emit("change", value)
    },
  },
  watch: {
    selectedOptions() {
      this.selectedOptions1 = this.selectedOptions;
    },
  },
  props: {
    selectedOptions: {
      dataType: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<template>
  <el-cascader
      size="large"
      @change="handleChange"
      :options="pcaTextArr"
      v-model="selectedOptions1">
  </el-cascader>
</template>
