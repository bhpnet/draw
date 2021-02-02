<template>
  <div class="vault" style="margin: 20px;">
      <el-row :gutter="24">
        <el-col :span="12" style="margin:10px auto auto;" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
          <el-card>
            <div slot="header" class="clearfix">
              <span>抽奖规则</span>
            </div>
            <el-form  label-width="110px" >
              <el-form-item label="Remix">
                <el-link href="http://remix.ethereum.org/" target="_blank">http://remix.ethereum.org/</el-link>
              </el-form-item>
              <el-form-item label="开发文档">
                <el-link href="https://docs.bhpnet.io/" target="_blank">https://docs.bhpnet.io/</el-link>
              </el-form-item>
              <el-form-item label="区块浏览器">
                <el-link href="https://testnet.bhpnet.io/" target="_blank">https://testnet.bhpnet.io/</el-link>
              </el-form-item>
              <el-form-item label="代码仓库">
                <el-link href="https://github.com/bhpnet/bhp-system-contracts" target="_blank">https://github.com/bhpnet/bhp-system-contracts</el-link>
              </el-form-item>
              <el-form-item label="抽奖合约地址">
                <el-link href="https://testnet.bhpnet.io/address/0xEf40a847Aa593F47DCEDfD797440ea107Aea47AD/write-contract" target="_blank">0xEf40a847Aa593F47DCEDfD797440ea107Aea47AD</el-link>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <!--   1.开始抽奖 -->
        <el-col :span="12" style="margin:10px auto auto;" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>1、开始抽奖</span>
            </div>
            <el-form :model="proposal" label-position="left" label-width="80px">
              <el-form-item>
                <el-button type="primary" @click="luckyDraw()">开始抽奖</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <!--   2、获取本人获奖信息 -->
        <el-col :span="12" style="margin:10px auto auto;" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
          <el-card>
            <div slot="header" class="clearfix">
              <span>2、获取本人获奖信息</span>
            </div>
            <el-form :model="stake" label-width="110px" >
              <el-form-item label="参与地址">
                <el-input v-model="address" placeholder="参与地址"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="prizes()">提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <!--   3.获取参与人数 -->
        <el-col :span="12" style="margin:10px auto auto;" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
          <el-card>
            <div slot="header" class="clearfix">
              <span>3、获取参与人数</span>
            </div>
            <el-form  label-width="110px" >
              <el-form-item>
                <el-button type="primary" @click="getAddress()">获取</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
      <!--   列表信息 -->
      <el-dialog
          :title="title"
          :visible.sync="dialogTableVisible"
          :width="dialogWidth"
      >
        <el-table :data="tableData">
          <el-table-column
              label="序号"
              type="index"
              align="center"
              width="50">
          </el-table-column>
          <el-table-column
              prop="address"
              align="center"
              label="地址"
              >
          </el-table-column>
        </el-table>
      </el-dialog>
      <!--    查看返回结果-->
      <el-dialog
          :title="title"
          :visible.sync="dialogResultVisible"
          :before-close="handleClose"
          :width="dialogWidth"
      >
          <span>{{ info }}</span>
          <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogResultVisible = false">关闭</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {
  luckyDraw,
  prizes,
  getAddress
} from "@/web3/draw";
import {bhp} from "@/configure/conf";
import BigNumber from "bignumber.js";
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogResultVisible: false,
      title:'',
      address:'',
      userAddress:'',
      info:'',
      tableData:[],
      dialogWidth: 0,
      dialogFormVisible: false,
      formInline: {
        user: '',
        region: ''
      },
      getValidatorInfoResult:[]
    };
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  filters:{
    toBHP:(amount)=>{
        let balance = new BigNumber(amount)
        return balance.div("1000000000000000000").toPrecision(18)
    },
    formatTime:(time)=>{
      return new Date(parseInt(time) * 1000).toLocaleString();
    }
  },
  created() {
    if (this.$store.state.wallet.connected) {
    }
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.setDialogWidth()
      })()
    }
  },
  methods: {
    handleClose() {
      this.dialogTableVisible= false
      this.dialogResultVisible=false
    },
    getErrorInfo(result){
      this.title="错误提示"
      this.info=result
      this.dialogResultVisible = true
    },
    verifyConnect(){
      let wallet = this.$store.state.wallet;
      if (!wallet.connected) {
        alert("请先连接钱包");
        return
      }
    },
    setDialogWidth() {
      console.log(document.body.clientWidth)
      let val = document.body.clientWidth;
      const def = 800 // 默认宽度
      if (val < def) {
        this.dialogWidth = '90%'
      } else {
        this.dialogWidth = def + 'px'
      }
    },
    luckyDraw(){
      this.verifyConnect()
      // 查看是否授权
      this.$parent.loading = true;
      this.$parent.flag1 = true;
      this.$parent.flag2 = false;
      this.$parent.flag3 = false;
      luckyDraw(
          this.$store.state.wallet,
          data => {
            console.log(data);
            this.$parent.url = bhp + data.message;
            this.$parent.flag2 = true;
            this.$parent.flag1 = false;
            this.$parent.flag3 = false;
          }
      ).then(res => {
        this.$parent.loading = false;
        //提案ID
        let result=res.events;
        this.voteProposalInfo.id=result
        this.title="提案成功"
        this.info=result
        this.dialogResultVisible = true
      }).catch(err=>{
        this.$parent.loading = false;
        this.getErrorInfo(err)
      })
    },
    prizes(){
      this.verifyConnect()

      // 查看是否授权
      this.$parent.flag1 = true;
      this.$parent.flag2 = false;
      this.$parent.flag3 = false;

      prizes(
          this.$store.state.wallet,
          this.address,
          data => {
            console.log(data);
            this.$parent.url = bhp + data.message;
            this.$parent.flag2 = true;
            this.$parent.flag1 = false;
            this.$parent.flag3 = false;
          }
      ).then(res => {
        console.log(JSON.stringify(res))
        let result=res;
        this.title="中奖信息"
        this.info="中奖信息："+result+"等奖"
        this.dialogResultVisible = true
      }).catch(err=>{
        this.getErrorInfo(err)
      })
    },
    getAddress(){
      this.verifyConnect()
      // 查看是否授权
      this.$parent.flag1 = true;
      this.$parent.flag2 = false;
      this.$parent.flag3 = false;
      getAddress(
          this.$store.state.wallet,
          data => {
            this.$parent.url = bhp + data.message;
            this.$parent.flag2 = true;
            this.$parent.flag1 = false;
            this.$parent.flag3 = false;
          }
      ).then(res => {
        this.tableData=[]
        res.forEach(address => {
          let data={
            address:address
          }
          console.log(address)
          this.tableData.push(data)
        })
        this.title="参与人数"
        this.dialogTableVisible=true

      }).catch(err=>{
        this.$parent.loading = false;
        this.getErrorInfo(err)
      })
    },
  },
};
</script>

<style lang="less">

</style>