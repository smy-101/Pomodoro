import React from 'react';
import {Button} from 'antd';

interface Props {
    history :any;
}

const HomePage:React.FC<Props>=(props)=>{
    const login =()=>{
        props.history.push('/login')
    }
    return (
        <div>
            <Button onClick={login}>登录</Button>
        </div>
    )
}

export {HomePage};