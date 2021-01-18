import React from 'react';
import axios from '../config/axios';
import styled from 'styled-components';
import Drop from '../components/Drop';
import Todos from '../components/TODO/Todos';

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 16px;
  >header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 16px 0;
  }
  >main{
    padding: 16px 0;
    display: flex;
    justify-content: space-between;
  }
`;

interface IRouter {
    history: any;
}

interface IIndexState {
    user: any
}

class HomePage extends React.Component<IRouter, IIndexState> {
    constructor(props: IRouter) {
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
            <Wrapper className="HomePage">
                <header>
                    <span>LOGO</span>
                    <Drop name={this.state.user && this.state.user.account}/>
                </header>
                <main>
                    <Todos/>
                </main>
            </Wrapper>
        );
    }
}

export {HomePage};
