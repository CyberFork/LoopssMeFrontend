// import w3 from "../assets/js/web3.js";
// console.log('index.js', w3)
// import { icLoopsMeContract, icLOOPTokenContract, icPoolContract } from 'assets/js/web3';
import store from '@/store'
import { errorNotic, needDownload } from 'assets/js/util.js'
import LoopssMe_ABI from 'assets/js/ABI_LoopssMe.json'
import LOOPToken_ABI from 'assets/js/ABI_LOOPToken.json'
import LOOPPool_ABI from 'assets/js/ABI_LOOPPool.json'
import BaseConstants from '../constants.js'
import Web3 from 'web3'
import request from '@/util/request'
import * as cfxJS from 'js-conflux-sdk'

const {
  // AddressZero,
  // HashZero,

  // EtherSymbol,

  // NegativeOne,
  // Zero,
  // One,
  // Two,

  // WeiPerEther,
  MaxUint256
} = require('@ethersproject/constants')
// import userApi from "./user";
// connect wallet
const web3js = new Web3()
const cfx = window.confluxJS
const conflux = window.conflux
// cfxJS.Conflux = new cfxJS.Conflux(window.conflux)
// const cfx = cfxJS
var ADDRESS_REGEX
var adLoopssMe
var adLOOPToken
var adLOOPPool
// * Address新地址
if (
  conflux !== undefined &&
  conflux !== null &&
  conflux.chainId === BaseConstants.TEST_NET_CHAIN
) {
  ADDRESS_REGEX = /^(cfxtest:)[a-zA-Z0-9]{42}$/
  adLoopssMe = '0x8818961eE54eBD3557A878BB9f8dCF4612E62BFd'
  adLOOPToken = '0x8be17b334614e38f7fac8fc05a5aa83e32ad37f2'
  adLOOPPool = '0x85cc7bbe7f4e284c4f4f863f34af7091f595df5b'
} else {
  ADDRESS_REGEX = /^(cfx:)[a-zA-Z0-9]{42}$/
  adLoopssMe = '0x8e5C93229841b3bcAe629339EE89D5958D3D8f0D'
  adLOOPToken = '0x8ab601470a66e8037357752db4de5f0e86b9422b'
  adLOOPPool = '0x8ba9ebbf48ea4bc12863b3e5bca24c75b5d69739'
}
// //TODO:conflux.chainId 有时候获取不到，这里就需要阻塞等待，当conflux.chainId获取到了之后才继续执行后面的。否则会报错。
// switch (parseInt(conflux.chainId)) {
//   case 42:
//     adLOOPPool = '0xD1E97844Ad40c9B53Aa51EA38e6928011D027f1A';
//     break;
//   case 100:
//     adLOOPPool = '0x89434bfc9708623317F964774708cF9f11963e01';
//     break;
//   default:
//     adLOOPPool = '0x89434bfc9708623317F964774708cF9f11963e01';
//     break;
// }
// Contract Instance
let icLoopsMeContract
let icLOOPTokenContract
let icPoolContract

function initContract() {
  //TODO 更新ABI到最新
  icLoopsMeContract = cfx.Contract({
    abi: LoopssMe_ABI,
    address: adLoopssMe
  })
  icLOOPTokenContract = cfx.Contract({
    abi: LOOPToken_ABI,
    address: adLOOPToken
  })
  icPoolContract = cfx.Contract({
    abi: LOOPPool_ABI,
    address: adLOOPPool
  })

  conflux.networkVersion && store.dispatch(
    'SetLOOPToken',
    cfxJS.format.address(adLOOPToken, Number(conflux.networkVersion))
  )
}

if (cfx && conflux) {
  conflux.autoRefreshOnNetworkChange = true
  store.dispatch('SetConflux', true)
}
// conflux.on('networkChanged', function (networkId) {
//   switch (parseInt(networkId)) {
//     case 42://kovan
//       adLOOPPool = '0x8e4A3E9280f53c0b82c9b64998D4847BCA2AD9A7'
//       initContract()
//       break
//     case 56://BSC
//       adLOOPPool = "0x697c8EF8f85cddD090Bb126746C71d72637c04F4";
//       initContract()
//       break
//     case 100://xdai
//       adLOOPPool = '0x8e4A3E9280f53c0b82c9b64998D4847BCA2AD9A7'
//       initContract()
//       break
//     default:
//       // adLOOPPool = '0x89434bfc9708623317F964774708cF9f11963e01';
//       break
//   }
// })

//TODO: 检测钱包是否连接，连接的情况下才显示页面。未连接时显示提示连接钱包页面。类似noscript

const Api = {
  //TODO研究如何在切换时新增账号连接
  async login(_this) {
    //登录
    let account = ''
    if (!cfx || !conflux) {
      needDownload('请安装 Conflux Portal 或在 conflux浏览器中运行')
      return Promise.reject(new Error('不支持conflux'))
    }
    // 初始化合约信息
    initContract()
    if (cfx.defaultAccount) {
      account = cfx.defaultAccount
    } else {
      await conflux.enable().then(function(accounts) {
        //现在只能使用then异步的方式返回单个了
        console.log('Now account:', accounts)
        if (!accounts || !accounts[0]) {
          errorNotic('No address')
          return Promise.reject(new Error('不支持conflux'))
        }
        account = accounts[0]
      })
    }
    conflux.on('accountsChanged', async function(accounts) {
      !accounts[0] && store.dispatch('Logout')
    })
    account = conflux.networkVersion ? cfxJS.format.address(account, Number(conflux.networkVersion)) : account
    return Promise.resolve({ account })
  },
  logout() {
    //登出
    return Promise.resolve()
  },
  async getInfo() {
    // 理论产出
    const myDate = new Date()
    const dTime =
      (parseInt(myDate.getTime()) -
        (conflux.chainId === BaseConstants.TEST_NET_CHAIN
          ? 1614842711000
          : 1614950952000)) /
      100000 //直接得到的第三个Trust时间戳 // 2021-03-05 21:29:12 +08:00 CFX主网LOOPToken开始流支付
    const theoryP = dTime * 0.1
    // 已挖出并包装：
    const _minedTotal = this._formatBigNumber(
      await icPoolContract.totalMined().call()
    )
    // await icLOOPTokenContract.totalSupply().call()
    // 挖矿信任数：
    const _trustTotal = await icPoolContract.totalMiningTrust().call() //全网信任量
    //首页-总量信息
    return Promise.resolve({
      total: theoryP, //总计已产出
      minedTotal: _minedTotal, //已经被挖出
      trustTotal: _trustTotal && _trustTotal.length ? _trustTotal[0] : 0
    })
  },
  getPrice() {
    //首页-获取当前loop价格
    return Promise.resolve('∞')
  },
  // 数据处理方法
  _formatBigNumber(_bn) {
    // return web3js.utils.fromWei(_bn, 'ether');
    return parseFloat(web3js.utils.fromWei(String(_bn), 'ether')) //.toLocaleString();
    // parseFloat().toLocaleString();
  },
  //时间格式化
  _getDateTime(time) {
    let mTime = moment.duration(time, 'seconds')
    return moment({
      h: mTime.hours(),
      m: mTime.minutes(),
      s: mTime.seconds()
    }).format('HH:mm:ss')
    // if (time >= 60 && time <= 3600) {
    //   time = parseInt(time / 60) + ':' + time % 60
    // } else {
    //   if (time > 3600) {
    //     time = parseInt(time / 3600) + ':' + parseInt(((time % 3600) / 60)) + ':' + time % 60
    //   } else {
    //     time = time + ' s'
    //   }
    // }
    // return time
  },
  async getMyInfo() {
    // 被信任数量计算还需信任数量
    console.log('defaultAccount', cfx.defaultAccount)
    const myTrustCount = (
      await icLoopsMeContract.getAccountInfoOf(cfx.defaultAccount).call()
    ).beenTrustCount
    console.log('myTrustCount', myTrustCount)
    const needTrust = myTrustCount > 3 ? 0 : 3 - myTrustCount
    // 获取未领取数量
    const unClaim = this._formatBigNumber(
      await icPoolContract.unClaimOf(cfx.defaultAccount).call()
    )
    // 获取当前未包装余额
    const unWrappedLOOP = this._formatBigNumber(
      await icLoopsMeContract
        .minterBalanceOf(adLOOPToken, cfx.defaultAccount)
        .call()
    )
    // 获取当前已经包装余额
    // 获取当前信任挖矿算力
    const myMiningTrustCount = await icPoolContract
      .minerTrustCount(cfx.defaultAccount)
      .call()
    // 获取上次挖矿时间，以及计算离24小时距离
    const myLastUpdateTime = await icPoolContract
      .minerLastUpdateTime(cfx.defaultAccount)
      .call()
    const myDate = new Date()
    var dTime =
      86400 - (parseInt(myDate.getTime() / 1000) - (myLastUpdateTime - 120)) //直接得到的第三个Trust时间戳
    if (dTime < 0) {
      dTime = 0
    }
    const remindTime = this._getDateTime(dTime)
    // 判定是否Trust了LOOP
    let _ifTrustLOOP
    if (
      parseInt(
        await icLoopsMeContract
          .getProportionReceiverTrustedSender(cfx.defaultAccount, adLOOPToken)
          .call()
      ) > 0
    ) {
      _ifTrustLOOP = true
    } else {
      _ifTrustLOOP = false
    }
    // console.log('是否信任LOOP', _ifTrustLOOP, cfx.defaultAccount, adLOOPToken, await icLoopsMeContract
    //   .getProportionReceiverTrustedSender(cfx.defaultAccount, adLOOPToken)
    //   .call())
    //挖矿-获取个人信息
    return Promise.resolve({
      needInviteCount: needTrust, //仍然需要邀请人数
      unClaimTokens: unClaim, //待领取
      curToken: unWrappedLOOP, //当前未包装余额
      trustCalc:
        myMiningTrustCount && myMiningTrustCount.length
          ? myMiningTrustCount[0]
          : 0, //信任算力
      time: remindTime,
      ifTrustLOOP: _ifTrustLOOP
      // time: parseInt(myLastUpdateTime) === 0 ? 'Never' : myLastUpdateTime // 最近挖矿的更新时间
    })
  },
  async updateAndClaim() {
    //挖矿-收取token & 更新算力
    const myTrustCount = (
      await icLoopsMeContract.getAccountInfoOf(cfx.defaultAccount).call()
    ).beenTrustCount
    const needTrust = myTrustCount > 3 ? 0 : 3 - myTrustCount

    if (parseInt(needTrust) === 0) {
      await icPoolContract.claim().sendTransaction({
        from: cfx.defaultAccount
      })
      return Promise.resolve(true)
    } else {
      return Promise.resolve(false)
    }
  },
  async wrappToken(_curToken) {
    //检测是否Approve给LOOPToken合约
    console.log(cfx.defaultAccount, 'da')
    const approved = await icLoopsMeContract
      .allowance(cfx.defaultAccount, adLOOPToken, adLOOPToken)
      .call()
    if (parseInt(approved) < parseInt(1)) {
      // await icLoopsMeContract.approve(adLOOPToken, adLOOPToken, web3js.utils.toBN('115792089237316195423570985008687907853269984665640564039457584007913129639935')).sendTransaction({ from: cfx.defaultAccount });
      await icLoopsMeContract
        .approve(adLOOPToken, adLOOPToken, MaxUint256)
        .sendTransaction({
          from: cfx.defaultAccount
        })
      return Promise.resolve(false)
    } else {
      await icLOOPTokenContract
        .wrap(
          web3js.utils.toBN(
            web3js.utils.toWei(String(parseFloat(_curToken) - 0.0001))
          )
        )
        .sendTransaction({
          from: cfx.defaultAccount
        })
      return Promise.resolve(true)
    }
    // 如果是，则调用wrap方法
    // 如果不是，则调用approve
    // await icLOOPTokenContract.methods
  },
  /*
   *@Author: yozora
   *@Description: 获取我信任的地址
   *@Date: 2021-03-06 11:23:52
   */
  getTrustMe(userAddress) {
    // const myTrustCount = (
    //   await icLoopsMeContract.getAccountInfoOf(cfx.defaultAccount).call()
    // ).beenTrustCount
    // return Promise.resolve({
    //   total: myTrustCount && myTrustCount.length ? myTrustCount[0] : 0,
    //   list: trustSet
    // })
    console.log('userAddress: ' + userAddress)
    return request({
      url: BaseConstants.BASE_URL + '/api/log/getTrustYou',
      method: 'POST',
      data: {
        chainId: conflux.chainId,
        networkVersion: conflux.networkVersion,
        beenTrusted: userAddress
      }
    })
  },
  /*
   *@Author: yozora
   *@Description: 获取信任我的地址
   *@Date: 2021-03-06 11:24:10
   */
  getMyTrusts(userAddress) {
    console.log('userAddress: ' + userAddress)
    return request({
      url: BaseConstants.BASE_URL + '/api/log/getYouTrust',
      method: 'POST',
      data: {
        chainId: conflux.chainId,
        networkVersion: conflux.networkVersion,
        trustSender: userAddress
      }
    })
  },
  async searchByAdress(_address) {
    const oldAddress = cfxJS.format.hexAddress(_address)
    //挖矿-获取我信任的人
    const myTrustValueTo = await icLoopsMeContract
      .getProportionReceiverTrustedSender(cfx.defaultAccount, oldAddress)
      .call()
    const toTrustValueMe = await icLoopsMeContract
      .getProportionReceiverTrustedSender(oldAddress, cfx.defaultAccount)
      .call()
    const _trustType =
      myTrustValueTo * toTrustValueMe > 0
        ? 3
        : myTrustValueTo < 1 && toTrustValueMe < 1
        ? 0
        : parseInt(myTrustValueTo) === 0
        ? 1
        : 2 //1已信任您 2您已信任 3互相信任
    // console.log(myTrustValueTo * toTrustValueMe, myTrustValueTo < 1, parseInt(myTrustValueTo), myTrustValueTo, toTrustValueMe, _trustType)
    return Promise.resolve({
      total: 1,
      list: [
        {
          address: _address,
          trustType: _trustType,
          time: '2020-03-04 13:44:23'
        }
      ]
      // }, {
      //   address: 'x0565555555555',
      //   trustType: 2,
      //   time: '2020-03-04 13:44:23'
      // }, {
      //   address: 'x0565555555555',
      //   trustType: 3,
      //   time: '2020-03-04 13:44:23'
      // }, {
      //   address: 'x0565555555555',
      //   trustType: 2,
      //   time: '2020-03-04 13:44:23'
      // }, {
      //   address: 'x0565555555555',
      //   trustType: 1, //1已信任您 2您已信任 3互相信任
      //   time: '2020-03-04 13:44:23'
      // }, {
      //   address: 'x0565555555555',
      //   trustType: 2,
      //   time: '2020-03-04 13:44:23'
      // }, {
      //   address: 'x0565555555555',
      //   trustType: 3,
      //   time: '2020-03-04 13:44:23'
      // }, {
      //   address: 'x0565555555555',
      //   trustType: 2,
      //   time: '2020-03-04 13:44:23'
      // }]
    })
  },
  async TrustLOOP() {
    //挖矿-对某地址添加信任
    let _address = adLOOPToken
    const trustV = web3js.utils.toWei('0.160')
    console.log('TrustLOOP', _address, trustV, cfx.defaultAccount)
    await icLoopsMeContract.transfer(_address, trustV).sendTransaction({
      from: cfx.defaultAccount
    })
    // await icPoolContract.claim().sendTransaction({ from: cfx.defaultAccount });
    return Promise.resolve()
  },
  async addTrust(_address) {
    //挖矿-对某地址添加信任
    const oldAddress = cfxJS.format.hexAddress(_address)
    const trustV = web3js.utils.toWei('0.101')
    console.log('addTrust', oldAddress, trustV, cfx.defaultAccount)
    await icLoopsMeContract.transfer(oldAddress, trustV).sendTransaction({
      from: cfx.defaultAccount
    })
    // await icPoolContract.claim().sendTransaction({ from: cfx.defaultAccount });
    return Promise.resolve()
  },
  async minusTrust(_address) {
    //挖矿-对某地址删除信任
    const oldAddress = cfxJS.format.hexAddress(_address)
    const trustV = web3js.utils.toWei('0')
    await icLoopsMeContract.transfer(oldAddress, trustV).sendTransaction({
      from: cfx.defaultAccount
    })
    return Promise.resolve()
  },
  checkAddress(address) {
    if (!ADDRESS_REGEX.test(address)) {
      errorNotic('地址错误')
      return false
    }
    return true
  },
  /////////////////////////////////////新需求分割线//////////////////////////////////////////
  //通过地址获取某地址loopss及信任数
  getLoopInfoByAddress(address) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          trusting: 2342342, //正在信任数量
          truster: 3634646, //信任者数量
          isTrusted: false, //该地址是否已经被信任
          haveTrust: '40%', //已信任百分比
          beTrusted: '60%', //被信任百分比
          loopss: 1243.354, //持仓
        })
      }, 1500)
    })
  },
  //获取loopss用户列表
  getLoopssUsers(){
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          total: 100,
          list: [{
            trustSender: 'x0565555555555',
            trustType: 2,
            time: '2020-03-04 13:44:23'
          }, {
            trustSender: 'x0565555555555',
            trustType: 3,
            time: '2020-03-04 13:44:23'
          }, {
            trustSender: 'x0565555555555',
            trustType: 2,
            time: '2020-03-04 13:44:23'
          }, {
            trustSender: 'x0565555555555',
            trustType: 1, //1已信任您 2您已信任 3互相信任
            time: '2020-03-04 13:44:23'
          }, {
            trustSender: 'x0565555555555',
            trustType: 2,
            time: '2020-03-04 13:44:23'
          }, {
            trustSender: 'x0565555555555',
            trustType: 3,
            time: '2020-03-04 13:44:23'
          }, {
            trustSender: 'x0565555555555',
            trustType: 2,
            time: '2020-03-04 13:44:23'
          }]
        })
      }, 1500)
    })
  }
}

export default Api
