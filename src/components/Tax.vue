<template>
<div>
    <span>个人所得税计算：</span>
    <div class="common">
    <el-input v-model="beforePay" placeholder="请输入税前工资" class="input"></el-input>
    <el-button @click="computer()">计算</el-button>
    <span class="word">税前工资:{{beforePay}},税后工资:{{resultPay}},五险一金缴纳:{{safe}},缴纳税款:{{tax}}</span>
    </div>
    <span>银行贷款计算：</span>
    <div class="common">
    <el-input v-model="totalLoan" placeholder="贷款总额" class="input"></el-input>
    <el-input v-model="year" placeholder="贷款年限" class="input"></el-input>
    <el-input v-model="yearNum" placeholder="贷款利息" class="input"></el-input>
    <el-select v-model="value" placeholder="请选择" @change="change">
    <el-option
    v-for="item in options"
    :key="item.value"
    :label="item.label"
    :value="item.value">
    </el-option>
</el-select>
    <el-button @click="calu()" style="height:40px;">计算</el-button>
    <span class="word">总利息:{{totalInterrest}}</span>
    <span v-show="value" class="word">,每月还本金+利息:{{monthMoney}}</span>
    <div v-show="!value" style="height:500px;overflow:auto;">
        <span v-for="item,i in monthMoneyList" class="word" :key="i">第{{i+1}}月还本金+利息:{{item}}<br></span>
    </div>
    </div>
        <span>计算24点：</span>
    <div class="common">
    <el-button @click="caluNumber()" style="height:40px;">计算</el-button>
        <div  style="height:500px;overflow:auto;width:200px;">
        <span v-for="item,i in numList" class="word" :key="i">{{item[0]}},{{item[1]}},{{item[2]}}<br></span>
    </div>
    </div>
</div>
</template>

<script>
export default {
    name:"Tax",
    data(){
        //个人所得税
        let beforePay=0;
        let resultPay=0;
        let safe=0
        let tax=0;
        //银行贷款
        let totalLoan=100000;
        let year=10;
        let yearNum=0.06;
        let value=1;
        let totalInterrest=0;
        let monthMoney=0;
        let monthMoneyList=[]
        //24点
        let numList=[];
        let options=[
            {
                value:0,
                label:'等额本金'
            },
            {
                value:1,
                label:'等额本息'
            },
            ]
        return{beforePay,resultPay,safe,tax,
            totalLoan,year,yearNum,value,options,totalInterrest,monthMoney,monthMoneyList,numList
        }
    },
    methods:{
        computer(){
            this.safe=this.beforePay*0.175;
            this.safe=this.safe>34188*0.175?34188*0.175:this.safe;
            this.safe=this.safe<6520*0.175?6520*0.175:this.safe;
            console.log(this.beforePay);
            this.tax=this.taxComputer(this.beforePay-this.safe);
            this.resultPay=this.beforePay-this.safe-this.tax;
        },
        taxComputer(value){
            console.log(value);
            if(value<=5000){  
                return 0;
                }
            else if(value<=36000){
                return (value-5000)*0.03;
            }else if(value<=144000){
                return (value-36000)*0.1+(36000-5000)*0.03;
            }
            else if(value<=300000){
                return (value-144000)*0.2+(144000-36000)*0.1+(36000-5000)*0.03;

            }
            else if(value<=420000){
                return (value-300000)*0.25+(300000-144000)*0.2+(144000-36000)*0.1+(36000-5000)*0.03;

            }
            else if(value<=660000){
                return (value-420000)*0.3+(420000-300000)*0.25+(300000-144000)*0.2+(144000-36000)*0.1+(36000-5000)*0.03;

            }
            else if(value<=960000){
                return  (value-660000)*0.35+(660000-420000)*0.3+(420000-300000)*0.25+(300000-144000)*0.2+(144000-36000)*0.1+(36000-5000)*0.03;

            }else{
                return  (value-660000)*0.35+(960000-660000)*0.35+(660000-420000)*0.3+(420000-300000)*0.25+(300000-144000)*0.2+(144000-36000)*0.1+(36000-5000)*0.03;
            }

        },
        change(){
            this.$forceUpdate()
        },
        calu(){
            if(this.value==1){
                this.totalInterrest=this.year*this.yearNum*this.totalLoan
                this.monthMoney=(this.totalInterrest+this.totalLoan)/(this.year*12)
            }else{
                this.totalInterrest=(this.year*12+1)*this.totalLoan*this.yearNum/12/2
                let sum=0;
                let average=this.totalLoan/this.year/12;
                this.monthMoneyList=[];
                for(let i=0;i<this.year*12;i++){
                    this.monthMoneyList.push(average+(this.totalLoan-sum)*this.yearNum/12)

                    sum+=average
                    }
            }
        },
        caluNumber(){
            for(let i=1;i<8;i++){
                for(let j=i+1;j<9;j++){
                    for(let k=j+1;k<10;k++){
                        let key=false;
                        let obj=[i,j,k]
                        if(i+j+k===24)key=true;
                        if(i+j*k===24||i*j+k===24||i*k+j===24)key=true;
                        if(i*j-k===24||i*k-j===24||k*j-i===24)key=true;
                        if(i*j/k===24||i*k/j===24||k*j/i===24)key=true;
                        if(key===true)this.numList.push(obj)
                        key=false;
                    }
                }
            }
        }
    }
}
</script>

<style>
    .common{
        display: flex;
        justify-content:flex-start;
    }
    .input{
        width: 200px;
    }
    .word{
        line-height: 40px;
    }
</style>