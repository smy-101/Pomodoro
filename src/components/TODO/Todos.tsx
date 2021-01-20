import React from 'react';
import {connect} from 'react-redux';
import {initTodos} from '../../redux/actions/todos-actions';
import TodoInput from './TodoInput';
import axios from '../../config/axios';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const Wrapper = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: calc(50% - 8px);
  box-shadow: 0 2px 0 rgba(225, 225, 225, .2);
  background: #fff;

  > main {
    margin-top: 16px;
  }
`;


class Todos extends React.Component<any, any> {


    get unDeletedTodos() {
        return this.props.todos.filter((t: { deleted: any; }) => !t.deleted);
    }

    get unCompletedTodos() {
        return this.unDeletedTodos.filter((t: { completed: any; }) => !t.completed);
    }

    get completedTodos() {
        return this.unDeletedTodos.filter((t: { completed: any; }) => t.completed);
    }

    componentDidMount() {
        this.getTodos();
    }

    getTodos = async () => {
        try {
            const response = await axios.get('todos');
            const todos = response.data.resources.map((t: any) => Object.assign({}, t, {editing: false}));
            this.props.initTodos(todos);
        } catch (e) {
            throw new Error(e);
        }
    };


    public render() {
        return (
            <Wrapper className="Todos">
                <TodoInput/>
                <main>
                    {
                        this.unCompletedTodos.map((t: { id: any; }) => <TodoItem key={t.id} {...t}
                        />)
                    }
                    {
                        this.completedTodos.map((t: { id: any; }) => <TodoItem key={t.id} {...t}
                        />)
                    }
                </main>
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


const mapDispatchToProps = {initTodos};


export default connect(mapStateToProps, mapDispatchToProps)(Todos);