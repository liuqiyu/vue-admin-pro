<template>
  <div class="app-container">
    <el-form :model="fromData"
             ref="from">
      <el-table :data="fromData.domains">
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <el-form-item :prop="'domains.'+scope.$index+'.name'"
                          :rules="fromaDataRules.name">
              <el-input v-model="scope.row.name"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="地址">
          <template slot-scope="scope">
            <el-form-item :prop="'domains.'+scope.$index+'.desc'"
                          :rules="fromaDataRules.desc">
              <el-input v-model="scope.row.desc"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-button type="warning"
               @click="submit('from')">submit</el-button>

  </div>
</template>
<script>
export default {
  data () {
    return {
      fromData: {
        domains: undefined
      },
      fromaDataRules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        desc: [{ required: true, message: '请填写', trigger: 'blur' }]
      },
      domains: []
    }
  },
  mounted () {
    this.initDomains()
  },
  methods: {
    initDomains () {
      this.domains = [
        {
          name: '小红',
          desc: '11123'
        },
        {
          name: '小红',
          desc: '11123'
        }
      ]
      this.init()
    },
    init () {
      this.$set(this.fromData, 'domains', this.domains)
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
