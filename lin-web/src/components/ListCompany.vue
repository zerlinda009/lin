<template>
  <div>
    <div style="margin: 0px 7px 10px 7px;padding: 10px 0 0 0">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="request"></el-button>
      </el-input>
      <div style="padding: 10px" @click="dialogVisible = true">
        <LinAddButton/>
      </div>
    </div>
    <div style=" height: calc(100vh - 120px);overflow-y: auto;">
      <ol>
        <li v-for="(value) in listData" :key="value.id">
          <div class="li-content">
            <div style="display: inline-block" @click="selectItem(value)">
              <LinInfoButton :text="value.name"/>
            </div>
          </div>
        </li>
      </ol>
    </div>
    <el-dialog
        :show-close="false"
        :center="false"
        width="0"
        :visible.sync="dialogVisible">
      <OneInputForm @submit="add" ref="OneInputForm"/>
    </el-dialog>
  </div>
</template>
<script>
import axios from "@/config/axiosConfig";
import stringUtil from "@/util/stringUtil";
import LinInfoButton from "@/components/common/LinInfoButton.vue";
import LinAddButton from "@/components/common/LinAddbutton.vue";
import OneInputForm from "@/components/common/OneImputForm.vue";


export default {
  name: "ListCompany.vue",
  components: {LinInfoButton, LinAddButton, OneInputForm},
  props: {
    refreshFlag: {
      type: Date
    }
  },
  data() {
    return {
      dialogVisible: false,

      selectedItem: {},
      input: '',
      company: []
    }
  },
  watch: {
    refreshFlag() {
      this.request();
    }
  },
  computed: {
    listData() {
      if (!stringUtil.hasText(this.input)) return this.company;
      let data = [];
      this.company.forEach(s => {
        if (s.name.includes(this.input)) {
          data.push(s);
        }
      })
      return data;
    }
  },
  methods: {
    add(name) {
      if (stringUtil.hasText(name)) {
        axios.put(`/api/company/add`, {name: name}).then(({code, message}) => {
          if (code == 10000) {
            this.dialogVisible = false;
            this.$message({
              message: message,
              type: 'success'
            });
            this.request()
          }
        })
      } else {
        this.$message.error("请输入企业名");
      }
    },

    selectItem(item) {
      this.$emit("selectCompany", item);
    },
    request() {
      axios.get(`/api/company/list?name=${this.input}`).then(({data}) => {
        this.company = data
      })
    }
  },
  mounted() {
    this.request();
  }
}
</script>
<style scoped>
ol {
  list-style-position: inside;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  margin: 1px 7px 1px 7px;
}

.li-content {


}

.box-card {
  width: 100%;
}

.active {

}

.selected {
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  display: inline-block;
}


</style>