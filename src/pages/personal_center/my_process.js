import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux';

import ExtraLink from '../question_center/extra_links'
import MyMenu from './my_menu'
import CommonReply from '../comreply';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Signature from '../signature';


import { getUser } from '../../actions/user';
import { getCoach } from '../../actions/coach';
import { getExam,addExam } from '../../actions/exam';
import { addTimeReview } from '../../actions/time';

import { PIC_URL } from "../../constants/actionTypes";
import { useHistory } from "react-router-dom";

function MyProcess() {
    const dispatch = useDispatch();

    const userData = useSelector(state => state.userData);
    const coachData = useSelector(state => state.coachData.data);
    const userId = localStorage.getItem("userId");
    const history = useHistory();
    if(userId=="" || userId==null){
        alert("请登录后再操作。");
        history.push("/web/");
    }

    //签名
    const [signopen, setsignopen] = React.useState(false);

    const [signImg, setsignImg] = React.useState("");

    const [signNumber, setsignNumber] = React.useState(-1);


    const [userinfo, setUserinfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {}
    );

    const [rateinfo, setRateinfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { rate: "1" }
    );

    const handlePersonalChange = React.useCallback(event => {
        setRateinfo({ [event.target.name]: event.target.value });
        // console.log([event.target.name], event.target.value);
    }, [rateinfo]);

    //添加课程点评
    const addReview = (img) => {
        let tmptimelist = userData.data.timeList;
        // tmptimelist[data]['stureview'] = rateinfo["classReview" + userinfo.userId + data];
        // let senddate = { "timeList": tmptimelist, "timeId": userinfo.timeId, "isReview": '1' };
        let fileData = new FormData();
        fileData.append("timeList", JSON.stringify(tmptimelist));
        fileData.append("index", JSON.stringify(signNumber));
        fileData.append("isReview", 1);
        fileData.append("signImg", img);
        //role 0是学生 1 是教练
        fileData.append("role", 0);
        fileData.append("timeId", userinfo.timeId);
        fileData.append("reviewUserId", userId);
        dispatch(addTimeReview(fileData));
    }
    
    const addExamReview = (index) => {
        if(window.confirm("确认您参加了该考试")){
            let examinfo = examdata[index];
            examinfo["stuConfirm"] = 1;
            dispatch(addExam(examinfo));
        }
    }

    //打开签名版
    const openSignBoard = (index) => {
        setsignopen(true);
        setsignNumber(index);
    }

    //保存签名
    const save = (img) => {
        setsignopen(false);
        setsignImg(img);
        addReview(img);
    }

    useEffect(() => {
        if (userData.data == null) {
            let data = { "isGet": 1, "userId": userId };
            dispatch(getUser(data));
        }
    }, [dispatch])
    useEffect(() => {
        if (userData.data != null && userinfo.coachId == null) {
            setUserinfo(userData.data);
            let data = { "isGetCoach": 1, "userId": userData.data.coachId };
            dispatch(getCoach(data));
        }
    }, [dispatch, userData])
    // useEffect(() => {
    //     if (userData.data != null && coachData == null) {
    //         let data = { "isGetCoach": 1, "userId": userData.data.coachId };
    //         dispatch(getCoach(data));
    //         console.log(userData);
    //     }
    // }, [dispatch, userData])
    const examdata = useSelector(state => state.examData.data);
    useEffect(() => {
        if (examdata == null) {
            let data = { isGet: 1, userId: userId };
            dispatch(getExam(data));
        }
    }, [dispatch, examdata])
    if (userinfo == null || coachData == null || examdata == null) {
        return "loading..."
    }
    return (
        <div>
            <div class="sin-wrap">
                <div class="sin-heading">Hi, E-Driving云端驾校欢迎你</div>
                <div class="container">
                    <div class="sin-main">
                        <MyMenu mypro="active" />
                        <div class="sin-main-col">
                            <div class="jd-cells">
                                <div class="jd-heading">练车进度表 | IN-CAR SHEET</div>
                                <div class="jd-cell-body">
                                    <div class="jd-grid">
                                        <div class="jd-avatar"><img src={userinfo.userImageurl} /></div>
                                        <div class="row jd-row">
                                            <div class="col-xs-12">
                                                <div class="jd-account">
                                                    学员编号(STUDENT NO.): <span class="id">{userinfo.userNumber}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-md-3">
                                                <div class="form-row">
                                                    <div class="form-label">学员姓名(NAME)</div>
                                                    <div class="form-val">{userinfo.licenseName}</div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-md-3">
                                                <div class="form-row">
                                                    <div class="form-label">学员性别(SEX)</div>
                                                    <div class="form-val">{userinfo.licenseGender == 0 ? "男" : "女"}</div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-md-3">
                                                <div class="form-row">
                                                    <div class="form-label">是否矫正视力(REST)</div>
                                                    <div class="form-val">{userinfo.licenseEye == 0 ? "是" : "否"}</div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-md-3">
                                                <div class="form-row">
                                                    <div class="form-label">出生日期(DOB)</div>
                                                    <div class="form-val">{userinfo.licenseBirthday}</div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-md-6">
                                                <div class="form-row">
                                                    <div class="form-label">联系电话(PHONE NO.)</div>
                                                    <div class="form-val">{userinfo.licensePhone}</div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-md-6">
                                                <div class="form-row">
                                                    <div class="form-label">联系邮箱(EMAIL)</div>
                                                    <div class="form-val">{userinfo.licenseEmail}</div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-md-6">
                                                <div class="form-row">
                                                    <div class="form-label">居住地址(ADDRESS)</div>
                                                    <div class="form-val">{userinfo.licensePickupAddress}</div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-md-6">
                                                <div class="form-row">
                                                    <div class="form-label">居住城市(CITY)</div>
                                                    <div class="form-val">{userinfo.licenseAddress}</div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-md-4">
                                                <div class="form-row">
                                                    <div class="form-label">驾照号码(NO.)</div>
                                                    <div class="form-val">{userinfo.licenseNumber}</div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-md-3">
                                                <div class="form-row">
                                                    <div class="form-label">过期时间(EXP)</div>
                                                    <div class="form-val">{userinfo.licenseExpireDate}</div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-md-5">
                                                <div class="form-row">
                                                    <div class="form-label">路考等级(CLASS)</div>
                                                    <div class="form-val">{userinfo.reservationLevel}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="jd-cells">
                                <div class="jd-cell-body">
                                    <div class="jd-grid">
                                        <div class="jd-avatar"><img src={PIC_URL + "images/id-card.png"} /></div>
                                        <div class="row jd-row">
                                            <div class="col-xs-12">
                                                <div class="jd-account">
                                                    教练编号(DRIVER INSTRUCTOR NO.)：<span class="id">{coachData.userNumber}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-md-3">
                                                <div class="form-row">
                                                    <div class="form-label">教练姓名(DI NAME)</div>
                                                    <div class="form-val">{coachData.licenseName}</div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-md-4">
                                                <div class="form-row">
                                                    <div class="form-label">教练执照号(DI LICENSE NO.)</div>
                                                    <div class="form-val">{coachData.coachLicenseNumber}</div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-md-5">
                                                <div class="form-row">
                                                    <div class="form-label">教练执照有效期(DI LICENSE EXP.) </div>
                                                    <div class="form-val">{coachData.coachLicenseExpireDate}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="jd-cells">
                                <div class="jd-cell-table">
                                    <div class="eval-cell">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="eval-text">评分标准(EVALUATION LEGEND)</div>
                                            </div>
                                            <div class="col-xs-3 col-md-2">
                                                <div class="ev-span">
                                                    <img src={PIC_URL + "images/n1.png"} /><span>菜鸟</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-md-2">
                                                <div class="ev-span">
                                                    <img src={PIC_URL + "images/n2.png"} /><span>初级</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-md-2">
                                                <div class="ev-span">
                                                    <img src={PIC_URL + "images/n3.png"} /><span>合格</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-md-2">
                                                <div class="ev-span">
                                                    <img src={PIC_URL + "images/n4.png"} /><span>熟练</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table jd-table">
                                            <thead>
                                                <tr>
                                                    <td>
                                                        <div class="jd-title">Topic项目/Lesson课程</div>
                                                    </td>
                                                    <td width="60">
                                                        <div class="nn">1</div>
                                                    </td>
                                                    <td width="60">
                                                        <div class="nn">2</div>
                                                    </td>
                                                    <td width="60">
                                                        <div class="nn">3</div>
                                                    </td>
                                                    <td width="60">
                                                        <div class="nn">4</div>
                                                    </td>
                                                    <td width="60">
                                                        <div class="nn">5</div>
                                                    </td>
                                                    <td width="60">
                                                        <div class="nn">6</div>
                                                    </td>
                                                    <td width="60">
                                                        <div class="nn">7</div>
                                                    </td>
                                                    <td width="60">
                                                        <div class="nn">8</div>
                                                    </td>
                                                    <td width="60">
                                                        <div class="nn">9</div>
                                                    </td>
                                                    <td width="60">
                                                        <div class="nn">10</div>
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    userData.data.reservationRateList == "" &&
                                                    <div></div>
                                                    ||
                                                    userData.data.reservationRateList.map((course, index) =>
                                                        <tr>
                                                            <td>
                                                                <div class="j-title">
                                                                    <div>{course.rateName}</div>
                                                                    <div>{course.rateNameEng}</div>
                                                                </div>
                                                            </td>
                                                            {
                                                                course.rateScore.map((subcourse, subindex) =>
                                                                    <td>
                                                                        {subcourse != 0 &&
                                                                            <div class="nn">{subcourse}</div>
                                                                        }
                                                                    </td>
                                                                )
                                                            }
                                                        </tr>
                                                    )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="jd-heading">练车课时表 | CLASS SHEET</div>
                                    <div class="table-responsive">
                                        <table class="table jd-table">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="j-text">
                                                            <div>日期</div>
                                                            <div>Date</div>
                                                        </div>
                                                    </td>
                                                    <td colspan="2">
                                                        <div class="j-text">
                                                            <div>学生签字</div>
                                                            <div>ST Comments</div>
                                                        </div>
                                                    </td>
                                                    <td colspan="2">
                                                        <div class="j-text">
                                                            <div>教练签字</div>
                                                            <div>DI Comments</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {userData == null &&
                                                    <div></div> ||
                                                    userData.data.timeList == "" &&
                                                    <div></div>
                                                    ||
                                                    userData.data.timeList.map((course, index) =>
                                                        <tr>
                                                            <td><div class="j-cont">{(new Date(course.start)).toLocaleString()}-{(new Date(course.end)).toLocaleTimeString()}</div></td>
                                                            {course.stuSign == null &&
                                                                <td colspan="2">
                                                                    <form onChange={handlePersonalChange}>
                                                                        {/* <input type="text" name={"classReview" + userinfo.userId + index} value={rateinfo["classReview" + userinfo.userId + index]}></input> */}
                                                                        {
                                                                            signNumber == index &&
                                                                            <img class="sign-img" src={signImg}></img>
                                                                        }
                                                                        {
                                                                            signNumber != index &&
                                                                            <Button onClick={() => openSignBoard(index)}>点评</Button>
                                                                        }
                                                                        {/* <Button onClick={() => addReview(index)}>点评</Button> */}
                                                                    </form>
                                                                </td>
                                                                ||
                                                                // <td colspan="2"><div class="j-cont">{course.stureview}</div></td>
                                                                <td colspan="2"><img class="sign-img" src={course.stuSign}></img></td>
                                                            }
                                                            {/* <td colspan="2"><div class="j-cont">{course.coreview}</div></td> */}
                                                            <td colspan="2"><img class="sign-img" src={course.coaSign}></img></td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="jd-heading">考试时间表 | EXAM SHEET</div>
                                    <div class="table-responsive">
                                        <table class="table jd-table">
                                            <tbody>
                                                <tr>
                                                    <td>日期(Date)</td>
                                                    <td>地点(Location)</td>
                                                    <td>考试结果(Result)</td>
                                                    <td>学生确认(Confirm)</td>
                                                    <td>Google点评(Google Review)</td>
                                                </tr>
                                                {examdata == "" &&
                                                    <div></div>
                                                    ||
                                                    examdata.map((course, index) =>
                                                        <tr>
                                                            <td><div class="j-cont">{(new Date(course.examDate)).toLocaleString()}</div></td>
                                                            <td><div class="j-cont">{course.examLocation}</div></td>
                                                            <td><div class="j-cont">{course.examResult == 1 ? "成功" : ""}{course.examResult == 0 ? "未开始" : ""}{course.examResult == 2 ? "失败" : ""}</div></td>
                                                            {
                                                                course.examResult != 0 &&
                                                                <>
                                                                {
                                                                    course.studentConfirm == 0 &&
                                                                    <td><div class="j-cont"><Button onClick={() => addExamReview(index)}>确认</Button></div></td>
                                                                    ||
                                                                    <td><div class="j-cont">已确认</div></td>
                                                                }
                                                                <td><div class="j-cont"><a href="">去Google评论</a></div></td>
                                                                </>
                                                                ||
                                                                <>
                                                                <td><div class="j-cont"></div></td>
                                                                <td><div class="j-cont"></div></td>
                                                                </>
                                                            }

                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <CommonReply commonReplytype="12" />
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={signopen} onClose={()=>setsignopen(false)} >
                <Signature  save={save}></Signature>
            </Dialog>
            <ExtraLink />
        </div>
    );
}

export default (MyProcess);




