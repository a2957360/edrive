import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { PIC_URL } from "../constants/actionTypes";
import { getWebsiteInfo } from '../actions/websiteinfo';


function Header() {
    const dispatch = useDispatch();
    const thisyear = new Date().getFullYear();
    const websiteinfoList = useSelector(state => state.websiteinfoData.usedata);
    useEffect(() => {
        if (websiteinfoList == null) {
            dispatch(getWebsiteInfo())
        }
    }, [dispatch])
    if (websiteinfoList == null) {
        return "loading..."
    }
    return (
        <footer class="footer">
            <div class="container">
                <div class="row foot-row">
                    <div class="end-logo"><img src={PIC_URL + websiteinfoList['Logo'].infoImage} /></div>
                    <div class="foot-info">
                        <div class="hd">联系我们</div>
                        <div class="item">联系地址 :{websiteinfoList['联系地址'].infoContent}</div>
                        <div class="item">联系电话 :{websiteinfoList['联系电话'].infoContent}</div>
                        <div class="item">电子邮箱 :{websiteinfoList['电子邮箱'].infoContent}</div>
                    </div>
                    <div class="foot-info">
                        <div class="hd">工作时间</div>
                        <pre class="normaltext"><div class="item">{websiteinfoList['工作时间'].infoContent}</div></pre>
                    </div>
                    <div class="row wx-row">
                        <div class="col-xs-6">
                            <div class="wx-txt">公众号</div>
                            <div class="wx-pic"><img src={PIC_URL + websiteinfoList['公众号'].infoImage} /></div>
                        </div>
                        <div class="col-xs-6">
                            <div class="wx-txt">客服</div>
                            <div class="wx-pic"><img src={PIC_URL + websiteinfoList['客服'].infoImage} /></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="foot-end">
                <div class="copyright">@ {thisyear} E-Drire all rights reserved</div>
                <div class="end-en">Icons are credited and attributed to www.flaticon.com and their icon providers. </div>
            </div>
        </footer>
    );
}

export default (Header);