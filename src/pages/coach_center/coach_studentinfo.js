import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { getBarrageData, addBarrageData } from '../../actions/live';
import ExtraLink from '../question_center/extra_links'
import CoachMenu from './coach_menu'
import CoachStudent from './coach_student'

import { PIC_URL } from "../../constants/actionTypes";
import { getStuUser, changeUser, changeLicense } from '../../actions/user';
import { getStudent } from '../../actions/student';
import { coachsignupUser } from '../../actions/loginSignup';
import CommonReply from '../comreply';
import { useHistory } from "react-router-dom";

function CoachStudentInfo() {
    const dispatch = useDispatch();

    const userData = useSelector(state => state.userData.studata);
    const studentData = useSelector(state => state.studentData.data);
    const coachsignupmessage = useSelector(state => state.userData.coachsignupmessage);

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
    const [signupinfo, setSignupinfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {studentBlong:0}
    );
    const getstudentInfo = (studentinfo) => {
        let data = { "isGet": 1, "userId": studentinfo.userId };
        dispatch(getStuUser(data));
    };

    const { register, handleSubmit, triggerValidation, watch, errors, getValues } = useForm();

    const onSignupSubmit = (data) => {
        let sendData = signupinfo;
        sendData["isSignup"] = "1";
        sendData["userBelong"] = userId;
        if(signupinfo.studentBlong == 1){
            sendData["userRole"] = 4;
        }
        dispatch(coachsignupUser(sendData));
        // alert("添加成功！");
    };

    const handleSignupChange = React.useCallback(event => {
        setSignupinfo({ [event.target.name]: event.target.value });
    }, [userinfo]);

    const onpersonalSubmit = async () => {
        const result = await triggerValidation(["userName","userPhone","userEmail","userLearningEmail"]);
        if(result){
            let fileData = new FormData();
            // setUserinfo(data);
            for (var key in userinfo) {
                fileData.append(key, userinfo[key]);
                console.log(key, userinfo[key]);
            }
            fileData.append("isChange", "1");
            dispatch(changeUser(fileData));
            alert("修改成功");
        }
    };

    const handlePersonalChange = React.useCallback(event => {
        // console.log(event.target.name,event.target.value)
        setUserinfo({ [event.target.name]: event.target.value });
        if ((event.target.name == "licenseImage" || event.target.name == "userImage") && event.target.files[0] != null) {
            setUserinfo({ [event.target.name]: event.target.files[0] });
            setUserinfo({ [event.target.name + "url"]: URL.createObjectURL(event.target.files[0])});
        }
    }, [userinfo]);

    const tmponlicenseSubmit = async () => {
        const result = await triggerValidation(["licenseName","licenseBirthday","licensePhone","licenseEmail","licenseNumber","licenseExpireDate","licenseIssueDate","licenseAddress","licensePickupAddress"]);
        if(result){
            let fileData = new FormData();
            for (var key in userinfo) {
                fileData.append(key, userinfo[key]);
            }
            fileData.append("isLicense", "1");
            dispatch(changeLicense(fileData));
            alert("修改成功");
        }
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
        if (userData != null) {
            setUserinfo(userData);
        }
    }, [dispatch, userData])

    useEffect(() => {
        if (coachsignupmessage == "success" && signupinfo.userName != null && signupinfo.userEmail != null && signupinfo.userPassword != null) {
            alert("添加成功！");
            let data = { "isGet": 1,coachId:userId};
            dispatch(getStudent(data));
            setSignupinfo({userName:"",userEmail:"",userPassword:""});
        }
        if (coachsignupmessage == "email error") {
            alert("邮箱重复！");
        }
    }, [coachsignupmessage])

    if (studentData == null || (studentData.length > 0 && userData == null)) {
        return "loading..."
    }
    return (
        <div>
            <div class="sin-wrap">
                <div class="sin-heading">E-Driving云端驾校欢迎你</div>
                <div class="container">
                    <div class="sin-main">
                        <div class="sin-bar">
                            <CoachMenu coachestu="active" />
                            <CoachStudent studentdata={studentData} loadFunction={getstudentInfo} ></CoachStudent>
                        </div>
                        <div class="sin-main-col">
                            <form class="jd-cells" onChange={handleSignupChange} >
                                <div class="jd-cell-body">
                                    <div class="cell-heading">
                                        <div class="cell-tit">添加学生</div>

                                    </div>
                                    <div class="row basic-row">
                                        <div class="col-xs-12 ">
                                            <div class="form-checkbox">
                                                <span class="check-span">生源</span>
                                                <label class="checkbox-inline">
                                                    <input type="radio" name="studentBlong" id="inlineCheckbox1" value="0" checked={signupinfo.studentBlong==0}/> <span>学校指派</span>
                                                </label>
                                                <label class="checkbox-inline">
                                                    <input type="radio" name="studentBlong" id="inlineCheckbox2" value="1" checked={signupinfo.studentBlong==1} /> <span>自有学生</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-5">
                                            <div class="form-row">
                                                <div class="form-label">真实姓名(NAME 拼音，请和驾照相同) </div>
                                                <div class="form-input">
                                                    <input type="text" name="userName" class="input-box" value={signupinfo.userName} ref={register({ required: true, maxLength: 20, minLength: 4 })}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-5">
                                            <div class="form-row">
                                                <div class="form-label">登录邮箱</div>
                                                <div class="form-input">
                                                    <input type="text" name="userEmail" class="input-box" value={signupinfo.userEmail} ref={register({
                                                                required: true,
                                                                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                                                            })}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-5">
                                            <div class="form-row">
                                                <div class="form-label">密码</div>
                                                <div class="form-input">
                                                    <input type="password" name="userPassword" class="input-box" value={signupinfo.userPassword} ref={register({ required: true, minLength: 6 })}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cell-btns">
                                        <button type="button" onClick={()=>onSignupSubmit()} class="btn-save">添加学生</button>
                                    </div>
                                </div>
                            </form>
                            <form class="sin-cells" onChange={handlePersonalChange}>
                                <div class="cell-heading">
                                    <div class="cell-tit">基本信息</div>

                                </div>
                                <div class="cell-body">
                                    <div class="row basic-row">
                                        <input type="hidden" name="userId" value={userinfo.userId} ref={register}></input>
                                        <div class="col-xs-12">
                                                <div class="jd-account">
                                                    学员编号(STUDENT NO.): <span class="id">{userinfo.userNumber}</span>
                                                </div>
                                            </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">真实姓名(NAME 拼音，请和驾照相同) {errors.userName && <p className="input_error">{"请输入正确格式"}</p>}</div>
                                                <div class="form-input">
                                                    <input type="text" name="userName" class="input-box" placeholder="" value={userinfo.userName} ref={register({
                                                                required: true
                                                            })} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">电话 {errors.userPhone && <p className="input_error">{"请输入正确格式"}</p>}</div>
                                                <div class="form-input">
                                                    <input type="tel" name="userPhone" class="input-box" value={userinfo.userPhone} ref={register({
                                                                required: true,
                                                                pattern: /^\d{10}$/
                                                            })} /> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">邮箱 {errors.userEmail && <p className="input_error">{"请输入正确格式"}</p>}</div>
                                                <div class="form-input">
                                                    <input type="text" name="userEmail" class="input-box" placeholder="" value={userinfo.userEmail} ref={register({
                                                                required: true,
                                                                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                                                            })} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 hidden-xs">
                                            <div class="hide-space"></div>
                                        </div>
                                        <div class="col-xs-8 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">学车邮箱 {errors.userLearningEmail && <p className="input_error">{"请输入正确格式"}</p>}</div>
                                                <div class="form-input">
                                                    <input type="text" name="userLearningEmail" class="input-box" placeholder="学车邮箱须使用Gmail" value={userinfo.userLearningEmail} ref={register({
                                                                required: true,
                                                                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                                                            })} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-sm-6">
                                            <div class="form-btn-row">
                                                <a href="https://www.google.com" class="btn btn-solid">申请</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cell-btns">
                                        {/* <a href="javascript:void(0);" class="btn-reset">取消</a> */}
                                        <button onClick={()=>onpersonalSubmit()} type="button" class="btn btn-save">保存</button>
                                    </div>
                                </div>
                            </form>
                            <form class="sin-cells" onChange={handlePersonalChange}>
                                <div class="cell-heading">
                                    <div class="cell-tit">驾照信息</div>

                                </div>
                                <div class="cell-body">
                                    {/* <div class="row jz-row"> */}
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <ul id="warp">
                                                <li class="upload-cell">
                                                    <div class="txt">上传驾照</div>
                                                    <div class="uplad-box">
                                                        <input type="file" id="up_img_WU_FILE_0" name="licenseImage" ref={register} />
                                                        {/* <img id="imgShow_WU_FILE_0" src={PIC_URL + userinfo.licenseImage} />
                                                         */}
                                                        <img id="imgShow_WU_FILE_0" src={userinfo.licenseImageurl} />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">真实姓名(NAME 拼音，请和驾照相同)</div>
                                                <div class="form-input">
                                                    <input type="text" name="licenseName" class="input-box" placeholder="" value={userinfo.licenseName != "" ?userinfo.licenseName:userinfo.userName} ref={register({
                                                                required: true
                                                            })}/>
                                                     {errors.licenseName && <p className="input_error">{"请填写姓名"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="row jz-in-row">
                                                <div class="col-xs-6">
                                                    <div class="form-row">
                                                        <div class="form-label">出生日期(DOB)</div>
                                                        <div class="form-input">
                                                            <input type="date" name="licenseBirthday" class="input-box" placeholder="" value={userinfo.licenseBirthday} ref={register({
                                                                required: true
                                                            })}/>
                                                             {errors.licenseBirthday && <p className="input_error">{"请填写出生日期"}</p>}    
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-6">
                                                    <div class="form-row">
                                                        <div class="form-label">性别(SEX)</div>
                                                        <div class="form-select">
                                                            <select name="licenseGender" class="input-box">
                                                                <option value="0" selected={userinfo.licenseGender == 0}>男</option>
                                                                <option value="1" selected={userinfo.licenseGender == 1}>女</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">电话(PHONE NO.)</div>
                                                <div class="form-input">
                                                    <input type="text" name="licensePhone" class="input-box" placeholder="" value={userinfo.licensePhone} ref={register({
                                                                required: true,
                                                                pattern: /^\d{10}$/
                                                            })}/>
                                                     {errors.licensePhone && <p className="input_error">{"请填写正确电话"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">邮箱(EMAIL)</div>
                                                <div class="form-input">
                                                    <input type="text" name="licenseEmail" class="input-box" placeholder="" value={userinfo.licenseEmail != ""?userinfo.licenseEmail:userinfo.userEmail} ref={register({
                                                                required: true,
                                                                pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                                                            })}/>
                                                     {errors.licenseEmail && <p className="input_error">{"请填写正确邮箱"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">驾照号码(NO.)</div>
                                                <div class="form-input">
                                                    <input type="text" name="licenseNumber" class="input-box" placeholder="" value={userinfo.licenseNumber} ref={register({
                                                                required: true,
                                                                pattern: /^[a-zA-Z]/
                                                            })}/>
                                                     {errors.licenseNumber && <p className="input_error">{"请填写正确驾照号码"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="row jz-in-cell">
                                                <div class="col-xs-6">
                                                    <div class="form-row">
                                                        <div class="form-label">过期时间(EXP)</div>
                                                        <div class="form-input">
                                                            <input name="licenseExpireDate" type="date" class="input-box" placeholder="" value={userinfo.licenseExpireDate} ref={register({
                                                                required: true
                                                            })}/>
                                                             {errors.licenseExpireDate && <p className="input_error">{"请填写日期"}</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-6">
                                                    <div class="form-row">
                                                        <div class="form-label">颁发时间(ISS)</div>
                                                        <div class="form-input">
                                                            <input name="licenseIssueDate" type="date" class="input-box" placeholder="" value={userinfo.licenseIssueDate} ref={register({
                                                                required: true
                                                            })}/>
                                                             {errors.licenseIssueDate && <p className="input_error">{"请填写日期"}</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">是否矫正视力(REST)</div>
                                                <div class="form-input">
                                                    <select name="licenseEye" class="input-box">
                                                        <option value="0" selected={userinfo.licenseEye == 0}>是</option>
                                                        <option value="1" selected={userinfo.licenseEye == 1}>否</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">城市</div>
                                                <div class="form-input">
                                                    <input name="licenseAddress" type="text" class="input-box" placeholder="" value={userinfo.licenseAddress} ref={register({
                                                                required: true
                                                            })}/>
                                                     {errors.licenseAddress && <p className="input_error">{"请填写城市"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">接送地址</div>
                                                <div class="form-input">
                                                    <input name="licensePickupAddress" type="text" class="input-box" placeholder="" value={userinfo.licensePickupAddress} ref={register({
                                                                required: true
                                                            })}/>
                                                     {errors.licensePickupAddress && <p className="input_error">{"请填写地址"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="row jz-in-cell">
                                                <div class="col-xs-6">
                                                    <div class="form-row">
                                                        <div class="form-label">熟练语言(国/粤/英/其它)</div>
                                                        <div class="form-input">
                                                            <input name="licenseLanguage" type="text" class="input-box" placeholder="" value={userinfo.licenseLanguage} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-6">
                                                    <div class="form-row">
                                                        <div class="form-label">驾驶经验</div>
                                                        <div class="form-select">
                                                            <select name="licenseYear" class="input-box">
                                                                <option value="0" selected={userinfo.licenseYear == 0}>无</option>
                                                                <option value="1" selected={userinfo.licenseYear == 1}>一年</option>
                                                                <option value="2" selected={userinfo.licenseYear == 2}>两年</option>
                                                                <option value="3" selected={userinfo.licenseYear == 3}>两年以上</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="cell-btns">
                                        {/* <a href="javascript:void(0);" class="btn-reset">取消</a> */}
                                        <button onClick={()=>tmponlicenseSubmit()} type="button" class="btn-save">保存</button>
                                    </div>
                                </div>
                            </form>
                            {/* <div class="res-space">
                                <div class="row">
                                    <div class="col-xs-6 col-md-3">
                                        <div class="tm-text">预计路考日期</div>
                                        <div class="tm-v"><i class="iconfont icon-time"></i> 无</div>
                                    </div>
                                    <div class="col-xs-6 col-md-3">
                                        <div class="tm-text">实际路考日期</div>
                                        <div class="tm-v"><i class="iconfont icon-time"></i> 无</div>
                                    </div>
                                    <div class="col-xs-12 col-md-6">
                                        <div class="tm-text">接受学校提示信息</div>
                                        <div class="tm-v"><i class="iconfont icon-checked"></i> 练车时间，路考时间，恶劣天气，突发状况</div>
                                    </div>
                                </div>
                            </div> */}
                            <CommonReply commonReplytype="1"/>
                        </div>
                    </div>
                </div>
            </div>
            <ExtraLink />
        </div>
    );
}

// export default connect(mapStateToProps, mapDispatchToProps)(myInfroamtion);
export default (CoachStudentInfo);




