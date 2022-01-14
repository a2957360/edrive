import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import FullCalendar from '@fullcalendar/react'
import timeGridWeek from '@fullcalendar/timegrid'
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import CommonReply from '../comreply';

import CoachMenu from './coach_menu'
import CoachStudent from './coach_student'
import ExtraLink from '../question_center/extra_links'
import { getStudent } from '../../actions/student';
import { getStuUser } from '../../actions/user';
import { getTime, addTime, addClassTime, getStuTime } from '../../actions/time';
import { getExam } from '../../actions/exam';

import { array } from 'prop-types';

import { CopyToClipboard } from 'react-copy-to-clipboard';

function CoachClass() {
    let history = useHistory();

    const styles = {
        textField: {
            fontSize: 50, //works!
        }
    }
    const stuShowData = useSelector(state => state.userData.studata);

    const [successopen, setSuccessOpen] = React.useState(false);
    const handleSucessClose = () => {
        setSuccessOpen(false);
    };

    const [timeinfo, settimeinfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {}
    );

    const dispatch = useDispatch();

    const timedata = useSelector(state => state.timeData.data);
    let stutimedata = useSelector(state => state.timeData.studata);
    stutimedata = stutimedata == null ? { "1": { timelist: [] }, "2": { timelist: [] }, "3": { timelist: [] } } : stutimedata;

    const userId = localStorage.getItem("userId");

    if(userId=="" || userId==null){
        alert("请登录后再操作。");
        history.push("/web/");
    }

    const [student, setstudentinfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {}
    );
    const nowTime = new Date();
    const onehour = nowTime.setHours(nowTime.getHours() + 1);
    const [unableStartDate, setUnableStart] = useState(new Date());
    const [unableEndDate, setUnableEnd] = useState(new Date(onehour));
    const [startDate, handlestartDateChange] = useState(nowTime.toISOString().split('T')[0]);
    const [startHour, handlestartHourChange] = useState(nowTime.getHours());
    const [startMinute, handlestartMinuteChange] = useState(0);
    const [duration, handledurationDateChange] = useState(0.5);
    const [endDate, setendDate] = useState(new Date(onehour));

    //unavailable考试信息
    const [unavailableInfo, setunavailableInfo] = useState("");

    const [classUserId, setClassUserId] = useState();

    const calendarClick = (info) => {
        info.jsEvent.preventDefault();
        let start = new Date(info.event.start);
        let end = new Date(info.event.end);
        settimeinfo({ start: start.toLocaleString(), end: end.toLocaleString(), id: info.event.id, title: info.event.title, type: "unavailable" });
        setSuccessOpen(true);
    }
    const classCalendarClick = (info) => {
        info.jsEvent.preventDefault();

        if (info.event.title.indexOf("class") != -1) {
            // let endtime = Date.parse(info.event.end);
            // let currenttime = Date.parse(nowTime);
            // if (endtime < currenttime) {
            //     alert("该课程已经结束，无法修改");
            //     return;
            // }
            getstudentInfo(info.event.extendedProps.userId);
            let start = new Date(info.event.start);
            let end = new Date(info.event.end);
            settimeinfo({ start: start.toLocaleString(), end: end.toLocaleString(), id: info.event.id, title: info.event.title, type: "class" });
            setSuccessOpen(true);
        } else {
            let start = new Date(info.event.start);
            let end = new Date(info.event.end);
            settimeinfo({ start: start.toLocaleString(), end: end.toLocaleString(), id: info.event.id, title: info.event.title, type: "unavailable" });
            setSuccessOpen(true);
        }

    }
    //给时间表显示学生信息
    const getstudentInfo = (studentId) => {
        let data = { "isGet": 1, "userId": studentId };
        dispatch(getStuUser(data));
    };
    const copySuccess = () => {
        alert("复制成功");
    }

    const addUserTime = () => {
        if(unableEndDate<=unableStartDate){
            alert("开始时间不可以小于结束时间");
            return;
        }
        let tmptimedate = timedata[0]['timeList'] !== null ? timedata[0]['timeList'] : [];
        let length = Date.now() + tmptimedate.length;
        let testinfo=unavailableInfo.replace(/\s+/g, " ");
        // let testinfo = unavailableInfo;
        console.log(testinfo);
        if (unavailableInfo == "") {
            tmptimedate.push({
                id: length,
                title: 'Unavailable',
                backgroundColor: '#c4c4c4',
                start: unableStartDate,
                end: unableEndDate
            });
        } else {
            tmptimedate.push({
                id: length,
                title: testinfo,
                backgroundColor: '#c4c4c4',
                borderColor: '#ff0000',
                start: unableStartDate,
                end: unableEndDate
            });
            setunavailableInfo("");
        }

        //changetype 1：添加 2：修改 3：删除
        let data = { userId: userId, timeList: tmptimedate, timeType: "0" };
        console.log(data);
        dispatch(addTime(data));
        alert("添加无法上课时间成功");
    };

    const changeUserTime = () => {
        let tmptimedate = timedata[0]['timeList'];
        console.log(timeinfo);
        for (var key in tmptimedate) {
            if (tmptimedate[key].id == timeinfo.id) {
                tmptimedate[key].start = timeinfo.start;
                tmptimedate[key].end = timeinfo.end;
            }
        }
        console.log(tmptimedate);
        //changetype 1：添加 2：修改 3：删除
        let data = { userId: userId, timeList: tmptimedate, timeType: "0" };
        dispatch(addTime(data));
        handleSucessClose();
        alert("修改时间成功");
    };

    const delUserTime = () => {
        let tmptimedate = timedata[0]['timeList'];
        for (var key in tmptimedate) {
            if (tmptimedate[key].id == timeinfo.id) {
                tmptimedate[key] = timeinfo;
                tmptimedate.splice(key, 1);
            }
        }
        //changetype 1：添加 2：修改 3：删除
        let data = { userId: userId, timeList: tmptimedate, timeType: "0" };
        dispatch(addTime(data));
        handleSucessClose();
        alert("删除时间成功");
    };

    const addClass = () => {
        if (stutimedata[2]['timeList'] == null) {
            alert("请选择学员");
            return;
        }
        if (student.licenseName == null) {
            alert("学员还没有完善资料，请完善资料后再添加课程");
            return;
        }
        let tmptimedate = stutimedata[2]['timeList'] !== null ? stutimedata[2]['timeList'] : [];
        let length = Date.now() + tmptimedate.length;
        let realstartDate = new Date(startDate + " " + startHour + ":" + startMinute + ":00");
        tmptimedate.push({
            id: length,
            userId: student.userId,
            title: 'class time ' + duration + 'hr',
            start: realstartDate,
            duration: duration,
            end: endDate
        });
        let data = { userId: student.userId, coachId: userId, reservationId: student.reservationId, changetype: 1, startTime: realstartDate, timeList: tmptimedate, timeType: "2", Duration: duration };
        dispatch(addClassTime(data));
        alert("添加上课时间成功");
        // classTime(student);
    };

    const changeClass = () => {
        let tmptimedate = stutimedata[2]['timeList'];
        for (var key in tmptimedate) {
            if (tmptimedate[key].id == timeinfo.id) {
                tmptimedate[key].start = timeinfo.start;
                tmptimedate[key].end = timeinfo.end;
            }
        }
        let data = { userId: stuShowData.userId, coachId: userId, changetype: 2, startTime: timeinfo.start, timeList: tmptimedate, timeType: "2" };
        dispatch(addClassTime(data));
        // classTime(student);
        handleSucessClose();
        alert("修改时间成功");
    };

    const moveToProcess = () => {
        history.push("/web/coachProcess");
    }

    const delClass = () => {
        // let tmptimedate = stutimedata[2]['timeList'];
        let tmptimedate = stuShowData['timeList'];
        let delduration = 0;
        let start = new Date();
        for (var key in tmptimedate) {
            if (tmptimedate[key].id == timeinfo.id) {
                start = tmptimedate[key].start;
                delduration = tmptimedate[key].duration;
                tmptimedate.splice(key, 1);
            }
        }
        let data = { userId: stuShowData.userId, coachId: userId, changetype: 3, startTime: start, timeList: tmptimedate, timeType: "2", Duration: delduration };
        dispatch(addClassTime(data));
        // classTime(student);
        handleSucessClose();
        alert("删除时间成功");
    };

    const classTime = (studentinfo) => {
        // let data = { isGet: 1, userId: studentinfo.userId };
        let data = { isGetCoach: 1, userId: studentinfo.userId, coachId: userId };
        dispatch(getStuTime(data));
        setClassUserId(studentinfo.userId);
        console.log(studentinfo);
        setstudentinfo(studentinfo);
    };

    //获取教练无法上课时间
    useEffect(() => {
        if (timedata == null) {
            let data = { isGet: 1, userId: userId };
            dispatch(getTime(data));
        }
    }, [dispatch, timedata])

    // useEffect(() => {
    //     if (timedata == null) {
    //         let data = { isGet: 1, userId: userId };
    //         dispatch(getTime(data));
    //     }
    // }, [dispatch, timedata])

    useEffect(() => {
        // if (stutimedata["2"]["timelist"] != null && classUserId != null) {
        if (stutimedata[2]['timelist'] != null && classUserId != null) {
            // let data = { isGet: 1, userId: classUserId };
            console.log("time changed");
            let data = { isGetCoach: 1, userId: classUserId, coachId: userId };
            dispatch(getStuTime(data));
        }
    }, [stutimedata])

    const studentData = useSelector(state => state.studentData.data);

    //获取教练学生列表
    useEffect(() => {
        if (studentData == null) {
            let data = { "isGet": 1, coachId: userId };
            dispatch(getStudent(data));
        }
        //自动获取第一个学生的信息
        if (studentData != null && studentData[0] != null) {
            // let data = { isGet: 1, userId: studentData[0].userId };
            let data = { isGetCoach: 1, userId: studentData[0].userId, coachId: userId };
            dispatch(getStuTime(data));
            setClassUserId(studentData[0].userId);
            setstudentinfo(studentData[0]);
            getstudentInfo(studentData[0].userId);
        }
    }, [dispatch, studentData])

    //计算上课时间
    useEffect(() => {
        // handledurationDateChange(Math.floor((endDate.getTime() - startDate.getTime()) / 3600000));
        let endDate = new Date(startDate + " " + startHour + ":" + startMinute + ":00");
        endDate.setMinutes(endDate.getMinutes() + duration * 60);
        setendDate(endDate);
    }, [startDate, startHour, startMinute, duration])

    const examdata = useSelector(state => state.examData.data);
    //获取考试列表
    useEffect(() => {
        if (examdata == null) {
            let data = { isGet: 1, coachId: userId };
            dispatch(getExam(data));
        }
    }, [dispatch, examdata])
    // console.log(stutimedata.studentList);
    if (timedata == null || studentData == null || examdata == null) {
        return "loading..."
    }
    return (
        <div>
            <div class="sin-wrap">
                <div class="sin-heading">Hi, E-Driving云端驾校欢迎你</div>
                <div class="container">
                    <div class="sin-main">
                        <div class="sin-bar">
                            <CoachMenu coachclass="active" />
                        </div>
                        <div class="sin-main-col">
                            <div class="acc-cells wide-acc-cells pre-scrollable">
                                {/* <div class="acc-heading clearfix">
                                    <div class="acc-search">
                                        <button type="button" class="so"></button>
                                        <input type="text" class="form-control" placeholder="查找学员/时间/考期" />
                                    </div>
                                </div> */}
                                <div class="xc-table-container">
                                    <div class="table-responsive">
                                        <table class="table xc-table">
                                            <thead>
                                                <tr>
                                                    {/* <td>置换</td> */}
                                                    <td>考期类型</td>
                                                    <td>考场</td>
                                                    <td>学生姓名</td>
                                                    <td>路考时间</td>
                                                    <td>路考等级</td>
                                                    <td>成绩</td>
                                                    <td>驾照号码</td>
                                                    <td>驾照过期</td>
                                                    <td>出生日期</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    examdata.map((course, index) =>
                                                        <tr>
                                                            {/* <td>
                                                                <IconButton onClick={() => exchangeExam(course)} size={"small"}>
                                                                    <CompareArrowsIcon />
                                                                </IconButton>
                                                            </td> */}
                                                            <td>{course.examType}</td>
                                                            <td>{course.examLocation}</td>
                                                            <td>{course.licenseName}</td>
                                                            <td>{course.examDate}</td>
                                                            <td>{course.reservationLevel}</td>
                                                            <td>{course.examResultText}</td>
                                                            <td>{course.licenseNumber}</td>
                                                            <td>{course.licenseExpireDate}</td>
                                                            <td>{course.licenseBirthday}</td>
                                                        </tr>
                                                    )
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="calendar-cells">
                                <div class="cell-body">
                                    <div class="row ">
                                        <div class="col-xs-12">
                                            <div class="lkc-heading clearfix">
                                                <h3 class="lkc-tt pull-left">非练车时间区间</h3>
                                            </div>
                                            <div class="basic-row">
                                                <div class="edu-row-form clearfix">
                                                    <div class="form-row">
                                                        <div class="form-label">非练车时间</div>
                                                        <div class="form-input form-data-input">
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <KeyboardDateTimePicker
                                                                    variant="inline"
                                                                    label="With keyboard"
                                                                    value={unableStartDate}
                                                                    onChange={setUnableStart}
                                                                    onError={console.log}
                                                                    disablePast
                                                                    format="yyyy/MM/dd hh:mm a"
                                                                    inputStyle={{ fontSize: "50px" }}
                                                                />
                                                            </MuiPickersUtilsProvider>
                                                        </div>
                                                    </div>
                                                    <div class="label-space">至</div>
                                                    <div class="form-row">
                                                        <div class="form-label"></div>
                                                        <div class="form-input form-data-input">
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <KeyboardDateTimePicker
                                                                    variant="inline"
                                                                    label="With keyboard"
                                                                    value={unableEndDate}
                                                                    onChange={setUnableEnd}
                                                                    onError={console.log}
                                                                    disablePast
                                                                    format="yyyy/MM/dd hh:mm a"
                                                                />
                                                            </MuiPickersUtilsProvider>
                                                        </div>
                                                    </div>
                                                    <div class="unavailable_input form-row">
                                                        <div class="form-label">考试人员信息(例如:张三 Toronto 10:30)</div>
                                                        <div class="form-input">
                                                            <input type="text" class="input-box" name="carPlate" value={unavailableInfo} onChange={(e) => setunavailableInfo(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="form-btn-row">
                                                        <button onClick={() => addUserTime()} class="btn btn-solid">添加</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-md-3">
                                            <div id="ca"></div>
                                        </div>
                                        <div class="col-xs-12 col-md-9">
                                            <FullCalendar
                                                plugins={[timeGridWeek]}
                                                initialView="timeGridWeek"
                                                slotMinTime="06:00:00"
                                                slotMaxTime="22:00:00"
                                                events={timedata[0]['timeList']}
                                                displayEventTime="false"
                                                eventClick={calendarClick}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <hr />
                            <div class="calendar-cells">
                                <div class="cell-body">
                                    <div class="row ">
                                        <div class="col-md-3">
                                            <CoachStudent studentdata={studentData} loadFunction={getstudentTime} ></CoachStudent>
                                        </div>
                                        <div class="col-md-9">
                                            <FullCalendar
                                                plugins={[timeGridWeek]}
                                                initialView="timeGridWeek"
                                                slotMinTime="06:00:00"
                                                slotMaxTime="22:00:00"
                                                events={stutimedata[1]['timeList']}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <hr />
                            <div class="calendar-cells">
                                <div class="cell-body">
                                    <div class="row ">
                                        <div class="col-xs-12">
                                            <div class="lkc-heading clearfix">
                                                <h3 class="lkc-tt pull-left">练车时间区间</h3>
                                            </div>
                                            <div class="basic-row">
                                                <div class="edu-row-form clearfix">
                                                    {/* <div class="form-row">
                                                        <div class="form-label">练车时间</div>
                                                        <div class="form-input form-data-input">
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <KeyboardDateTimePicker
                                                                    variant="inline"
                                                                    ampm={false}
                                                                    label="With keyboard"
                                                                    value={startDate}
                                                                    onChange={handlestartDateChange}
                                                                    onError={console.log}
                                                                    disablePast
                                                                    format="yyyy/MM/dd hh:mm a"
                                                                />
                                                            </MuiPickersUtilsProvider>
                                                        </div>
                                                    </div> */}
                                                    <div class="form-row width_auto">
                                                        <div class="form-label">练车日期</div>
                                                        <div class="form-input form-data-input">
                                                            <input type="date" value={startDate} min={nowTime.toISOString().split('T')[0]} onChange={e => handlestartDateChange(e.target.value)}></input>
                                                        </div>
                                                    </div>
                                                    <div class="form-row width_auto">
                                                        <div class="form-label">时</div>
                                                        <div class="form-input form-data-input">
                                                            <select value={startHour} onChange={e => handlestartHourChange(e.target.value)}>
                                                                {Array.from(Array(16), (e, i) => {
                                                                    return <option checked={startHour == 6 + i} value={6 + i}>{6 + i}</option>
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-row width_auto">
                                                        <div class="form-label">分</div>
                                                        <div class="form-input form-data-input">
                                                            <select value={startMinute} onChange={e => handlestartMinuteChange(e.target.value)}>
                                                                <option value="0">00</option>
                                                                <option value="15">15</option>
                                                                <option value="30">30</option>
                                                                <option value="45">45</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-row width_auto">
                                                        <div class="form-label">时长（小时）</div>
                                                        <div class="form-input form-data-input">
                                                            <select value={duration} onChange={e => handledurationDateChange(e.target.value)}>
                                                                <option value="0.5">0.5</option>
                                                                <option value="1">1</option>
                                                                <option value="1.5">1.5</option>
                                                                <option value="2">2</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    {/* <div class="label-space">至</div>
                                                    <div class="form-row">
                                                        <div class="form-label"></div>
                                                        <div class="form-input form-data-input">
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <KeyboardDateTimePicker
                                                                    variant="inline"
                                                                    ampm={false}
                                                                    label="With keyboard"
                                                                    value={endDate}
                                                                    onChange={handleendDateChange}
                                                                    onError={console.log}
                                                                    disablePast
                                                                    format="yyyy/MM/dd hh:mm a"
                                                                />
                                                            </MuiPickersUtilsProvider>
                                                        </div>
                                                    </div> */}
                                                    <div class="label-space">结束时间：{endDate.toLocaleString()}</div>
                                                    <div class="form-btn-row">
                                                        <button onClick={addClass} class="btn btn-solid">添加</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xs-6 col-md-3">
                                            <div class="basic-row">
                                                <div class="form-row">
                                                    <div class="form-label">学员姓名(NAME)</div>
                                                    <div class="form-val">{student.licenseName}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-md-2">
                                            <div class="form-row">
                                                <div class="form-label">学员编号(No.)</div>
                                                <div class="form-val">{student.userNumber}</div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-md-2">
                                            <div class="form-row">
                                                <div class="form-label">练车时间</div>
                                                <div class="form-val">{student.finishedCarTime}/{student.carTime}</div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-md-2">
                                            <div class="form-row">
                                                <div class="form-label">理论时间</div>
                                                <div class="form-val">{student.finishedCourseTime}/{student.courseTime}</div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-md-3">
                                            <div class="form-row">
                                                <div class="form-label">考试时间</div>
                                                <div class="form-val">{student.examDate!=null?student.examDate:"暂无"}</div>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <CoachStudent studentdata={studentData} loadFunction={classTime} ></CoachStudent>
                                        </div>
                                        <div class="col-md-9">
                                            <div class="lkc-dots text-right">
                                                <span class="lkc-item dot1">教练非教车时间</span>
                                                <span class="lkc-item dot2">我的练车时间</span>
                                                <span class="lkc-item dot3">我的可支配时间</span>
                                            </div>
                                            <FullCalendar
                                                plugins={[timeGridWeek]}
                                                initialView="timeGridWeek"
                                                slotMinTime="06:00:00"
                                                slotMaxTime="22:00:00"
                                                events={stutimedata['all']}
                                                eventClick={classCalendarClick}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ExtraLink />
            <Dialog maxWidth={"md"} open={successopen} onClose={handleSucessClose} >
                <div class="modal-dialog" role="document">
                    <button onClick={() => handleSucessClose()} type="button" class="modal-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <div class="modal-tips-body">
                        <div class="col-xs-12 col-lg-6">
                            <div class="basic-row">
                                <div class="form-row">
                                    <div class="form-label">开始时间</div>
                                    <div class="form-val">{timeinfo.start}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-lg-6">
                            <div class="form-row">
                                <div class="form-label">结束时间</div>
                                <div class="form-val">{timeinfo.end}</div>
                            </div>
                        </div>
                        {
                            timeinfo.type == "unavailable" &&
                            <div class="col-xs-12 col-lg-12">
                                <div class="basic-row">
                                    <div class="form-row">
                                        <div class="form-val">{timeinfo.title}</div>
                                    </div>
                                </div>
                            </div>
                            || stuShowData != null &&
                            <>
                                <div class="col-xs-12 col-lg-6">
                                    <div class="basic-row">
                                        <div class="form-row">
                                            <div class="form-label">学员姓名(NAME)</div>
                                            <div class="form-val">{stuShowData.licenseName}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-lg-6">
                                    <div class="form-row">
                                        <div class="form-label">学员编号(No.)</div>
                                        <div class="form-val">{stuShowData.userNumber}</div>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-lg-12">
                                    <div class="form-row">
                                        <div class="form-label">学员地址(Address)</div>
                                        <div class="form-val">{stuShowData.licensePickupAddress}</div>
                                        <CopyToClipboard text={stuShowData.licensePickupAddress} onCopy={() => copySuccess()}>
                                            <button>复制</button>
                                        </CopyToClipboard>
                                    </div>
                                </div>

                                {/* <div class="col-xs-12 col-md-6">
                                <div class="form-row">
                                    <div class="form-label">练车时间</div>
                                    <div class="form-val">{stuShowData.finishedCarTime}/{stuShowData.carTime}</div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-md-6">
                                <div class="hide-space"></div>
                            </div> */}
                            </>
                        }

                        {/* <div class="col-xs-12 col-sm-12">
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
                        </div> */}
                        {
                            timeinfo.type == "unavailable" &&
                            <>
                                <div class="col-xs-12 text-right">
                                    <div class="form-btn-row">
                                        <button type="button " class="btn btn-solid" onClick={() => delUserTime()}>删除</button>
                                    </div>
                                </div>
                                {/* <div class="col-xs-6 text-left">
                                    <div class="form-btn-row">
                                        <button type="button " class="btn btn-solid" onClick={() => changeUserTime()}>修改</button>
                                    </div>
                                </div> */}
                            </>
                            ||
                            <>
                                <div class="col-xs-6 text-center">
                                    <div class="form-btn-row">
                                        <button type="button " class="btn btn-solid" onClick={() => delClass()}>删除</button>
                                    </div>
                                </div>
                                <div class="col-xs-6 text-left">
                                    <div class="form-btn-row">
                                        <button type="button " class="btn btn-solid" onClick={() => moveToProcess()}>点评</button>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default CoachClass;

