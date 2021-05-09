<template>
  <a-modal :visible="visible" :title="$t('setTrust.title')" @ok="handleOk" @cancel="handleCancel" wrap-class-name="set-trust-dialog" :closable="false" :footer="false">
    <a-spin :spinning="loading">
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item :label="$t('setTrust.trust')">
          <a-input v-model="form.trust" :placeholder="$t('setTrust.placeholder.trust')" />
          <div class="tip">{{$t('setTrust.tip.trust')}}</div>
          <div class="input-info">%</div>
          <a-button class="reset-btn" type="primary" @click="form.trust = ''">{{$t('reset')}}</a-button>
        </a-form-model-item>
        <a-form-model-item :label="$t('setTrust.exchange')">
          <a-input v-model="form.exchange" :placeholder="$t('setTrust.placeholder.exchange')" />
          <div class="tip">{{$t('setTrust.tip.exchange')}}</div>
          <a-button class="reset-btn" type="primary" @click="form.exchange = ''">{{$t('reset')}}</a-button>
        </a-form-model-item>
        <div class="btn-wrap">
          <a-button class="submit-btn" key="submit" type="primary" @click="handleOk">{{$t('btnOk')}}</a-button>
        </div>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
import Api from '@/apis'
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
      form:{
        trustPercent: '',
        ratio: ''
      },
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    }
  },
  computed:{
    user(){
      let address = this.$route.query.q
      return address
    }
  },
  methods: {
    handleOk(){
      let params = Object.assign(this.form, {
        address: this.user
      })
      this.loading = true
      Api.setTrust(params)
      .then(res => {
        this.loading = false
        this.form.trust = ''
        this.form.exchange = ''
        this.$message.success(this.$t('message.submit'))
        this.$emit('close')
      })
    },
    handleCancel(){
      this.$emit('close')
    }
  }
}
</script>

<style lang="less">
.set-trust-dialog{
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
    .ant-modal-footer{
      padding: 20/@r 36/@r;
      border-top: 1px solid rgba(0, 0, 0, .3);
    }
    .ant-modal-body{
      padding: 0;
      .ant-form{
        padding: 40/@r 30/@r;
        .ant-btn{
          width: 140 / @r;
          height: 50 / @r;
          border-radius: 10 / @r;
          color: #999;
          &.ant-btn-primary{
            background: #00C1DC;
            border-color: #00C1DC;
            color: #fff;
          }
        }
        .ant-form-item{
          position: relative;
          margin-bottom: 40/@r;
          .ant-form-item-label{
            line-height: 70/@r;
          }
          .ant-form-item-control{
            line-height: 40/@r;
          }
          .ant-input{
            padding: 12/@r 330/@r 12/@r 16/@r;
            height: 70/@r;
            background: transparent;
          }
          .input-info{
            position: absolute;
            right: 300/@r;
            top: -5/@r
          }
          .reset-btn{
            position: absolute;
            right: 10/@r;
            top: -10/@r;
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
        .tip{
          font-size: 18/@r;
          line-height: 28/@r;
          margin-top: 10/@r;
        }
      }
      .ant-spin-nested-loading{
        border-radius: 0 0 30/@r 30/@r;
        overflow: hidden;
      }
    }
  }
}
</style>
