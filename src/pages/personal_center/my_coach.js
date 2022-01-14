import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux';

import ExtraLink from '../question_center/extra_links'
import MyMenu from './my_menu'
import CommonReply from '../comreply';

import { getUser } from '../../actions/user';
import { getCoach } from '../../actions/coach';
import { getStuUser } from '../../actions/user';

import { PIC_URL } from "../../constants/actionTypes";
import { useHistory } from "react-router-dom";

function MyCoach() {
    const dispatch = useDispatch();

    const userData = useSelector(state => state.userData.data);
    const coachuserData = useSelector(state => state.userData.studata);
    const coachData = useSelector(state => state.coachData.data);
    const userId = localStorage.getItem("userId");
    const history = useHistory();
    if(userId=="" || userId==null){
        alert("请登录后再操作。");
        history.push("/web/");
    }

    useEffect(() => {
        if (userData == null) {
            let data1 = { "isGet": 1, "userId": userId };
            dispatch(getUser(data1));
        }
        if (userData != null && coachuserData == null) {
            let data2 = { "isGet": 1, "userId": userData.coachId };
            dispatch(getStuUser(data2));
        }
        if (userData != null && coachData == null) {
            console.log(userData.coachId);
            let data3 = { "isGetCoach": 1, "userId": userData.coachId };
            dispatch(getCoach(data3));
        }
    }, [dispatch, userData])

    // useEffect(() => {
    //     if (userData != null && coachData == null) {
    //         console.log("getttttt");
    //         let data = { "isGetCoach": 1, "userId": userData.data.coachId };
    //         dispatch(getCoach(data));
    //     }
    // }, [dispatch, coachData])

    // useEffect(() => {
    //     if (userData != null && coachuserData == null) {
    //         let data = { "isGet": 1, "userId": userData.data.coachId };
    //         dispatch(getStuUser(data));
    //     }
    // }, [dispatch, coachuserData])


    if (userData == null || coachData == null || coachuserData == null) {
        return "loading..."
    }
    return (
        <div>
            <div class="sin-wrap">
                <div class="sin-heading">Hi, E-Driving云端驾校欢迎你</div>
                <div class="container">
                    <div class="sin-main">
                        <MyMenu myco="active" />
                        <div class="sin-main-col">
                            <div class="jd-cells">
                                <div class="jd-cell-body">
                                    <div class="basic-form">
                                        <div class="basic-avatar"><img src={PIC_URL + coachuserData.userImage} /></div>
                                        <div class="row basic-row">
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-row">
                                                    <div class="form-label">姓名</div>
                                                    <div class="form-input">
                                                        <input type="text" class="input-box" value={coachuserData.userName} readOnly/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="row jz-in-row">
                                                    <div class="col-xs-6">
                                                        <div class="form-row">
                                                            <div class="form-label">性别(SEX)</div>
                                                            <div class="form-input">
                                                                <input type="text" class="input-box" readOnly value={coachuserData.licenseGender==0?"男":"女"} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6">
                                                        <div class="form-row">
                                                            <div class="form-label">出生日期(DOB)</div>
                                                            <div class="form-input">
                                                                <input type="text" class="input-box" readOnly value={coachuserData.licenseBirthday} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-row">
                                                    <div class="form-label">电话</div>
                                                    <div class="form-input">
                                                        <input type="text" class="input-box" readOnly value={coachuserData.userPhone} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-row">
                                                    <div class="form-label">邮箱</div>
                                                    <div class="form-input">
                                                        <input type="text" class="input-box" readOnly value={coachuserData.userEmail} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-row">
                                                    <div class="form-label">熟练语言</div>
                                                    <div class="form-input">
                                                        <input type="text" class="input-box" readOnly value={coachuserData.licenseLanguage} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-row form-wx">
                                                    <div class="form-label">微信</div>
                                                    <img class="qrcode_img" src={coachuserData.qrCodeurl} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="jd-cells">
                                <div class="jd-cell-body">
                                    <div class="demo-heading">三证一险</div>
                                    <div class="row demo-row">
                                        <div class="col-xs-6 col-sm-3">
                                            <div class="demo-sm-box">
                                                <div class="demo-pic">
                                                    <img src={coachData.coachLicenseImageurl} />
                                                </div>
                                                <div class="demo-text">教练执照</div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-sm-3">
                                            <div class="demo-sm-box">
                                                <div class="demo-pic">
                                                    <img src={coachData.coachCityLicenseImageurl} />
                                                </div>
                                                <div class="demo-text">教练市政执照</div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-sm-3">
                                            <div class="demo-sm-box">
                                                <div class="demo-pic">
                                                    <img src={coachData.coachYearLicenseImageurl} />
                                                </div>
                                                <div class="demo-text">年检证照</div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-sm-3">
                                            <div class="demo-sm-box">
                                                <div class="demo-pic">
                                                    <img src={coachData.coachInsuranceLicenseImageurl} />
                                                </div>
                                                <div class="demo-text">商业险照</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="jd-cells">
                                <div class="jd-cell-body">
                                    <div class="demo-heading">车辆状况</div>
                                    <div class="row demo-row">
                                        <div class="col-xs-12">
                                            <div class="demo-sub-tit">车辆照片</div>
                                        </div>
                                        <div class="col-xs-6 ">
                                            <div class="demo-auto-box">
                                                <div class="demo-pic">
                                                    <img src={coachData.carImage1url} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 ">
                                            <div class="demo-auto-box">
                                                <div class="demo-pic">
                                                    <img src={coachData.carImage2url} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row demo-row">
                                        <div class="col-xs-12">
                                            <div class="demo-sub-tit">车辆介绍</div>
                                        </div>
                                        <div class="col-xs-6 col-md-4">
                                            <div class="form-row">
                                                <div class="form-label">品牌</div>
                                                <div class="form-val">{coachData.carBrand}</div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-md-4">
                                            <div class="form-row">
                                                <div class="form-label">车型</div>
                                                <div class="form-val">{coachData.carModel}</div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-md-4">
                                            <div class="form-row">
                                                <div class="form-label">车辆里程</div>
                                                <div class="form-val">{coachData.carDriveDistense}</div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-md-4">
                                            <div class="form-row">
                                                <div class="form-label">车牌号</div>
                                                <div class="form-val">{coachData.coachPlate}</div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-md-4">
                                            <div class="form-row">
                                                <div class="form-label">教练车牌号</div>
                                                <div class="form-val">{coachData.coachProvincePlate}</div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12">
                                            <div class="form-row">
                                                <div class="form-label">自我简介</div>
                                                <div class="form-val coach_description">{coachData.coachDescription}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <CommonReply commonReplytype="12"/>
                        </div>
                    </div>
                </div>
            </div>

            <ExtraLink />
        </div>
    );
}



export default (MyCoach);




