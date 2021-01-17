import React from 'react';
import TodoInput from './TodoInput';
import axios from '../../config/axios';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const Wrapper = styled.div`
  padding: 16px;
  margin: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
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
            this.setState({todos: response.data.resources});
            console.log(response.data);
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

    public render() {
        return (
            <Wrapper className="Todos">
                <TodoInput addTodo={(params: any) => this.addTodo(params)}/>
                <main>
                    {
                        this.state.todos.map(t => <TodoItem key={t.id} {...t}
                                                            update={this.updateTodo}
                        />)
                    }
                </main>
            </Wrapper>
        );
    }
}

export default Todos;