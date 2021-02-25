import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import _ from 'lodash';
import TodoHistory from './TodoHistory/TodoHistory';
import TomatoHistory from './TomatoHistory/TomatoHistory';
import Charts from './Charts/Charts';
import statisticssvg from '../../icons/statistics.svg'



const Wrapper = styled.div`
  ul {
    display: flex;

    li {
      flex: 1;
    }
  }
`;

const LiWrapper = styled.li`
  border: 1px solid #e4e4e4;
  display: flex;
  min-height: 90px;
  cursor: pointer;
  box-shadow: 0 2px 0 hsl(0deg 0% 88% / 20%);
  justify-content:center;
  align-items: center;
  >img{
    width: 60px;
    height: 60px;
  }
`

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
                    <LiWrapper>
                        <img src={statisticssvg} alt=""/>
                        统计
                    </LiWrapper>
                    <LiWrapper>
                        番茄历史
                        累计完成{this.finishedTomatoes.length}个任务
                    </LiWrapper>
                    <LiWrapper>
                        Todo历史
                        累计完成{this.finishedTodos.length}个Todo
                    </LiWrapper>
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