<!--
 * @Descripttion:
 * @Author: liuqiyu
 * @Date: 2019-11-05 09:24:56
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-11-05 18:04:20
 -->
<template>
  <smart-content-page>
    <el-tabs class="clipboard"
             v-model="activeName">
      <el-tab-pane label="单击复制"
                   name="click">
        <el-input placeholder="请单击复制"
                  v-model="input">
          <el-button slot="append"
                     v-click-copy="'单击复制的内容'">单击复制</el-button>
        </el-input>
      </el-tab-pane>
      <el-tab-pane label="双击复制"
                   name="dblclick">
        <el-input placeholder="请双击复制"
                  v-model="input2">
          <el-button slot="append"
                     v-dblclick-copy="'双击复制的内容'">双击复制</el-button>
        </el-input>
      </el-tab-pane>
    </el-tabs>
  </smart-content-page>
</template>

<script>
export default {
  name: 'clipboard',
  data () {
    return {
      activeName: 'click',
      input: '请单击复制',
      input2: '请双击复制'
    }
  },
  mounted () {
    function $ (element) {
      return new Base(element)
    }

    function Base (element) {
      this.taskList = []

      this.init = function (func) {

      }
      this.firstSleep = function (time) {
        var task = function () {
          return setTimeout(() => {
            console.log('第一休息' + time + '秒')
          }, time * 1000)
        }

        this.taskList.push(task)
        console.log('firstSleep')
        return this
      }

      this.sleep = function (time) {
        var task = function () {
          return setTimeout(() => {
            console.log('第一休息' + time + '秒')
          }, time * 1000)
        }
        this.taskList.push(task)
        console.log('sleep')
        return this
      }

      this.say = function (name) {
        var task = function () {
          return console.log('say' + name)
        }
        this.taskList.push(task)
        console.log('say')
        return this
      }

      this.eat = function (name) {
        var task = function () {
          return console.log('eat' + name)
        }
        this.taskList.push(task)
        console.log('eat')
        return this
      }
    }

    $(123).sleep(5).say('张三').firstSleep(5).eat('排骨')
  }
}
</script>

<style lang="scss" scoped>
.clipboard {
  ::v-deep .el-input {
    width: 300px;
  }
}
</style>
