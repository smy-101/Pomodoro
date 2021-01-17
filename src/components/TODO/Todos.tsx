import React from 'react';
import TodoInput from './TodoInput';
import axios from '../../config/axios';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 16px;
  margin: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`


class Todos extends React.Component<any, any> {

    addTodo= async (params:any)=>{
        try {
            const response = await axios.post('todos',params)
            console.log(response.data);
        }catch (e) {
            throw new Error(e)
        }
    }

    public render() {
        return (
            <Wrapper className="Todos">
                <TodoInput addTodo={(params: any)=>this.addTodo(params)}/>
            </Wrapper>
        );
    }
}

export default Todos;