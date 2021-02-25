import React, {useState} from 'react';
import dayjs from 'dayjs';
import TodoCharts from './TodoCharts';
import {connect} from 'react-redux';
import _ from 'lodash';
import { Tabs } from 'antd';
import styled from 'styled-components';


const Wrapper=styled.div`
  margin-bottom: 20px;
 >span{
   margin-left: 20px;
   margin-right: 5px;
 }
`


const { TabPane } = Tabs;
type Props={
    todos: any[];
    tomatoes:any[];
}

const Charts:React.FC<Props> = (props) => {
    const todos = props.todos;
    const tomatoes = props.tomatoes;
    const finishedTomato =()=>{
        return tomatoes.filter(t => t.description && t.ended_at && !t.aborted);
    }
    const dailyFinishedTomato=()=>{
        return _.groupBy(finishedTomato(), (tomatoes) => {
            return dayjs(tomatoes.ended_at).format('YYYY-MM-DD');
        });
    }

    const finishedTodos=()=>{
        return todos.filter(t => t.completed && !t.deleted);
    }
    const dailyTodos = ()=>{
        return _.groupBy(finishedTodos(), (todo) => {
            return dayjs(todo.updated_at).format('YYYY-MM-DD');
        });
    }

    const today = dayjs().format('YYYY-MM');
    const [date, setDate] = useState(today);
    const onDateChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setDate(e.target.value);
        console.log(e.target.value);
    };
    const day = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28'];
    let days;
    if (dayjs(date).daysInMonth()===28){
        days = day;
    }else if (dayjs(date).daysInMonth()===29){
        days = [...day,'29'];
    }else if (dayjs(date).daysInMonth()===30){
        days = [...day,'29','30'];
    }else if (dayjs(date).daysInMonth()===31){
        days=[...day,'29','30','31']
    }

    let ydata=[];
    for (let i = 1; i <= dayjs(date).daysInMonth(); i++) {
        if (dailyTodos()[`${date}-${i}`]===undefined){
            ydata.push(0);
        }else {
            ydata.push(dailyTodos()[`${date}-${i}`].length)
        }
    }

    let ydata1=[];
    for (let i = 1; i <= dayjs(date).daysInMonth(); i++) {
        if (dailyFinishedTomato()[`${date}-${i}`]===undefined){
            ydata1.push(0);
        }else {
            ydata1.push(dailyFinishedTomato()[`${date}-${i}`].length)
        }
    }



    let option1 = {
        title:{
            show:true,
            text:'本月Todo表',
            left:375
        },
        xAxis: {
            name:'天数',
            type: 'category',
            data: days
        },
        tooltip:{
          show:true
        },
        yAxis: {
            name:'Todo完成数',
            type: 'value'
        },
        series: [{
            data:  ydata,
            type: 'line'
        }]
    }

    let option2 = {
        title:{
            show:true,
            text:'本月番茄表',
            left:375
        },
        xAxis: {
            name:'天数',
            type: 'category',
            data: days
        },
        tooltip:{
            show:true
        },
        yAxis: {
            name:'番茄完成数',
            type: 'value'
        },
        series: [{
            data:  ydata1,
            type: 'line'
        }]
    }


    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Todo统计" key="1">
                    <Wrapper>
                        <span>当前月份</span>
                        <input type="month" value={date} onChange={onDateChange}/>
                    </Wrapper>
                    <TodoCharts option={option1}/>
                </TabPane>
                <TabPane tab="番茄统计" key="2">
                    <Wrapper>
                        <span>当前月份</span>
                        <input type="month" value={date} onChange={onDateChange}/>
                    </Wrapper>
                    <TodoCharts option={option2}/>
                </TabPane>
            </Tabs>
        </div>
    );
};

const mapStateToProps = (state: { todos: any; tomatoes:any }, ownProps: any) => {
    return {
        todos: state.todos,
        tomatoes: state.tomatoes,
        ...ownProps
    };
};

export default connect(mapStateToProps)(Charts);