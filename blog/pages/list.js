
import React, { useState } from 'react'
import Head from 'next/head'
import { Row, Col, List, Icon, Breadcrumb } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/list.css'
import axios from 'axios'
import Link from 'next/link'
import store from '../store'


const Listrow = (props) => {
    let { listNum, imgNum } = props
    let { list } = listNum
    let { imgurl} = imgNum
    


    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                        <List
                            itemLayout="vertical"
                            dataSource={list}
                            renderItem={item => (
                                <List.Item>
                                <div className="list-title" >
                                    <Link href={{ pathname: '/detailed', query: { data: item._id } }}>
                                        <a>{item.blogtitle}</a>
                                    </Link>
                                </div>
                                <div className="list-icon">
                                    <span><Icon type="calendar" /> {item.publishTime.slice(0, 10)}</span>
                                    <span><Icon type="folder" />
                                        {item.tagList.map((items, index) => <span key={index}>{items.tagname}</span>)}
                                    </span>
                                    <span><Icon type="fire" /> {item.watchnum}人</span>
                                </div>
                                <div className="list-context">{item.briefcontent}</div>
                                <div className="look-more">
                                    <Link href={{ pathname: '/detailed', query: { data: item._id } }}>
                                        <a><Icon type="fire" />查看全文</a>
                                    </Link>
                                </div>
                                </List.Item>
                            )}
                        />
                    </div>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author />
                    <Advert arr={imgurl}/>
                </Col>
            </Row>
            <Footer />

        </>
    )
}

    Listrow.getInitialProps = async () => {
    const promise = await new Promise((resolve) => {
        axios('http://localhost:3000/api/writeblog/find').then((res) => {
            resolve(res.data.data)
        })
    })
    const promiseReadUrl = await new Promise((resolve) => {
        axios.post('http://localhost:3000/api/uploadImg/readImgUrl').then((res) => {
            store.dispatch({ type: res.data.data })
            resolve(res.data.data)
        })
    })
    return { listNum: promise, imgNum: promiseReadUrl }
}

export default Listrow