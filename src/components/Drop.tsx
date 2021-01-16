import React from 'react';
import {Menu, Dropdown, Button, message} from 'antd';
import {DownOutlined, SettingOutlined, PoweroffOutlined} from '@ant-design/icons';

function handleMenuClick(e: any) {
    message.info('Click on menu item.');
    console.log('click', e);
}

const logout = () => {
    localStorage.setItem('x-token', '');
    window.location.href = '/login';
};
const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1" icon={<SettingOutlined/>}>
            个人设置
        </Menu.Item>
        <Menu.Item key="2" onClick={logout} icon={<PoweroffOutlined/>}>
            注销
        </Menu.Item>
    </Menu>
);
interface Props {
    name?: string;
}

class Drop extends React.Component<Props, any> {
    constructor(props: any) {
        super(props);
    }


    public render() {
        const { name } = this.props;
        return (
            <div>
                <Dropdown overlay={menu}>
                    <Button>
                        {name}
                        <DownOutlined/>
                    </Button>
                </Dropdown>
            </div>
        );
    }
}

export default Drop;