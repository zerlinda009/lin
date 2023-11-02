<template>
  <div>
    <el-card class="box-card">
      <div class="text item">
        <div style="position: relative">
          <EditButton style="position: absolute;right: 25px;top: -15px" @click="dialogVisible=true"/>
        </div>
        <el-descriptions :title="company.name" :column="1">
          <el-descriptions-item label="编号">{{ company.number }}</el-descriptions-item>
          <el-descriptions-item label="自有品牌">
            <el-tag size="small">{{ company.brand }}</el-tag>
            <el-tag size="small">雅诗兰黛</el-tag>
            <el-tag size="small">幽兰黛尔</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="规模">&lt;100人</el-descriptions-item>
          <el-descriptions-item label="等级">四</el-descriptions-item>
          <el-descriptions-item label="性质">OEM代工厂</el-descriptions-item>
          <el-descriptions-item label="省份">{{ company.province }}</el-descriptions-item>
          <el-descriptions-item label="地市">{{ company.city }}</el-descriptions-item>
          <el-descriptions-item label="区域">{{ company.area }}</el-descriptions-item>
          <el-descriptions-item label="地址">{{ company.address }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
    <el-dialog :title="company.name" :visible.sync="dialogVisible" width="30%">
      <CompanyEditForm :id="id" @updateSuccess="infoUpdate"/>
    </el-dialog>
  </div>

</template>
<script>
import axios from "@/config/axiosConfig";
import EditButton from "@/components/common/EditButton.vue";
import CompanyEditForm from "@/components/common/CompanyEditForm.vue";

export default {
  components: {EditButton, CompanyEditForm},
  props: {
    id: {type: Number, require: true}
  },
  name: "CompanyInfoCard.vue",
  data() {
    return {
      dialogVisible: false,
      company: {}
    }
  },
  watch: {
    id() {
      this.getCompanyById();
    },
  },
  methods: {
    infoUpdate() {
      this.getCompanyById();
    },
    getCompanyById() {
      axios.get(`/api/company/getById?id=${this.id}`).then(({code, data}) => {
        if (code === 10000) {
          this.company = data;
        }
      })
    },
  },
  mounted() {
    this.getCompanyById();
  }
}
</script>
<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>