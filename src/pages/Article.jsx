import React, { useState, useEffect,useRef } from 'react'
import { List, Skeleton, Button, message,BackTop } from 'antd';
import {UpOutlined,EditOutlined,DeleteOutlined,SendOutlined} from "@ant-design/icons";
import { ArticleListApi, ArticleDelApi } from '../request/api'
import {useNavigate} from 'react-router-dom'
import moment from 'moment'
import './less/Article.less'
import { useRecoilState } from 'recoil';
import { listStore} from '../store'
  
export default function Article() {
  const navigate = useNavigate()
  const ref = useRef(1)
  const [list,setList] = useRecoilState(listStore)

  const getList = async (current) => {
      await ArticleListApi({
        current,
        counts:10
      }).then(res => {
        if (res.errCode === 0) {
          setList((old)=>[...old,...res.data.arr])
        }
      })
  }

    // 监听页面滚动
  const handleOnScroll = () => {
        const contentScrollTop = document.body.scrollTop||document.documentElement.scrollTop; //滚动条距离顶部
        const clientHeight = window.innerHeight;//可视区域
        const scrollHeight = document.body.scrollHeight; //滚动条内容的总高度
        if (contentScrollTop + clientHeight >= scrollHeight) {
          ref.current += 1
          getList(ref.current)
        }
    };

  // 请求列表数据  componentDidMount
  useEffect(() => {
    getList(ref.current)
    window.addEventListener('scroll', handleOnScroll)
    return () => {window.removeEventListener('scroll',handleOnScroll)}
  }, [])

  // 删除
  const delFn = (id) => {
    ArticleDelApi({ id }).then(res => {
      if(res.errCode===0){
        message.success(res.message)
        window.location.reload()
      }else{
        message.error(res.message)
      }
    })
  }

  return (
    <div className='layout-content'>
      <List
        dataSource={list}
        renderItem={item => (
          <List.Item
            className='box-shadow'
            actions={[
              <Button className='ico' onClick={()=>navigate('/edit/'+item.id)}><EditOutlined /></Button>,
              <Button className='ico' onClick={()=>delFn(item.id)}><DeleteOutlined /></Button>
            ]}
          >
            <Skeleton loading={false}>
              <div className='time'>{moment(item.date).format("YYYY-MM-DD")} | {<a href="!#">{item.tag}</a>}</div>
              <List.Item.Meta
                title={item.title}
                description={<div dangerouslySetInnerHTML = {{ __html: item.content }} className='cutline'/>}
              />
            </Skeleton>
          </List.Item>
        )}
      />

      <div className="newArticle" onClick={()=>navigate('/edit')}>
        <SendOutlined />
      </div>
      
      <BackTop visibilityHeight = "1200">
        <div>
          <UpOutlined />
        </div>
      </BackTop>
    </div>
  )
}
