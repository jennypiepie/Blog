import React, { useEffect, useState } from 'react'
import { Form, Input, Button, message, Upload } from 'antd';
import {GetUserDataApi, ChangeUserDataApi} from '../request/api'
import "./less/Means.less"
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'


// 限制图片大小只能是200KB
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 / 1024  < 200;
  if (!isLt2M) {
    message.error('请上传小于200KB的图!');
  }
  return isJpgOrPng && isLt2M;
}

function Means(props){
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(process.env.SERVER_PORT + localStorage.getItem('avatar'))
  const navigate = useNavigate()

  useEffect(()=>{
    GetUserDataApi().then(res=>{
      if(res.errCode===0){
        // 存到sessionStorage
        sessionStorage.setItem('username', res.data.username)
        sessionStorage.setItem('password', res.data.password)
      }
    })
  }, [])

  // 表单提交的事件
  const onFinish = (values) => {
    // 如果表单的username有值，同时密码非空
    if(values.username && values.password.trim() !== ""){
      // 做表单的提交...
      ChangeUserDataApi({
        username: values.username,
        password: values.password
      }).then(res=>{
        // 当你修改成功的时候，不要忘了重新登录
        if (res.errCode === 0) {
        sessionStorage.setItem('username', values.username)
        sessionStorage.setItem('password', values.password)
        message.success(res.message);
        // 跳到登录页
        setTimeout(()=>navigate('/login'), 1500)
        }else{
          message.error(res.message);
        }
      })
    }
  }

  // 点击了上传图片
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false)
      if (info.file.response.errCode === 0) {
        message.success('头像修改成功')
        // 存储图片名称
        localStorage.setItem('avatar', info.file.response.data.avatar)
        setImageUrl(process.env.SERVER_PORT + localStorage.getItem('avatar'))
        // 使用react-redux更新header组件
        props.addKey()
      }

    }
  };

  // 上传按钮
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className='means'>
      <Form
        name="basic"
        style={{width: '400px'}}
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          username: sessionStorage.getItem('username'),
          password: sessionStorage.getItem('password')
        }}
      >
        <Form.Item label="用户名：" name="username" style={{ textAlign: 'right' }}
          rules={[
              {
                required: true,
                message: '请输入用户名！',
              },
            ]}>
          <Input placeholder='请输入新用户名' style={{width:300}}/>
        </Form.Item>

        <Form.Item label="密 码 ：" name="password" style={{ textAlign: 'right' }}
          rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}>
          <Input.Password placeholder='请输入新密码' style={{width:300}}/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{float: 'right'}}>保存</Button>
        </Form.Item>
      </Form>
      <p>点击下方修改头像：</p>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{ "blog-token": localStorage.getItem('blog-token') }}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%'}} /> : uploadButton}
      </Upload>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    addKey(){
      dispatch({type: "addKeyFn"})
    }
  }
}

export default connect(null, mapDispatchToProps)(Means)