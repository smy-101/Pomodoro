import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import Polygon from './Polygon';
import dayjs from 'dayjs';
import _ from 'lodash';

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

    public render() {
        return (
            <Wrapper>
                <ul>
                    <li>统计</li>
                    <li>目标</li>
                    <li>番茄历史</li>
                    <li>
                        任务历史
                        累计完成{this.finishedTodos.length}个任务
                        <Polygon data={this.dailyTodos} totalFinishedCount={this.finishedTodos.length}/>
                    </li>
                </ul>
            </Wrapper>
        );
    }
}


const mapStateToProps = (state: { todos: any; }, ownProps: any) => {
    return {
        todos: state.todos,
        ...ownProps
    };
};

export default connect(mapStateToProps)(Statistics);