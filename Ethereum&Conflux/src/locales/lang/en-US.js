import antdEnUS from 'ant-design-vue/es/locale-provider/en_US'
import momentEU from 'moment/locale/eu'

const components = {
  antLocale: antdEnUS,
  momentName: 'eu',
  momentLocale: momentEU
}

const locale = {
  hello: 'Hello',
  slogan: 'Trust, No pledge',
  noMore: 'All List loaded all',
  goBack: 'Go Back',
  setting: 'Setting',
  reset: 'Reset',
  transfer: 'Transfer',
  transaction: 'Transaction',
  toTrust: 'Trust',
  beTrusted: 'Be Trusted',
  truster: 'Truster',
  haveTrust: 'Have Trust',
  holder: 'Holder',
  trusting: 'Trusting',
  menu: {
    home: 'Home',
    mining: 'Mining',
    trust: 'Trust',
    homePage: 'Home Page',
    wallet: 'Wallet',
    more: 'Learn More',
    wait: 'Coming Soon'
  },
  head: {
    login: 'Sign in',
    logout: 'Sign out'
  },
  home: {
    info: {
      title: 'The LOOP is the trust network of the future',
      slogan: 'We are prepared to distribute the currency of the future in a relationship of trust that will enable millions to join',
      totalTip: 'Total LOOP',
      info1: 'LOOP produces one LOOP every 10 seconds, which is shared by all members of the trust network',
      info2: 'The more friends you have to trust, the faster you can accumulate loops than anyone else'
    },
    mining: {
      total: 'Total LOOP',
      minedTotal: 'Mininged',
      trustTotal: 'Network trust volume'
    },
    task: {
      title: 'Current Task',
      info: 'Invite your friends or acquaintances to participate in trust relationship authentication and unlock mining privileges',
      shareTip: 'Or share in the following ways'
    },
    loginBtn: {
      title: 'Select the following ways to login',
      btnTextCfx: 'Login By ConfluxPotal',
      btnTextEth: 'Login By Metamask'
    }
  },
  mining: {
    info: {
      title: 'Welcome to the future of trust',
      slogan1: 'You need to invite',
      slogan2: 'friends to trust you to start digging the LOOP',
      loopAddress: 'LOOPToken contract address'
    },
    mining: {
      title: 'You get the LOOP',
      curToken: 'The current balance',
      unClaimTokens: 'To receive',
      trustCalc: 'Trust is force',
      tip1: 'Remaining collection time',
      tip2: 'After expiration, the LOOP will disappear. Please pick it up on time every day',
      btnTip: 'Harvest & Update power',
      btnTip1: 'Trust LOOPToken',
      unlocked: 'Unlocked',
      locked: 'Locked',
      steps: {
        step1: {
          info: 'Step 1/2 your address needs three trusts',
          desc: 'Copy the link，start mining after inviting three more people to trust',
          how: 'How'
        },
        next: 'Next',
        step2: {
          info: 'Step 2/2 Click LOOP button to open mining entrance',
          desc: 'Trust LOOPToken before mining',
          why: 'Why'
        },
        step3: {
          info: 'Awesome! Mining has started',
        }
      },
      view: 'View',
    },
    task: {
      title: 'The current task',
      info: 'Invite your friends or acquaintances to participate in trust relationship authentication and unlock mining privileges',
      shareTip: 'Or share in the following ways',
      copy: 'COPY'
    },
    invited: {
      title: 'Trusted person who has been invited',
      titleTip: 'Mining speed'
    }
  },
  trust: {
    title: 'Search And Add Trust',
    placeholder: 'Paste the address here',
    trustYou: 'Have to trust you',
    youTrust: 'You have to trust',
    bothTrust: 'Trust each other',
    unknownTrust: 'Not trust each other',
    yourTrusts: 'People you trust'
  },
  message: {
    copy: 'Copy',
    copySuccess: 'Copy Success',
    copyFail: 'Copy Fail',
    harvestSuccess: 'Harvest & Update power Success',
    harvestFail: 'Trust Number too low',
    packSuccess: 'Token wrapped successfully. Copy LOOPToken address to add to wallet view.',
    packed: 'Approve the packaged contract',
    setting: 'Setting Success'
  },
  homePage: {
    yourHoldings: 'Your Holdings'
  },
  setTrust: {
    title: '设置你对 TA 的信任',
    reset: '重置',
    trust: '信任',
    exchange: '兑换',
    placeholder: {
      trust: '输入信任百分比',
      exchange: '输入兑换比率'
    },
    tip: {
      trust: '信任程度代表了对方单次最多可以获得你余额的百分比',
      exchange: '兑换比率代表了对方需要使用多少个人代币换取我的1个代币'
    }
  }
}

export default {
  ...components,
  ...locale
}
