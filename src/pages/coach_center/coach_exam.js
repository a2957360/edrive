import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import CoachStudent from './coach_student'

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';

import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CommonReply from '../comreply';

import CoachMenu from './coach_menu'
import ExtraLink from '../question_center/extra_links'
import { getStudent } from '../../actions/student';
import { getTime, addTime } from '../../actions/time';
import { getExam, addExam } from '../../actions/exam';
import { getStuUser } from '../../actions/user';
import { useHistory } from "react-router-dom";

import { PIC_URL } from "../../constants/actionTypes";

function CoachClass() {
    const dispatch = useDispatch();

    const userData = useSelector(state => state.userData.studata);
    const studentData = useSelector(state => state.studentData.data);
    const timedata = useSelector(state => state.timeData.data);
    const examdata = useSelector(state => state.examData.data);
    const userId = localStorage.getItem("userId");

    const history = useHistory();
    if(userId=="" || userId==null){
        alert("请登录后再操作。");
        history.push("/web/");
    }


    const [userinfo, setUserinfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {}
    );

    const [firstExchangeinfo, setFirstExchangeinfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { isWrite: 0 }
    );
    const [secExchangeinfo, setSecExchangeinfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { isWrite: 0 }
    );
    //考期置换
    const exchangeExam = (refexaminfo) => {
        if (firstExchangeinfo.isWrite == 0) {
            setFirstExchangeinfo(refexaminfo);
            setFirstExchangeinfo({ isWrite: 1 });
        } else {
            if (refexaminfo.examId != firstExchangeinfo.examId) {
                setSecExchangeinfo(refexaminfo);
                setSecExchangeinfo({ isWrite: 1 });
                //打开弹窗
                setExchangeOpen(true);
            } else {
                alert("请选择不同考期");
            }

        }
    };
    const [exchangeOpen, setExchangeOpen] = React.useState(false);
    const handleExchangeClose = () => {
        setFirstExchangeinfo({ isWrite: 0 });
        setExchangeOpen(false);
    };
    const onExchangeExam = () => {
        const exchangedata = { "0": firstExchangeinfo, "1": secExchangeinfo, "isExchange": 1 }
        console.log(exchangedata);
        dispatch(addExam(exchangedata));
        handleExchangeClose();
    };

    //添加修改考期
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
        console.log(userData.licenseName);
        setExaminfo({ licenseName: userData.licenseName });
    };
    const handleClose = () => {
        setExaminfo({ examId: "", licenseName: "", examType: "", examLocation: "", examDate: (new Date()).toLocaleString('en-US'), examImageurl: PIC_URL + "/images/upload.png" });
        setOpen(false);
    };

    //确定弹出
    const [alertOpen, setAlertOpen] = React.useState(false);
    const handleAlertClickOpen = (examinfo) => {
        setAlertOpen(true);
        setDeleteId(examinfo.examId);
        console.log(examinfo.examId);
    };
    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const [examinfo, setExaminfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { examImageurl: PIC_URL + "/images/upload.png", examDate: (new Date()).toLocaleString('en-US') }
    );

    const { register, handleSubmit, watch, errors, getValues } = useForm();

    const onpersonalSubmit = (data) => {
        let fileData = new FormData();
        for (var key in userData) {
            fileData.append(key, userData[key]);
        }
        for (var key in examinfo) {
            fileData.append(key, examinfo[key]);
        }
        // fileData.append("isChange", "1");
        fileData.append("coachId", userId);
        dispatch(addExam(fileData))
        handleClose();
        alert("添加成功！");
    };

    const handlePersonalChange = React.useCallback(event => {
        setExaminfo({ [event.target.name]: event.target.value });
        if (event.target.name.indexOf("Image") != -1 && event.target.files[0] != null) {
            setExaminfo({ [event.target.name]: event.target.files[0] });
            setExaminfo({ [event.target.name + "url"]: URL.createObjectURL(event.target.files[0]) });
        }
    }, [examinfo]);

    const setstudentexam = (studentinfo) => {
        let data = { "isGet": 1, "userId": studentinfo.userId };
        dispatch(getStuUser(data));
    };
    const editeExam = (examinfo) => {
        setExaminfo(examinfo);
        console.log(examinfo);
        setOpen(true);
    };
    const [deleteId, setDeleteId] = React.useState();
    const delExam = () => {
        let data = { "isDelete": 1, "examId": deleteId };
        dispatch(addExam(data));
        console.log(deleteId);
        handleAlertClose();
    };
    useEffect(() => {
        if (studentData == null) {
            let data = { "isGet": 1,coachId:userId};
            dispatch(getStudent(data));
        }
        if (studentData != null && studentData.length > 0) {
            let data = { "isGet": 1, "userId": studentData[0].userId };
            dispatch(getStuUser(data));
        }
    }, [dispatch, studentData])

    useEffect(() => {
        if (timedata == null) {
            let data = { isGet: 1, userId: userId };
            dispatch(getTime(data));
        }
    }, [dispatch, timedata])

    useEffect(() => {
        if (userData != null) {
            setUserinfo(userData);
            setExaminfo({ licenseName: userData.licenseName });
        }
    }, [dispatch, userData])

    useEffect(() => {
        if (examdata == null) {
            let data = { isGet: 1, coachId: userId };
            dispatch(getExam(data));
        }
    }, [dispatch, examdata])

    if (studentData == null || examdata == null) {
        return "loading..."
    }
    return (
        <div>
            <div class="sin-wrap">
                <div class="sin-heading">Hi, E-Driving云端驾校欢迎你</div>
                <div class="container">
                    <div class="sin-main">
                        <div class="sin-bar">
                            <CoachMenu coachexam="active" />
                            <CoachStudent studentdata={studentData} loadFunction={setstudentexam} ></CoachStudent>
                        </div>
                        <div class="sin-main-col">
                            <div class="jd-cells">
                                <div class="jd-heading">学员信息</div>
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
                                                    <div class="form-label">矫正视力(REST)</div>
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
                                            <div class="col-xs-12 col-md-3">
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
                                            <div class="col-xs-12 col-md-3">
                                                <div class="form-row">
                                                    <div class="form-label">路考等级(CLASS)</div>
                                                    <div class="form-val">{userinfo.reservationLevel}</div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-md-3">
                                                <div class="form-row">
                                                    <div class="form-label">期望路考时间</div>
                                                    <div class="form-val">{userinfo.expectExamDate}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="cell-heading">
                                    <div class="cell-tit"> </div>
                                    <div class="cell-btns">
                                        <button onClick={handleClickOpen} class="btn-save">新增考期</button>
                                    </div>
                                </div>
                            </div>
                            <div class="acc-cells wide-acc-cells pre-scrollable">
                                <div class="xc-table-container">
                                    <div class="table-responsive">
                                        <table class="table xc-table">
                                            <thead>
                                                <tr>
                                                    {/* <td>置换</td> */}
                                                    <td>考期类型</td>
                                                    <td>学生姓名</td>
                                                    <td>路考等级</td>
                                                    <td>考场</td>
                                                    <td>路考时间</td>
                                                    <td>成绩</td>
                                                    <td>驾照号码</td>
                                                    <td>驾照过期</td>
                                                    <td>出生日期</td>
                                                    <td>操作</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    examdata.map((course, index) =>
                                                        <tr >
                                                            {/* <td>
                                                                <IconButton onClick={() => exchangeExam(course)} size={"small"}>
                                                                    <CompareArrowsIcon />
                                                                </IconButton>
                                                            </td> */}
                                                            <td>{course.examType}</td>
                                                            <td>{course.licenseName}</td>
                                                            <td>{course.reservationLevel}</td>
                                                            <td>{course.examLocation}</td>
                                                            <td>{course.examDate}</td>
                                                            <td>{course.examResultText}</td>
                                                            <td>{course.licenseNumber}</td>
                                                            <td>{course.licenseExpireDate}</td>
                                                            <td>{course.licenseBirthday}</td>
                                                            <td>
                                                                <IconButton onClick={() => editeExam(course)} size={"small"}>
                                                                    <EditIcon />
                                                                </IconButton>
                                                                <IconButton onClick={() => handleAlertClickOpen(course)} size={"small"}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </td>
                                                        </tr>
                                                    )
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <CommonReply commonReplytype="1"/>
                        </div>
                    </div>
                </div>
            </div>
            <ExtraLink />
            <Dialog open={open} onClose={handleClose} maxWidth={"md"}>
                <div class="modal-dialog modal-lg" role="document">
                    <div class="">
                        <div class="modal-body modal-kh-body">
                            {/* <ul class="acc-tabs" role="tablist">
                                    <li class="active"><a href="#ac1" aria-controls="ac1" role="tab" data-toggle="tab">新增考期</a></li>
                                    <li><a href="#ac2" aria-controls="ac2" role="tab" data-toggle="tab">置换考期</a></li>
                                    <li><a href="#ac4" aria-controls="ac3" role="tab" data-toggle="tab">编辑考期</a></li>
                                </ul> */}
                            <form class="row kh-out-row" onChange={handlePersonalChange} onSubmit={handleSubmit(onpersonalSubmit)}>
                                <input type="hidden" name="examId" value={examinfo.examId}></input>
                                <div class="col-md-8">
                                    <div class="row kh-row">
                                        <div class="col-xs-6 col-md-6">
                                            <div class="form-row">
                                                <div class="form-label">学生姓名：</div>
                                                <div class="form-input">
                                                    <input type="text" class="input-box" name="licenseName" value={examinfo.licenseName} readOnly />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-md-6">
                                            <div class="form-row">
                                                <div class="form-label">考期类型：</div>
                                                <div class="form-input">
                                                    <input type="text" class="input-box" name="examType" value={examinfo.examType} ref={register} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-md-6">
                                            <div class="form-row">
                                                <div class="form-label">考场地点：</div>
                                                <div class="form-input">
                                                    <input type="text" class="input-box" name="examLocation" value={examinfo.examLocation} ref={register} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-md-6">
                                            <div class="form-row">
                                                <div class="form-label">路考时间：</div>
                                                <div class="form-input">
                                                    <input type="text" class="input-box" name="examDate" value={examinfo.examDate} ref={register} />
                                                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <KeyboardDateTimePicker
                                                            variant="inline"
                                                            ampm={false}
                                                            label="With keyboard"
                                                            value={examinfo.examDate}
                                                            onChange={date => setExaminfo({ "examDate": date.toISOString() })}
                                                            onError={console.log}
                                                            disablePast
                                                            format="yyyy/MM/dd hh:mm a"
                                                        />
                                                    </MuiPickersUtilsProvider> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-md-6">
                                            <div class="form-row">
                                                <div class="form-label">政府费:</div>
                                                <div class="form-input">
                                                    <input type="text" class="input-box" name="examGovernment" value={examinfo.examGovernment} ref={register} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="upload-cell">
                                        <div class="txt">上传预约截图</div>
                                        <div class="uplad-box">
                                            <input type="file" name="examImage" id="up_img_WU_FILE_0" />
                                            <img id="imgShow_WU_FILE_0" src={examinfo.examImageurl} />
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-btns">
                                    <button type="submit" class="btn btn-solid">添加</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Dialog>
            <Dialog open={exchangeOpen} onClose={handleExchangeClose} maxWidth={"md"}>
                <div class="modal-dialog modal-lg" role="document">
                    <div class="">
                        <div class="modal-body modal-kh-body">
                            <div class="row kh-out-row">
                                <input type="hidden" name="examId" value={firstExchangeinfo.examId}></input>
                                <div class="col-md-8">
                                    <div class="row kh-row">
                                        <div class="col-xs-6 col-md-4">
                                            <div class="kh-item">
                                                学生姓名：<span class="text-blue">{firstExchangeinfo.licenseName}</span>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-md-4">
                                            <div class="kh-item">
                                                考期类型：<span class="text-blue">{firstExchangeinfo.examType}</span>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-md-4">
                                            <div class="kh-item">
                                                考场地点：<span class="text-blue">{firstExchangeinfo.examLocation}</span>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-md-4">
                                            <div class="kh-item">
                                                驾照号码：<span class="text-blue">{firstExchangeinfo.licenseNumber}</span>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-md-4">
                                            <div class="kh-item">
                                                过期日期：<span class="text-blue">{firstExchangeinfo.licenseExpireDate}</span>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-md-4">
                                            <div class="kh-item">
                                                学生生日：<span class="text-blue">{firstExchangeinfo.licenseBirthday}</span>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-md-6">
                                            <div class="kh-item">
                                                路考时间：<span class="text-blue">{firstExchangeinfo.examDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="upload-cell">
                                        <div class="txt">预约截图</div>
                                        <div class="uplad-box">
                                            <img id="imgShow_WU_FILE_0" src={firstExchangeinfo.examImageurl} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-body modal-kh-body">
                            <div class="row kh-out-row" >
                                <input type="hidden" name="examId" value={secExchangeinfo.examId}></input>
                                <div class="col-md-8">
                                    <div class="row kh-row">
                                        <div class="col-xs-6 col-md-4">
                                            <div class="kh-item">
                                                学生姓名：<span class="text-blue">{secExchangeinfo.licenseName}</span>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-md-4">
                                            <div class="kh-item">
                                                考期类型：<span class="text-blue">{secExchangeinfo.examType}</span>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-md-4">
                                            <div class="kh-item">
                                                考场地点：<span class="text-blue">{secExchangeinfo.examLocation}</span>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-md-4">
                                            <div class="kh-item">
                                                驾照号码：<span class="text-blue">{secExchangeinfo.licenseNumber}</span>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-md-4">
                                            <div class="kh-item">
                                                过期日期：<span class="text-blue">{secExchangeinfo.licenseExpireDate}</span>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-md-4">
                                            <div class="kh-item">
                                                学生生日：<span class="text-blue">{secExchangeinfo.licenseBirthday}</span>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-md-6">
                                            <div class="kh-item">
                                                路考时间：<span class="text-blue">{secExchangeinfo.examDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="upload-cell">
                                        <div class="txt">预约截图</div>
                                        <div class="uplad-box">
                                            <img id="imgShow_WU_FILE_0" src={secExchangeinfo.examImageurl} />
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-btns">
                                    <button type="button" onClick={onExchangeExam} class="btn btn-solid">确认置换</button>
                                    <button type="button" onClick={handleExchangeClose} class="btn btn-solid">取消</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
            <Dialog
                open={alertOpen}
                onClose={handleAlertClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        确定要删除该考期吗
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        取消
                    </Button>
                    <Button onClick={delExam} color="primary" autoFocus>
                        确认
                    </Button>
                </DialogActions>
            </Dialog>
        </div>


    );
}

export default CoachClass;

