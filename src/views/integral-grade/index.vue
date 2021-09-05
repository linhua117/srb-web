<template>
  <div class="integral-grade-box">
    <div class="card-box">
      <div class="search-box">
        <el-input clearable type="number" :min="0" size="small" placeholder="请输入借款额度"
          v-model.number="search.borrowAmount">
          <template slot="prepend">借款额度</template>
        </el-input>
        <el-button type="primary" size="small" @click="getList" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" size="small" @click="getList" icon="el-icon-plus">新增</el-button>
      </div>
      <div class="table-box">
        <div class="table-content">
          <el-table height="100%" border :data="tableData" stripe style="width: 100%">
            <el-table-column prop="createTime" width="180" label="创建时间" align="center">
            </el-table-column>
            <el-table-column prop="integralStart" label="积分区间" align="center">
              <template slot-scope="scope">
                {{scope.row.integralStart}}-{{scope.row.integralEnd}}
              </template>
            </el-table-column>
            <el-table-column prop="borrowAmount" width="120" label="借款额度"></el-table-column>
            <el-table-column prop="address" label="操作" width="180">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" :data="scope" class="mini-btn"
                  @click="LogPopup = scope.row.logId">修改</el-button>
                <el-button type="danger" size="mini" class="mini-btn" @click="exportDelete(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="footer-box">
        <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo"
          :page-sizes="pageSize" :page-size="activeSize" :total="total" background
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getList
  } from '@/api/integral-grade'
  export default {
    name: "integral-grade",
    data() {
      return {
        tableData: [],
        activeSize: 100,
        pageSize: [100, 200, 300, 400],
        total: null,
        pageNo: 1,
        search: {
          borrowAmount: ""
        }
      };
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        getList({
          current: this.pageNo,
          size: this.activeSize,
          borrowAmount: this.search.borrowAmount
        }).then(_ => {
          console.log(_)
          let {
            data
          } = _;
          this.total = data.total;
          this.tableData = data.list;
        })
      },
      handleCurrentChange(val) {
        this.pageNo = val;
        this.getList();
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageNo = 1;
        this.activeSize = val;
        this.getList();
      }
    }
  }

</script>
<style lang="scss" scoped>
  .integral-grade {
    &-box {
      width: 100%;
      height: 100%;
      background: #f0f0f0;
      padding: 15px;

      .card-box {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        border: 1px solid #EBEEF5;
        background-color: #FFF;
        color: #303133;
        transition: .3s;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

        .table-box {
          flex: 1;
          height: 0;
          width: 100%;

          .table-content {
            width: 100%;
            height: 100%;
            padding: 0 12px;
          }
        }

        .footer-box {
          padding: 12px;
          display: flex;
          justify-content: center;
        }

        .search-box {
          padding: 12px;
          display: flex;

          &>*+* {
            margin-left: 12px;
          }
        }
      }
    }
  }

</style>
