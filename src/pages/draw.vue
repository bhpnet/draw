<template>
  <div class="vault" style="margin: 20px;">
      <el-row :gutter="24">
        <!--   1.创建提案 -->
        <el-col :span="12" style="margin:10px auto auto;" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>1、创建提案</span>
            </div>
            <el-form :model="proposal" label-position="left" label-width="80px">
              <el-form-item label="提案地址">
                <el-input v-model="proposal.dst" placeholder="提案地址"></el-input>
              </el-form-item>
              <el-form-item label="提案描述">
                <el-input v-model="proposal.details" placeholder="提案描述"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="createProposal()">提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <!--   2.对提案进行投票 -->
        <el-col :span="12" style="margin:10px auto auto;" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>2、对提案进行投票</span>
            </div>
            <el-form :model="voteProposalInfo" label-width="80px" >
              <el-form-item label="提案ID">
                <el-input v-model="voteProposalInfo.id" placeholder="提案地址"></el-input>
              </el-form-item>
              <el-form-item label="是否通过">
                <el-select v-model="voteProposalInfo.auth" placeholder="是否通过" style="width: 100%">
                  <el-option label="同意" :value="true"></el-option>
                  <el-option label="否决" :value="false"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="voteProposal()">提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <!--   3.查看提案情况 -->
        <el-col :span="12" style="margin:10px auto auto;" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
          <el-card>
            <div slot="header" class="clearfix">
              <span>3、查看提案相关信息</span>
            </div>
            <el-form  label-width="110px" >
              <el-form-item label="提案ID">
                <el-input v-model="voteProposalInfo.id" placeholder="提案ID"></el-input>
              </el-form-item>
              <el-form-item label="" style="height: 40px" >
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="proposals()">提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
<!--      </el-row>-->
<!--      <el-row :gutter="24">-->
        <!--   4.创建或编辑验证人 -->
        <el-col :span="12" style="margin:10px auto auto;" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
          <el-card>
            <div slot="header" class="clearfix">
              <span>4、创建或编辑验证人</span>
<!--              <el-button style="float: right; padding: 3px 0" @click="dialogCreateVisible=true" type="primary">进入</el-button>-->
            </div>
            <el-form  label-width="110px" >
              <el-form-item label="" style="height: 101px" >
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="dialogCreateVisible=true" >进入</el-button>
              </el-form-item>
            </el-form>
          </el-card>
          <el-dialog
              title="创建或编辑验证人"
              :visible.sync="dialogCreateVisible"
              center
              :before-close="handleClose">
            <el-form :model="validatorInfo" label-width="80px" >
              <el-form-item label="收益地址">
                <el-input v-model="validatorInfo.feeAddr" placeholder="收益地址"></el-input>
              </el-form-item>
              <el-form-item label="网络别名">
                <el-input v-model="validatorInfo.moniker" placeholder="网络别名"></el-input>
              </el-form-item>
              <el-form-item label="网络标识">
                <el-input v-model="validatorInfo.identity" placeholder="验证人标识"></el-input>
              </el-form-item>
              <el-form-item label="网站地址">
                <el-input v-model="validatorInfo.website" placeholder="网站地址" value="https://www.bhpnet.io"></el-input>
              </el-form-item>
              <el-form-item label="节点邮箱">
                <el-input v-model="validatorInfo.email" placeholder="节点邮箱"></el-input>
              </el-form-item>
              <el-form-item label="节点描述">
                <el-input v-model="validatorInfo.details" placeholder="节点描述" value="您好，我是验证人节点！"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="createValidator()">提交</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </el-col>
        <!--   5.质押BHP（最少32个BHP） -->
        <el-col :span="12" style="margin:10px auto auto;" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
          <el-card>
            <div slot="header" class="clearfix">
              <span>5、质押BHP（最少32个BHP）</span>
            </div>
            <el-form :model="stake" label-width="110px" >
              <el-form-item label="节点地址">
                <el-input v-model="address" placeholder="验证人地址"></el-input>
              </el-form-item>
              <el-form-item label="质押金额">
                <el-input v-model="stake.money" placeholder="质押金额">
                  <template slot="append">BHP</template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="stakeValidator()">提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <!--   6.获取质押情况 -->
        <el-col :span="12" style="margin:10px auto auto;" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
          <el-card>
            <div slot="header" class="clearfix">
              <span>6、获取质押情况</span>
            </div>
            <el-form  label-width="110px" >
              <el-form-item label="验证人地址">
                <el-input v-model="address" placeholder="验证人地址"></el-input>
              </el-form-item>
              <el-form-item label="委托者地址">
                <el-input v-model="userAddress" placeholder="委托者地址"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getStakeInfo()">提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <!--   7.获取当前活跃验证人 -->
        <el-col :span="12" style="margin:10px auto auto;" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
          <el-card>
            <div slot="header" class="clearfix">
              <span>7、获取当前活跃验证人</span>
              <el-button style="float: right; padding: 3px 0" @click="getActiveValidators()" type="success">获取</el-button>
            </div>
          </el-card>
        </el-col>
        <!--   8.获取TOP验证人 -->
        <el-col :span="12" style="margin:10px auto auto;" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
          <el-card>
            <div slot="header" class="clearfix">
              <span>8、获取质押成功的验证人</span>
              <el-button style="float: right; padding: 3px 0" @click="getTopValidators()" type="success">获取</el-button>
            </div>
          </el-card>
        </el-col>
        <!--   9.获取质押总量 -->
        <el-col :span="12" style="margin:10px auto auto;" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
          <el-card>
            <div slot="header" class="clearfix">
              <span>9、获取质押总量</span>
              <el-button style="float: right; padding: 3px 0" @click="totalStake()" type="success">获取</el-button>
            </div>
          </el-card>
        </el-col>
        <!--   11.提取收益 -->
        <el-col :span="12" style="margin:10px auto auto;" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
          <el-card>
            <div slot="header" class="clearfix">
              <span>11.提取收益（1天领取1次）</span>
              <el-tooltip class="item" effect="dark" content="收益一天仅允许领取一次，操作用户为创建验证人的收益地址以及这个地址有BHP。" placement="top-start">
                <el-button style="float: right; padding: 3px 0" type="danger"  >点击查看注意事项</el-button>
              </el-tooltip>
            </div>
            <el-form  label-width="110px" >
              <el-form-item label="验证人地址">
                <el-input v-model="address" placeholder="验证人地址"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="withdrawProfits()">提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <!--   12.取消验证人资格 -->
        <el-col :span="12" style="margin:10px auto auto;" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
          <el-card>
            <div slot="header" class="clearfix">
              <span>12.取消验证人资格</span>
              <el-tooltip class="item" effect="dark" content="操作用户为验证人地址" placement="top-start">
                <el-button style="float: right; padding: 3px 0" type="danger"  >点击查看注意事项</el-button>
              </el-tooltip>
            </div>
            <el-form  label-width="110px" >
              <el-form-item label="验证人地址">
                <el-input v-model="address" placeholder="验证人地址"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="unstake()">提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <!--   13.提取本金 -->
        <el-col :span="12" style="margin:10px auto auto;" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
          <el-card>
            <div slot="header" class="clearfix">
              <span>13.提取本金(取消质押之后3天后才能提取本金)</span>
              <el-tooltip class="item" effect="dark" content="操作用户为验证人地址，您需要首先取消验证人资格成功，然后3天后才能提交提取本金的请求" placement="top-start">
                <el-button style="float: right; padding: 3px 0" type="danger"  >点击查看注意事项</el-button>
              </el-tooltip>
            </div>
            <el-form  label-width="110px" >
              <el-form-item label="验证人地址">
                <el-input v-model="address" placeholder="验证人地址"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="withdrawStaking()">提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
                <!--   10.获取验证人信息 -->
                <el-col :span="12" style="margin:10px auto auto;" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
                  <el-card>
                    <div slot="header" class="clearfix">
                      <span>10、获取验证人信息</span>
                    </div>
                    <el-form  label-width="110px" >
                      <el-form-item label="验证人地址">
                        <el-input v-model="address" placeholder="验证人地址"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="getValidatorInfo()">提交</el-button>
                      </el-form-item>
                    </el-form>
                  </el-card>
                </el-col>
        <el-col :span="12" style="margin:10px auto auto;" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
                  <el-card>
                    <div slot="header" class="clearfix">
                      <span>合约相关扩展</span>
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
                        <el-form-item label="验证者合约">
                            0x000000000000000000000000000000000000f000
                        </el-form-item>
                        <el-form-item label="惩罚合约">
                            0x000000000000000000000000000000000000f001
                        </el-form-item>
                        <el-form-item label="提案合约">
                            0x000000000000000000000000000000000000f002
                        </el-form-item>
                    </el-form>
                  </el-card>
         </el-col>
      </el-row>
      <!--   列表信息 -->
      <el-dialog :title="title" :visible.sync="dialogTableVisible">
        <el-table :data="tableData">
          <el-table-column
              label="序号"
              type="index"
              align="center"
              width="100">
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
          center
          :before-close="handleClose">
          <span>{{ info }}</span>
          <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogResultVisible = false">关闭</el-button>
        </span>
      </el-dialog>
      <!--    获取验证人信息返回结果-->
      <el-dialog
        title="提示"
        :visible.sync="dialogValidatorVisible"
        center
        :before-close="handleClose">
        <el-form :model="getValidatorInfoResult" label-width="120px" label-position="left" >
          <el-form-item  label="收益地址">
            <el-input v-model="getValidatorInfoResult[0]" ></el-input>
          </el-form-item>
          <el-form-item  label="用户质押金额">
            <el-input v-bind:value="getValidatorInfoResult[2] | toBHP" >
              <template slot="append">BHP</template>
            </el-input>
          </el-form-item>
          <el-form-item  label="未取收益">
            <el-input v-bind:value="getValidatorInfoResult[3] | toBHP" >
              <template slot="append">BHP</template>
            </el-input>
          </el-form-item>
          <el-form-item  label="被惩罚收益">
            <el-input v-bind:value="getValidatorInfoResult[4] | toBHP"  >
              <template slot="append">BHP</template>
            </el-input>
          </el-form-item>
          <el-form-item  label="上次提取收益区块">
            <el-input v-model="getValidatorInfoResult[5]"  ></el-input>
          </el-form-item>
          <el-form-item  label="质押用户">
            <el-select  placeholder="质押用户列表" style="width: 100%;" value="">
              <el-option
                  v-for="item in getValidatorInfoResult[7]"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
    </el-dialog>
      <!--    获取质押信息返回结果-->
      <el-dialog
          title="提示"
          :visible.sync="dialogStakeVisible"
          :before-close="handleClose">
        <el-form :model="getValidatorInfoResult" label-width="120px" label-position="left" >
          <el-form-item  label="质押金额">
            <el-input v-bind:value="getValidatorInfoResult[0] | toBHP" >
              <template slot="append">BHP</template>
            </el-input>
          </el-form-item>
          <el-form-item  label="上次取收益区块">
            <el-input v-model="getValidatorInfoResult[1]"  :disabled="true" ></el-input>
          </el-form-item>
          <el-form-item  label="索引">
            <el-input v-model="getValidatorInfoResult[2]"  :disabled="true" ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogStakeVisible = false">关闭</el-button>
          </span>
      </el-dialog>
      <!--    3.获取提案信息结果-->
      <el-dialog
          :title="title"
          :visible.sync="dialogProposalsVisible"
          center
          :before-close="handleClose">
        <el-form :model="getProposalsInfoResult" label-width="120px" label-position="left" >
          <el-form-item  label="发起人地址">
            <el-input v-model="getProposalsInfoResult[0]"  :disabled="true"></el-input>
          </el-form-item>
          <el-form-item  label="提案的验证人地址">
            <el-input v-model="getProposalsInfoResult[1]" ></el-input>
          </el-form-item>
          <el-form-item  label="提案内容">
            <el-input v-model="getProposalsInfoResult[2]" ></el-input>
          </el-form-item>
          <el-form-item  label="创建时间">
            <el-input v-bind:value="getProposalsInfoResult[3] | formatTime" ></el-input>
          </el-form-item>
          <el-form-item  label="同意个数">
            <el-input v-model="getProposalsInfoResult[4]"  :disabled="true" ></el-input>
          </el-form-item>
          <el-form-item  label="否决个数">
            <el-input v-model="getProposalsInfoResult[5]"  :disabled="true" ></el-input>
          </el-form-item>
          <el-form-item  label="提案是否成功">
            <el-input v-model="getProposalsInfoResult[6]"  :disabled="true" ></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
  </div>
</template>

<script>
import {
  createProposal,
  voteProposal,
  getActiveValidators,
  getTopValidators,
  createOrEditValidator,
  stake,
  getValidatorInfo,
  getStakingInfo,
  proposals,
  withdrawProfits,
  withdrawStaking,
  unstake,
  totalStake
} from "@/web3/bpos";
import {bhp} from "@/configure/conf";
import BigNumber from "bignumber.js";
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogResultVisible: false,
      dialogStakeVisible:false,
      dialogValidatorVisible:false,
      dialogProposalsVisible:false,
      dialogCreateVisible:false,
      title:'',
      address:'',
      userAddress:'',
      info:'',
      proposal:{
        dst:"",
        details:""
      },
      voteProposalInfo:{
        id:'',
        auth:''
      },
      tableData:[],
      getTopValidatorsTableData:[],
      getProposalsInfoResult:[],
      validatorInfo:{
        feeAddr:'',
        moniker:'',
        identity:'',
        website:'',
        email:'',
        details:''
      },
      stake:{
        validator:'',
        //质押金额
        money:0
      },
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
  methods: {
    handleClose() {
      this.dialogTableVisible= false
      this.dialogResultVisible=false
      this.dialogStakeVisible=false
      this.dialogValidatorVisible=false
      this.dialogProposalsVisible=false
      this.dialogCreateVisible=false
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
    createProposal(){
      this.verifyConnect()
      // 查看是否授权
      this.$parent.loading = true;
      this.$parent.flag1 = true;
      this.$parent.flag2 = false;
      this.$parent.flag3 = false;
      createProposal(
          this.$store.state.wallet,
          this.proposal.dst,
          this.proposal.details,
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
        let result=res.events.LogCreateProposal.returnValues[0];
        this.voteProposalInfo.id=result
        this.title="提案成功"
        this.info="已赋值到第二项的提案ID上："+result
        this.dialogResultVisible = true
      }).catch(err=>{
        this.$parent.loading = false;
        this.getErrorInfo(err)
      })
    },
    voteProposal(){
      this.verifyConnect()
      // 查看是否授权
      this.$parent.loading = true;
      this.$parent.flag1 = true;
      this.$parent.flag2 = false;
      this.$parent.flag3 = false;
      voteProposal(
          this.$store.state.wallet,
          this.voteProposalInfo.id,
          this.voteProposalInfo.auth,
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
        console.log(JSON.stringify(res))
        let result=res.events.LogVote.returnValues.auth;
        this.$alert("链上确认成功，投票该提案状态选择是"+result, '提案ID', {
          confirmButtonText: '确定',
          callback: () => {
          }
        });

      }).catch(err=>{
        this.$parent.loading = false;
        this.getErrorInfo(err)
      })
    },
    proposals(){
      this.verifyConnect()
      this.getProposalsInfoResult=[]
      proposals(this.$store.state.wallet,this.voteProposalInfo.id).then(res => {
        console.log(JSON.stringify(res))
        this.getProposalsInfoResult=res
        this.title="查看提案信息"
        this.dialogProposalsVisible=true
      })
    },
    createValidator(){
      this.verifyConnect()
      this.dialogCreateVisible=false
      this.$parent.loading = true;
      this.$parent.flag1 = true;
      this.$parent.flag2 = false;
      this.$parent.flag3 = false;
      createOrEditValidator(
          this.$store.state.wallet,
          this.validatorInfo.feeAddr,
          this.validatorInfo.moniker,
          this.validatorInfo.identity,
          this.validatorInfo.website,
          this.validatorInfo.email,
          this.validatorInfo.details,
          data => {
            this.$parent.url = bhp + data.message;
            this.$parent.flag2 = true;
            this.$parent.flag1 = false;
            this.$parent.flag3 = false;
          }
      ).then(res => {
        console.log(JSON.stringify(res))
        this.$parent.loading = false;
        //提案ID
        let result=res.status;
        this.$alert(result, '创建或编辑验证人', {
          confirmButtonText: '确定',
        });
      }).catch(err=>{
        this.dialogCreateVisible=false
        this.$parent.loading = false;
        this.getErrorInfo(err)
      })
    },
    stakeValidator(){
      this.verifyConnect()

      // 查看是否授权
      this.$parent.loading = true;
      this.$parent.flag1 = true;
      this.$parent.flag2 = false;
      this.$parent.flag3 = false;

      stake(
          this.$store.state.wallet,
          this.address,
          this.stake.money.toString(),
          data => {
            console.log(data);
            this.$parent.url = bhp + data.message;
            this.$parent.flag2 = true;
            this.$parent.flag1 = false;
            this.$parent.flag3 = false;
          }
      ).then(res => {
        console.log(JSON.stringify(res))
        this.$parent.loading = false;
        let result=res.events;
        this.title="质押成功"
        this.info=result
        this.dialogResultVisible = true
      }).catch(err=>{
        this.$parent.loading = false;
        this.getErrorInfo(err)
      })
    },
    getTopValidators(){
      this.verifyConnect()
      getTopValidators(this.$store.state.wallet).then(res => {
        this.tableData=[]
        res.forEach(address => {
          let data={
            address:address
          }
          console.log(address)
          this.tableData.push(data)
        })
        this.title="获取质押成功的验证人"
        this.dialogTableVisible=true
      })
    },
    getActiveValidators(){
      this.verifyConnect()
      getActiveValidators(this.$store.state.wallet).then(res => {
        this.tableData=[]
        res.forEach(address => {
          let data={
            address:address
          }
          console.log(address)
          this.tableData.push(data)
        })
        this.title="获取当前活跃验证人"
        this.dialogTableVisible=true
      })
    },
    getValidatorInfo(){
      this.verifyConnect()
      this.getValidatorInfoResult=[]
      getValidatorInfo(this.$store.state.wallet,this.address).then(res => {
        console.log(res)
        this.getValidatorInfoResult=res
        this.title="获取验证人信息"
        this.dialogValidatorVisible=true
      })
    },
    getStakeInfo(){
      this.verifyConnect()
      this.getValidatorInfoResult=[]
      getStakingInfo(this.$store.state.wallet,this.address,this.userAddress).then(res => {
        console.log(JSON.stringify(res))
        this.getValidatorInfoResult=res
        this.title="获取在某个验证人的质押情况"
        this.dialogStakeVisible=true
      })
    },
    totalStake(){
      this.verifyConnect()
      totalStake(this.$store.state.wallet).then(res => {
        console.log(JSON.stringify(res))
        let balance = new BigNumber(res)
        this.info="质押总量："+balance.div("1000000000000000000").toPrecision(18)
        this.title="查看总质押量"
        this.dialogResultVisible=true
      })
    },
    withdrawProfits(){
      this.verifyConnect()
      // 查看是否授权
      this.$parent.loading = true;
      this.$parent.flag1 = true;
      this.$parent.flag2 = false;
      this.$parent.flag3 = false;
      withdrawProfits(
          this.$store.state.wallet,
          this.address,
          data => {
            this.$parent.url = bhp + data.message;
            this.$parent.flag2 = true;
            this.$parent.flag1 = false;
            this.$parent.flag3 = false;
          }
      ).then(res => {
        this.$parent.loading = false;
        console.log(JSON.stringify(res))
        this.title="提取收益成功"
        this.info=res
        this.dialogResultVisible = true

      }).catch(err=>{
        this.$parent.loading = false;
        this.getErrorInfo(err)
      })
    },
    withdrawStaking(){
      this.verifyConnect()
      // 查看是否授权
      this.$parent.loading = true;
      this.$parent.flag1 = true;
      this.$parent.flag2 = false;
      this.$parent.flag3 = false;
      withdrawStaking(
          this.$store.state.wallet,
          this.address,
          data => {
            this.$parent.url = bhp + data.message;
            this.$parent.flag2 = true;
            this.$parent.flag1 = false;
            this.$parent.flag3 = false;
          }
      ).then(res => {
        this.$parent.loading = false;
        console.log(JSON.stringify(res))
        this.title="提取本金成功"
        this.info=res
        this.dialogResultVisible = true

      }).catch(err=>{
        this.$parent.loading = false;
        this.getErrorInfo(err)
      })
    },
    unstake(){
      this.verifyConnect()
      // 查看是否授权
      this.$parent.loading = true;
      this.$parent.flag1 = true;
      this.$parent.flag2 = false;
      this.$parent.flag3 = false;
      unstake(
          this.$store.state.wallet,
          this.address,
          data => {
            this.$parent.url = bhp + data.message;
            this.$parent.flag2 = true;
            this.$parent.flag1 = false;
            this.$parent.flag3 = false;
          }
      ).then(res => {
        this.$parent.loading = false;
        console.log(JSON.stringify(res))
        this.title="取消验证人资格成功"
        this.info=res
        this.dialogResultVisible = true

      }).catch(err=>{
        this.$parent.loading = false;
        this.getErrorInfo(err)
      })
    }
  },
};
</script>

<style lang="less">

</style>