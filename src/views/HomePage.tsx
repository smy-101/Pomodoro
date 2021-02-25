import React from 'react';
import axios from '../config/axios';
import styled from 'styled-components';
import Drop from '../components/Drop';
import Todos from '../components/TODO/Todos';
import Tomatoes from '../components/Tomatoes/Tomatoes';
import Statistics from '../components/Statistics/Statistics';
import {connect} from 'react-redux';
import {initTodos} from '../redux/actions/todos-actions';
import {initTomatoes} from '../redux/actions/tomatoes-actions';
import logo from '../icons/tomatoes.svg'

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 16px;

  > header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 16px 0;
  }

  > main {
    padding: 16px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const Img = styled.img`
  height: 35px;
`

interface IIndexState {
    user: any
}

class HomePage extends React.Component<any, IIndexState> {
    constructor(props: any) {
        super(props);
        this.state = {
            user: {}
        };
    }

    async componentDidMount() {
        await this.getMe();
        await this.getTodos();
        await this.getTomatoes();
    }

    getMe = async () => {
        const response = await axios.get('me');
        this.setState({user: response.data});
    };

    getTodos = async () => {
        try {
            const response = await axios.get('todos');
            const todos = response.data.resources.map((t: any) => Object.assign({}, t, {editing: false}));
            this.props.initTodos(todos);
        } catch (e) {
            throw new Error(e);
        }
    };

    getTomatoes = async () => {
        try {
            const response = await axios.get('tomatoes');
            this.props.initTomatoes(response.data.resources);
        } catch (e) {
            throw new Error(e);
        }
    };

    // logout = () => {
    //     localStorage.setItem('x-token', '');
    //     this.props.history.push('/login');
    // };

    render() {
        return (
            <Wrapper className="HomePage">
                <header>
                    <Img src={logo} alt=""/>
                    <Drop name={this.state.user && this.state.user.account}/>
                </header>
                <main>
                    <Tomatoes/>
                    <Todos/>
                </main>
                <Statistics/>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    ...ownProps
});

const mapDispatchToProps = {
    initTodos,
    initTomatoes
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
