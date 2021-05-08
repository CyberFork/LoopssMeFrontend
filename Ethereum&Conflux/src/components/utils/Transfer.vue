<template>
  <a-modal :visible="visible" :title="$t('toTransfer.title')" @ok="handleOk" @cancel="handleCancel" wrap-class-name="transfer-dialog" :closable="false" :footer="false">
    <a-spin :spinning="loading">
      <a-form-model :model="form">
        <div class="flex-box space-between">
          <div>From</div>
          <div>Balance: {{balance | formatNumber(2)}}</div>
        </div>
        <a-form-model-item>
          <a-input v-model="form.num" autoFocus type="number" :placeholder="$t('inputQuantity')"/>
          <a-select
            v-model="form.type"
            show-search
            option-filter-prop="children"
            dropdown-class-name="coin-dropdown"
            :filter-option="filterOption"
          >
            <a-icon slot="suffixIcon" type="caret-down" :style="{ color: '#272727', fontSize: '20px', marginTop: '-3px'}"/>
            <a-select-option value="jack">
              Jack
            </a-select-option>
            <a-select-option value="lucy">
              Lucy
            </a-select-option>
            <a-select-option value="tom">
              Tom
            </a-select-option>
          </a-select>
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
    width: 670 / @r !important;
    max-width: 96%;
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
        }
        .ant-form-item{
          margin-bottom: 40/@r;
          position: relative;
          .ant-input{
            height: 70/@r;
            background: transparent;
            padding: 9/@r 230/@r 9/@r 16/@r;
          }
          .ant-select{
            color: #272727;
            width: 200/@r;
            position: absolute;
            right: 16/@r;
            top: -11/@r;
            .ant-select-selection--single{
              line-height: 50/@r;
              height: 50/@r;
              .ant-select-selection__rendered{
                line-height: 50/@r;
              }
            }
          }
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
