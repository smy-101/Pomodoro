import React from 'react';
import {Button, Input} from 'antd';
import axios from '../../config/axios';

interface ITomatoActionProps {
    startTomato: () => void;
    unfinishedTomato: any;
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
        if(e.keyCode === 13 && this.state.description !== ''){
            this.updateTomato()
        }
    }

    updateTomato = async ()=>{
        try {
            const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,
                {description:this.state.description,ended_at:new Date()})
            this.setState({description: ''})
            console.log(response);
        }catch (e) {
            throw new Error(e)
        }
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
                    <Input  placeholder="请输入你完成的任务"
                            value={this.state.description}
                            onChange={(e)=>this.setState({description:e.target.value})}
                            onKeyUp={(e)=>this.onKeyUp(e)}
                    />
                </div>;
            } else if (timeNow - startedAt < duration) {
                const timer = duration - timeNow + startedAt;
                html = (
                    <div className="countDownWrapper">
                        倒计时
                    </div>
                );
            }
        }
        return (
            <div>
                {html}
            </div>
        );
    }
}

export default TomatoAction;