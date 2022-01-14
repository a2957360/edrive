import React from 'react';
import { connect } from 'react-redux';
import ExtraLinks from '../question_center/extra_links';
import { useHistory } from "react-router-dom";

import CommonReply from '../comreply';

import { PIC_URL } from "../../constants/actionTypes";
import { getBarrageData, addBarrageData } from '../../actions/live';
import {translate_list} from '../translate';

function TranslateIndex() {
    let history = useHistory();
    const userLanguage = localStorage.getItem("userLanguage");

    const nextPage = (data) => {
        localStorage.setItem("translateType", data);
        history.push("/web/chineselicensestep1");
    };

    return (
        <div>
            <div class="swiper-container atio-banner">
                <div class="swiper-slide" style={{ backgroundImage: "url(" + PIC_URL + "images/autobanner.png)" }} ></div>
                {/* <div class="swiper-wrapper">
                    <div class="swiper-slide" style={{ backgroundImage: "url(" + PIC_URL + "images/autobanner.png)" }} ></div>
                    <div class="swiper-slide" style={{ backgroundImage: "url(" + PIC_URL + "images/autobanner.png)" }} ></div>
                    <div class="swiper-slide" style={{ backgroundImage: "url(" + PIC_URL + "images/autobanner.png)" }} ></div>
                </div>
                <div class="swiper-pagination"></div> */}
            </div>
            <script>
                {/* var swiper = new Swiper('.atio-banner', {
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
                    <div class="sec-heading">{translate_list[userLanguage].translist}</div>
                    <div class="container">
                        <div class="proj-cells">
                            <ul class="proj-tabs justify" role="tablist">
                                <li class="active"><a href="#tt1" aria-controls="tt1" role="tab" data-toggle="tab">{translate_list[userLanguage].chinesetrans}</a></li>
                                <li><a href="#tt2" aria-controls="tt2" role="tab" data-toggle="tab">{translate_list[userLanguage].caragentrans}</a></li>
                                <li><a href="#tt3" aria-controls="tt3" role="tab" data-toggle="tab">{translate_list[userLanguage].othertrans}</a></li>
                                <li><a href="#tt4" aria-controls="tt4" role="tab" data-toggle="tab"></a></li>
                            </ul>
                            <div class="tab-content">
                                <div role="tabpanel" class="tab-pane fade in active" id="tt1">
                                    <div class="atio-panel">
                                    <div dangerouslySetInnerHTML = {{__html:translate_list[userLanguage].chinestransinfo}} ></div>
                                        <div class="atio-foot">
                                            <a onClick={() => nextPage("license")} class="btn">{translate_list[userLanguage].moveon}</a>
                                        </div>
                                    </div>
                                </div>
                                <div role="tabpanel" class="tab-pane fade" id="tt2">
                                    <div class="atio-panel">
                                    <div dangerouslySetInnerHTML = {{__html:translate_list[userLanguage].caragenttransinfo}} ></div>
                                        <div class="atio-foot">
                                            <a onClick={() => nextPage("carAgent")} class="btn">{translate_list[userLanguage].moveon}</a>
                                        </div>
                                    </div>
                                </div>
                                <div role="tabpanel" class="tab-pane fade" fade id="tt3">
                                    <div class="atio-panel">
                                    <div dangerouslySetInnerHTML = {{__html:translate_list[userLanguage].othertransinfo}} ></div>
                                        <div class="atio-foot">
                                            <a onClick={() => nextPage("other")} class="btn">{translate_list[userLanguage].moveon}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CommonReply commonReplytype="10" />

            </div>
            <ExtraLinks />
        </div>
    );
}

export default (TranslateIndex);




