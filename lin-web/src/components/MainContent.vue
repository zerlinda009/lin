<template>
  <el-row v-if="typeof companyId === 'number'">
    <el-col :span="6">
      <div class="grid-content bg-purple">
        <DeleteButton @clickDeleteButton="clickDeleteButton"/>
        <CompanyInfoCard :id="companyId"/>
        <Emploee/>
      </div>
    </el-col>
    <el-col :span="11">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="7">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>
</template>
<script>
import DeleteButton from "@/components/common/DeleteButton.vue";
import axios from "@/config/axiosConfig";
import CompanyInfoCard from "@/components/common/CompanyInfoCard.vue";
import Emploee from "@/components/common/EmploeeList.vue";

export default {
  components: {
    DeleteButton,
    CompanyInfoCard, Emploee
  },
  props: {
    companyId: {
      type: Number,
      require: true,
    }
  },
  data() {
    return {
      companyId1: this.companyId,

    }
  },
  watch: {
    companyId(val) {
      this.companyId1 = val;
    },
  },
  methods: {

    clickDeleteButton() {
      this.$confirm('此操作将删除该当前企业, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete("/api/company/delete", {data: {id: this.companyId}}).then(({code, message}) => {
          if (code === 10000) {
            this.$message({message: message, type: 'success'});
            this.$emit("deleteCompany");
          } else {
            this.$message('出现了一点bug删除失败');
          }
        });
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '哈哈哈, 怂了'
        });
      });
    }
  },
  mounted() {
  }
}
</script>
<style scoped>

</style>