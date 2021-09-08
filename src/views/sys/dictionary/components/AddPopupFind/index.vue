<template>
  <PopupBox @close="$emit('close')" :Title="this.Data != true?'编辑':'添加'" Width="80vh">
    <div class="GroupPopup" slot="content">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="form-box">
        <el-form-item label="字典类别" prop="name">
          <el-input disabled :maxlength="100" size="small" placeholder="请输入字典名称"  v-model="this.$parent.activeMenu.name"></el-input>
        </el-form-item>
        <el-form-item label="条目名称" prop="name"
          :rules="[{required: true,message:'请输入字典名称',trigger:'blur'}]">
          <el-input :maxlength="100" size="small" placeholder="请输入字典名称"
            v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="值" prop="value"
          :rules="[{required: true,message:'请输入字典编码',trigger:'blur'}]">
          <el-input :maxlength="100" size="small" type="number" placeholder="请输入字典编码"
            v-model.number="ruleForm.value"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer" slot="footer">
      <el-button @click="submitForm('ruleForm')" size="small" type="primary">确定</el-button>
      <el-button size="small" @click="$emit('close')" type="info">取消</el-button>
    </div>
  </PopupBox>
</template>

<script>
  import {
    add,
    update
  } from '@/api/dic'
  import PopupBox from "@/components/PopupBox"
  export default {
    name: "AddPopupFind",
    props: ["Data"],
    data() {
      return {
        ruleForm: {
          parentId: this.$parent.activeMenu.id,
          name: "",
          value: ""
        }
      }
    },
    created() {
      if (this.Data != true) {
				this.ruleForm = JSON.parse(JSON.stringify(this.Data))
			}
    },
    methods: {
      validateNumber(rule, value, callback) {
        console.log(rule, value)
        if (value >= 0) {
          if (rule.field == "integralEnd") {
            if (this.ruleForm.integralEnd < this.ruleForm.integralStart) {
              callback(new Error('请输入积分区间结束必须大于积分区间开始！'));
            } else {
              callback();
            }
          } else {
            callback();
          }
        } else {
          callback(new Error('必须为正整数'));
        }

      },
      submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if (this.Data != true) {
							update(this.ruleForm).then(_ => {
								this.$message({
									message: "修改成功！",
									type: "success"
								});
								//this.Bus.$emit(this.busName);
                this.$parent.getList(this.ruleForm.parentId);
                this.$emit('close');
							}).catch(_ => {
								this.$message.error(_.message);
							});
						} else {
							add(this.ruleForm).then(_ => {
								this.$message({
									message: "添加成功！",
									type: "success"
								});
                this.$parent.getList(this.ruleForm.parentId);
								this.$emit('close');
							}).catch(_ => {
								this.$message.error(_.message);
							});
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
    },
    components: {
      PopupBox
    }
  }

</script>
<style lang="scss" scoped>
  .footer {
    height: 50px;
    border-top: 1px solid #efefef;
    background: #fbfbfb;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .GroupPopup {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .input-box {
      display: flex;
      align-items: center;

      .el-tooltip {
        height: 100%;
        padding: 0 12px;
        cursor: pointer;
        font-size: 18px;
        color: #4f80ff;
      }
    }
  }

</style>
