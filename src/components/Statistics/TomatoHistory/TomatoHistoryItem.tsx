import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {updateTomato,editTomato} from '../../../redux/actions/tomatoes-actions';
import axios from '../../../config/axios';
import classNames from 'classnames';


const Wrapper = styled.div`
  padding: 8px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  
  >div>.time{
    color: #999;
    margin-right: 8px;
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

  &:first-child {
    border-top: 1px solid #ddd;
  }

  &.editing {
    background: #fff3d2
  }

  > .editing, > .text {
    padding: 0 8px;
    flex: 1;
  }

  > .editing {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const InputWrapper= styled.input`
  border: 1px black solid;
  outline: none;
  background: white;
`

interface ITomatoListProps {
    tomato: any;
    updateTomato: (payload: any) => void;
    editTomato: (id: number) => any;
}

interface ITomatoListState {
    editText: string;
    editing: boolean;
}



class TomatoHistoryItem extends React.Component<ITomatoListProps, ITomatoListState> {
    constructor(props: ITomatoListProps) {
        super(props);
        this.state = {
            editText: this.props.tomato.description,
            editing:false
        };
    }
    updateTomato = async (params: any) => {
        try {
            const response = await axios.put(`tomatoes/${this.props.tomato.id}`, params);
            this.props.updateTomato(response.data.resource);
        } catch (e) {
            throw new Error(e);
        }
    };

    editTomato = () => {
        // this.props.editTomato(this.props.tomato.id);
        this.setState({editing:true})
    };

    onKeyUp = (e: { keyCode: number; }) => {
        if (e.keyCode === 13 && this.state.editText !== '') {
            this.updateTomato({description: this.state.editText});
            this.setState({editing:false})
        }
    };

    onTomato=()=>{
            this.updateTomato({description: this.state.editText});
            this.setState({editing:false})
    }


    public render() {
        let time1;
        let time2;
        time1 = this.props.tomato.created_at;
        time2= this.props.tomato.ended_at;
        let action;
        if(this.state.editing){
            action=(
                <div className="action">
                    <span onClick={this.onTomato}>提交</span>
                    <span onClick={() => this.setState({editing:false})}>取消</span>
                </div>
            )
        }else {
            action=(
                <div className="action">
                    <span onClick={()=>this.setState({editing:true})}>编辑</span>
                    <span onClick={() => this.updateTomato({aborted: true})}>删除</span>
                </div>

            )
        }


        const Editing = (
                <InputWrapper type="text" value={this.state.editText}
                       onChange={e => this.setState({editText: e.target.value})}
                       onKeyUp={this.onKeyUp}
                />
        );
        const Text = <span className="text" onDoubleClick={this.editTomato}>{this.props.tomato.description}</span>;
        const tomatoItemClass = classNames({
            TomatoItem: true,
            editing: this.state.editing,
        });

        return (
            <Wrapper className={tomatoItemClass}>
                <div>
                    <span className="time">{dayjs(time1).format('HH:mm')}-{dayjs(time2).format('HH:mm')}</span>
                    <span>{this.state.editing ? Editing : Text}</span>
                </div>
                {action}
            </Wrapper>
        );
    }
}


const mapStateToProps = (state: { tomatoes: any; }, ownProps: any) => ({
    tomatoes: state.tomatoes,
    ...ownProps
});
const mapDispatchToProps = {
    updateTomato,editTomato
};

export default connect(mapStateToProps, mapDispatchToProps)(TomatoHistoryItem);