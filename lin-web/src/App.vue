<template>
  <el-row>
    <el-col :span="4" style="border-right:1px solid;border-right-color: #d4d4d4">
      <div class="grid-content bg-purple"><ListCompany :refreshFlag="refreshFlag" @selectCompany="selectCompany"/></div>
    </el-col>
    <el-col :span="20">
      <div class="grid-content bg-purple-light">
        <MainContent @deleteCompany="refreshFlag = new Date()" :companyId="companyId"/>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import ListCompany from "@/components/ListCompany.vue";
import MainContent from "@/components/MainContent.vue";

export default {
  name: 'App',
  data() {
    return {
      refreshFlag: new Date(),
      companyId: undefined,
    };
  },
  components: {
    ListCompany,MainContent
  },
  methods:{
    selectCompany(company) {
      this.companyId = company.id;
    },
  }
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
  height: 100%;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  height: 100%;
}

.bg-purple {
  background: #212121;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  height: 100%;
}

#app{
  width: 100%;
  height: 100%;
  --color: rgba(114, 114, 114, 0.3);
  background-color: #191a1a;
  background-image: linear-gradient(0deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%,transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%,transparent),
  linear-gradient(90deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%,transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%,transparent);
  background-size: 55px 55px;
}
</style>
