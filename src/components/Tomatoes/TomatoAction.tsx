import React from 'react';
import {Button, Input} from 'antd';
import axios from '../../config/axios';
import {CloseCircleOutlined} from '@ant-design/icons';
import CountDown from './CountDown';
import styled from 'styled-components';

const Wrapper=styled.div`
  .countDownWrapper,.inputWrapper{
    position: relative;
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

class TomatoAction extends React.Component<ITomatoActionProps, ITomatoActionState> {
    constructor(props: ITomatoActionProps) {
        super(props);
        this.state = {
            description: ''
        };
    }

    onKeyUp = (e: { keyCode: number; }) => {
        if (e.keyCode === 13 && this.state.description !== '') {
            this.updateTomato();
        }
    };

    updateTomato = async () => {
        try {
            const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,
                {description: this.state.description, ended_at: new Date()});
            this.props.updateTomato(response.data.resource)
            this.setState({description: ''});
        } catch (e) {
            throw new Error(e);
        }
    };
    onFinish = () => {
        this.forceUpdate()
    }


    public render() {
        let html = <div/>;
        if (this.props.unfinishedTomato === undefined) {
            html = <Button onClick={() => (this.props.startTomato())}>开始番茄</Button>;
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
                    <CloseCircleOutlined className="abort"/>
                </div>;
            } else if (timeNow - startedAt < duration) {
                const timer = duration - timeNow + startedAt
                html = (
                    <div className="countDownWrapper">
                        <CountDown timer={timer}
                                   onFinish={this.onFinish}
                                   duration={duration}
                        />
                        <CloseCircleOutlined className="abort"/>
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