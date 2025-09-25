<script setup>
import { Notice, Message, Modal } from 'view-ui-plus'
import moment from "moment";

const currentTime = ref(new Date());
let animationFrameId = null;

// 格式化时间，支持自定义格式
const formattedTime = computed(() => {
  return moment(currentTime.value).format('MM/DD HH:mm:ss');
});

const createCurrentTime = ()=>{
    currentTime.value = new Date();
    // 递归调用，实现持续更新
    animationFrameId = requestAnimationFrame(createCurrentTime);
}


const form = reactive({
    pageShow: false,
    loading: false,

    columns: [
        {
            title: '日期',
            key: 'days',
            width:100,
        },
        {
            title: '开始',
            key: 'ss',
            width:180,
        },
        {
            title: '结束',
            key: 'ee',
            slot:"v_ee",
            width:180,
        },
        {
            title: '工时',
            key: 'time',
            slot:"v_time",
            align:"center"
        },
        {
            title: '剩余(秒)',
            key: 'second',
            slot:"v_second",
            align:"center"
        },
        {
            title: '剩余(分)',
            key: 'minute',
            slot:"v_minute",
            align:"center"
        }
    ],
    data: [],

    countSecond:0,
    countHH:0,

    htmlValue:"",
    cookie:""
})

const dataTime = computed(()=>form.data.map(item=>{
    item._ee = null;
    if( item.ss&&item.ee ){
        let second = moment(item.ee).format('X')-moment(item.ss).format('X');
        second = second-1*60*60; //减去午休一小时

        item.second = (second-8*60*60);
        item.minute = ((second-8*60*60)/60).toFixed(3);

        item.time = (second/60/60).toFixed(3);
    }
    // 预测下一天可以走的时间
    if( item.ss&&!item.ee ){
        let _ee = Number(moment(item.ss).format('X')) + 1*60*60 + 8*60*60 + Number(-form.countSecond)
        item._ee = moment(_ee*1000).format("YYYY-MM-DD HH:mm:ss");
        console.log("_ee",item._ee)
    }
    return item;
}))

// 下班倒计时 下班时间 18:00:00
const downTime = computed(()=>{
    let now = moment().format("YYYY-MM-DD");
    let down = moment(now+" 18:00:00").format("X");
    let nowTime = moment(currentTime.value).format("X");
    let second = down-nowTime;
    if( second<0 ){
        second = 0
        return `一下班`
    }
    // 转为 小时 分钟 秒
    let hour = Math.floor(second/3600);
    let minute = Math.floor((second%3600)/60);
    second = Math.floor(second%60);

    return `${hour}时${minute}分${second}秒`
})


watch(dataTime, (newValue, oldValue) => {
    form.countSecond = eval(newValue.map(item=>Number(item.second||0)).join("+"))
    form.countHH = (eval(newValue.map(item=>Number(item.time||0)).join("+"))).toFixed(3)
});


const initLoaderData = function(html=null){
    localStorage.setItem('htmlData', html);

    function ClearBr(key) { 
        key = key.replace(/[\r]/g, ""); 
        return key; 
    } 
    var str = ClearBr(html);

    let aa = /<td class="column-workfrom_at">\r{0,100}\n{0,100}\ {0,100}\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\r{0,100}\n{0,100}\ {0,100}<\/td>/gm;
    let bb = /<td class="column-workend_at">\r{0,100}\n{0,100}\ {0,100}\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\r{0,100}\n{0,100}\ {0,100}<\/td>/gm;

    let cc = /\r{0,100}\n{0,100}\ {0,100}\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\r{0,100}\n{0,100}\ {0,100}/gm;
    var getSpecificCharacters = function(strTxt,regx){
        let tttt = strTxt.match(regx);
        return tttt&&tttt.map(item=>item.match(cc)[0]);
    }
    let starts = getSpecificCharacters(str,aa);
    let ends = getSpecificCharacters(str,bb);
    let times = [];
    for(let i=5;i>=1;i--){
        let days = moment().startOf('week').add(i, 'day').format("YYYYMMDD")
        let ss = starts.filter(item=>moment(item).format("YYYYMMDD")==days)[0];
        let ee = ends.filter(item=>moment(item).format("YYYYMMDD")==days)[0];
        times.push({ 
            days:days,
            ss,
            ee,
            name:moment(days).day() 
        })
    }
    form.data = times;
}
const lookSubmit = ()=>{
    if( !form.htmlValue ){
        Notice.warning({ title: "请输入查询的内容" });
        return
    }
    initLoaderData(form.htmlValue)
}

// 从localStorage读取数据（默认值兜底）
const getStorage = (key, defaultValue) => {
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : defaultValue;
};

const team_user_id = ref(getStorage('team_user_id', ''));
const nickname = ref(getStorage('nickname', ''));
const password = ref(getStorage('password', ''));
const updata = ref(getStorage('updata', false));

// 监听用户输入状态，自动保存
watch(team_user_id, (val) => localStorage.setItem('team_user_id', JSON.stringify(val)));
watch(nickname, (val) => localStorage.setItem('nickname', JSON.stringify(val)));
watch(password, (val) => localStorage.setItem('password', JSON.stringify(val)));
watch(updata, (val) => localStorage.setItem('updata', JSON.stringify(val)));



const lookApiSubmit = ()=>{
    fetch(`http://localhost:3033/api/html?team_user_id=${team_user_id.value}&nickname=${nickname.value}&password=${password.value}&updata=${updata.value}` )
    .then(response => response.json())
    .then(data => {
        initLoaderData(data.data)
    })
    .catch(error => console.error('请求出错:', error));
}
const change = (status)=>{
    updata.value = status
}


const updataIp = ()=>{
    fetch(`http://localhost:3033/api/ip?nickname=龙张海&password=U18FAevUUDBk1eYl` )
    .then(response => response.json())
    .then(data => {
        Message.success('更新成功！');
    })
    .catch(error => console.error('请求出错:', error));

}

const gameSubmit = ()=>{
    window.location.href = 'http://localhost:3000/game/index.html'
}

onMounted(()=>{
    let html = localStorage.getItem('htmlData');
    if( html ){
        initLoaderData(html)
    }
    
    createCurrentTime()
})

onUnmounted(() => {
  // 组件卸载时停止更新
  cancelAnimationFrame(animationFrameId);
});

</script>

<template>
    <div class="index-page">
        <Row class="mt">
            <Col span="11">
                <Card>
                    <Text strong>
                        当前时间：<span style="color:#ed4014;font-size:22px;">{{formattedTime}}</span>
                    </Text>
                </Card>
            </Col>
            <Col span="2"></Col>
            <Col span="11">
                <Card>
                    <Text strong>
                        倒计时：<span style="color:#ed4014;font-size:22px;">{{downTime}}</span>
                    </Text>
                </Card>
            </Col>
        </Row>
        <Table :columns="form.columns" :data="dataTime">
            <template #v_ee="{ row, index }">
                <div>
                    <Text strong v-if="row.ee">{{row.ee}}</Text>
                    <Text strong v-if="row._ee" style="color:#ed4014;">{{row._ee}}</Text>
                </div>
            </template>
            <template #v_time="{ row, index }">
                <div v-if="row.ss&&row.ee">
                    <Text strong v-if="row.time>=8" style="color:#19be6b;">{{row.time}}</Text>
                    <Text strong v-else style="color:#ed4014;">{{row.time}}</Text>
                </div>
            </template>
            <template #v_second="{ row, index }">
                <div v-if="row.ss&&row.ee">
                    <Text strong v-if="row.time>=8" style="color:#19be6b;">{{row.second}}</Text>
                    <Text strong v-else style="color:#ed4014;">{{row.second}}</Text>
                </div>
            </template>
            <template #v_minute="{ row, index }">
                <div v-if="row.ss&&row.ee">
                    <Text strong v-if="row.time>=8" style="color:#19be6b;">{{row.minute}}</Text>
                    <Text strong v-else  style="color:#ed4014;">{{row.minute}}</Text>
                </div>
            </template>
        </Table>
        <Row class="mt">
            <Col span="7">
                <Card>
                    <Text strong><NumberInfo sub-title="合计时间差值-秒数" :total="form.countSecond||0" /></Text>
                </Card>
            </Col>
            <Col span="1"></Col>
            <Col span="7">
                <Card>
                    <Text strong><NumberInfo sub-title="合计时间差值-分钟" :total="(form.countSecond||0)/60" /></Text>
                </Card>
            </Col>
            <Col span="1"></Col>
            <Col span="7">
                <Card>
                    <Text strong><NumberInfo sub-title="累计时长-当前" :total="form.countHH||0" /></Text>
                </Card>
            </Col>
        </Row>
        
        <!-- <Input class="mt" v-model="form.htmlValue" type="textarea" :rows="6" placeholder="请输入" />

        <div class="fooder">
            <Button class="btn" type="primary" size="large" long @click="lookSubmit()">查 询</Button>
        </div> -->
        

        <div class="fooder">
            <Space direction="vertical">
                <Input prefix="ios-contact-outline" size="large" placeholder="请输入用户名" style="width: auto" v-model="nickname"/>
                <Input type="password" password prefix="ios-lock-outline" size="large" placeholder="请输入密码" style="width: auto" v-model="password"/>
                <Input prefix="ios-disc-outline" size="large" placeholder="请输入用户ID" style="width: auto" v-model="team_user_id"/>
                
                <Space>
                    是否更新Cookie：<Switch v-model="value" @on-change="change" />
                </Space>

                <Button class="btn" type="error" size="large" long @click="lookApiSubmit()">查询数据</Button>

                <Button class="btn" type="" size="large" long @click="updataIp()">更新IP</Button>
            </Space>
        </div>

        <div id="htmlContainer" class="html-content"></div>

    </div>


    <!-- loading -->
    <Spin size="large" fix :show="form.loading"></Spin>


    <!-- <Button class="btn" type="primary" size="large" long @click="gameSubmit()">进入游戏</Button> -->

</template>

<style lang="scss">
.index-page{
    width: 100%;
}
.mt{
    margin-top: 20px;margin-bottom: 20px;
}
.fooder{
    width: 100%;padding: 20px 0;
    display: flex;justify-content: center;align-items: center;
}
.ivu-number-info-total{
    color: #19be6b;
}
.format-time{
    padding: 10px 10px 20px;display: flex;justify-content: center;align-items: center;
    font-size: 16px;font-weight: bold;letter-spacing: 2px;
}
</style>
