import React from 'react';
import {UserOutlined} from '@ant-design/icons';
import {Input, Button} from 'antd';
import axios from '../config/axios';

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


    onChangeAccount = (e: { target: { value: any; }; }) => {
        this.setState({account: e.target.value});
    };
    onChangePassword = (e: { target: { value: any; }; }) => {
        this.setState({password: e.target.value});
    };
    onChangePasswordConformation = (e: { target: { value: any; }; }) => {
        this.setState({passwordConformation: e.target.value});
    };
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
            <div>
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
                <Button onClick={this.submit}>注册</Button>
            </div>
        );
    }
}

export {SignUp};