import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import Polygon from './Polygon';
import dayjs from 'dayjs';
import _ from 'lodash';
import TodoHistory from './TodoHistory/TodoHistory';
import TomatoHistory from './TomatoHistory/TomatoHistory';
import Charts from './Charts/Charts';

const Wrapper = styled.div`
  ul {
    display: flex;

    li {
      flex: 1;
    }
  }
`;

interface IStatisticsProps {
    todos: any[];
    tomatoes:any[];
}

class Statistics extends React.Component<IStatisticsProps, any> {
    get finishedTodos() {
        return this.props.todos.filter(t => t.completed && !t.deleted);
    }

    get dailyTodos() {
        return _.groupBy(this.finishedTodos, (todo) => {
            return dayjs(todo.updated_at).format('YYYY-MM-DD');
        });
    }
    get finishedTomatoes(){
        return this.props.tomatoes.filter(t => t.description && t.ended_at && !t.aborted)
    }



    public render() {
        return (
            <Wrapper>
                <ul>
                    <li>统计</li>
                    <li>
                        番茄历史
                        累计完成{this.finishedTomatoes.length}个任务
                    </li>
                    <li>
                        任务历史
                        累计完成{this.finishedTodos.length}个任务
                        <Polygon data={this.dailyTodos} totalFinishedCount={this.finishedTodos.length}/>
                    </li>
                </ul>
                <Charts/>
                <TodoHistory/>
                <TomatoHistory/>
            </Wrapper>
        );
    }
}


const mapStateToProps = (state: { todos: any; tomatoes:any }, ownProps: any) => {
    return {
        todos: state.todos,
        tomatoes: state.tomatoes,
        ...ownProps
    };
};

export default connect(mapStateToProps)(Statistics);