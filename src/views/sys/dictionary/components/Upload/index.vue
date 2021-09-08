<template>
  <PopupBox @close="$emit('close')" Title="导入" Width="80vh">
    <div class="GroupPopup" slot="content">
      <el-form label-width="120px" class="form-box">
        <el-form-item  label="请选择Excel文件">
          <el-upload :auto-upload="false" ref="upload" :multiple="false" :limit="1" :on-exceed="fileUploadExceed"
            :on-success="fileUploadSuccess" :on-error="fileUploadError" :action="BASE_API + '/admin/sys/dic/import'"
            name="file"
            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer" slot="footer">
      <el-button @click="$refs.upload.submit()" size="small" type="primary">确定</el-button>
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
    name: "upload",
    props: ["Data"],
    data() {
      return {
        fileList: [],
        BASE_API: process.env.VUE_APP_BASE_API,
        ruleForm: {
          files: ""
        }
      }
    },
    created() {},
    methods: {
      // 上传多于一个文件时
      fileUploadExceed() {
        this.$message.warning('只能选取一个文件')
      },

      //上传成功回调
      fileUploadSuccess(response) {
        if (response.code === 0) {
          this.$message.success('数据导入成功')
          this.$emit('close');
          this.$parent.getList();
          if(this.$parent.activeMenu.id) this.$parent.getList(this.$parent.activeMenu.id);
        } else {
          this.$message.error(response.message)
        }
      },

      //上传失败回调
      fileUploadError(error) {
        this.$message.error('数据导入失败')
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
