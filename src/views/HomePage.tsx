import React from 'react';
import {Button} from 'antd';
import axios from '../config/axios';

interface IRouter {
    history: any;
}

interface IIndexState {
    user: any
}

class HomePage extends React.Component<IRouter, IIndexState> {

    constructor(props: any) {
        super(props);
        this.state = {
            user: {}
        };
    }

    async componentDidMount() {
        await this.getMe();
    }

    getMe = async () => {
        const response = await axios.get('me');
        this.setState({user: response.data});
    };

    logout = () => {
        localStorage.setItem('x-token', '');
        this.props.history.push('/login');
    };

    render() {
        return (
            <div className="Component">
                <p>欢迎，{this.state.user && this.state.user.account}</p>
                <Button onClick={this.logout}>注销</Button>
            </div>
        );
    }
}

export {HomePage}
