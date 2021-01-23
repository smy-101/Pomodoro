import React from 'react';
import {connect} from 'react-redux';
import {updateTodo} from '../../../redux/actions/todos-actions';
import axios from '../../../config/axios';
import dayjs from 'dayjs';
import styled from 'styled-components';


const Wrapper = styled.div`
  padding: 8px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;

  .text {
    .time {
      color: #999;
      margin-right: 8px;
    }

    .description {
      color: #222222;
    }
  }

  .action {
    display: none;

    span {
      color: deepskyblue;
      cursor: pointer;

      &:first-child {
        margin-right: 4px;
      }
    }

  }

  &:hover {
    background: #f4f4f4;

    > .action {
      display: block;
    }
  }
`;

interface ITodoHistoryTodoItemProps {
    todo: any;
    itemType: string;
    updateTodo: (payload: any) => void;
}

class TodoHistoryTodoItem extends React.Component<ITodoHistoryTodoItemProps, any> {

    updateTodo = async (params: any) => {
        try {
            const response = await axios.put(`todos/${this.props.todo.id}`, params);
            this.props.updateTodo(response.data.resource);
        } catch (e) {
            throw new Error(e);
        }
    };

    public render() {
        let action;
        let formatText;
        let time;
        if (this.props.itemType === 'finished') {
            formatText = 'HH:mm';
            time = this.props.todo.updated_at;
            action = (
                <div className="action">
                    <span onClick={() => this.updateTodo({finished: false})}>恢复</span>
                    <span onClick={() => this.updateTodo({deleted: true})}>删除</span>
                </div>
            );
        } else if (this.props.itemType === 'deleted') {
            formatText = 'YYYY-MM-DD';
            time = this.props.todo.created_at;
            action = (
                <div className="action">
                    <span onClick={() => this.updateTodo({deleted: false})}>恢复</span>
                </div>
            );
        }
        return (
            <Wrapper className="TodoHistoryTodoItem" id="TodoHistoryTodoItem">
                <div className="text">
                    <span className="time">{dayjs(time).format(formatText)}</span>
                    <span className="description">{this.props.todo.description}</span>
                </div>
                {action}
            </Wrapper>
        );
    }
}


const mapStateToProps = (state: any, ownProps: any) => ({
    ...ownProps
});

const mapDispatchToProps = {
    updateTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoHistoryTodoItem);