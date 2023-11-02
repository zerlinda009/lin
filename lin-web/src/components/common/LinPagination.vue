<!--<template>-->
<!--  <el-pagination-->
<!--      @size-change="handleSizeChange"-->
<!--      @current-change="handleCurrentChange"-->
<!--      v-model:current-page="currentPage1"-->
<!--      :page-size="pageSize1"-->
<!--      :page-sizes="pageSizes"-->
<!--      layout="total, sizes, prev, pager, next, jumper"-->
<!--      :total="total1">-->
<!--  </el-pagination>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  props: {-->
<!--    total: {-->
<!--      type: Number,-->
<!--      default: 0-->
<!--    },-->
<!--    pageSize: {-->
<!--      type: Number,-->
<!--      default: 10-->
<!--    },-->
<!--    currentPage: {-->
<!--      type: Number,-->
<!--      default: 1-->
<!--    },-->
<!--    pageSizes:{-->
<!--      type: Array,-->
<!--      default: [10, 20, 30, 40],-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      currentPage1: this.currentPage,-->
<!--      pageSize1: this.pageSize,-->
<!--      total1: this.total1,-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    handleSizeChange(val) {-->
<!--      this.$emit("handleSizeChange", this.currentPage, val)-->
<!--    },-->
<!--    handleCurrentChange(val) {-->
<!--      this.$emit("handleCurrentChange", val, this.pageSize)-->
<!--    }-->
<!--  },-->
<!--  watch: {-->
<!--  },-->

<!--};-->
<!--</script>-->