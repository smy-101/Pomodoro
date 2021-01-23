import React from 'react';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import _ from 'lodash';
import {Tabs} from 'antd';
import TodoHistoryTodoItem from './TodoHistoryTodoItem';
import styled from 'styled-components';

const Wrapper = styled.div`
  .dailyTodos {
    padding: 16px;
    border: 1px solid #DDD;
    border-radius: 4px;
    margin-bottom: 8px;
    display: flex;

    .summary {
      width: 100px;
      margin-right: 8px;

      .date {
        span:first-child {
          margin-right: 4px;
          color: #222222;
        }

        span:last-child {
          color: #888;
          font-size: 12px;
        }
      }

      .finishedCount {
        font-size: 14px;
        color: #888;
      }
    }

    .todoList {
      flex: 1;
    }
  }
`;


interface ITodoHistoryProps {
    todos: any[];
}

const {TabPane} = Tabs;

class TodoHistory extends React.Component<ITodoHistoryProps, any> {

    get finishedTodos() {
        return this.props.todos.filter(t => t.completed && !t.deleted);
    }

    get deletedTodos() {
        return this.props.todos.filter(t => t.deleted);
    }

    get dailyFinishedTodos() {
        return _.groupBy(this.finishedTodos, (todo) => {
            return dayjs(todo.updated_at).format('YYYY-MM-DD');
        });
    }

    get finishedDates() {
        return Object.keys(this.dailyFinishedTodos).sort((a, b) => Date.parse(b) - Date.parse(a));
    }

    public render() {
        const finishedTodoList = this.finishedDates.map(date => {
            return (
                <div key={date} className="dailyTodos">
                    <div className="summary">
                        <p className="date">
                            <span>{date}</span>
                        </p>
                        <p className="finishedCount">完成了{this.dailyFinishedTodos[date].length}个任务</p>
                    </div>
                    <div className="todoList">
                        {
                            this.dailyFinishedTodos[date].map(todo =>
                                <TodoHistoryTodoItem key={todo.id} todo={todo} itemType="finished"/>)
                        }
                    </div>
                </div>
            );
        });
        const deletedTodoList = this.deletedTodos.map(todo => {
            return (
                <TodoHistoryTodoItem key={todo.id} todo={todo} itemType="deleted"/>
            );
        });

        return (
            <>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="已完成的任务" key="1">
                        <Wrapper>
                            {finishedTodoList}
                        </Wrapper>
                    </TabPane>
                    <TabPane tab="已删除的任务" key="2">
                        <Wrapper>
                            {deletedTodoList}
                        </Wrapper>
                    </TabPane>
                </Tabs>
            </>
        );
    }
}


const mapStateToProps = (state: { todos: any; }, ownProps: any) => {
    return {
        todos: state.todos,
        ...ownProps
    };
};

export default connect(mapStateToProps)(TodoHistory);