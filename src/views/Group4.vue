<template>
  <el-table
    :data="tableData.filter(data => !search || data.domain.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="Ip"
      prop="ip">
    </el-table-column>
    <el-table-column
      label="Domain"
      prop="domain">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="{}">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入域名关键字搜索"/>
        <div>******************************************</div>
          <el-button type="primary" @click="open"><i class="el-icon-grape"></i> 点击添加域名</el-button>
          <el-button type="primary" @click="dialogTableVisible = true"><i class="el-icon-pear"></i>点击批量添加或修改域名</el-button>
        <!-- 添加域名弹框 -->
          <el-dialog
            title="批量添加或修改域名"
            @close="addDialogClose"
            :visible.sync="dialogTableVisible"
            :close-on-click-modal="false"
            center="center">
            <!-- 添加域名的表单 -->
      <el-form ref="addFormRef" :rules="rulesAddDomain" :model="batchAddDomain" label-width="100px">
        <el-form-item prop="batchIpDomain" label="IP和域名">
          <el-input
              v-model="batchAddDomain.batchIpDomain"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 20}">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogTableVisible = false">取消</el-button>
          <el-button type="primary" @click="onAddDomain">确定</el-button>
        </el-form-item>
      </el-form>
       </el-dialog>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-ice-drink"></i> Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-goblet-square-full"></i> Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios"
  export default {

    data() {
      return {
        dialogTableVisible: false, // 添加域名弹框
      // 弹框form表单-批量添加修改域名
      batchAddDomain: {
        batchIpDomain: ''
      },
      // 弹框form表单-验证规则
      rulesAddDomain: {
        batchIpDomain: [
          { required: true, message: '请输入IP和域名', trigger: 'blur' }
        ],
      },
        tableData: [],
        search: '',
      }
    },
	mounted() {
            this.clickHander();
    },
    methods: {
        // 初始化 获取所有解析数据的函数
        clickHander() {
            axios.get('http://192.168.14.57:30000/')
            .then((data)=>{ // 正确的回调
                this.msg = data.data['all_domain'];
                this.tableData = JSON.parse(this.msg);
            })
            .catch((error)=>{ // 错误的回调
                console.log(error)
            });
            },

        // 添加或修改解析时调用的的函数
       addHander(seqipDomain) {
            axios.post('http://192.168.14.57:30000/add',{'ipdomain': seqipDomain['ipDomain']})
            .then((data)=>{ // 正确的回调
                this.timer = setTimeout(()=>{   //设置延迟执行刷新窗口
                    location.reload();
                },1000);
                this.reqs = data.data['req'];
            })
            .catch((error)=>{ // 错误的回调
                console.log(error);
                alert(error + '已提交成功，但后台执行时遇到了一点问题！');
            });
            },

        // 删除解析时调用的的函数
       delHander(seqipDomain) {
            console.log(seqipDomain['ipDomain'],'seqipDomain')
            axios.post('http://192.168.14.57:30000/delete',{'ipdomain': seqipDomain['ipDomain']})
            .then((data)=>{ // 正确的回调
                this.timer = setTimeout(()=>{   //设置延迟执行刷新窗口
                    location.reload();
                },1000);
                this.reqs = data.data['req'];
                // alert(this.reqs);
            })
            .catch((error)=>{ // 错误的回调
                console.log(error);
                alert(error + '已提交成功，但后台执行时遇到了一点问题！');
            });
            },

        // 按钮
        // 点击添加单个域名解析按钮时调用的函数
       open() {
        this.$prompt('请输入新IP和域名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^((([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5]))))\.)((([0-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5]))))\.){2}(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5]))))([ ])(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9-]*[A-Za-z0-9])$/,
          inputErrorMessage: 'IP和域名格式不正确',
          roundButton: true,
          closeOnClickModal: false
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '提交的IP和域名是: ' + value,
          });
          this.$options.methods.addHander({  // 调用addHander方法添加域名映射
              ipDomain: value
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },

        // 点击修改单个域名解析按钮时调用的函数
	  handleEdit(index, row) {
         this.$prompt('请输入IP', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^((([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5]))))\.)((([0-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5]))))\.){2}(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5]))))$/,
          inputErrorMessage: 'IP格式不正确',
          roundButton: true,
          inputValue: row['ip']
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '已提交' + row['domain'] + '解析的新IP: ' + value,
          });
          this.$options.methods.addHander({  // 调用addHander方法修改域名映射
              ipDomain: value + ' ' + row['domain']
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },

        // 点击删除单个域名解析按钮时调用的函数
      handleDelete(index, row) {
         this.$confirm('此操作将永久删除该解析, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$options.methods.delHander({  // 调用delHander方法删除域名映射
              ipDomain: row['ip'] + ' ' + row['domain']
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

    // 弹框form表单-关闭弹框的回调
    addDialogClose() {
      this.$refs.addFormRef.resetFields() // 清空表单
    },
    // 弹框form表单-点击添加域名
    onAddDomain() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return null  // 如果验证失败就不往下继续执行
        this.addHander({  // 调用addHander方法添加域名映射
              ipDomain: this.batchAddDomain.batchIpDomain
          })
        this.$message.success('添加成功')
        this.dialogTableVisible = false  // 关闭弹框
        this.$refs.addFormRef.resetFields() // 清空表单
      })
    },

    },
  }
</script>