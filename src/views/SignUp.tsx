import React from 'react';
import {UserOutlined} from '@ant-design/icons';
import {Input, Button} from 'antd';
import axios from '../config/axios';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Wrapper = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 50px 0;
  >*{
    margin: 10px 0;
  }
  >h1{
    text-align: center;
  }
  >button{
    width: 100%;
  }
`


interface Props {
    account: string,
    password: string,
    passwordConformation: string
}

class SignUp extends React.Component<any, Props> {
    constructor(props: any) {
        super(props);
        this.state = {
            account: '',
            password: '',
            passwordConformation: ''
        };
    }


    onChangeAccount = (e: { target: { value: string; }; }) => {
        console.log(e.target.value);
        this.setState({ account: e.target.value });
    }

    onChangePassword = (e: { target: { value: string; }; }) => {
        this.setState({ password: e.target.value });
    }

    onChangePasswordConformation = (e: { target: { value: string; }; }) => {
        this.setState({ passwordConformation: e.target.value });
    }
    submit = async () => {
        const { account,password,passwordConformation } = this.state;
        try{
            await axios.post('sign_up/user',{
                account, // account: account
                password,
                password_confirmation:passwordConformation
            })
            console.log('success');
        }catch(e){
            throw new Error(e)
        }
    }


    public render() {
        const {account, password, passwordConformation} = this.state;
        return (
            <Wrapper>
                <h1>番茄TODO用户注册</h1>
                <Input placeholder="请输入用户名" allowClear
                       prefix={<UserOutlined/>}
                       value={account}
                       onChange={this.onChangeAccount}/>
                <Input.Password
                    value={password}
                    onChange={this.onChangePassword}
                    placeholder="请输入密码"/>
                <Input.Password
                    value={passwordConformation}
                    onChange={this.onChangePasswordConformation}
                    placeholder="请确认密码"/>
                <Button type="primary" onClick={this.submit}>注册</Button>
                <p>如果您已有帐号，请在此<Link to="/login">登录</Link></p>
            </Wrapper>
        );
    }
}

export {SignUp};