import React from 'react';
import {connect} from 'react-redux';
import TodoInput from './TodoInput';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import {Empty} from 'antd';

const Wrapper = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: calc(50% - 8px);
  box-shadow: 0 2px 0 rgba(225, 225, 225, .2);
  background: #fff;

  > main {
    margin-top: 16px;
    min-height: 130px;
  }
`;


class Todos extends React.Component<any, any> {


    get unDeletedTodos() {
        return this.props.todos.filter((t: { deleted: any; }) => !t.deleted);
    }

    get unCompletedTodos() {
        return this.unDeletedTodos.filter((t: { completed: any; }) => !t.completed);
    }

    // get completedTodos() {
    //     return this.unDeletedTodos.filter((t: { completed: any; }) => t.completed);
    // }


    public render() {
        const UncompleteList = () => {
            if (this.unCompletedTodos.length === 0) {
                return (<Empty/>);
            } else {
                return (this.unCompletedTodos.map((t: { id: any; }) => <TodoItem key={t.id} {...t}/>));
            }
        };

        return (
            <Wrapper className="Todos">
                <TodoInput/>
                <main>
                    <UncompleteList/>
                    {/*{this.unCompletedTodos.map((t: { id: any; }) => <TodoItem key={t.id} {...t}/>)}*/}
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


export default connect(mapStateToProps)(Todos);