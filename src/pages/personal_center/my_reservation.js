import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import FullCalendar from '@fullcalendar/react'
import timeGridWeek from '@fullcalendar/timegrid'
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';

import ExtraLink from '../question_center/extra_links'
import CommonReply from '../comreply';
import MyMenu from './my_menu'
import { getReservation, addReservation } from '../../actions/reservation';
import { getTime, addTime } from '../../actions/time';

import { PIC_URL } from "../../constants/actionTypes";
import { useHistory } from "react-router-dom";

const themecss = createMuiTheme({
    overrides: {
        typography: {
        // 中文字符和日文字符通常比较大，
        // 所以选用一个略小的 fontsize 会比较合适。
        fontSize: 16,
        }
    }
});

function MyReservation() {
    const dispatch = useDispatch();

    const reservationdata = useSelector(state => state.reservationData.data);
    const timedata = useSelector(state => state.timeData.data);
    const userId = localStorage.getItem("userId");
    const history = useHistory();
    if(userId=="" || userId==null){
        alert("请登录后再操作。");
        history.push("/web/");
    }

    const [successopen, setSuccessOpen] = React.useState(false);
    const handleSucessClose = () => {
        setSuccessOpen(false);
    };
    const [reservationinfo, setreservationinfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { setState: 0 }
    );

    const [timeinfo, settimeinfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {}
    );
    const [startDate, handlestartDateChange] = useState(new Date());
    const [endDate, handleendDateChange] = useState(new Date());

    const changeExpectExam = () => {
        let data = { isExceptExam: 1, reservationId: reservationinfo.reservationId, expectExamDate: reservationinfo.expectExamDate };
        dispatch(addReservation(data));
        alert("期望考试时间添加成功，教练会尽量为您安排。");
    };

    const addUserTime = () => {
        if(endDate <= startDate){
            alert("结束时间不能小于开始时间");
            return;
        }
        let tmptimedate = timedata[1]['timeList'] !== null ? timedata[1]['timeList'] : [];
        let length = Date.now() + tmptimedate.length;
        tmptimedate.push({
            id: length,
            title: 'student avaiable',
            backgroundColor: '#fff',
            textColor: '#000',
            start: startDate,
            end: endDate
        });
        let coachId = reservationdata.hasOwnProperty('list') ? reservationdata.list[0].coachId : -1;
        let data = { userId: userId, coachId: coachId, timeList: tmptimedate, timeType: "1" };
        dispatch(addTime(data));
        alert("添加成功");
    };

    const changeUserTime = () => {
        let tmptimedate = timedata[1]['timeList'];
        for (var key in tmptimedate) {
            if (tmptimedate[key].id == timeinfo.id) {
                tmptimedate[key].start = timeinfo.start;
                tmptimedate[key].end = timeinfo.end;
            }
        }
        let data = { userId: userId, timeList: tmptimedate, timeType: "1" };
        dispatch(addTime(data));
        handleSucessClose();
    };

    const delUserTime = () => {
        let tmptimedate = timedata[1]['timeList'];
        for (var key in tmptimedate) {
            if (tmptimedate[key].id == timeinfo.id) {
                tmptimedate[key] = timeinfo;
                tmptimedate.splice(key, 1);
            }
        }
        let coachId = reservationdata.hasOwnProperty('list') ? reservationdata.list[0].coachId : -1;
        let data = { userId: userId, coachId: coachId, timeList: tmptimedate, timeType: "1" };
        dispatch(addTime(data));
        handleSucessClose();
    };

    const calendarClick = (info) => {
        info.jsEvent.preventDefault();
        if (info.event.title.indexOf("student") != -1) {
            settimeinfo({ start: info.event.start, end: info.event.end, id: info.event.id });
            setSuccessOpen(true);
        }
    }

    const reservationmessage = useSelector(state => state.reservationData.message);
    // useEffect(() => {
    //     if (reservationmessage == "success") {
    //         let data = { isGet: 1, userId: userId };
    //         dispatch(getReservation(data));
    //     }
    // }, [dispatch, reservationmessage])
    useEffect(() => {
        if (reservationdata == null) {
            let data = { isGet: 1, userId: userId };
            console.log(data);
            dispatch(getReservation(data));
        }
        if (reservationdata != null && reservationdata.hasOwnProperty('list') && reservationinfo.setState == 0) {
            setreservationinfo({ setState: 1 });
            setreservationinfo(reservationdata['list'][0]);
        }
    }, [dispatch, reservationdata])

    useEffect(() => {
        if (timedata == null && reservationdata != null) {
            let coachId = reservationdata.hasOwnProperty('list') ? reservationdata.list[0].coachId : -1;
            let data = { isGet: 1, userId: userId, coachId: coachId, isStu: 1 };
            dispatch(getTime(data));
        }
    }, [dispatch, timedata, reservationdata])

    if (reservationinfo == null || timedata == null) {
        return "loading..."
    }
    return (
        <div>
            <div class="sin-wrap">
                <div class="sin-heading">E-Driving云端驾校欢迎你</div>
                <div class="container">
                    <div class="sin-main">
                        <MyMenu myre="active" />
                        <div class="sin-main-col">
                            <div class="jd-cells">
                                <div class="jd-cell-body">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="yy-cell">
                                                <div class="yy-hd">BDE进度</div>
                                                <div class="yy-box">
                                                    <div class="yy-sm">学习时间/总时间</div>
                                                    <div class="yy-progress-bar">
                                                        <strong class="text-blue">{reservationinfo.finishedCourseTime}/{reservationinfo.courseTime}</strong><span>hours</span>
                                                    </div>
                                                    <div class="progress">
                                                        <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: reservationinfo.courserate + "%" }}>
                                                            <span class="sr-only">{reservationinfo.courserate}% Complete</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-label">确定路考时间</div>
                                                <div class="form-input">
                                                    <input type="text" class="input-box" readonly="readonly" placeholder="" value={reservationinfo.examDate} />
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-label">路考等级</div>
                                                <div class="form-input">
                                                    <input type="text" class="input-box" readonly="readonly" placeholder="" value={reservationinfo.reservationLevel} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="yy-cell">
                                                <div class="yy-hd">练车进度（练习时间/总时间）</div>
                                                <div class="yy-box">
                                                    <div class="yy-sm">练习时间/总时间</div>
                                                    <div class="yy-progress-bar">
                                                        <strong class="text-blue">{reservationinfo.finishedCarTime}/{reservationinfo.carTime}</strong><span>hours</span>
                                                    </div>
                                                    <div class="progress">
                                                        <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: reservationinfo.carrate + "%" }}>
                                                            <span class="sr-only">{reservationinfo.carrate}% Complete</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-label">接送地址</div>
                                                <div class="form-input">
                                                    <input type="text" class="input-box" readonly="readonly" placeholder="" value={reservationinfo.licensePickupAddress} />
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-label">期望路考日期(教练会尽量安排合适时间)</div>
                                                <div class="form-input">
                                                    <input type="date" class="expect-examdate" placeholder="" onChange={e => setreservationinfo({ expectExamDate: e.target.value })} value={reservationinfo.expectExamDate} />
                                                    <button type="button" class="btn btn-solid" onClick={() => changeExpectExam()}>确认</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="calendar-cells">
                                <div class="cell-body">
                                    <div class="row ">
                                        <div class="col-md-12">
                                            <div class="lkc-heading">
                                                <h3>练车区间</h3>
                                                <p>
                                                    1.时间输入可手动输入或点击小日历，输入完毕按“添加”即可，可输入多段可练车区间；<br/>
                                                    2.由于教练学员众多，请将所有可以的练车区间告知教练，以便尽可能排到满意的练车区间；<br/>
                                                    3.在校学生可以将学校课表告知教练，方便教练排课。<br/>
                                                    4.正常练车区间为8:00AM-6:00PM,特殊要求请与教练协商。<br/>
                                                </p>
                                            </div>
                                            <div id="ca"></div>
                                        </div>
                                    </div>
                                    <div class="row ">
                                        {/* <div class="col-xs-12 ">
                                            <div class="form-checkbox">
                                                <span class="check-span">任意时间练车</span>
                                                <label class="checkbox-inline">
                                                    <input type="checkbox" id="inlineCheckbox1" value="option1" /> <span>是</span>
                                                </label>
                                                <label class="checkbox-inline">
                                                    <input type="checkbox" id="inlineCheckbox2" value="option2" /> <span>否</span>
                                                </label>
                                            </div>
                                        </div> */}
                                        <div class="col-xs-8 col-sm-3">
                                            <div class="form-row">
                                                <div class="form-label">可支配时间开始</div>
                                                <div class="form-input form-data-input">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils} theme={themecss}>
                                                        <KeyboardDateTimePicker
                                                            ampm={true}
                                                            variant="inline"
                                                            label="With keyboard"
                                                            value={startDate}
                                                            onChange={handlestartDateChange}
                                                            onError={console.log}
                                                            disablePast
                                                            format="yyyy/MM/dd hh:mm a"
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-8 col-sm-1">
                                            <div class="label-space">至</div>
                                        </div>
                                        <div class="col-xs-8 col-sm-3">
                                            <div class="form-row">
                                                <div class="form-label">可支配时间结束</div>
                                                <div class="form-input form-data-input">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils} theme={themecss}>
                                                        <KeyboardDateTimePicker
                                                            ampm={true}
                                                            variant="inline"
                                                            label="With keyboard"
                                                            value={endDate}
                                                            onChange={handleendDateChange}
                                                            onError={console.log}
                                                            disablePast
                                                            format="yyyy/MM/dd hh:mm a"
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-3">
                                            <div class="form-btn-row">
                                                <button type="button" class="btn btn-solid" onClick={() => addUserTime()}>添加</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="cell-body">
                                    <div class="row ">
                                        <div class="col-md-3">

                                            <div id="ca"></div>
                                        </div>
                                        <div class="col-md-9">
                                            <div class="lkc-dots text-right">
                                                <span class="lkc-item dot1">教练非教车时间</span>
                                                <span class="lkc-item dot2">我的练车时间</span>
                                                <span class="lkc-item dot3">我的可支配时间</span>
                                            </div>
                                            <div id='calendar'>
                                                <FullCalendar
                                                    plugins={[timeGridWeek]}
                                                    initialView="timeGridWeek"
                                                    slotMinTime="06:00:00"
                                                    slotMaxTime="22:00:00"
                                                    events={timedata['studentList']}
                                                    eventClick={calendarClick}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="sin-cells">
                                <div class="sec-heading">注意事项</div>
                                <div class="cell-body">
                                    <div class="zy-intro">
                                        1、 学员尽量将自己可以安排练车的时间都线上通知教练，供选择的余地越大，越能排到自己满意的时间练车路考;<br/>
                                        2、 提前两周安排好路考时间，避免当天有其它重要事情交叉。路考有时需要一整天时间。<br/>
                                        3、 取消或更改预约练车，需要提前24小时在线或其它方式通知教练，否则将扣除学员预约课程50%费用。<br/>
                                        4、 取消或者更改预约考试，需要提前至少48小时，否则安省Drivetest（笔试路考中心）将扣除学员缴纳的政府考试费；<br/>
                                        5、 学员可在报名之日起7自然日内无条件申请取消报名，如已安排教练并预约课程退款则需支付$50.00+HST手续费；；<br/>
                                        6、 据安省交通厅（MTO）相关规定，学员报名后则自动授权Edrving易驾云端驾校使用学员驾照于安省交通厅（MTO）、加拿大保险局（Insurance Bureau of Canada）相关用途。<br/>
                                    </div>
                                </div>
                            </div>
                            <CommonReply commonReplytype="1" />
                        </div>
                    </div>
                </div>
            </div>
            <ExtraLink />

            <Dialog open={successopen} onClose={handleSucessClose} >
                <div class="modal-dialog modal-form" role="document">
                    <button onClick={() => handleSucessClose()} type="button" class="modal-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <div class="modal-tips-body">
                        <div class="col-xs-12 col-sm-12">
                            <div class="form-row">
                                <div class="form-label">可支配时间开始</div>
                                <div class="form-input form-data-input">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDateTimePicker
                                            variant="inline"
                                            ampm={false}
                                            label="With keyboard"
                                            value={timeinfo.start}
                                            onChange={date => settimeinfo({ start: date })}
                                            onError={console.log}
                                            disablePast
                                            format="yyyy/MM/dd hh:mm a"
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12">
                            <div class="form-row">
                                <div class="form-label">可支配时间结束</div>
                                <div class="form-input form-data-input">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDateTimePicker
                                            variant="inline"
                                            ampm={false}
                                            label="With keyboard"
                                            value={timeinfo.end}
                                            onChange={date => settimeinfo({ end: date })}
                                            onError={console.log}
                                            disablePast
                                            format="yyyy/MM/dd hh:mm a"
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-6 text-right">
                            <div class="form-btn-row">
                                <button type="button " class="btn btn-solid" onClick={() => delUserTime()}>删除</button>
                            </div>
                        </div>
                        <div class="col-xs-6 text-left">
                            <div class="form-btn-row">
                                <button type="button " class="btn btn-solid" onClick={() => changeUserTime()}>修改</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>

            {/* 弹窗 */}
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-md" role="document">
                    <div class="modal-content">
                        <button type="button" class="modal-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <div class="modal-psv-body">
                            <div class="psv-heading">课时确认</div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-row">
                                        <div class="form-label">课程日期</div>
                                        <div class="form-input form-data-input">
                                            <input type="text" class="input-box" readonly="readonly" placeholder="" value="May 24, 2020" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-row">
                                        <div class="form-label">开始时间</div>
                                        <div class="form-input form-data-input">
                                            <input type="text" class="input-box" readonly="readonly" placeholder="" value="May 24, 2020" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-row">
                                        <div class="form-label">本次课时</div>
                                        <div class="form-input form-data-input">
                                            <input type="text" class="input-box" readonly="readonly" placeholder="" value="May 24, 2020" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <div class="form-row">
                                        <div class="form-label">我的评分</div>
                                        <div class="raty-cell">
                                            <span class="text">练习用车: 车辆整洁，车况良好</span>
                                            <img src={PIC_URL + "images/star_off.png"} />
                                            <img src={PIC_URL + "images/star_off.png"} />
                                            <img src={PIC_URL + "images/star_off.png"} />
                                            <img src={PIC_URL + "images/star_off.png"} />
                                            <img src={PIC_URL + "images/star_off.png"} />
                                        </div>
                                        <div class="raty-cell">
                                            <span class="text">持教教练: 教学专业，态度温和</span>
                                            <img src={PIC_URL + "images/star_on.png"} />
                                            <img src={PIC_URL + "images/star_on.png"} />
                                            <img src={PIC_URL + "images/star_on.png"} />
                                            <img src={PIC_URL + "images/star_on.png"} />
                                            <img src={PIC_URL + "images/star_on.png"} />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-row">
                                        <div class="form-label">教练的点评</div>
                                        <div class="form-input">
                                            <input type="text" class="input-box" readonly="readonly" placeholder="" value="不打游戏，请预习" />
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <div class="col-md-4">
                                    <div class="form-row">
                                        <div class="form-label">我的签名</div>
                                        <div class="sign-box">
                                            <img src={PIC_URL + "images/qianzi.png"} />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-row">
                                        <div class="form-label">教练签名</div>
                                        <div class="form-input">
                                            <div class="sign-box">
                                                <img src={PIC_URL + "images/qianzi.png"} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-btns text-right">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                            <button type="button" class="btn btn-solid" data-dismiss="modal">查看进度</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* <!-- 路考确认 --> */}
            <div class="modal fade" id="myModal2" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-md" role="document">
                    <div class="modal-content">
                        <button type="button" class="modal-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <div class="modal-psv-body">
                            <div class="psv-heading">路考确认</div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-row">
                                        <div class="form-label">考试日期</div>
                                        <div class="form-input form-data-input">
                                            <input type="text" class="input-box" readonly="readonly" placeholder="" value="May 24, 2020" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-row">
                                        <div class="form-label">考试时间</div>
                                        <div class="form-input form-data-input">
                                            <input type="text" class="input-box" readonly="readonly" placeholder="" value="May 24, 2020" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-row">
                                        <div class="form-label">路考等级</div>
                                        <div class="form-input form-data-input">
                                            <input type="text" class="input-box" readonly="readonly" placeholder="" value="May 24, 2020" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-row">
                                        <div class="form-label">路考地点</div>
                                        <div class="form-input ">
                                            <input type="text" class="input-box" readonly="readonly" placeholder="" value="Oakville" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="result-btns clearfix">
                            <div class="res-box pull-left">
                                <span class="text">路考结果</span> <span class="btn btn-success">PASS</span>
                            </div>
                            <button type="button" class="btn btn-primary pull-right" data-dismiss="modal">签字确认</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MyReservation;




