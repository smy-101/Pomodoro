import React from 'react';
import {Menu, Dropdown, message} from 'antd';
import {DownOutlined, PoweroffOutlined} from '@ant-design/icons';
import history from '../config/history'

function handleMenuClick(e: any) {
    message.info('Click on menu item.');
    console.log('click', e);
}

const logout = () => {
    localStorage.setItem('x-token', '');
    history.push('/login')
};
const menu = (
    <Menu onClick={handleMenuClick}>

        <Menu.Item key="2" onClick={logout} icon={<PoweroffOutlined/>}>
            注销
        </Menu.Item>
    </Menu>
);

interface Props {
    name: string;
}

class Drop extends React.Component<Props, any> {


    public render() {
        const {name} = this.props;
        return (
            <div>
                <Dropdown overlay={menu}>
                    <span>
                        {name}
                        <DownOutlined style={{marginLeft: 8}}/>
                    </span>
                </Dropdown>
            </div>
        );
    }
}

export default Drop;