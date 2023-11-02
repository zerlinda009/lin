<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="编号">
        <el-input v-model="company.number"></el-input>
      </el-form-item>
      <el-form-item label="自有品牌">
        <lin-tag @tagChange="brandChange"/>
      </el-form-item>
      <el-form-item label="规模">
        <CompanyScaleSelect @select="selectScale"/>
      </el-form-item>
      <el-form-item label="等级">
        <CompanyLevelSelect @select="selectLevel"/>
      </el-form-item>
      <el-form-item label="性质">
        <CompanyTypeSelect @select="selectType"/>
      </el-form-item>
      <el-form-item label="区域">
        <LinArea :selectedOptions="area"/>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="company.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "@/config/axiosConfig";
import LinArea from "@/components/common/LinArea.vue";
import CompanyTypeSelect from "@/components/common/CompanyTypeSelect.vue";
import CompanyLevelSelect from "@/components/common/CompanyLevelSelect.vue";
import CompanyScaleSelect from "@/components/common/CompanyScaleSelect.vue";
import LinTag from "@/components/common/LinTag.vue";

export default {
  components: {LinArea, CompanyTypeSelect, CompanyLevelSelect, CompanyScaleSelect, LinTag},
  props: {
    id: {
      type: Number,
      require: true,
    }
  },
  watch: {
    id() {
      this.getCompanyById();
    },
  },
  data() {
    return {
      company: {
        brand: [],
      },
      scale: {},
      level: {},
      type: {},
    }
  },
  computed: {
    area: {
      get() {
        let data = [];
        data.push(this.company['province']);
        data.push(this.company['city']);
        data.push(this.company['area']);
        return data;
      },
      set(val) {
        let props = ['province', 'city', 'area'];
        for (let i = 0; i < val.length; i++) {
          let prop = props[i];
          this.company[prop] = val[i];
        }
      }
    },
  },
  mounted() {
    this.getCompanyById();
  },
  methods: {
    selectType(val) {
      this.type = val;
    },
    selectLevel(val) {
      this.level = val;
    },
    selectScale(val) {
      this.scale = val;
    },
    brandChange(val) {
      this.company.brand =  JSON.stringify(val);
    },
    getCompanyById() {
      axios.get(`/api/company/getById?id=${this.id}`).then(({code, data}) => {
        if (code === 10000) {
          this.company = data;
        }
      })
    },
    onSubmit() {
     let params =  {...this.company, scaleId: this.scale.id, levelId: this.level.id, typeId: this.type.id};
      axios.post("/api/company/update", params).then(({code}) => {
        if (code === 10000) {
          this.$emit("updateSuccess")
        }
      })
    }
  }
}
</script>