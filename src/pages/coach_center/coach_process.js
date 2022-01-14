import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import ExtraLink from '../question_center/extra_links'
import CoachMenu from './coach_menu'
import CoachStudent from './coach_student'
import Signature from '../signature';

import Button from '@material-ui/core/Button';
import { getStuUser } from '../../actions/user';
import { addCoachTimeReview } from '../../actions/time';
import { getStudent } from '../../actions/student';
import { getExam, addExam } from '../../actions/exam';
import { changeReservation } from '../../actions/reservation';

import Dialog from '@material-ui/core/Dialog';
import CommonReply from '../comreply';

import { PIC_URL } from "../../constants/actionTypes";

function MyProcess() {
    const dispatch = useDispatch();
    let history = useHistory();

    const userData = useSelector(state => state.userData.studata);
    const studentData = useSelector(state => state.studentData.data);

    const userId = localStorage.getItem("userId");
    if(userId=="" || userId==null){
        alert("请登录后再操作。");
        history.push("/web/");
    }

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



    const getstudentInfo = (studentinfo) => {
        let data = { "isGet": 1, "userId": studentinfo.userId };
        dispatch(getStuUser(data));
    };

    const { register, handleSubmit, watch, errors, getValues } = useForm();

    //打开popup
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const [finishopen, setfinishopen] = React.useState(false);

    const handleFinsihClose = () => {
        setfinishopen(false);
    };

    const [examopen, setexamopen] = React.useState(false);
    const [examinfo, setExaminfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {}
    );

    const handleexamClose = () => {
        setexamopen(false);
    };

    const openExamOpen = (data) => {
        setExaminfo(data);
        setExaminfo({ examResult: 1 });
        setexamopen(true);
    }
    const handleExamChange = React.useCallback(event => {
        setExaminfo({ [event.target.name]: event.target.value });
        if (event.target.name.indexOf("Image") != -1 && event.target.files[0] != null) {
            setExaminfo({ [event.target.name]: event.target.files[0] });
            setExaminfo({ [event.target.name + "url"]: URL.createObjectURL(event.target.files[0]) });
        }
    }, [examinfo]);

    const uploadExam = () => {
        let fileData = new FormData();
        for (var key in examinfo) {
            fileData.append(key, examinfo[key]);
        }
        fileData.append("isResult", 1);
        dispatch(addExam(fileData));
    }


    //模拟考试单
    const handleExamReportChange = React.useCallback(event => {
        if (event.target.name.indexOf("Image") != -1 && event.target.files[0] != null) {
            setUserinfo({ [event.target.name]: event.target.files[0] });
            setUserinfo({ [event.target.name + "url"]: URL.createObjectURL(event.target.files[0]) });
        }
    }, [examinfo]);

    const uploadExamReport = () => {
        let fileData = new FormData();
        console.log(userinfo.examReportImage);
        if (userinfo.examReportImage != "") {
            fileData.append("isExamReport", "1");
            fileData.append("reservationId", userinfo.reservationId);
            fileData.append("examReportImage", userinfo.examReportImage);
            dispatch(changeReservation(fileData));
            alert("模拟考试单上传成功！");
        } else {
            alert("没有添加模拟考试单！");
        }
    }

    const rateFunction = (data) => {
        setRateinfo(data);
        setRateinfo({ "rate": "1" });
        setRateinfo(userData.reservationRateList[data.rateId], () => {
        });
        setOpen(true);
        // let tmpratelist = userData.reservationRateList[data.rateId];
        // console.log(tmpratelist['rateName'],data.rateNum);
    }

    const onpersonalSubmit = (data) => {
        let tmpdata = userData;
        tmpdata.reservationRateList[rateinfo.rateId]['rateScore'][rateinfo.rateNum] = rateinfo.rate;
        tmpdata["isRate"] = 1;
        console.log(tmpdata);
        dispatch(changeReservation(tmpdata));
        handleClose();
    };

    const handlePersonalChange = React.useCallback(event => {
        setRateinfo({ [event.target.name]: event.target.value });
        // console.log([event.target.name], event.target.value);
    }, [rateinfo]);

    //添加课程点评
    const addReview = (img) => {
        let tmptimelist = userData.timeList;
        // tmptimelist[data]['stureview'] = rateinfo["classReview" + userinfo.userId + data];
        // let senddate = { "timeList": tmptimelist, "timeId": userinfo.timeId, "isReview": '1' };
        let fileData = new FormData();
        fileData.append("timeList", JSON.stringify(tmptimelist));
        fileData.append("index", JSON.stringify(signNumber));
        fileData.append("isReview", 1);
        fileData.append("signImg", img);
        fileData.append("timeId", userinfo.timeId);
        //role 0是学生 1 是教练
        fileData.append("role", 1);
        fileData.append("reviewUserId", studentData[0].userId);
        dispatch(addCoachTimeReview(fileData));
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

    const finishReservation = () => {
        let data = { isFinish: 1, reservationId: userinfo.reservationId, userId: userinfo.userId }
        dispatch(changeReservation(data));
    }

    useEffect(() => {
        if (studentData == null) {
            let data = { "isGet": 1, coachId: userId };
            dispatch(getStudent(data));
        }
        if (studentData != null && studentData.length > 0) {
            let data = { "isGet": 1, "userId": studentData[0].userId };
            dispatch(getStuUser(data));
        }
    }, [dispatch, studentData])
    
    useEffect(() => {
        if (userData != null) {
            setUserinfo(userData);
        }
    }, [dispatch, userData])

    const examdata = useSelector(state => state.examData.data);

    useEffect(() => {
        if (userData != null) {
            handleexamClose();
            let data = { isGet: 1, userId: userData.userId };
            dispatch(getExam(data));
        }
    }, [dispatch, userData])

    if (studentData == null || examdata == null || (studentData.length > 0 && userData == null)) {
        return "loading..."
    }
    return (
        <div>
            <div class="sin-wrap">
                <div class="sin-heading">Hi, E-Driving云端驾校欢迎你</div>
                <div class="container">
                    <div class="sin-main">
                        <div class="sin-bar">
                            <CoachMenu coachepro="active" >
                            </CoachMenu>
                            <CoachStudent studentdata={studentData} loadFunction={getstudentInfo} ></CoachStudent>
                        </div>
                        <div class="sin-main-col">
                            <div class="jd-cells">
                                <div class="jd-heading">练车进度表 | IN-CAR SHEET</div>
                                <div class="jd-cell-body">
                                    <div class="jd-grid">
                                        <div class="jd-avatar"><img src={userinfo.userImageshowurl} /></div>
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
                                            <div class="col-xs-12 col-md-6">
                                                <div class="form-row">
                                                    <div class="form-label">驾照号码(NO.)</div>
                                                    <div class="form-val">{userinfo.licenseNumber}</div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-md-6">
                                                <div class="form-row">
                                                    <div class="form-label">过期时间(EXP)</div>
                                                    <div class="form-val">{userinfo.licenseExpireDate}</div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-md-6">
                                                <div class="form-row">
                                                    <div class="form-label">学车套餐(PACKAGE)</div>
                                                    <div class="form-val">{userinfo.reservationName}</div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-md-6">
                                                <div class="form-row">
                                                    <div class="form-label">路考等级(CLASS)</div>
                                                    <div class="form-val">{userinfo.reservationLevel}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                                    <div>学生点评</div>
                                                    <div>ST Comments</div>
                                                </div>
                                            </td>
                                            <td colspan="2">
                                                <div class="j-text">
                                                    <div>教练点评</div>
                                                    <div>DI Comments</div>
                                                </div>
                                            </td>
                                        </tr>
                                        {userData == null &&
                                            <div></div> ||
                                            userData.timeList == "" &&
                                            <div></div>
                                            ||
                                            userData.timeList.map((course, index) =>
                                                <tr>
                                                    <td><div class="j-cont">{(new Date(course.start)).toLocaleString()}-{(new Date(course.end)).toLocaleTimeString()}</div></td>
                                                    {/* <td colspan="2"><div class="j-cont">{course.stureview}</div></td> */}
                                                    <td colspan="2"><img class="sign-img" src={course.stuSign}></img></td>
                                                    {course.coaSign == null &&
                                                        <td colspan="2">
                                                            <form onChange={handlePersonalChange}>
                                                                {/* <input type="text" name={"classReview" + userinfo.userId + index} value={rateinfo["classReview" + userinfo.userId + index]}></input> */}
                                                                {
                                                                    signNumber == index &&
                                                                    <img class="sign-img" src={signImg}></img>
                                                                }
                                                                {/* <Button onClick={() => addReview(index)}>点评</Button> */}
                                                                {
                                                                    signNumber != index &&
                                                                    <Button onClick={() => openSignBoard(index)}>点评</Button>
                                                                }
                                                            </form>
                                                        </td>
                                                        ||
                                                        // <td colspan="2"><div class="j-cont">{course.coreview}</div></td>
                                                        <td colspan="2"><img class="sign-img" src={course.coaSign}></img></td>

                                                    }
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
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
                                                {userData == null &&
                                                    <div></div> ||
                                                    userData.reservationRateList == "" &&
                                                    <div></div>
                                                    ||
                                                    userData.reservationRateList.map((course, index) =>
                                                        <tr>
                                                            <td>
                                                                <div class="j-title">
                                                                    <div>{course.rateName}</div>
                                                                    <div>{course.rateNameEng}</div>
                                                                </div>
                                                            </td>
                                                            {
                                                                course.rateScore.map((subcourse, subindex) =>
                                                                    <td onClick={() => rateFunction({ rateId: index, rateNum: subindex })}>
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

                                    <div class="jd-cells">
                                        <div class="jd-heading">
                                            <div class="cell-tit">模拟考试单</div>
                                            <div class="cell-btns">
                                                <button onClick={() => uploadExamReport()} type="button" class="btn-save ml-1">保存</button>
                                            </div>
                                        </div>
                                        <div class="jd-cell-body">
                                            <div class="jd-grid">
                                                <form class="row jd-row" onChange={handleExamReportChange}>
                                                    <div class="col-xs-12">
                                                        <div class="jd-account">
                                                            <div class="uplad-box">
                                                                <input type="file" id="up_img_WU_FILE_0" name="examReportImage" />
                                                                <img id="imgShow_WU_FILE_0" src={userinfo.examReportImageurl} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="jd-heading">考试时间表 | EXAM SHEET</div>
                                    <div class="table-responsive">
                                        <table class="table jd-table">
                                            <tbody>
                                                {examdata == "" &&
                                                    <div></div>
                                                    ||
                                                    examdata.map((course, index) =>
                                                        <tr>
                                                            <td>
                                                                <div class="j-text">
                                                                    <div>日期</div>
                                                                    <div>Date</div>
                                                                </div>
                                                            </td>
                                                            <td><div class="j-cont">{(new Date(course.examDate)).toLocaleString()}</div></td>
                                                            <td>
                                                                <div class="j-text">
                                                                    <div>地点</div>
                                                                    <div>Location</div>
                                                                </div>
                                                            </td>
                                                            <td><div class="j-cont">{course.examLocation}</div></td>
                                                            <td>
                                                                <div class="j-text">
                                                                    <div>考试结果</div>
                                                                    <div>Result</div>
                                                                </div>
                                                            </td>
                                                            {course.examResult == 0 &&
                                                                <td colspan="2">
                                                                    <Button onClick={() => openExamOpen(course)}>提交结果</Button>
                                                                </td>
                                                                ||
                                                                <td colspan="2"><div class="j-cont">{course.examResult == 1 ? "成功" : "失败"}</div></td>
                                                            }
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    {
                                        userinfo.finishedCarTime == userinfo.carTime &&
                                        userinfo.finishedExamTime == userinfo.courseExamTime &&
                                        <div class="eval-cell">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="eval-text">课程已全部结束 学员考试结束
                                                        <div class="cell-btns">
                                                            <button onClick={() => setfinishopen(true)} class="btn btn-save">学员结业</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                </div>
                            </div>
                            <CommonReply commonReplytype="1" />
                        </div>
                    </div>
                </div>
            </div>

            <ExtraLink />
            <Dialog open={open} onClose={handleClose} maxWidth={"md"}>
                <div class="modal-dialog modal-lg" role="document">
                    <div class="">
                        <div class="modal-body modal-kh-body">
                            <form class="row kh-out-row" onChange={handlePersonalChange} onSubmit={handleSubmit(onpersonalSubmit)}>
                                {/* <input type="hidden" name="examId" value={examinfo.examId}></input> */}
                                <div class="col-md-12">
                                    <div class="row kh-row">
                                        <div class="col-xs-12 col-md-12">
                                            <div class="form-row">
                                                <div class="form-label">
                                                    {rateinfo.rateName}/{rateinfo.rateNameEng} : {rateinfo.rateNum}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-3 col-md-3">
                                            <div class="form-row">
                                                <div class="ev-span">
                                                    <label>
                                                        <img src={PIC_URL + "images/n1.png"} /><span>菜鸟</span>
                                                        <input class="rateinput" type="radio" name="rate" value="1" checked={rateinfo.rate == 1} />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-3 col-md-3">
                                            <div class="form-row">
                                                <div class="ev-span">
                                                    <label>
                                                        <img src={PIC_URL + "images/n2.png"} /><span>初级</span>
                                                        <input class="rateinput" type="radio" name="rate" value="2" checked={rateinfo.rate == 2} />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-3 col-md-3">
                                            <div class="form-row">
                                                <div class="ev-span">
                                                    <label>
                                                        <img src={PIC_URL + "images/n3.png"} /><span>合格</span>
                                                        <input class="rateinput" type="radio" name="rate" value="3" checked={rateinfo.rate == 3} />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-3 col-md-3">
                                            <div class="form-row">
                                                <div class="ev-span">
                                                    <label>
                                                        <img src={PIC_URL + "images/n4.png"} /><span>熟练</span>
                                                        <input class="rateinput" type="radio" name="rate" value="4" checked={rateinfo.rate == 4} />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="modal-btns">
                                    <button type="submit" class="btn btn-solid">评分</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Dialog>
            <Dialog open={finishopen} onClose={handleFinsihClose} >
                <div class="modal-dialog modal-form" role="document">
                    <button onClick={() => handleFinsihClose()} type="button" class="modal-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <div class="modal-body modal-kh-body">
                        <form class="row kh-out-row">
                            {/* <input type="hidden" name="examId" value={examinfo.examId}></input> */}
                            <div class="col-md-12 margin-top-10">
                                <div class="row kh-row">
                                    <div class="col-xs-6 col-md-6">
                                        <div class="form-row">
                                            <div class="ev-span">
                                                学员名称:{userinfo.licenseName}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-md-6">
                                        <div class="form-row">
                                            <div class="ev-span">
                                                学员生日:{userinfo.licenseBirthday}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-md-6">
                                        <div class="form-row">
                                            <div class="ev-span">
                                                学员驾照:{userinfo.licenseNumber}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-md-6">
                                        <div class="form-row">
                                            <div class="ev-span">
                                                驾照过期:{userinfo.licenseExpireDate}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-btns">
                        <button type="button" onClick={() => finishReservation()} class="btn btn-solid">确认结业</button>
                        <button type="button" onClick={() => handleFinsihClose()} class="btn btn-solid">取消</button>
                    </div>
                </div>
            </Dialog>
            <Dialog maxWidth="md" open={examopen} onClose={handleexamClose} >
                <div class="modal-dialog" role="document">
                    <button onClick={() => handleexamClose()} type="button" class="modal-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <div class="modal-body modal-kh-body">
                        <form class="row kh-out-row" onChange={handleExamChange}>
                            {/* <input type="hidden" name="examId" value={examinfo.examId}></input> */}
                            <div class="col-md-12 margin-top-10">
                                <div class="row kh-row">
                                    <div class="col-xs-6 col-md-6">
                                        <div class="form-row">
                                            <div class="ev-span">
                                                学员名称:{userinfo.licenseName}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-md-6">
                                        <div class="form-row">
                                            <div class="ev-span">
                                                学员生日:{userinfo.licenseBirthday}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-md-6">
                                        <div class="form-row">
                                            <div class="ev-span">
                                                学员驾照:{userinfo.licenseNumber}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-md-6">
                                        <div class="form-row">
                                            <div class="ev-span">
                                                驾照过期:{userinfo.licenseExpireDate}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-md-6">
                                        <div class="form-row">
                                            <div class="ev-span">
                                                考试时间:{examinfo.examDate}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-md-6">
                                        <div class="form-row">
                                            <div class="ev-span">
                                                考试地点:{examinfo.examLocation}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-12">
                                        <div class="form-row">
                                            <div class="form-label">考试结果</div>
                                            <div class="form-select">
                                                <select class="input-box" name="examResult">
                                                    <option value="1" selected={examinfo.examResult == 1}>成功</option>
                                                    <option value="2" selected={examinfo.examResult == 2}>失败</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div class="col-xs-12 col-sm-12">
                                        <ul id="warp">
                                            <li class="upload-cell">
                                                <div class="txt">模拟考试单</div>
                                                <div class="uplad-box">
                                                    <input type="file" id="up_img_WU_FILE_0" name="examResultImage" />
                                                    <img id="imgShow_WU_FILE_0" src={examinfo.examResultImageurl} />
                                                </div>
                                            </li>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-btns">
                        <button type="button" onClick={() => uploadExam()} class="btn btn-solid">提交结果</button>
                        <button type="button" onClick={() => handleexamClose()} class="btn btn-solid">取消</button>
                    </div>
                </div>
            </Dialog>
            <Dialog open={signopen} onClose={()=>setsignopen(false)} >
                <Signature save={save}></Signature>
            </Dialog>
        </div>
    );
}

export default (MyProcess);




