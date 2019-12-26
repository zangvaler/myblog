import React from 'react'
import Router from 'next/router'
import '../static/style/components/header.css'

import { Row, Col, Menu, Icon } from 'antd'
const Header = () => {
    //跳转到列表页
    const handleClick = (e)=>{
        if(e.key==0){
            Router.push('/')
        }else if(e.key==1){
            Router.push('/list')
        }


    }



    return(
        <div className="header">
        <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                <span className="header-logo">爱吃鱼的小虾米</span>
            </Col>

            <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu mode="horizontal" onClick={handleClick}>
                    <Menu.Item key="0">
                        <Icon type="home" />
                        首页
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Icon type="youtube" />
                        博客列表
                    </Menu.Item>
                    {/* <Menu.Item key="2">
                        <Icon type="smile" />
                        生活
                    </Menu.Item> */}
                </Menu>
            </Col>
        </Row>
    </div>
    )
}

export default Header