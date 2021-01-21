import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
  position: relative;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 0;
  overflow: hidden;

  > span {
    position: relative;
    z-index: 1;
  }

  > .progress {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background: #e9e9e9;
    box-shadow: 1px 0 0 0 rgba(225, 225, 225, 1);
    z-index: 0;
  }
`;


interface ICountDownProps {
    timer: number;
    onFinish: () => void;
    duration: number;
}

interface ICountDownState {
    countDown: number;
}

let timerId: NodeJS.Timeout;

class CountDown extends React.Component<ICountDownProps, ICountDownState> {
    constructor(props: ICountDownProps) {
        super(props);
        this.state = {
            countDown: this.props.timer
        };
    }

    get countDown() {
        const min = Math.floor(this.state.countDown / 1000 / 60);
        const second = Math.floor(this.state.countDown / 1000 % 60);
        return `${min < 10 ? `0${min}` : min}:${second < 10 ? `0${second}` : second}`;
    }

    componentDidMount() {
        timerId = setInterval(() => {
            document.title = `${this.countDown} - 番茄时间`;
            const time = this.state.countDown;
            this.setState({countDown: time - 1000});
            if (time < 1000) {
                document.title = '番茄时间';
                this.props.onFinish();
                clearInterval(timerId);
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(timerId);
    }

    public render() {
        const percent = 1 - this.state.countDown / this.props.duration;
        return (
            <Wrapper>
                <span>{this.countDown}</span>
                <div className="progress" style={{width: `${percent * 100}%`}}/>
            </Wrapper>
        );
    }
}

export default CountDown;