<template>
  <a-box class="swap">
    <div class="swap-content">
      <div class="title">{{$t('swap.title')}}</div>
      <a-spin :spinning="loading">
        <a-form-model :model="form" class="form-wrap">
          <div class="from-wrap">
            <div class="flex-box space-between title-wrap">
              <div>From</div>
              <div class="balance">Balance: {{fromBalance | formatNumber(2)}}</div>
            </div>
            <a-form-model-item>
              <div class="coins-input">
                <a-input v-model="form.fromNum" autoFocus type="number" :placeholder="$t('inputQuantity')"/>
                <div class="select-wrap">
                  <img src="@/assets/img/user.png" />
                  <span class="name">link</span>
                  <a-icon type="caret-down" class="arrow-down" />
                </div>
              </div>
            </a-form-model-item>
          </div>
          <div class="arrow-wrap">
            <img src="@/assets/img/arrow_down.png" alt="">
          </div>
          <div class="to-wrap">
            <div class="flex-box space-between title-wrap">
              <div>To</div>
              <div class="balance">Balance: {{toBalance | formatNumber(2)}}</div>
            </div>
            <a-form-model-item>
              <div class="coins-input">
                <a-input v-model="form.toNum" autoFocus type="number" :placeholder="$t('inputQuantity')"/>
                <div class="select-wrap">
                  <img src="@/assets/img/user.png" />
                  <span class="name">link</span>
                  <a-icon type="caret-down" class="arrow-down" />
                </div>
              </div>
            </a-form-model-item>
          </div>
          <div class="btn-wrap">
            <a-button class="submit-btn" key="submit" type="primary" @click="handleOk">{{$t('transaction')}}</a-button>
          </div>
        </a-form-model>
      </a-spin>
    </div>
  </a-box>
</template>

<script>
export default {
  data(){
    return {
      loading: false,
      form: {
        fromNum: '',
        fromType: 'jack',
        toNum: '',
        toType: 'jack',
      },
      fromBalance: 324.2342432,
      toBalance: 4564.756
    }
  },
  methods: {
    handleOk(){
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.form.fromNum = ''
        this.form.type = 'jack'
        this.form.toNum = ''
        this.form.toType = 'jack'
        this.$message.success(this.$t('message.submit'))
      }, 1000)
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
  }
}
</script>

<style lang="less" scoped>
.swap-content{
  .light-card;
  .title{
    text-align: center;
    line-height: 90/@r;
    border: 1px solid rgba(0, 0, 0, .25);
  }
  .form-wrap{
    padding: 80/@r 130/@r;
    .from-wrap, .to-wrap{
      .title-wrap{
        font-size: 32/@r;
        .balance{
          font-size: 22/@r;
          line-height: 48/@r;
        }
      }
      .ant-form-item{
        margin-bottom: 30/@r;
      }
    }
    .arrow-wrap{
      text-align: center;
      margin: 20/@r 0;
      img{
        width: 24/@r;
        height: 24/@r;
      }
    }
    .btn-wrap{
      text-align: center;
      margin: 70/@r 0 0;
      .submit-btn{
        width: 430/@r;
        height: 80/@r;
        background: #00E983;
      }
    }
  }
}
</style>
