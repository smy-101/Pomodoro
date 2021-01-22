import React from 'react';
import {Button, Input,Modal} from 'antd';
import axios from '../../config/axios';
import {CloseCircleOutlined} from '@ant-design/icons';
import CountDown from './CountDown';
import styled from 'styled-components';

const Wrapper=styled.div`
  .countDownWrapper,.inputWrapper{
    position: relative;
  }
  .start{
    width: 100%;
  }
  .abort{
    position: absolute;
    right: -6px;top: -6px;
    background: #fff;
    cursor: pointer;
  }
`

interface ITomatoActionProps {
    startTomato: () => void;
    unfinishedTomato: any;
    updateTomato:(payload:any)=>void;
}

interface ITomatoActionState {
    description: string;
}

const { confirm } = Modal;

class TomatoAction extends React.Component<ITomatoActionProps, ITomatoActionState> {
    constructor(props: ITomatoActionProps) {
        super(props);
        this.state = {
            description: ''
        };
    }

    onKeyUp = (e: { keyCode: number; }) => {
        if (e.keyCode === 13 && this.state.description !== '') {
            this.updateTomato({
                description: this.state.description,
                ended_at: new Date()
            })
            this.setState({description: ''})
        }
    };

    abortTomato = ()=>{
        this.updateTomato({aborted: true})
        document.title = '番茄APP';
    }

    updateTomato = async (params:any)=>{
        try {
            const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,params)
            this.props.updateTomato(response.data.resource)
        }catch (e) {
            throw new Error(e)
        }
    }

    onFinish = () => {
        this.forceUpdate()
    }

    showConfirm = () =>{
        confirm({
            title: '您目前正在一个番茄工作时间中，要放弃这个番茄吗？',
            onOk: ()=>{
                this.abortTomato()
            },
            onCancel() {
                console.log('取消');
            },
            cancelText: '取消',
            okText: '确定',
        });
    }


    public render() {
        let html = <div/>;
        if (this.props.unfinishedTomato === undefined) {
            html = <Button className="start" onClick={() => (this.props.startTomato())}>开始番茄</Button>;
        } else {
            const startedAt = Date.parse(this.props.unfinishedTomato.started_at);
            const duration = this.props.unfinishedTomato.duration;
            const timeNow = new Date().getTime();
            if (timeNow - startedAt > duration) {
                html = <div className="inputWrapper">
                    <Input placeholder="请输入你完成的任务"
                           value={this.state.description}
                           onChange={(e) => this.setState({description: e.target.value})}
                           onKeyUp={(e) => this.onKeyUp(e)}
                    />
                    <CloseCircleOutlined className="abort" onClick={this.showConfirm}/>
                </div>;
            } else if (timeNow - startedAt < duration) {
                const timer = duration - timeNow + startedAt
                html = (
                    <div className="countDownWrapper">
                        <CountDown timer={timer}
                                   onFinish={this.onFinish}
                                   duration={duration}
                        />
                        <CloseCircleOutlined className="abort" onClick={this.showConfirm}/>
                    </div>
                );
            }
        }
        return (
            <Wrapper>
                {html}
            </Wrapper>
        );
    }
}

export default TomatoAction;