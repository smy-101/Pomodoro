import React from 'react';
import {Checkbox} from 'antd';
import {DeleteOutlined, EnterOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import classNames from 'classnames'

const Wrapper = styled.div`
  display: flex;
  padding: 8px 0 8px 8px;
  align-items: center;
  border-bottom: 1px solid #ddd;
  &:hover{background: #f9f9f9}
  &:first-child{
    border-top: 1px solid #ddd;
  }
  &.editing{background: #fff3d2}
  &.completed{
    >.text{
      text-decoration: line-through;
      color: #a9a9a9;
    }
  }
  >.editing,>.text{
    padding: 0 8px;
    flex: 1;
  }
  >.editing{
    display: flex;
    justify-content: space-between;
    align-items: center;
    >input{
      border: 0;
      outline: none;
      background: transparent;
    }
    >.iconWrapper>.anticon{
      margin-left: 4px;
      color: #a9a9a9;
      cursor: pointer;
    }
  }
`

interface ITodoItemProps {
    id: number
    description: string;
    completed: boolean;
    update: (id: number, params: any) => void;
    editing: boolean;
    toEditing: (id: number) => void;
}

interface ITodoItemState{
    editText:string;
}

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
    constructor(props: ITodoItemProps) {
        super(props);
        this.state = {
            editText: this.props.description
        };
    }


    update = (params: any) => {
        this.props.update(this.props.id, params);
    };
    toEditing = () => {
        this.props.toEditing(this.props.id);
    };

    onKeyUp=(e: { keyCode: number; })=>{
        if (e.keyCode === 13 && this.state.editText !== '') {
            this.update({description:this.state.editText})
        }
    }


    public render() {
        const Editing = (
            <div className="editing">
                <input type="text" value={this.state.editText}
                onChange={e=>this.setState({editText:e.target.value})}
                onKeyUp={this.onKeyUp}
                />
                <div className="iconWrapper">
                    <EnterOutlined/>
                    <DeleteOutlined onClick={e => this.update({deleted: true})}/>
                </div>
            </div>
        );

        const Text = <span className="text" onDoubleClick={this.toEditing}>{this.props.description}</span>;
        const todoItemClass=classNames({
            TodoItem:true,
            editing:this.props.editing,
            completed:this.props.completed
        })

        return (
            <Wrapper className={todoItemClass}>
                <Checkbox checked={this.props.completed}
                          onChange={e => this.update({completed: e.target.checked})}
                />
                {
                    this.props.editing ? Editing : Text
                }
            </Wrapper>
        );
    }
}

export default TodoItem;