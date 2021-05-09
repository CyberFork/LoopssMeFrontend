<template>
  <a-modal :visible="visible" :title="$t('toTransfer.title')" @ok="handleOk" @cancel="handleCancel" wrap-class-name="transfer-dialog" :closable="false" :footer="false">
    <a-spin :spinning="loading">
      <a-form-model :model="form">
        <div class="flex-box space-between">
          <div>From</div>
          <div class="balance">Balance: {{balance | formatNumber(2)}}</div>
        </div>
        <a-form-model-item>
          <div class="coins-input">
            <a-input v-model="form.num" autoFocus type="number" :placeholder="$t('inputQuantity')"/>
            <div class="select-wrap">
              <img src="@/assets/img/user.png" />
              <span class="name">link</span>
              <a-icon type="caret-down" class="arrow-down" />
            </div>
          </div>
        </a-form-model-item>
        <div class="btn-wrap">
          <a-button class="submit-btn" key="submit" type="primary" @click="handleOk">{{$t('transfer')}}</a-button>
        </div>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  name: 'Trust',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      loading: false,
      balance: 1111111.4221,
      form:{
        num: '',
        type: 'jack'
      }
    }
  },
  methods: {
    handleOk(){
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.form.num = ''
        this.form.type = 'jack'
        this.$message.success(this.$t('message.submit'))
        this.$emit('close')
      }, 1000)
    },
    handleCancel(){
      this.$emit('close')
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
  }
}
</script>

<style lang="less">
.transfer-dialog{
  .ant-modal{
    width: 900 / @r !important;
    max-width: 92%;
  }
  .ant-modal-content{
    border-radius: 30 / @r;
    background: linear-gradient(310deg, #243187 0%, #009CCF 100%);
    .ant-modal-header{
      padding: 0;
      background: transparent;
      border-bottom: 1px solid rgba(0, 0, 0, .3);
      .ant-modal-title{
        line-height: 90 / @r;
        height: 90 / @r;
        font-size: 32 / @r;
        text-align: center;
      }
    }
    .ant-modal-body{
      padding: 0;
      .ant-form{
        padding: 40/@r 60/@r;
        .flex-box{
          margin-bottom: 10/@r;
          font-size: 32/@r;
          line-height: 46/@r;
          .balance{
            font-size: 22/@r;
          }
        }
        .ant-form-item{
          margin-bottom: 40/@r;
        }
        .btn-wrap{
          text-align: center;
          margin: 70/@r 0 20/@r;
          .submit-btn{
            width: 430/@r;
            height: 80/@r;
            background: #00E983;
          }
        }
      }
      .ant-spin-nested-loading{
        border-radius: 0 0 30/@r 30/@r;
        overflow: hidden;
      }
    }
  }
}
.coin-dropdown{
  .ant-select-dropdown-menu-item{
    color: #272727;
    line-height: 50/@r;
  }
}
input[type='number']{
  -moz-appearance:textfield;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;margin: 0;
}
</style>
