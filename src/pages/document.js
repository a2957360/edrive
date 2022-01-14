import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import ExtraLinks from './question_center/extra_links'
import { getCommonReply } from '../actions/comme_reply';

function Index() {
    // const documentlist = {
    //     0: "路考路线", 1: "G1重点", 2: "常见问题", 3: "驾考收费 区域一", 4: "驾考收费 区域二", 5: "驾考收费 区域三", 6: "教练端文档", 7: "学生端文档",
    //     8: "学生端文档 笔试题库", 9: "学生端文档 驾考课程", 10: "学生端文档 驾照翻译", 11: "学生端文档 全科网课", 12: "学生端文档 我的EDRIVING"
    // };
    const documentlist = {
        0: "路考宝典", 1: "G1重点", 10: "驾照翻译", 12: "我的EDRIVING", 2: "事故保险及其它"
    };
    const [currentDoc, setcurrentDoc] = React.useState(0);
    const dispatch = useDispatch();
    const commonReplyList = useSelector(state => state.commonReplyData.list);


    useEffect(() => {
        dispatch(getCommonReply())
    }, [dispatch])
    if (commonReplyList == undefined) {
        return ("loading");
    }

    return (
        <div>
            <div className="section">
                <div class="sec-heading">驾考宝典</div>
                <div className="container" id="accordion">
                    <div class="row proj-row">
                        <div class="col-xs-12 col-sm-3 question-category">
                            {
                                Object.keys(documentlist).map((index) => (
                                    <div class="row proj-row">
                                        <div class="col-xs-12">
                                            <a onClick={() => setcurrentDoc(index)}>
                                                <span>{documentlist[index]}</span>
                                                <i class="iconfont icon-down"></i>
                                            </a>
                                        </div>
                                    </div>
                                )
                                )
                            }

                        </div>
                        <div class="col-xs-12 col-sm-9">
                            {
                                commonReplyList.map((course, index) =>
                                    course.commonReplytype == currentDoc &&
                                    <div class="panel ">
                                        <div class="panel-heading" role="tab">
                                            <h4 class="panel-title">
                                                <a href={"http://edrive.renrenfreshdelivery.com/test.php?articleId=" + course.commonReplyId} target="view_window" class=""><span>{course.commonReplyTitle}</span> <i class="iconfont icon-down"></i></a>
                                                {/* <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse1" aria-expanded="true" aria-controls="collapse1" class=""><span>{course.commonReplyTitle}</span> <i class="iconfont icon-down"></i></a> */}
                                            </h4>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>

            <ExtraLinks />
        </div>
    );
}

export default Index;




