import React from 'react';
import {Button} from 'antd';
import axios from '../../config/axios';

class TomatoAction extends React.Component<any, any> {
    startTomato = async () => {
        try {
            const response = await axios.post('tomatoes', {duration: 25 * 60 * 1000});
            console.log(response.data);
        } catch (e) {
            throw new Error(e);
        }
    };

    public render() {
        return (
            <div>
                <Button onClick={this.startTomato}>开始番茄</Button>
            </div>
        );
    }
}

export default TomatoAction;