import React, { useState, useEffect } from 'react'
import { List, Skeleton, Pagination, Button, message,BackTop } from 'antd';
import {UpOutlined,EditOutlined,DeleteOutlined,SendOutlined} from "@ant-design/icons";
import { ArticleListApi, ArticleDelApi } from '../request/api'
import {useNavigate} from 'react-router-dom'
import moment from 'moment'
import './less/Article.less'
  
export default function Article() {
  const [list, setList] = useState([])
  const navigate = useNavigate()
  const [update, setUpdate] = useState(1)
  // const [total, setTotal] = useState(0)
  // const [current, setCurrent] = useState(1)
  // const [pageSize, setPageSize] = useState(10)

  // 请求封装
  // const getList = (num) => {
  //   ArticleListApi({
  //     num,
  //     count: pageSize
  //   }).then(res => {
  //     if (res.errCode === 0) {
  //       let { arr, total, num, count } = res.data;
  //       setList(arr);
  //       setTotal(total);
  //       setCurrent(num);
  //       setPageSize(count);
  //     }
  //   })
  // }
    const getList = (num) => {
    ArticleListApi().then(res => {
      if (res.errCode === 0) {
        let arr = res.data;
        setList(arr);
      }
    })
  }

  // 请求列表数据  componentDidMount
  useEffect(() => {
    getList()
  }, [])

  // 模拟componentDidUpdate
  useEffect(() => {
    getList()
  }, [update])

  // // 分页
  // const onChange = (pages) => {
  //   getList(pages);
  // }

  // 删除
  const delFn = (id) => {
    ArticleDelApi({ id }).then(res => {
      if(res.errCode===0){
        message.success(res.message)
        // 重新刷页面，要么重新请求这个列表的数据   window.reload   调用getList(1)  增加变量的检测
        setUpdate(update+1)
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
