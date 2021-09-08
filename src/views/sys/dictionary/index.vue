<template>
  <div class="dictionary-box">
    <div class="content-box">
      <div class="item-box-bottom">
        <div class="item-box-bottom-car">
          <div class="item-box-bottom-car-left">
            <div class="car-header border">
              <p>字典类型</p>
              <div class="btn">
                <div class="el-icon-document-add" @click="AddPopup=true"></div>
                <div class="el-icon-download" title="导出"></div>
                <div class="el-icon-upload2" title="导入"></div>
              </div>
            </div>
            <!-- <div class="content">
              <el-tree :highlight-current="true" :default-expanded-keys="expandedKeys" node-key="id" ref="tree"
                check-strictly :data="treeData" :props="treeProps" accordion @node-click="handleNodeClick">
                <div class="custom-tree-node" slot-scope="{ node, data }">
                  <div><i style="margin-right: 8px;" class="fa"
                      :class="data.type==0?(data.parentId==0?'fa-sitemap':'fa-bars'):'fa-dot-circle-o'"></i>{{ node.label }}
                  </div>
                </div>
              </el-tree>
            </div> -->
            <div class="list-box">
              <div class="list" :class="{active:activeMenu.id == v.id}" v-for="v of treeData" :key="v.id"
                :title="`${v.name}(${v.dictCode})`" @click="handleNodeClick(v)">
                <p>{{v.name}}({{v.dictCode}})</p>
                <div class="btn-box">
                  <div class="el-icon-edit" @click="AddPopup=v"></div>
                  <div class="el-icon-delete" @click="exportDelete(v.id)"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="item-box-bottom-car-right">
            <div class="car-header">
              <p>字典条目</p>
              <div class="btn">
                <div class="el-icon-document-add" @click="clickAddPopupFind"></div>
                <!-- <div class="el-icon-download"></div> -->
                <!-- <div class="el-icon-delete"></div> -->
              </div>
            </div>
            <div class="table-box">
              <el-table size="mini" stripe height="100%" ref="multipleTable" border="" :data="treeDataFind"
                tooltip-effect="dark" style="width: 100%">
                <el-table-column prop="name" label="名称" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="value" label="值" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column width="130" label="操作">
                  <template slot-scope="scope">
                    <div class="btn-ul" style="display: flex;justify-content: center;">
                      <el-button size="mini" class="mini-btn" @click="AddPopupFind=scope.row">编辑</el-button>
                      <el-button size="mini" class="mini-btn" type="danger" @click="exportDelete(scope.row.id,true)">
                        删除</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="el-fade-in-linear">
      <AddPopup v-if="AddPopup" busName="AddPopup" @close="AddPopup=false" :Data="AddPopup">
      </AddPopup>
      <AddPopupFind v-if="AddPopupFind" busName="AddPopup" @close="AddPopupFind=false" :Data="AddPopupFind">
      </AddPopupFind>
      <Upload></Upload>
    </transition>
  </div>
</template>

<script>
  import {
    getlist,
    del
  } from '@/api/dic'
  import AddPopup from "./components/AddPopup"
  import AddPopupFind from "./components/AddPopupFind"
  import Upload from "./components/Upload"
  export default {
    name: "dictionary",
    data() {
      return {
        tableData: [],
        treeData: [],
        treeDataFind: [],
        AddPopup: false,
        AddPopupFind: false,
        activeMenu: {}
      };
    },
    created() {
      this.getList()
    },
    methods: {
      clickAddPopupFind() {
        if (this.activeMenu.id) {
          this.AddPopupFind = true;
        } else {
          this.$message("请选择类别！");
        }
      },
      handleNodeClick(v) {
        console.log(v)
        this.activeMenu = v;
        this.getList(this.activeMenu.id);
      },
      getList(id) {
        getlist(id || 1).then(_ => {
          console.log(_)
          let {
            data
          } = _;
          if (id) {
            this.treeDataFind = data.list;
          } else {
            this.treeData = data.list;
          }
        })
      },
      exportDelete(id, t) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del(id).then(_ => {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            if (t) {
              this.getList(this.activeMenu.id);
            } else {
              if(id == this.activeMenu.id){
                this.activeMenu = {};
                this.treeDataFind = [];
              }else{
                this.getList();
              }
            }
          }).catch(_ => {
            this.$message.error(_.message);
          })
        }).catch(_ => {})
      }
    },
    components: {
      AddPopup,
      AddPopupFind,
      Upload
    }
  }

</script>
<style lang="scss" scoped>
  .dictionary {
    &-box {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      background: #f0f0f0;

      &>.content-box {
        width: 100%;
        height: 0;
        flex: 1;
        overflow: hidden;
        flex-direction: column;
        display: flex;

        .item-box-bottom {
          width: 100%;
          flex: 1;
          height: 0;

          &-car {
            height: 100%;
            width: 100%;
            display: flex;
            padding: 12px;
            display: flex;

            .car-header {
              height: 42px;
              display: flex;
              width: 100%;
              align-items: center;
              font-size: 15px;
              color: #495057;
              font-weight: bold;
              position: relative;
              padding-left: 12px;
              justify-content: space-between;

              .btn {
                height: 100%;
                display: flex;
                align-items: center;
                border-left: #eee solid 1px;

                &>div {
                  height: 100%;
                  padding: 0 10px;
                  line-height: 44px;
                  color: #585858;
                  cursor: pointer;

                  &:hover {
                    color: #4f80ff;
                  }
                }
              }

              &.border {
                border-bottom: #d8e2ef solid 1px;
              }

              &::after {
                content: "";
                width: 5px;
                height: 16px;
                background: #4f80ff;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto 0;
              }
            }

            &-left {
              width: 300px;
              height: 100%;
              border: 1px solid #ebebed;
              border-radius: 4px;
              display: flex;
              flex-direction: column;
              background: #fff;
              border-radius: 4px;
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

              .list-box {
                height: 0;
                flex: 1;
                width: 100%;
                overflow-y: auto;

                .list {
                  display: flex;
                  justify-content: space-between;

                  &:hover,
                  &.active {
                    background: #f0f0f0;
                    cursor: pointer;
                  }

                  .btn-box {
                    display: flex;
                    align-items: center;
                    font-size: 14px;

                    &>div {
                      padding: 0 5px;
                      cursor: pointer;

                      &.el-icon-delete {
                        color: red;
                      }

                      &:hover {
                        color: #409eff;
                      }
                    }
                  }

                  &>p {
                    font-size: 16px;
                    padding: 12px 10px;
                    margin: 0;
                    width: 0;
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
              }

              .content {
                height: 0;
                flex: 1;
                width: 100%;
                overflow-y: auto;
              }
            }

            &-right {
              width: 0;
              flex: 1;
              height: 100%;
              border: 1px solid #ebebed;
              border-radius: 4px;
              margin-left: 12px;
              display: flex;
              flex-direction: column;

              background: #fff;
              border-radius: 4px;
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);



              .table-box {
                width: 100%;
                height: 0;
                flex: 1;
              }
            }
          }
        }

      }

      &>.header-box {
        height: 42px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
      }
    }
  }

</style>
