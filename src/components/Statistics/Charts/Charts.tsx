import React, {useState} from 'react';
import dayjs from 'dayjs';
import TodoCharts from './TodoCharts';
import {connect} from 'react-redux';
import _ from 'lodash';



type Props={
    todos: any[];
    tomatoes:any[];
}



const Charts:React.FC<Props> = (props) => {
    const todos = props.todos;
    const finishedTodos=()=>{
        return todos.filter(t => t.completed && !t.deleted);
    }
    const dailyTodos = ()=>{
        return _.groupBy(finishedTodos(), (todo) => {
            return dayjs(todo.updated_at).format('YYYY-MM');
        });
    }


    console.log(Object.keys(dailyTodos())[0]);



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

    console.log(days);
    // for (let i = 0; i < dayjs(date).daysInMonth(); i++) {
    //
    // }

    const [option]= useState({
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
        }]
    })




    return (
        <div>
            <input type="month" value={date} onChange={onDateChange}/>
            <TodoCharts option={option}/>
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