<script setup>
import { Notice, Message, Modal } from 'view-ui-plus'
import moment from "moment";


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
            width:180,
        },
        {
            title: '工时',
            key: 'time',
            align:"center"
        },
        {
            title: '剩余(秒)',
            key: 'second',
            align:"center"
        },
        {
            title: '剩余(分)',
            key: 'minute',
            align:"center"
        }
    ],
    data: [],

    countSecond:0,

    htmlValue:""
})

const dataTime = computed(()=>form.data.map(item=>{
    if( item.ee&&item.ss ){
        let second = moment(item.ee).format('X')-moment(item.ss).format('X');
        second = second-1*60*60; //减去午休一小时

        item.second = (second-8*60*60);
        item.minute = ((second-8*60*60)/60).toFixed(3);

        item.time = (second/60/60).toFixed(3);
    }
    return item;
}))

watch(dataTime, (newValue, oldValue) => {
    form.countSecond = eval(newValue.map(item=>Number(item.second||0)).join("+"))
});


const initLoaderData = function(html=null){
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
        return tttt.map(item=>item.match(cc)[0]);
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
onMounted(() => {

})

</script>

<template>
    <div class="index-page">
        <Table :columns="form.columns" :data="dataTime"></Table>
        <Row class="mt">
            <Col span="11">
                <Card>
                    <NumberInfo sub-title="秒数" :total="form.countSecond||0" />
                </Card>
            </Col>
            <Col span="2"></Col>
            <Col span="11">
                <Card>
                    <NumberInfo sub-title="分钟" :total="form.countSecond/60" />
                </Card>
            </Col>
        </Row>
        <Input class="mt" v-model="form.htmlValue" type="textarea" :rows="6" placeholder="请输入" />

        <div class="fooder">
            <Button class="btn" type="primary" size="large" long @click="lookSubmit()">查 询</Button>
        </div>
    </div>


    <!-- loading -->
    <Spin size="large" fix :show="form.loading"></Spin>
</template>

<style lang="scss">
.index-page{
    width: 100%;
}
.mt{
    margin-top: 20px;
}
.fooder{
    width: 100%;padding: 20px 0;
    display: flex;justify-content: center;align-items: center;
}
</style>
