<template>
  <a-box class="home-page">
    <div class="info">
      <a-spin :spinning="infoLoading">
        <div v-if="isSelf">
          <div class="user-info" v-if="user">
            <a-avatar class="icon"
              src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
            <a-text>{{ user | formatUser }} </a-text>
          </div>
          <div class="sub-info">
            <a-space v-if="user">
              <a-text>{{ user | formatUser }} </a-text>
              <a-icon type="copy" @click="copyFn(user)" />
            </a-space>
            <a-space :size="24">
              <a-space>
                <span class="primary">{{myInfo.trusting | formatNumber}}</span>
                <span>{{$t('trusting')}}</span>
              </a-space>
              <a-space>
                <span class="primary">{{myInfo.truster | formatNumber}}</span>
                <span>{{$t('truster')}}</span>
              </a-space>
            </a-space>
          </div>
          <div class="trust-info">
            <div class="your-loopss">
              <img src="@/assets/img/icon.png" alt="">
              <span>{{myInfo.loopss | formatNumber(2)}}</span>
            </div>
            <div>{{$t('homePage.yourHoldings')}} LOOP</div>
          </div>
        </div>
        <div v-else>
          <div class="user-info" v-if="user">
            <a-avatar class="icon"
              src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
            <a-text>{{ user | formatUser }} </a-text>
            <a-text class="have-trust-btn" v-if="!info.haveTrust">{{ $t('haveTrust') }}</a-text>
            <a-button class="to-trust-btn" type="primary" v-else>+ {{ $t('toTrust') }}</a-button>
          </div>
          <div class="sub-info">
            <a-space :size="24">
              <a-space>
                <a-text>{{ user | formatUser }} </a-text>
                <a-icon type="copy" @click="copyFn(user)" />
              </a-space>
              <a-space>
                <span>LOOP</span>
                <span class="primary">{{info.loopss | formatNumber(2)}}</span>
              </a-space>
            </a-space>
            <a-space :size="24">
              <a-space>
                <span class="primary">{{info.trusting | formatNumber}}</span>
                <span>{{$t('trusting')}}</span>
              </a-space>
              <a-space>
                <span class="primary">{{info.truster | formatNumber}}</span>
                <span>{{$t('truster')}}</span>
              </a-space>
            </a-space>
          </div>
          <div class="trust-info">
            <a-space :size="24">
              <a-space>
                <span>{{$t('haveTrust')}}</span>
                <span class="primary">{{myInfo.haveTrust}}</span>
              </a-space>
              <a-space>
                <span>{{$t('beTrusted')}}</span>
                <span class="primary">{{myInfo.beTrusted}}</span>
              </a-space>
              <a-space>
                <span>{{$t('homePage.yourHoldings')}}</span>
                <span class="primary">{{myInfo.loopss | formatNumber(2)}}</span>
              </a-space>
            </a-space>
            <div class="btn-wrap">
              <a-button type="primary" @click="toSetTrust = true">{{$t('setting')}}</a-button>
              <a-button type="primary" @click="toTransfer = true">{{$t('transfer')}}</a-button>
              <a-button type="primary" @click="$router.push('/swap')">{{$t('transaction')}}</a-button>
            </div>
          </div>
        </div>
      </a-spin>
    </div>
    <div class="trusts-container">
      <a-spin class="trusts-list" :spinning="trustList.loading && !trustList.busy">
        <div class="title flex-box">
          <div v-for="item in trustList.tabs" :key="item" :class="{primary: trustList.tabActive === item}"
            @click="tabChange(item)">{{$t(item)}}</div>
        </div>
        <div class="content" v-infinite-scroll="getList" :infinite-scroll-disabled="trustList.busy"
          :infinite-scroll-distance="10">
          <a-list :data-source="trustList.list">
            <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
              <div class="list-item-wrap">
                <a-space>
                  <a-avatar size="large"
                    src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
                  <a-text>{{ item.trustSender | formatUser }}</a-text>
                  <div class="add-user" v-if="item.isAdded">
                    <a-icon type="user-add" />
                  </div>
                  <a-text>{{ item.time }}</a-text>
                </a-space>
                <div>
                  <img src="@/assets/img/copy.png" class="copy-btn pointer" type="copy"
                    @click="copyFn(item.trustSender)" />
                </div>
              </div>
            </a-list-item>
          </a-list>
        </div>
      </a-spin>
    </div>
    <set-trust :visible="toSetTrust" @close="toSetTrust = false"></set-trust>
    <transfer :visible="toTransfer" @close="toTransfer = false"></transfer>
  </a-box>
</template>

<script>
  import Api from '@/apis'
  import {
    toCopy
  } from 'assets/js/util'
  import SetTrust from '@/components/utils/SetTrust.vue'
  import Transfer from '@/components/utils/Transfer.vue'

  export default {
    name: 'HomePage',
    components: {
      SetTrust,
      Transfer
    },
    data() {
      return {
        toSetTrust: false,
        toTransfer: false,
        infoLoading: false,
        info: {
          trusting: 0,
          truster: 0,
          isTrusted: false,
          haveTrust: '0',
          beTrusted: '0',
          loopss: 0,
        },
        myInfo: {
          trusting: 0,
          truster: 0,
          isTrusted: false,
          haveTrust: '0',
          beTrusted: '0',
          loopss: 0
        },
        trustList: {
          tabs: ['haveTrust', 'truster', 'holder'],
          loading: false,
          busy: false,
          tabActive: 'haveTrust',
          list: [],
          pn: 1,
          total: 0
        }
      }
    },
    computed: {
      myAddress() {
        return this.$store.state.user
      },
      user() {
        let query = this.$route.query
        return query && query.q ? query.q : this.myAddress
      },
      isSelf() {
        return this.myAddress === this.user
      }
    },
    methods: {
      getInfo() {
        let userLoading = true
        let myLoading = true
        this.infoLoading = true
        if (!this.isSelf) {
          Api.getLoopInfoByAddress(this.user).then(res => {
            userLoading = false
            Object.assign(this.info, res)
            console.log('myLoading', myLoading)
            if (!myLoading) {
              this.infoLoading = false
            }
          })
        }
        Api.getLoopInfoByAddress(this.myAddress).then(res => {
          myLoading = false
          Object.assign(this.myInfo, res)
          if ((!this.isSelf && !userLoading) || this.isSelf) {
            this.infoLoading = false
          }
        })
      },
      getList() {
        this.trustList.loading = true
        this.trustList.busy = false
        this.trustList.pn++
        this.trustList.list = []
        if (
          this.trustList.total &&
          this.trustList.list.length >= this.trustList.total
        ) {
          this.$message.warning(this.$t('noMore'))
          this.trustList.loading = false
          this.trustList.busy = false
          return
        }
        Api.getLoopssUsers(this.$store.state.user)
        .then(data => {
          //挖矿-获取我信任的人
          this.trustList.total = data.total
          this.trustList.list = data.list

          this.trustList.loading = false
          this.trustList.busy = false
        })
        .catch(() => {
          this.trustList.pn--
          this.trustList.loading = false
          this.trustList.busy = false
        })
      },
      tabChange(item) {
        this.trustList.tabActive = item
        this.getList()
      },
      copyFn(content) {
        toCopy(content).then(() => {
          this.$message.success(this.$t('message.copySuccess'))
        })
      },
    },
    created(){
      this.getInfo()
      this.getList()
    }
  }

</script>

<style lang="less" scoped>
  .info {
    .deep-card;
    padding: 0;
    margin-bottom: 40 / @r;
    min-height: auto;
    background: url(~@/assets/img/mining_banner_s.png) no-repeat center/cover;
    .ant-spin-nested-loading{
      border-radius: 30/@r;
      overflow: hidden;
    }
    /deep/ .ant-space {
      display: flex;
    }

    /deep/ .ant-btn-primary {
      background: #00C1DC;
      border-color: #00C1DC;
    }

    .user-info {
      padding: 40/@r 40/@r 26/@r;
      background: rgba(0, 0, 0, .3);

      /deep/ .ant-avatar {
        width: 72 / @r;
        height: 72 / @r;
        margin-right: 20 / @r;
      }

      .have-trust-btn,
      .to-trust-btn {
        width: 120 / @r;
        line-height: 42 / @r;
        text-align: center;
        float: right;
        border-radius: 10 / @r;
        border: 1px solid #FFFFFF;

        &.ant-btn-primary {
          background: #00C1DC;
          border-color: #00C1DC;
        }
      }
    }

    .sub-info {
      padding: 0 40/@r 24/@r;
      background: rgba(0, 0, 0, .3);

      /deep/ .ant-space {
        padding: 6/@r 0;
      }
    }

    .trust-info {
      text-align: center;
      background: linear-gradient(310deg, #243187 0%, #009CCF 100%);
      border-radius: 0 0 30/@r 30/@r;
      padding: 24/@r 40/@r 30/@r;

      .your-loopss {
        font-size: 60/@r;

        img {
          width: 34/@r;
          height: 40/@r;
          margin-right: 18/@r;
        }
      }

      /deep/ .ant-space {
        justify-content: center;
      }

      .btn-wrap {
        margin-top: 30/@r;

        /deep/ .ant-btn {
          width: 160/@r;
          height: 60/@r;
          margin-right: 40/@r;
          &:last-child{
            margin-right: 0;
          }
        }
      }
    }
  }

  .trusts-container {
    .trust-list;
    border-radius: 30 / @r;
    overflow: hidden;
    position: relative;
    margin-bottom: 40 / @r;

    .title {
      font-size: 36 / @r;
      line-height: 100 / @r;
      padding: 0 40 / @r;
      position: relative;
    }

    .trusts-list {
      position: relative;
      display: block;

      .title {
        border-bottom: 1px solid rgba(255, 255, 255, .3);

        >div {
          flex: 1;
          text-align: center;
          cursor: pointer;
          border-right: 1px solid rgba(255, 255, 255, .3);

          &:last-child {
            border: 0;
          }

          &.primary {
            text-decoration: underline;
          }
        }
      }

      .content {
        max-height: 560 / @r;
        overflow: auto;
        position: relative;
        border-radius: 6 / @r;
      }

      .add-user {
        width: 20 / @r;
        text-align: center;
      }

      .copy-btn {
        width: 32 / @r;
      }
    }
  }

</style>
