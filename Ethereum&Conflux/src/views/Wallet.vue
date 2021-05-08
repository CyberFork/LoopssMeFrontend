<template>
  <a-box class="wallet">
    <div class="info">
      <a-space :size="24">
        <div>
          <a-avatar
            class="icon"
            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          />
          <a-text>{{ user | formatUser }} </a-text>
        </div>
        <a-space class="my-loopss">
          <span>LOOP</span>
          <span class="primary">{{info.loopss | formatNumber(2)}}</span>
        </a-space>
      </a-space>
    </div>
    <div class="trusts-container">
      <a-spin
        class="trusts-list"
        :spinning="trustList.loading && !trustList.busy"
      >
        <div class="title">
          <a-checkbox-group v-model="trustList.checkedList" @change="onChange">
            <a-checkbox value="trustMe">{{$t('wallet.trustMe')}}</a-checkbox>
            <a-checkbox value="myTrust">{{$t('wallet.myTrust')}}</a-checkbox>
          </a-checkbox-group>
        </div>
        <div
          class="content"
          v-infinite-scroll="getList"
          :infinite-scroll-disabled="trustList.busy"
          :infinite-scroll-distance="10"
        >
          <a-list :data-source="trustList.list">
            <a-list-item
              slot="renderItem"
              slot-scope="item, index"
              :key="index"
            >
              <div class="list-item-wrap">
                <a-space size="large">
                  <a-avatar
                    size="large"
                    src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                  />
                  <a-text>{{ item.trustSender | formatUser }}</a-text>
                  <div class="add-user">
                    <a-icon v-if="item.isAdded" type="user-add" />
                  </div>
                  <a-text>{{ item.time }}</a-text>
                </a-space>
                <div>
                  <img
                    src="@/assets/img/copy.png"
                    class="copy-btn pointer"
                    type="copy"
                    @click="copyFn(item.trustSender)"
                  />
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
import { toCopy } from 'assets/js/util'
import SetTrust from '@/components/utils/SetTrust.vue'
import Transfer from '@/components/utils/Transfer.vue'

export default {
  name: 'HomePage',
  components:{
    SetTrust,
    Transfer
  },
  data(){
    return {
      toSetTrust: false,
      toTransfer: false,
      info: {
        loopss: 1243.354,
        trusting: 2342342,
        truster: 3634646,
        haveTrust: '40%',
        beTrusted: '60%',
        yourHoldings: 243423423
      },
      trustList:{
        checkedList: ['trustMe'],
        loading: false,
        busy: false,
        list: []
      }
    }
  },
  computed:{
    myUser(){
      return this.$store.state.user
    },
    user(){
      let query = this.$route.query
      return query && query.q ? query.q : this.myUser
    },
    isSelf(){
      return this.myUser === this.user
    }
  },
  methods:{
    getList(){
    },
    onChange(item){
    },
    copyFn(content) {
      toCopy(content).then(() => {
        this.$message.success(this.$t('message.copySuccess'))
      })
    },
  }
}
</script>

<style lang="less" scoped>
.info {
  .light-card;
  padding: 30/@r;
  margin-bottom: 40 / @r;
  min-height: auto;
  .icon{
    width: 56/@r;
    height: 56/@r;
    margin-right: 16/@r;
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
    .ant-checkbox-group{
      display: flex;
      line-height: 100/@r;
    }
    /deep/ label{
      flex: 1;
      text-align: center;
      font-size: 32/@r;
      .ant-checkbox-inner{
        width: 40/@r;
        height: 40/@r;
        background-color: transparent;
        &:after{
          border-width: 1px;
          border-color: #00E983;
          left: 38%;
          top: 62%;
          z-index: 1;
          transform: rotate(45deg) scale(2) translate(-50%, -50%);
          @media only screen and (min-width: 1367px) {
            transform: rotate(45deg) scale(4) translate(-50%, -50%);
          }
        }
      }
    }
  }

  .trusts-list {
    position: relative;
    display: block;
    .title{
      border-bottom: 1px solid rgba(255, 255, 255, .3);
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
