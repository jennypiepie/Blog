import {React,useState} from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate} from 'react-router-dom'
import "./less/Login.less"
import {LoginApi,RegisterApi} from '../request/api'

export default function Login() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const changeShow = () => {
    setShow (!show)
  }

  const Login = (values) => {
    LoginApi({
      username: values.username,
      password: values.password
    }).then(res=>{
      if(res.errCode===0){
        message.success(res.message)
        // 存储数据
        localStorage.setItem('avatar', res.data.avatar)
        localStorage.setItem('cms-token', res.data['cms-token'])
        localStorage.setItem('editable', res.data.editable)
        localStorage.setItem('player', res.data.player)
        localStorage.setItem('username', res.data.username)
        // 跳转到根路径
        setTimeout(()=>{
          navigate('/')
        }, 1500)
      }else{
        message.error(res.message)
      }
    })
  };

  const Register = (values) => {
    RegisterApi({
      username: values.username,
      password: values.password
    }).then(res=>{
      if(res.errCode===0){
        message.success(res.message);
        // 跳到登录页
        setTimeout(()=>changeShow, 1500)
      }else{
        message.error(res.message);
      }
    })
  };

  return (
    <div className="login">
      <div className='login_box'>
        <h1>WELCOME</h1>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={show?Register:Login}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            className='input'
            rules={[
              {
                required: true,
                message: '请输入用户名！',
              },
            ]}
          >
            <Input size="large" prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            className='input'
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          >
            <Input.Password size="large" prefix={<LockOutlined />} placeholder="请输入密码" />
          </Form.Item>
          
          {
            show&&<Form.Item
            name="confirm"
            className='input'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请再次确认密码！',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('请输入相同密码！'));
                },
              }),
            ]}
          >
            <Input.Password size="large" prefix={<LockOutlined />} placeholder="请再次确认密码" />
          </Form.Item>
          }

          <Form.Item>
            <Button size='large'
              style={{
                background: 'radial-gradient(#70cccc, #b7e1e4, #e2f5f5)',
                color: '#e2f5f5'
              }} htmlType="submit" block>{show ? ' 注册 ':'登录'}</Button>
          </Form.Item>

          <Form.Item>
            <div onClick={changeShow} className='switch'>{show?'已有账号？前往登录':'还没账号？立即注册'}</div>
          </Form.Item>
        </Form>
      </div>
      <ul className="bg-squares">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  )
}
