import React from 'react';
import axios from '../config/axios';
import styled from 'styled-components';
import Drop from '../components/Drop';

const Wrapper = styled.div`

`

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

    // logout = () => {
    //     localStorage.setItem('x-token', '');
    //     this.props.history.push('/login');
    // };

    render() {
        return (
            <div className="HomePage">
                <Wrapper>
                    <span>LOGO</span>
                    <Drop name={this.state.user && this.state.user.account}/>
                </Wrapper>
            </div>
        );
    }
}

export {HomePage};
