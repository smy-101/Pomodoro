import React from 'react';
import TodoInput from './TodoInput';
import axios from '../../config/axios';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const Wrapper = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: calc(50% - 8px);
  box-shadow: 0 2px 0 rgba(225,225,225,.2);
  background: #fff;
  >main{
    margin-top: 16px;
  }
`;

interface ITodosState {
    todos: any[]
}

class Todos extends React.Component<any, ITodosState> {
    constructor(props: any) {
        super(props);
        this.state = {
            todos: []
        };
    }
    get unDeletedTodos(){
        return this.state.todos.filter(t=>!t.deleted)
    }

    get unCompletedTodos(){
        return this.unDeletedTodos.filter(t=>!t.completed)
    }

    get completedTodos(){
        return this.unDeletedTodos.filter(t=>t.completed)
    }


    addTodo = async (params: any) => {
        const {todos} = this.state;
        try {
            const response = await axios.post('todos', params);
            this.setState({todos: [response.data.resource, ...todos]});
            console.log(response.data);
        } catch (e) {
            throw new Error(e);
        }
    };

    componentDidMount() {
        this.getTodos();
    }

    getTodos = async () => {
        try {
            const response = await axios.get('todos');
            const todos = response.data.resources.map((t: any) => Object.assign({}, t, {editing: false}));
            this.setState({todos});
        } catch (e) {
            throw new Error(e);
        }
    };
    updateTodo = async (id: number, params: any) => {
        const {todos} = this.state;
        try {
            const response = await axios.put(`todos/${id}`, params);
            const newTodos = todos.map(t => {
                if (id === t.id) {
                    return response.data.resource;
                } else {
                    return t;
                }
            });
            this.setState({todos: newTodos});
        } catch (e) {
            throw new Error(e);
        }
    };
    toEditing = (id: number) => {
        const {todos} = this.state;
        const newTodos = todos.map(t => {
            if (id === t.id) {
                return Object.assign({}, t, {editing: true});
            } else {
                return Object.assign({}, t, {editing: false});
            }
        });
        this.setState({todos: newTodos});
    };

    public render() {
        return (
            <Wrapper className="Todos">
                <TodoInput addTodo={(params: any) => this.addTodo(params)}/>
                <main>
                    {
                        this.unCompletedTodos.map(t => <TodoItem key={t.id} {...t}
                                                            update={this.updateTodo}
                                                            toEditing={this.toEditing}
                        />)
                    }
                    {
                        this.completedTodos.map(t => <TodoItem key={t.id} {...t}
                                                                 update={this.updateTodo}
                                                                 toEditing={this.toEditing}
                        />)
                    }
                </main>
            </Wrapper>
        );
    }
}

export default Todos;