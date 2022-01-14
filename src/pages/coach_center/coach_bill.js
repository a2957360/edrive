import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux';


import Dialog from '@material-ui/core/Dialog';

import CoachMenu from './coach_menu'
import ExtraLink from '../question_center/extra_links'
import CoachStudent from './coach_student'
import { PIC_URL } from "../../constants/actionTypes";
import CommonReply from '../comreply';

import { getStuUser, changeUser, changeLicense } from '../../actions/user';
import { getStudent } from '../../actions/student';
import { getCourse } from '../../actions/course';
import { addReservation } from '../../actions/reservation';
import { getCoachBalance } from '../../actions/coach';
import { useHistory } from "react-router-dom";

function CoachClass() {
    const dispatch = useDispatch();

    const userData = useSelector(state => state.userData.studata);
    const studentData = useSelector(state => state.studentData.data);
    const reservationmessage = useSelector(state => state.reservationData.message);

    const userId = localStorage.getItem("userId");
    const history = useHistory();
    if(userId=="" || userId==null){
        alert("请登录后再操作。");
        history.push("/web/");
    }

    const [successopen, setSuccessOpen] = React.useState(false);

    const [courseId, setcourseId] = React.useState(-1);

    const handleClose = () => {
        setcourseId(-1);
        setSuccessOpen(false);
    };

    // let reservationLocation = localStorage.getItem("reservationLocation");
    const [reservationLocation, setReservationLocation] = useState("东区");

    const [userinfo, setUserinfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {}
    );

    //课程列表
    const [courseinfo, setcourseinfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { courseExamLevel: "G2", carTime: "0", isBDE: "0", courseExamTime: "0", coursePrice: 0, orderLocation: "东区" }
    );

    const caculate = {
        中东区: { G2: 45, G: 50, BDE: 200, exam: 180 },
        中西区: { G2: 45, G: 50, BDE: 200, exam: 180 },
        南区: { G2: 45, G: 50, BDE: 200, exam: 180 },
        东区: { G2: 55, G: 60, BDE: 200, exam: 220 },
        西南区: { G2: 50, G: 55, BDE: 200, exam: 200 },
        北区: { G2: 55, G: 60, BDE: 200, exam: 220 },
        西北区: { G2: 55, G: 60, BDE: 200, exam: 220 },
        其他区: { G2: 55, G: 60, BDE: 200, exam: 220 }
    }
    const locationToArea = { 中东区: "区域一", 中西区: "区域一", 南区: "区域一", 东区: "区域一", 西南区: "区域二", 北区: "区域二", 西北区: "区域二", 其他区: "区域三" }
    let packagearea = locationToArea[courseinfo.orderLocation];
    useEffect(() => {
        dispatch(getCourse());
    }, [dispatch])
    useEffect(() => {
        let locationcaculate = caculate[courseinfo.orderLocation];
        let total = 0;
        total += locationcaculate[courseinfo["courseExamLevel"]] * courseinfo["carTime"];
        total += courseinfo["isBDE"] == 1 ? locationcaculate["BDE"] : 0;
        total += locationcaculate["exam"] * courseinfo["courseExamTime"];
        if (total != courseinfo["coursePrice"]) {
            setcourseinfo({ coursePrice: total });
        }
    }, [courseinfo])
    const courseList = useSelector(state => state.courseData.data);

    const handleOnChange = React.useCallback(event => {
        setcourseinfo({ [event.target.name]: event.target.value });

        // caculate[reservationLocation]
    }, [courseinfo]);

    const setSelectCourse = (courseId) => {
        setcourseId(courseId);
        setSuccessOpen(true);
    };

    const selectcourse = () => {
        if (courseList[courseId] != null) {
            let submitcourseinfo = courseList[courseId];
            console.log(userinfo);
            submitcourseinfo['userId'] = userinfo.userId;
            submitcourseinfo['coachId'] = userId;
            submitcourseinfo['reservationArea'] = courseinfo.orderLocation;
            submitcourseinfo['reservationState'] = 1;
            submitcourseinfo['reservationType'] = 1;
            submitcourseinfo['coursePayment'] = "教练代收";
            submitcourseinfo['getCashUserId'] = userId;
            submitcourseinfo['courseTotalPrice'] = (parseFloat(courseList[courseId].coursePrice) * 1.13 + 15).toFixed(2)
            if (submitcourseinfo['courseTime'] == 20) {
                submitcourseinfo['courseTotalPrice'] = (parseFloat(courseList[courseId].coursePrice) * 1.13 + 15 + 15).toFixed(2)
            }
            localStorage.setItem("courseInfo", JSON.stringify(submitcourseinfo));
            dispatch(addReservation(submitcourseinfo));
            let data = { "isGet": 1, "userId": userinfo.userId };
            dispatch(getStuUser(data));
            handleClose();
        }
    };

    const selfcourse = () => {
        let submitcourseinfo = courseinfo;
        submitcourseinfo['courseTotalPrice'] = (parseFloat(courseList[courseId].coursePrice) * 1.13 + 15).toFixed(2)
        if (submitcourseinfo['isBDE'] == 1) {
            submitcourseinfo['courseTime'] = 20;
            submitcourseinfo['courseTotalPrice'] = (parseFloat(courseList[courseId].coursePrice) * 1.13 + 15 + 15).toFixed(2)
        }
        submitcourseinfo['userId'] = userinfo.userId;
        submitcourseinfo['coachId'] = userId;
        submitcourseinfo['reservationArea'] = courseinfo.orderLocation;
        submitcourseinfo['reservationState'] = 1;
        submitcourseinfo['reservationType'] = 1;
        submitcourseinfo['coursePayment'] = "教练代收";
        submitcourseinfo['courseName'] = "自选配置";
        submitcourseinfo['getCashUserId'] = userId;
        localStorage.setItem("courseInfo", JSON.stringify(submitcourseinfo));
        dispatch(addReservation(submitcourseinfo));
        // setSuccessOpen(true);
        handleClose();

    };
    //课程列表

    const getstudentInfo = (studentinfo) => {
        let data = { "isGet": 1, "userId": studentinfo.userId };
        dispatch(getStuUser(data));
    };

    const refreshCoachBalance= () => {
        let data = { "isGetPoint": 1, "coachId": userId };
        dispatch(getCoachBalance(data));
    };

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

    useEffect(() => {
        if (reservationmessage == "success") {
            let data = { "isGet": 1, "userId": userinfo.userId };
            dispatch(getStuUser(data));
        }
    }, [reservationmessage])

    // useEffect(() => {
    //     if (reservationmessage == "success") {
    //         setUserinfo(userData);
    //     }
    // }, [reservationmessage])
    
    //获取教练练车、考试次数
    const coachbalancedata = useSelector(state => state.coachData.balancedata);
    useEffect(() => {
        if (coachbalancedata == null) {
            let data = { "isGetPoint": 1, "coachId": userId };
            dispatch(getCoachBalance(data));
        }
    }, [dispatch, coachbalancedata])

    if (coachbalancedata == null) {
        return "loading...";
    }
    if (studentData == null || (studentData.length > 0 && userData == null)) {
        return "loading..."
    }
    return (
        <div>
            <div class="sin-wrap">
                <div class="sin-heading">Hi, E-Driving云端驾校欢迎你</div>
                <div class="container">
                    <div class="sin-main">
                        <div class="sin-bar">
                            <CoachMenu coachbill="active" />
                            <CoachStudent studentdata={studentData} loadFunction={getstudentInfo} ></CoachStudent>
                        </div>
                        <div class="sin-main-col">
                            <div class="file-wrap">
                                <ul class="form-tabs" role="tablist">
                                    <li class="active"><a href="#cbill1" aria-controls="cbill1" role="tab" data-toggle="tab">代收费用</a></li>
                                    <li><a href="#cbill2" onClick={()=>refreshCoachBalance()} aria-controls="cbill2" role="tab" data-toggle="tab">账单资料</a></li>
                                </ul>
                                <div class="tab-content">
                                    <div role="tabpanel" class="tab-pane active" id="cbill1">
                                        <div class="jd-cells">
                                            <div class="jd-heading">学员信息</div>
                                            <div class="">
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
                                                        <div class="col-xs-12 col-md-3">
                                                            <div class="form-row">
                                                                <div class="form-label">联系电话(PHONE NO.)</div>
                                                                <div class="form-val">{userinfo.licensePhone}</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-12 col-md-4">
                                                            <div class="form-row">
                                                                <div class="form-label">联系邮箱(EMAIL)</div>
                                                                <div class="form-val">{userinfo.licenseEmail}</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-12 col-md-5">
                                                            <div class="form-row">
                                                                <div class="form-label">居住地址(ADDRESS)</div>
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
                                        {
                                            userData != null &&
                                            userData.licenseName != null &&
                                            userData.licenseName != "" &&
                                            userData.reservationId == "" &&
                                            <div>
                                                <div class="area-panel">
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <div class="area-pic"><img src={PIC_URL + "images/diqu.png"} /></div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <div class="area-col">
                                                                <div class="area-txt">请选择区域</div>
                                                                <form class="area-select" onChange={handleOnChange}>
                                                                    <select name="orderLocation" class="form-control">
                                                                        <option value="东区">东区</option>
                                                                        <option value="北区">北区</option>
                                                                        <option value="中东区">中东区</option>
                                                                        <option value="中西区">中西区</option>
                                                                        <option value="南区">南区</option>
                                                                        <option value="西北区">西北区</option>
                                                                        <option value="西南区">西南区</option>
                                                                        <option value="其他区">其他区</option>
                                                                    </select>
                                                                    <div class="select-div">Ontario</div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="xc-table-container">
                                                    <div class="table-responsive">
                                                        <table class="table xc-table">
                                                            <thead>
                                                                <tr>
                                                                    <td>推荐配置</td>
                                                                    <td>适合对象</td>
                                                                    <td>路考等级</td>
                                                                    <td>练车时间</td>
                                                                    <td>理论课程</td>
                                                                    <td>家庭功课</td>
                                                                    <td>BDE课程</td>
                                                                    <td>小镇路考</td>
                                                                    <td>优惠价格</td>
                                                                    <td style={{ width: "96" }}></td>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    courseList.map((course, index) =>
                                                                        packagearea == course.courseArea &&
                                                                        <tr>
                                                                            <td>{course.courseName}</td>
                                                                            <td>{course.courseTarget}</td>
                                                                            <td>{course.courseExamLevel}</td>
                                                                            <td>{course.carTime}hr</td>
                                                                            <td>{course.courseTime}hr</td>
                                                                            <td>{course.homeTime}hr</td>
                                                                            <td>{course.isBDEName}</td>
                                                                            <td>{course.courseExamTime}次</td>
                                                                            <td>${course.coursePrice}</td>
                                                                            <td>
                                                                                <a onClick={() => setSelectCourse(index)} class="btn btn-solid">选择</a>
                                                                            </td>
                                                                        </tr>)
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="xc-table-container">
                                                    <form class="table-responsive" onChange={handleOnChange} >
                                                        <table class="table xc-table">
                                                            <thead>
                                                                <tr>
                                                                    <td>自选配置</td>
                                                                    <td>适合对象</td>
                                                                    <td>路考等级</td>
                                                                    <td>练车时间</td>
                                                                    <td>理论课程</td>
                                                                    <td>小镇路考</td>
                                                                    <td>优惠价格</td>
                                                                    <td width="96"></td>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>自选配置</td>
                                                                    <td>重考和熟手</td>
                                                                    <td>
                                                                        <div class="td-select" style={{ width: 90 + "px" }}>
                                                                            <select name="courseExamLevel">
                                                                                <option value="G2">G2</option>
                                                                                <option value="G">G</option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="td-select">
                                                                            <select name="carTime">
                                                                                <option value={0}>0hr</option>
                                                                                <option value={2}>2hr</option>
                                                                                <option value={4}>4hr</option>
                                                                                <option value={6}>6hr</option>
                                                                                <option value={8}>8hr</option>
                                                                                <option value={10}>10hr</option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="td-select">
                                                                            <select name="isBDE">
                                                                                <option value="0">无</option>
                                                                                <option value="1">有</option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="td-select">
                                                                            <select name="courseExamTime">
                                                                                <option value={0}>0次</option>
                                                                                <option value={1}>1次</option>
                                                                                <option value={2}>2次</option>
                                                                                <option value={3}>3次</option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>{courseinfo.coursePrice}</td>
                                                                    <td>
                                                                        <a onClick={() => setSelectCourse(-1)} class="btn btn-solid">选择</a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </form>
                                                </div>
                                            </div>
                                            ||
                                            <div class="jd-cells">
                                                <div class="jd-heading">该学员当前还有未完成的<a class="inline-link" href="/#/web/coachClass">课程</a>或者未<a class="inline-link" href="/#/web/coachStudentInfo">完善资料</a></div>
                                            </div>
                                        }
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="cbill2">
                                        {/* <div class="row data-row">
                                            <div class="col-xs-12">
                                                <div class="acc-heading">对账区间</div>
                                            </div>
                                            <div class="col-xs-6 col-sm-4">
                                                <div class="form-row">
                                                    <div class="form-label">日期/时间</div>
                                                    <div class="form-input form-data-input">
                                                        <input type="text" class="input-box" placeholder="" value="2020/11/11 00:00 AM" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-sm-4">
                                                <div class="form-row">
                                                    <div class="form-label">日期/时间</div>
                                                    <div class="form-input form-data-input">
                                                        <input type="text" class="input-box" placeholder="" value="2020/11/11 00:00 AM" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div class="table-responsive">
                                            <table class="table xc-table">
                                                <thead>
                                                    <tr>
                                                        <td>时间</td>
                                                        <td >学生姓名</td>
                                                        <td >项目名称</td>
                                                        <td>项目时长/次数</td>
                                                        <td >领取/代收</td>
                                                        <td width="60">积分</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        coachbalancedata.hasOwnProperty('list') &&
                                                        coachbalancedata['list'].map((course, index) =>
                                                            <tr>
                                                                <td>{course.createTime}</td>
                                                                <td>{course.licenseName}</td>
                                                                <td>{course.reservationName}</td>
                                                                <td>{course.carTime}</td>
                                                                <td>{course.reservationType == 0 ? "领取" : "代收"}</td>
                                                                <td>
                                                                    {course.reservationType == 0 &&
                                                                        <span class="">{course.coursePrice}</span>
                                                                        ||
                                                                        <span class="text-red">{course.coursePrice}</span>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="fil-total">
                                            <div class="fil-row">
                                                <div class="fil-txt">领取</div>
                                                <div class="fil-val">{coachbalancedata.inprice}</div>
                                            </div>
                                            <div class="fil-row">
                                                <div class="fil-txt">代收</div>
                                                <div class="fil-val text-red">-{coachbalancedata.outprice}</div>
                                            </div>
                                            <hr />
                                            <div class="fil-row">
                                                <div class="fil-txt">合计</div>
                                                {
                                                    coachbalancedata.totalprice > 0 &&
                                                    <div class="fil-val">{coachbalancedata.totalprice}</div>
                                                    ||
                                                    <div class="fil-val text-red">{coachbalancedata.totalprice}</div>
                                                }
                                            </div>
                                        </div>
                                        <div class="section">
                                            <div class="sec-heading">常用网站链接</div>
                                            <div class="container-fluid">
                                                <div class="row lk-row">
                                                    <div class="col-md-4">
                                                        <a href="javascript:void(0);" class="lk-box"><img src="images/lk1.png" /></a>
                                                        <div class="lk-text"><a href="">DRIVERTEST 考试中心</a></div>
                                                        <div class="lk-arrow">
                                                            <a href="javascript:void(0);" class="arrow"><i class="iconfont icon-right"></i></a>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <a href="javascript:void(0);" class="lk-box"><img src="images/lk2.png" /></a>
                                                        <div class="lk-text"><a href="">合作驾校</a></div>
                                                        <div class="lk-arrow">
                                                            <a href="javascript:void(0);" class="arrow"><i class="iconfont icon-right"></i></a>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <a href="javascript:void(0);" class="lk-box"><img src="images/lk3.png" /></a>
                                                        <div class="lk-text"><a href="">安省法令</a></div>
                                                        <div class="lk-arrow">
                                                            <a href="javascript:void(0);" class="arrow"><i class="iconfont icon-right"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Dialog open={successopen} onClose={handleClose}>
                                <div class="modal-content">
                                    <div class="modal-psv-body">
                                        <div class="psv-icon">
                                            <img src={PIC_URL + "images/successlg.png"} />
                                            <h3>报名确认</h3>
                                        </div>
                                        <div class="psv-row">
                                            <span class="item">项目：{courseId != -1 ? courseList[courseId].courseName : "自选项目"}</span>
                                            <span class="item">路考等级：{courseId != -1 ? courseList[courseId].courseExamLevel : courseinfo.courseExamLevel}</span>
                                            <span class="item">练车时间：{courseId != -1 ? courseList[courseId].carTime : courseinfo.carTime}</span>
                                            <span class="item">理论课程：{courseId != -1 ? courseList[courseId].courseTime : courseinfo.courseTime}</span>
                                            <span class="item">小镇路考：{courseId != -1 ? courseList[courseId].courseExamTime : courseinfo.courseExamTime}</span>
                                            <span class="item">学员：{userinfo.licenseName}</span>
                                            <span class="item">支付方式：代收</span>
                                        </div>
                                        <div class="psv-row">
                                            <span class="item">优惠价格：{courseId != -1 ? courseList[courseId].coursePrice : courseinfo.coursePrice}</span>
                                            <span class="item">HST（13%）：{courseId != -1 ? (parseFloat(courseList[courseId].coursePrice) * 0.13).toFixed(2) : (parseFloat(courseinfo.coursePrice) * 0.13).toFixed(2)}</span>
                                        </div>
                                        <div class="psv-row">
                                            {courseList[courseId] != null &&
                                            courseList[courseId].courseTime == 20 &&
                                            <span class="item">MTO政府费:15</span>
                                            }
                                            <span class="item">报名费:15</span>
                                        </div>
                                        <div class="psv-row">
                                            {courseList[courseId] == null &&
                                            <div></div>||
                                            courseList[courseId].courseTime == 20 &&
                                            <span class="item">Total:{(parseFloat(courseList[courseId].coursePrice) * 1.13 + 15 + 15).toFixed(2)}</span>
                                            ||
                                            <span class="item">Total:{(parseFloat(courseList[courseId].coursePrice) * 1.13 + 15).toFixed(2)}</span>
                                            }
                                            
                                        </div>
                                    </div>
                                    <div class="modal-btns">
                                        <a onClick={() => handleClose()} class="btn btn-solid" data-dismiss="modal">关闭</a>
                                        {
                                            courseId != -1 &&
                                            <a onClick={() => selectcourse()} class="btn btn-solid" data-dismiss="modal">确认</a>
                                            ||
                                            <a onClick={() => selfcourse(false)} class="btn btn-solid" data-dismiss="modal">确认</a>
                                        }
                                    </div>
                                </div>
                            </Dialog>

                            <CommonReply commonReplytype="1" />
                        </div>
                    </div>
                </div>
            </div>
            <ExtraLink />
            {/* <Dialog open={successopen} >
                <div class="modal-content">
                    <div class="modal-psv-body">
                        <div class="psv-icon">
                            <img src={PIC_URL + "images/successlg.png"} />
                            <h3>支付成功</h3>
                        </div>
                        <div class="psv-row">
                            <span class="item">项目：{courseId != -1 ? courseList[courseId].courseName : "自选项目"}</span>
                        </div>
                    </div>

                </div>
            </Dialog> */}
        </div>
    );
}

export default CoachClass;

