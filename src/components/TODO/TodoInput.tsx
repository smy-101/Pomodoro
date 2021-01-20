import React from 'react';
import {Input} from 'antd';
import {EnterOutlined} from '@ant-design/icons';
import {addTodo,initTodos} from '../../redux/actions/todos-actions';
import {connect} from 'react-redux';
import axios from '../../config/axios';

interface ITodoInputState {
    description: string;
}

interface ITodoInputProps {
    addTodo: (payload: any) => any[];
}


class TodoInput extends React.Component<ITodoInputProps, ITodoInputState> {
    constructor(props: ITodoInputProps) {
        super(props);
        this.state = {
            description: ''
        };
    }

    onKeyUp = (e: { keyCode: number; }) => {
        if (e.keyCode === 13 && this.state.description !== '') {
            this.postTodo();
        }
    };
    postTodo = async ()=>{
        try {
            const response = await axios.post('todos',{description: this.state.description})
            this.props.addTodo(response.data.resource)
        }catch (e) {
            throw new Error(e)
        }
        this.setState({description: ''})
    }



    public render() {
        const {description} = this.state;
        const suffix = description ? <EnterOutlined onClick={this.postTodo}/> : <span/>;

        return (
            <div className="TodoInput">
                <Input
                    placeholder="添加新任务"
                    suffix={suffix}
                    value={description}
                    onKeyUp={this.onKeyUp}
                    onChange={(e) => {this.setState({description: e.target.value});}}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        ...ownProps
    };
};


const mapDispatchToProps = {addTodo,initTodos};


export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);

