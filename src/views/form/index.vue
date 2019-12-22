<<<<<<< HEAD
<!--
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-10-11 11:13:04
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-11-07 14:42:33
 -->
<template>
  <yus-content-page>
    <yus-content-row>
      <yus-content-cell :title="'使用Keep-alive实现缓存'">
        <el-form ref="form"
                 class="yus-table-form"
                 :label-position="labelPosition"
                 :model="form"
                 :rules="rules"
                 label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="活动名称"
                            prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="活动名称"
                            prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="活动名称"
                            prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </yus-content-cell>
    </yus-content-row>
    <yus-action-bar :action="action"></yus-action-bar>
  </yus-content-page>
</template>

<script>
// import { getTest } from '@/api'
export default {
  name: 'asp-form',
  data () {
    return {
      labelPosition: 'right',
      action: [
        {
          label: '返回列表'
        }
      ],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.$refs['form'].resetFields()
    }
  },
  mounted () {
    // getTest()
  }
}
</script>

<style lang="scss" scoped>
=======
<template>
  <div>
    <div class="form-box">
      <el-row>
        <el-col :span="12" style="border-right: 1px solid #e1e1e1">
          <div class="form-wrapper">
            <FormCreate
              :form-create="formCreate"
              :form-list="formList"
              :tool-list="toolList"
            ></FormCreate>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="json-wrapper">
            <textarea
              ref="jsonEditor"
              class="json-editor"
              name="json"
            ></textarea>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import CodeMirror from 'codemirror';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/rubyblue.css';
import 'codemirror/mode/javascript/javascript';
// import 'codemirror/addon/lint/lint';
// import 'codemirror/addon/lint/json-lint';
import FormCreate from './form-create';
// require('script-loader!jsonlint');

export default {
  components: {
    FormCreate
  },
  data () {
    return {
      formCreate: {
        formList: [
          {
            // title: '基本信息',
            // 表单配置
            formFields: [
              // 纯文本
              {
                label: '业务目录：',
                placeholder: '请输入纯文本',
                defaultValue: 12,
                readonly: true,
                columnName: 'catalogName',
                complex: {
                  val: '修改',
                  slot: 'append'
                },
                rules: [
                  {
                    required: true,
                    message: '不可为空',
                    trigger: 'change blur'
                  }
                ],
                func: () => {
                  alert('弹窗');
                }
              },
              {
                label: '业务名称：',
                placeholder: '不超过60个字符',
                columnName: 'cmmdtName',
                maxlength: 60,
                rules: [
                  { required: true, message: '不可为空', trigger: 'blur' },
                  {
                    max: 60,
                    message: '业务名称不超过60个字符',
                    trigger: 'blur'
                  }
                ]
              },
              {
                label: '业务编码：',
                readonly: true,
                placeholder: '系统自动生成',
                columnName: 'cmmdtCode'
              },
              {
                label: '版本号：',
                readonly: true,
                placeholder: '系统自动生成',
                columnName: 'edition'
              },
              {
                label: '业务背景：',
                type: 'textarea',
                placeholder: '不超过600个字符',
                columnName: 'cmmdtBg',
                span: 24,
                maxlength: 600
              },
              {
                label: '业务说明：',
                type: 'textarea',
                placeholder: '不超过600个字符',
                columnName: 'cmmdtDesc',
                span: 24,
                maxlength: 900
              },
              {
                label: '业务卖点：',
                type: 'textarea',
                placeholder: '不超过600个字符',
                columnName: 'salePoint',
                span: 24,
                maxlength: 240
              },
              {
                label: '业务类型：',
                type: 'txt',
                defaultValue: '主套餐',
                columnName: 'vb'
              },
              // 下拉框
              {
                label: '业务属性：',
                type: 'select',
                placeholder: '请选择下拉框',
                columnName: 'pkgType',
                clearable: true, // 下拉框是否可以清空当前值
                rules: [
                  {
                    required: true,
                    message: '不可为空',
                    trigger: 'change blur'
                  }
                ],
                options: [
                  {
                    value: 123,
                    label: 123
                  }
                ]
              },
              // 日期选择器
              {
                label: '生效时间：',
                type: 'daterange',
                placeholder: '请选择日期范围',
                columnName: 'date',
                tips: '业务在生效期内才能进行上下架操作',
                rules: [
                  {
                    required: true,
                    message: '不可为空',
                    trigger: 'change blur'
                  }
                ]
              },
              // 提示框
              {
                type: 'tips',
                tips: '业务在生效期内才能进行上下架操作'
              },
              // checkbox
              // {
              //     label: '赠送功能：',
              //     type: 'checkbox',
              //     placeholder: '请选择下拉框',
              //     columnName: 'dd',
              //     clearable: true, //下拉框是否可以清空当前值
              //     options: [
              //         {
              //             value: '1',
              //             label: '彩铃',
              //         },
              //         {
              //             value: '2',
              //             label: '来电显示',
              //         }
              //     ]
              // },
              {
                label: '依赖服务：',
                type: 'txt',
                span: 24,
                defaultValue:
                  '测试小米，fdaaaaaaa，产品测试无审批222，产品测试无审批333',
                columnName: 'aadd'
              }
            ]
          }
        ],
        toolList: [
          {
            label: '保存',
            icon: 'el-icon-check',
            class: 'solid-with-icon-btn',
            func: () => {
              alert('保存');
            }
          },
          {
            label: '下一步',
            icon: 'el-icon-caret-right',
            class: 'hollow-with-icon-btn',
            func: () => {
              alert('下一步');
            }
          }
        ]
      },
      jsonEditor: null
    };
  },
  mounted () {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.jsonEditor, {
      lineNumbers: true,
      mode: 'application/json',
      gutters: ['CodeMirror-lint-markers'],
      theme: 'rubyblue',
      lint: true
    });

    console.log(JSON.stringify(this.formCreate));
    this.jsonEditor.setValue(JSON.stringify(this.formCreate, null, 2));
    this.jsonEditor.on('change', cm => {
      console.log(cm.getValue());
      this.formCreate = JSON.parse(cm.getValue());
      // this.$emit('changed', cm.getValue());
      // this.$emit('input', cm.getValue());
    });
  },
  methods: {
    handleChange (val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped>
.form-box {
  width: 100%;
  height: 100%;
  background: #fff;
  border: 1px solid #dee8f8;
  .el-row {
    height: 100%;
    .el-col {
      height: 100%;
    }
  }
  .form-wrapper {
    height: 100%;
    padding: 20px;
  }
  .json-wrapper {
    height: 100%;
  }
}

/deep/ .CodeMirror {
  height: 100% !important;
}
>>>>>>> feat: add from create
</style>
