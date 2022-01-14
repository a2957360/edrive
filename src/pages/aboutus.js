import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import ExtraLinks from './question_center/extra_links'
import { getCommonReply } from '../actions/comme_reply';
import { PIC_URL } from "../constants/actionTypes";

function Index() {
    const documentlist = {
        0: "路考路线", 1: "G1重点", 2: "常见问题", 3: "驾考收费 区域一", 4: "驾考收费 区域二", 5: "驾考收费 区域三", 6: "教练端文档", 7: "学生端文档",
        8: "学生端文档 笔试题库", 9: "学生端文档 驾考课程", 10: "学生端文档 驾照翻译", 11: "学生端文档 全科网课", 12: "学生端文档 我的EDRIVING"
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
            <div class="swiper-container sin-banner">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" style={{ backgroundImage: "url(" + PIC_URL + "images/tkbanner.png)" }} ></div>
                    <div class="swiper-slide" style={{ backgroundImage: "url(" + PIC_URL + "images/tkbanner.png)" }} ></div>
                    <div class="swiper-slide" style={{ backgroundImage: "url(" + PIC_URL + "images/tkbanner.png)" }} ></div>
                </div>
                {/* <!-- Add Pagination --> */}
                <div class="swiper-pagination"></div>
            </div>
            <div className="section">
                <div className="container" id="accordion">
                    <div class="row proj-row">
                        <div class="col-xs-12 col-sm-12">
                            <h2 class="text-center">关于我们</h2>
                            <p class="aboutus_content">
                                <span class="aboutus_subtitle">一站综合<br /></span>
                                <span class="aboutus_normal">Edriving易驾云端驾校是一站式学车考驾照及车辆服务的综合网站，提供最新安省G1中文笔试题库、中国驾照及车管所证明免等翻译公证、网络全科证书教学、G2或G牌练车及小镇快期、车辆保险及紧急救援、车辆维修及租车等全方位服务。<br />
                                    安全可靠<br />
                                    Edriving易驾云端驾校是加拿大首家学车考驾照的第三方平台，学员报名缴纳的学费都由Edriving易驾云端驾校代为收取，在教练完成授课或考试，学员满意认可，授权Edriving易驾云端驾校后，平台再支付教练该课时或考试的费用，先学后付，学车驾考再无后顾之忧！<br />
                                    品质保证<br />
                                    Edriving易驾云端驾校为学员提供的教练均经过平台认真审核，确保上岗教练均为具备安省交通厅（MTO）教练牌照、商业保险、教学区域市政牌照、车辆安全检验合格证书等证件齐全的正规教练，彻底杜绝无牌无照黑教练黑驾校损害学员利益。<br />
                                    卓越服务<br />
                                    Edriving易驾云端驾校甄选卫生整洁，车况良好的车辆，为人正派，耐心亲和的教练精英为学员服务。易驾网平台通过完善透明的网络管理，实时监督学车驾考过程，能以第三方身份迅速公平的仲裁学员投诉，调解学员教练矛盾，全面保障学员安全、高效、专业的高品质学车考驾照体验！<br />
                                    全面覆盖<br />
                                    Edriving易驾云端驾校是加拿大首创的跨驾校新型网络驾校，彻底摆脱传统驾校地域限制，就近安排正规靠谱教练教学，学车考驾照将有如UBER约车一般便捷可靠。<br /></span>
                                <span class="aboutus_subtitle">合作驾校：<br /></span>
                                <span class="aboutus_normal">Edriving易驾云端驾校在大多伦多地区（Great Toronto Area）主要合作驾校：<br />
                                    快捷驾校北约克部（Express Driving School North York）；<br />
                                    快捷驾校密西沙加部（Express Driving School Mississagua）；<br />
                                    快捷驾校世嘉宝部（Express Driving School Scarborough）；<br />
                                    快捷驾校哈密尔顿部（筹建Express Driving School Hamilton）；<br />
                                    皇冠驾校（Royalking Driving School）；<br />
                                    时代驾校（Epoch Driving School）；</span>
                            </p>
                            {/* <div class="cell-btns">
                                <a href="https://www.google.ca/" type="button" class="btn-save">评价我们</a>
                                <a href="https://www.google.ca/maps" type="button" class="btn-save ml-1">我们的地址</a>
                            </div> */}
                        </div>
                    </div>

                </div>
            </div>

            <ExtraLinks />
        </div>
    );
}

export default Index;




