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
}

class Login extends React.Component<any, Props> {
    constructor(props: any) {
        super(props);
        this.state = {
            account: '',
            password: '',
        };
    }

    onChange =(key:keyof Props,value:string)=>{
        const newState:any={};
        newState[key]=value
        this.setState(newState)
    }

    submit = async () => {
        const { account,password } = this.state;
        try{
            await axios.post('sign_in/user',{
                account, // account: account
                password
            })
            console.log('success');
            this.props.history.push('/')
        }catch(e){
            throw new Error(e)
        }
    }



    public render() {
        const {account, password} = this.state;
        return (
            <Wrapper>
                <h1>番茄TODO用户登录</h1>
                <Input placeholder="请输入用户名" allowClear
                       prefix={<UserOutlined/>}
                       value={account}
                       onChange={(e) => this.onChange('account',e.target.value)}/>
                <Input.Password
                    value={password}
                    onChange={(e) => this.onChange('password',e.target.value)}
                    placeholder="请输入密码"/>

                <Button type="primary" onClick={this.submit}>登录</Button>
                <p>如果您未注册帐号，请在此<Link to="/signup">注册</Link></p>
            </Wrapper>
        );
    }
}

export {Login};