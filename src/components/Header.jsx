import React, { useEffect, useState } from 'react'
import logoImg from '../assets/logo.png'
import { Menu, Dropdown, message,Input } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import defaultAvatar from '../assets/defaultAvatar.jpg'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux';

function Header(props) {
    const navigator = useNavigate()
    const [avatar, setAvatar] = useState(defaultAvatar)
    const [username, setUsername] = useState("游客")
    const { Search } = Input;

    // 模拟componentDidMount
    useEffect(() => {
        let username1 = localStorage.getItem('username')
        let avatar1 = localStorage.getItem('avatar')
        if (username1) {
            setUsername(username1)
        }
        if (avatar1) {
            setAvatar('http://47.93.114.103:6688/' + avatar1)
        }
    }, [props.mykey])

    // 退出登录
    const logout = () => {
        message.success('退出成功，即将返回登录页')
        localStorage.clear();   // 清除localStorage中的数据
        setTimeout(() => navigator('/login'), 1500)
    }

    const menu = (
        <Menu>
            <Menu.Item key={1} onClick={() => navigator('/means')}>修改资料</Menu.Item>
            <Menu.Divider />
            <Menu.Item key={2} onClick={logout}>退出登录</Menu.Item>
        </Menu>
    );

    return (
        <header className='box-shadow'>
            <img src={logoImg} alt="" className="logo" />
            <div className='navigation'>
                <Menu theme="light" mode="horizontal">
                    <Menu.Item key="1" onClick={() => navigator('/dynamic')}>动态</Menu.Item>
                    <Menu.Item key="4" onClick={() => navigator('/article')}>文章</Menu.Item>
                    <Menu.Item key="2" onClick={() => navigator('/todo')}>To Do</Menu.Item>
                    <Menu.Item key="5" onClick={() => navigator('/demo')}>Demo</Menu.Item>
                </Menu>
            </div>
            <Search
                placeholder="看看都有啥"
                style={{width: 200}}
            />
            <div className="right">
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <img src={avatar} className="avatar" alt="" />
                        <span>{username}</span>
                        <CaretDownOutlined />
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        mykey: state.mykey
    }
}

export default connect(mapStateToProps)(Header)