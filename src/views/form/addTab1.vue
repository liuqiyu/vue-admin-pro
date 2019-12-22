/** * Created by aspire on 2019/09/23 * 业务说明-新增 */

<template>
  <div class="pcc">
    <innerProgressBar :bar-params="barParams" :step="step"></innerProgressBar>
    <div class="background-css">
      <el-form
        ref="commonForm"
        :model="commonForm"
        :rules="rules"
        :inline="true"
      >
        <el-collapse v-model="activeName">
          <el-collapse-item name="1">
            <span slot="title"> <i class="el-icon-tickets"></i>基本信息 </span>
            <el-row>
              <el-col :span="12">
                <el-form-item label="业务目录：" prop="catalogName">
                  <el-input v-model="commonForm.catalogName" readonly>
                    <el-button
                      slot="append"
                      type="primary"
                      size="mini"
                      @click="choiceCatalog"
                      >修改</el-button
                    >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="业务名称：" prop="cmmdtName">
                  <el-input
                    v-model="commonForm.cmmdtName"
                    placeholder="不超过60个字符"
                    maxlength="60"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="业务编码：" prop="cmmdtCode">
                  <el-input
                    v-model="commonForm.cmmdtCode"
                    placeholder="系统自动生成"
                    readonly
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="版本号：" prop="edition">
                  <el-input
                    v-model="commonForm.edition"
                    placeholder="系统自动生成"
                    readonly
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="业务背景：" prop="cmmdtBg">
                  <el-input
                    v-model="commonForm.cmmdtBg"
                    rows="3"
                    type="textarea"
                    placeholder="不超过600个字符"
                    maxlength="600"
                    show-word-limit
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="业务说明：" prop="cmmdtDesc">
                  <el-input
                    v-model="commonForm.cmmdtDesc"
                    rows="3"
                    type="textarea"
                    placeholder="不超过900个字符"
                    maxlength="900"
                    show-word-limit
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="业务卖点：" prop="salePoint">
                  <el-input
                    v-model="commonForm.salePoint"
                    rows="3"
                    type="textarea"
                    placeholder="不超过240个字符"
                    maxlength="240"
                    show-word-limit
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="业务类型：" prop="modelTypeName">
                  <contrastSpan :after="showName"></contrastSpan>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="业务属性：" prop="pkgType">
                  <el-select v-model="commonForm.pkgType">
                    <el-option label="--请选择--" value=""></el-option>
                    <el-option
                      v-for="item in pkgTypeList"
                      :key="item.codeKey"
                      :value="item.codeKey"
                      :label="item.codeValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="dateList" label="生效时间：">
                  <el-date-picker
                    :picker-options="pickerOptions1"
                    v-model="commonForm.efftTime"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    style="width: 46%"
                    placeholder="生效日期"
                  >
                  </el-date-picker>
                  <span>至</span>
                  <el-date-picker
                    :picker-options="pickerOptions"
                    v-model="commonForm.invalidTime"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    style="width: 47%"
                    placeholder="失效日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col
                :span="10"
                style="color: #999999;padding-left:10px; padding-top:8px"
                >业务在生效期内才能进行上下架操作</el-col
              >
            </el-row>
            <el-row v-if="mainServer">
              <el-col :span="24">
                <el-form-item label="赠送功能：" prop="giftFunc">
                  <el-checkbox-group v-model="commonForm.giftFunc">
                    <el-checkbox
                      v-for="item in giftFuncList"
                      :key="item.codeKey"
                      :value="item.codeKey"
                      :label="item.codeKey"
                      >{{ item.codeValue }}</el-checkbox
                    >
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="依赖服务：" prop="services">
                  <contrastSpan :after="commonForm.services"></contrastSpan>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-form>
      <div class="center_button">
        <el-button
          :loading="saveLoading"
          class="solid-with-icon-btn"
          icon="el-icon-check"
          @click="save('commonForm')"
          >保存</el-button
        >
        <el-button
          :loading="nextLoading"
          class="hollow-with-icon-btn"
          icon="el-icon-caret-right"
          @click="nextToRule('commonForm')"
          >下一步</el-button
        >
      </div>
      <FormCreate :form-list="formList" :tool-list="toolList"></FormCreate>
    </div>
    <!--修改业务目录-->
    <catalog-tree
      :dialog-param="catalogParam"
      @click-catalog="clickCatalog"
    ></catalog-tree>
  </div>
</template>
<script>
import catalogTree from '../../../components/add/tab1/catalogTree';
import innerProgressBar from '../../../../common/innerProgressBar';
import FormCreate from './form-create';

export default {
  components: {
    catalogTree,
    innerProgressBar,
    FormCreate
  },
  props: {
    showName: {
      type: String,
      default: ''
    },
    routerPath: {
      type: String,
      default: ''
    },
    mainServer: {
      type: Boolean,
      default: false
    },
    modelType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      formList: [
        {
          title: '基本信息',
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
                { required: true, message: '不可为空', trigger: 'change blur' }
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
                { max: 60, message: '业务名称不超过60个字符', trigger: 'blur' }
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
                { required: true, message: '不可为空', trigger: 'change blur' }
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
                { required: true, message: '不可为空', trigger: 'change blur' }
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
      ],
      activeName: ['1'],
      pickerOptions1: {
        disabledDate (time) {
          let t = Date.now() - 3600 * 1000 * 24;
          return time.getTime() < t;
        },
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date());
            }
          }
        ]
      },
      pickerOptions: {
        disabledDate (time) {
          let t = Date.now() - 3600 * 1000 * 24;
          return time.getTime() < t;
        }
      },
      commonForm: {
        catalogId: '',
        catalogName: '',
        cmmdtName: '',
        cmmdtBg: '',
        cmmdtDesc: '',
        salePoint: '',
        pkgType: '',
        giftFunc: [],
        efftTime: '',
        invalidTime: ''
      },
      cmmdtId: '',
      catalogId: this.$route.query.catalogId,
      pkgTypeList: [], // 业务属性列表
      giftFuncList: [], // 赠送功能列表
      catalogParam: {
        catalogTitle: '',
        modelVisible: false
      },
      formParams: {}, // 提交参数
      saveLoading: false,
      nextLoading: false,
      rules: {
        catalogName: [
          { required: true, message: '不可为空', trigger: 'change' }
        ],
        cmmdtName: [
          { required: true, message: '不可为空', trigger: 'blur' },
          { max: 60, message: '业务名称不超过60个字符', trigger: 'blur' }
        ],
        cmmdtBg: [
          { max: 600, message: '业务背景不超过600个字符', trigger: 'blur' }
        ],
        cmmdtDesc: [
          { max: 900, message: '业务说明不超过900个字符', trigger: 'blur' }
        ],
        salePoint: [
          { max: 240, message: '业务卖点不超过240个字符', trigger: 'blur' }
        ],
        pkgType: [{ required: true, message: '不可为空', trigger: 'change' }],
        dateList: [
          { required: true, validator: this.checkDate, trigger: 'blur' }
        ]
        // giftFunc: [{ required: true, message: '至少选择一个'}]
      },
      barParams: {
        currStep: 1,
        modelType: '',
        operation: 'Add'
      },
      step: 0
    };
  },
  computed: {},
  watch: {},
  created () {
    this.init();
    this.getDictData();
  },
  methods: {
    // 表单参数
    getParams () {
      this.formParams = {
        modelType: this.modelType,
        catalogId: this.catalogId,
        cmmdtName: this.commonForm.cmmdtName,
        cmmdtDesc: this.commonForm.cmmdtDesc,
        cmmdtBg: this.commonForm.cmmdtBg,
        salePoint: this.commonForm.salePoint,
        efftTime: this.commonForm.efftTime,
        invalidTime: this.commonForm.invalidTime,
        pkgType: this.commonForm.pkgType
      };
      if (this.mainServer) {
        this.formParams.giftFunc = this.commonForm.giftFunc;
      }
      if (this.cmmdtId) {
        this.formParams.cmmdtId = this.cmmdtId;
      } else {
        this.formParams.cmmdtId = '';
      }
      return this.formParams;
    },
    // 保存
    save (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          this.$post(
            this.$globalConf.pccPathPrefix + '/cmmdtAdd/addCmmdtMain.ajax',
            this.getParams()
          ).then(res => {
            this.saveLoading = false;
            if (this.$reponseStatus(res)) {
              this.$message.success('保存成功！');
              this.cmmdtId = res.data;
              this.findCmmdtMain(res.data);
            }
          });
        }
      });
    },
    // 下一步
    nextToRule (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.nextLoading = true;
          this.$post(
            this.$globalConf.pccPathPrefix + '/cmmdtAdd/addCmmdtMain.ajax',
            this.getParams()
          ).then(res => {
            this.nextLoading = false;
            if (this.$reponseStatus(res)) {
              this.$router.push({
                path: this.routerPath,
                query: {
                  cmmdtId: res.data,
                  modelType: this.modelType,
                  catalogId: this.catalogId
                }
              });
            }
          });
        }
      });
    },
    // 初始化数据
    init () {
      this.cmmdtId = this.$route.query.cmmdtId;
      if (this.cmmdtId) {
        this.findCmmdtMain(this.cmmdtId);
      } else {
        this.initAddCmmdtMain();
      }
    },
    // 查询业务说明初始化(第1个页签)
    initAddCmmdtMain () {
      let param = {
        modelType: this.modelType,
        catalogId: this.catalogId
      };
      this.$post(
        this.$globalConf.pccPathPrefix + '/cmmdtAdd/iniAddCmmdtMain.ajax',
        param
      ).then(res => {
        if (this.$reponseStatus(res)) {
          res.data.efftTime = this.$dateUtil.formatTimeDd('', '', Date.now());
          res.data.invalidTime = this.$dateUtil.formatTimeDd(
            null,
            null,
            res.data.invalidTime
          );
          this.commonForm = res.data;
        }
      });
    },
    // 业务说明（step1）新增或模板配置详情接口
    findCmmdtMain (cmmdtId) {
      let param = { cmmdtId: cmmdtId };
      this.$post(
        this.$globalConf.pccPathPrefix + '/cmmdtAdd/findCmmdtMain.ajax',
        param
      ).then(res => {
        if (this.$reponseStatus(res)) {
          this.$nextTick(() => {
            this.step = parseInt(res.data.step);
            this.barParams.modelType = this.modelType;
          });
          res.data.efftTime = this.$dateUtil.formatTimeDd(
            null,
            null,
            res.data.efftTime
          );
          res.data.invalidTime = this.$dateUtil.formatTimeDd(
            null,
            null,
            res.data.invalidTime
          );
          this.commonForm = res.data;
        }
      });
    },
    // 修改业务目录
    choiceCatalog () {
      this.catalogParam = {
        modelVisible: true,
        catalogTitle: '选择业务目录'
      };
    },
    // 确定业务目录
    clickCatalog (catalogId, catalogName) {
      this.formParams.catalogId = catalogId;
      this.commonForm.catalogId = catalogId;
      this.commonForm.catalogName = catalogName;
      this.catalogParam.modelVisible = false;
    },
    // 获取字典表数据
    getDictData () {
      let codeValue = this.$commodityUtil.dictListByType(
        'CMMDT_PKGTYPE',
        this.modelType
      );
      this.$fetch(
        this.$globalConf.pccPathPrefix +
          '/codeDict/getDictListByType.ajax?codeType=' +
          codeValue
      ).then(res => {
        if (this.$reponseStatus(res)) {
          this.pkgTypeList = res.data;
        }
      });
      if (this.mainServer) {
        this.$fetch(
          this.$globalConf.pccPathPrefix +
            '/codeDict/getDictListByType.ajax?codeType=GIFT_FUNC'
        ).then(res => {
          if (this.$reponseStatus(res)) {
            this.giftFuncList = res.data;
          }
        });
      }
    },
    // 生效时间验证
    checkDate (rule, value, callback) {
      value = this.commonForm.efftTime;
      if (value === '') {
        callback(new Error('生效日期不可为空'));
      } else if (
        !this.$dateUtil.compareTime(value, '<=', this.commonForm.invalidTime)
      ) {
        callback(new Error('失效日期必须大于生效日期!'));
      } else {
        callback();
      }
    }
  }
};
</script>
