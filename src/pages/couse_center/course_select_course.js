import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import ExtraLinks from '../question_center/extra_links';
import CommonReply from '../comreply';

import { PIC_URL } from "../../constants/actionTypes";
import { addReservation } from '../../actions/reservation';
import { getCourse, clearCourse } from '../../actions/course';
import { clearTranslate } from '../../actions/translate';
import { popUpSignupOn } from '../../actions/loginSignup';


function QuestionResult() {
    const dispatch = useDispatch();
    let history = useHistory();

    let reservationLocation = localStorage.getItem("reservationLocation");
    let userId = localStorage.getItem("userId");

    const [nextStep, setNextStep] = React.useState(false);

    const [courseinfo, setcourseinfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { courseExamLevel: "G2", carTime: "0", isBDE: "0", courseExamTime: "0", coursePrice: 0 }
    );

    const { register, handleSubmit, watch, errors, getValues } = useForm();
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
    let packagearea = locationToArea[reservationLocation];
    useEffect(() => {
        dispatch(getCourse());
    }, [dispatch])
    useEffect(() => {
        let locationcaculate = caculate[reservationLocation];
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

    const selectcourse = (courseId) => {
        userId = localStorage.getItem("userId");
        if (userId == null || userId == "") {
            alert("请先登录！");
            dispatch(popUpSignupOn());
            return;
        }
        let submitcourseinfo = courseList[courseId];
        submitcourseinfo['userId'] = userId;
        submitcourseinfo['reservationArea'] = reservationLocation;
        //计算价格
        submitcourseinfo["signPrice"] = 15;
        submitcourseinfo["govermentPrice"] = 0;
        if (submitcourseinfo["courseTime"] > 0) {
            submitcourseinfo["govermentPrice"] = 15;
        }
        submitcourseinfo["taxPrice"] = (submitcourseinfo.coursePrice * 0.13).toFixed(2);
        submitcourseinfo["courseTotalPrice"] = parseFloat((submitcourseinfo.coursePrice * 1.13) + submitcourseinfo.signPrice + submitcourseinfo.govermentPrice).toFixed(2);
        localStorage.setItem("courseInfo", JSON.stringify(submitcourseinfo));
        dispatch(addReservation(submitcourseinfo));
        dispatch(clearTranslate());
        setNextStep(true);
        // history.push("/web/coursePayment");

    };
    const selfcourse = (courseId) => {
        userId = localStorage.getItem("userId");
        if (userId == null || userId == "") {
            alert("请先登录！");
            dispatch(popUpSignupOn());
            return;
        }
        if (courseinfo.coursePrice <= 0) {
            alert("请选择配置");
            return;
        }
        let submitcourseinfo = courseinfo;
        submitcourseinfo['userId'] = userId;
        submitcourseinfo['reservationArea'] = reservationLocation;
        submitcourseinfo['courseName'] = "自选配置";
        //计算价格
        submitcourseinfo["signPrice"] = 15;
        submitcourseinfo["govermentPrice"] = 0;
        if (submitcourseinfo["courseTime"] > 0) {
            submitcourseinfo["govermentPrice"] = 15;
        }
        submitcourseinfo["taxPrice"] = (submitcourseinfo.coursePrice * 0.13).toFixed(2);
        submitcourseinfo["courseTotalPrice"] = parseFloat((submitcourseinfo.coursePrice * 1.13) + submitcourseinfo.signPrice + submitcourseinfo.govermentPrice).toFixed(2);
        localStorage.setItem("courseInfo", JSON.stringify(submitcourseinfo));
        dispatch(addReservation(submitcourseinfo));
        dispatch(clearTranslate());
        setNextStep(true);
        // history.push("/web/coursePayment");
    };

    const submitmessage = useSelector(state => state.reservationData.message);
    const coursedata = useSelector(state => state.reservationData.changedata);
    useEffect(() => {
        if (submitmessage === "success" && nextStep) {
            localStorage.setItem("reservationId", coursedata.reservationId);
            setNextStep(false);
            if (userId != null && userId != "") {
                history.push("/web/coursePayment");
            } else {
                alert("请先登录！");
            }
        }
    }, [submitmessage, coursedata])

    if (courseList == undefined) {
        return ("loading");
    }
    return (
        <div>
            <div class="wrap">
                <div class="container">
                    <div class="ev-steps">
                        <ul class="step-list">
                            <li class="success">
                                <a href="/#/web/courseselectarea">
                                    <div class="step-nn">1</div>
                                    <div class="text">选择区域</div>
                                </a>
                            </li>
                            <li class="active">
                                <div class="step-nn">2</div>
                                <div class="text">挑选课程</div>
                            </li>
                            <li class="">
                                <div class="step-nn">3</div>
                                <div class="text">支付</div>
                            </li>
                            <li class="">
                                <div class="step-nn">4</div>
                                <div class="text">预约排课</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="section">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-7">
                                <div class="swiper-container xcar-banner">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide">
                                            <img src={PIC_URL + "images/slide.png"} />
                                        </div>
                                        <div class="swiper-slide">
                                            <img src={PIC_URL + "images/slide.png"} />
                                        </div>
                                        <div class="swiper-slide">
                                            <img src={PIC_URL + "images/slide.png"} />
                                        </div>
                                    </div>
                                    <div class="swiper-pagination"></div>
                                </div>
                                <script>
                                    {/* var swiper = new Swiper('.xcar-banner', {
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
                            </div>
                            <div class="col-md-5">
                                <div class="jp-grid">
                                    <div class="jp-icon">
                                        <img src={PIC_URL + "images/medals.png"} />
                                        <p>金牌套餐</p>
                                    </div>
                                    <div class="jp-body">
                                        <p>零基础学员，全科证书，识并看龙除主后是导名</p>
                                        <p>获得全科证书，识并看龙除主后是导名</p>
                                        <p>教练全科证书，识并看龙除主后是导名</p>
                                        <p>全科证书，识并看龙除主后是导名</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="container">
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
                                            <td>DDT课程</td>
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
                                                        <a onClick={() => selectcourse(index)} class="btn btn-solid">选择</a>
                                                    </td>
                                                </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="xc-table-container">
                            <form class="table-responsive" onChange={handleOnChange} onSubmit={handleSubmit()}>
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
                                                        <option value={1}>1hr</option>
                                                        <option value={2}>2hr</option>
                                                        <option value={3}>3hr</option>
                                                        <option value={4}>4hr</option>
                                                        <option value={5}>5hr</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="td-select">
                                                    <select name="isBDE">
                                                        <option value="0">无</option>
                                                        {/* <option value="1">有</option> */}
                                                    </select>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="td-select">
                                                    <select name="courseExamTime">
                                                        <option value={0}>0次</option>
                                                        <option value={1}>1次</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td>{courseinfo.coursePrice}</td>
                                            <td>
                                                <a onClick={() => selfcourse()} class="btn btn-solid">选择</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                        <div class="xc-end">
                            <a href="" class="kefu-link">
                                <img src={PIC_URL + "images/kefu.png"} /><span>在线客服</span>
                            </a>
                        </div>
                    </div>
                </div>
                <CommonReply commonReplytype="9" />
                <ExtraLinks />
            </div>
        </div>
    );
}

export default (QuestionResult);




