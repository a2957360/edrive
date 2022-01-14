import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import ExtraLinks from './extra_links';
import CommonReply from '../comreply';

import { PIC_URL } from "../../constants/actionTypes";
import { getQuestion, getExamQuestion } from '../../actions/question';


function Question() {
    const dispatch = useDispatch();
    let history = useHistory();

    const linkfunction = (selectinfo) => {
        localStorage.setItem("questionType", selectinfo.type);
        localStorage.setItem("questionListNum", selectinfo.num);
        localStorage.setItem("questionNum", 0);
        if (selectinfo.type == "exam") {
            history.push("/web/examAnswer");
        } else {
            history.push("/web/questionAnswer");
        }
    }
    const questionList = useSelector(state => state.questionData.questionData);
    const questionNum = useSelector(state => state.questionData.num);
    const questionSectionList = useSelector(state => state.questionData.list);
    const examlist = useSelector(state => state.questionData.examlist);

    let questionWrongList = JSON.parse(localStorage.getItem("questionWrongList"));

    useEffect(() => {
        dispatch(getExamQuestion())
        if (questionList == undefined) {
            dispatch(getQuestion())
        } else {
            // let tmpquestionSectionList = JSON.parse(localStorage.getItem("questionList"));
            // if (tmpquestionSectionList == null) {
                localStorage.setItem("questionList", JSON.stringify(questionSectionList));
            // }
        }
    }, [dispatch,questionList])

    if (questionList == undefined) {
        return ("loading");
    }
    return (
        <div>
            <div class="swiper-container sin-banner">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" style={{ backgroundImage: "url(" + PIC_URL + "images/tkbanner.png)" }} ></div>
                    <div class="swiper-slide" style={{ backgroundImage: "url(" + PIC_URL + "images/tkbanner.png)" }} ></div>
                    <div class="swiper-slide" style={{ backgroundImage: "url(" + PIC_URL + "images/tkbanner.png)" }} ></div>
                </div>
                {/* <!-- Add Pagination --> */}
                <div class="swiper-pagination"></div>
            </div>
            <script>
                {/* var swiper = new Swiper('.sin-banner', {
                        loop: true,
                        autoplay: {
                            delay: 5500,
                            disableOnInteraction: false,
                        },
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                    }); */}
            </script>
            <div class="wrap">
                <div class="section">
                    <div class="sec-heading">G1考试题库项目</div>
                    <div class="container">
                        <div class="proj-cells">
                            <ul class="proj-tabs justify" role="tablist">
                                <li class="active"><a href="#tt1" aria-controls="tt1" role="tab" data-toggle="tab">标识题库</a></li>
                                <li><a href="#tt2" aria-controls="tt2" role="tab" data-toggle="tab">理论题库</a></li>
                                <li><a href="#tt3" aria-controls="tt3" role="tab" data-toggle="tab">模拟考试</a></li>
                                <li><a href="#tt4" aria-controls="tt4" role="tab" data-toggle="tab">错题汇总</a></li>
                            </ul>
                            <div class="tab-content">
                                <div role="tabpanel" class="tab-pane active" id="tt1">
                                    <QuestionSection list={questionSectionList.icon} type="icon" linkfuntion={linkfunction} />
                                </div>
                                <div role="tabpanel" class="tab-pane" id="tt2">
                                    <QuestionSection list={questionSectionList.normal} type="normal" linkfuntion={linkfunction} />
                                </div>
                                <div role="tabpanel" class="tab-pane" id="tt3">
                                    <div class="row proj-row">
                                        <div class="col-xs-6 col-sm-4">
                                            <div class="proj-box">
                                                <div class="proj-title">模拟考试</div>
                                                <a onClick={() => linkfunction({ type: "exam", num: "icon" })} class="proj-more">开始做题</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div role="tabpanel" class="tab-pane" id="tt4">
                                    <div class="row proj-row">
                                        <div class="col-xs-6 col-sm-4">
                                            {questionWrongList != null &&
                                                <div class="proj-box">
                                                    <div class="proj-title">错题汇总</div>
                                                    <a href="/#/web/wrongQuestion" class="proj-more">查看题目</a>
                                                </div>
                                            }
                                        </div>
                                        {/* <div class="col-xs-6 col-sm-4">
                                            <div class="proj-box">
                                                <div class="proj-title">错题汇总 1</div>
                                                <a href="" class="proj-more">开始做题</a>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-sm-4">
                                            <div class="proj-box">
                                                <div class="proj-title">错题汇总 1</div>
                                                <a href="" class="proj-more">开始做题</a>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-sm-4">
                                            <div class="proj-box">
                                                <div class="proj-title">错题汇总 1</div>
                                                <a href="" class="proj-more">开始做题</a>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-sm-4">
                                            <div class="proj-box">
                                                <div class="proj-title">标识题库 1</div>
                                                <a href="" class="proj-more">开始做题</a>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-sm-4">
                                            <div class="proj-box">
                                                <div class="proj-title">标识题库 1</div>
                                                <a href="" class="proj-more">开始做题</a>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sin-cells">
                    <div class="explain-section">
                        <strong>Edriving易驾云端驾校G1中文模拟笔试题库为目前安省最新最全中文题库，知识点详尽全面覆盖安省交通规则考试内容；<br/></strong>
                        <p>
                        1 Edriving易驾云端驾校G1中文模拟笔试题库共分四部分。为方便阁下学习复习，题库内容每45道题为一章节，分阶段评价打分；<br/>
                            <p>
                                1.1 标识题库：常见路牌、地面标识、信号灯等交通标识学习，参考自SIGN|ONTARIO.CA；网址：https://www.ontario.ca/document/official-mto-drivers-handbook/signs<br/>
                                1.2 理论题库：安省常用交通法规、驾驶常识、保险理赔等常用交通常识学习。<br/>
                                1.3 温错知新：错题汇总，帮助学员复习巩固；<br/>
                                1.4 模拟笔试：全真模拟安省DRIVETEST（笔试路考中心）笔试形式，随机选择40道选择题，其中20道为理论题，20道为标识题，各自答对16道以上为通过。<br/>
                            </p>
                        2 Edriving易驾云端驾校G1中文模拟笔试题库中的每道题都有梳理好的知识点小提示（TIPS），电脑版、PAD版在屏幕右侧，手机版下拉题目即可看到，掌握好TIPS内容能让学习事倍功半。
                        </p>
                    </div>
                </div>
                <CommonReply commonReplytype="1"/>
                <ExtraLinks />
            </div>
        </div>
    );
}

function QuestionSection(props) {

    const items = []
    const translate = { icon: '标识题库', normal: '理论题库' };
    const linkfuntion = (index) => {
        props.linkfuntion(index);
    }

    for (var key in props.list) {
        let selectinfo = { type: props.type, num: key };
        items.push(
            <div class="col-xs-6 col-sm-4">
                <div class="proj-box">
                    <div class="proj-title">{translate[props.type]} {key}</div>
                    <a onClick={() => linkfuntion(selectinfo)} class="proj-more">开始做题</a>
                </div>
            </div>);
    }
    return (
        <div class="row proj-row">
            {items}
        </div>
    );
}

export default (Question);




