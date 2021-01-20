import React from 'react';
import {Button} from 'antd';

interface ITomatoActionProps {
    startTomato: () => void;
    unfinishedTomato: any;
}

class TomatoAction extends React.Component<ITomatoActionProps, any> {
    constructor(props: ITomatoActionProps) {
        super(props);
    }


    public render() {
        return (
            <div>
                <Button onClick={() => (this.props.startTomato())}>开始番茄</Button>
            </div>
        );
    }
}

export default TomatoAction;