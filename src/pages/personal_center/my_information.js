import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import ExtraLink from '../question_center/extra_links'
import MyMenu from './my_menu'
import CommonReply from '../comreply';
import Dialog from '@material-ui/core/Dialog';

import { getUser, changeUser, changeLicense,clearUser } from '../../actions/user';

function MyInfroamtion() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userLanguage = localStorage.getItem("userLanguage");

    const userData = useSelector(state => state.userData);
    const userId = localStorage.getItem("userId");
    if(userId=="" || userId==null){
        alert("请登录后再操作。");
        history.push("/web/");
    }
    const [open, setOpen] = React.useState(false);

    let todayDate = new Date()
    todayDate = todayDate.getFullYear()+"-"+todayDate.getMonth()+"-"+todayDate.getDate();

    const handleClose = () => {
        setOpen(false);
    };
    const [userinfo, setUserinfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {}
    );

    const { register, handleSubmit, triggerValidation, watch, errors, getValues } = useForm();

    const onpersonalSubmit = async () => {
        const result = await triggerValidation(["userName","userPhone","userEmail","userLearningEmail"]);
        if(result){
            let fileData = new FormData();
            // setUserinfo(data);
            for (var key in userinfo) {
                fileData.append(key, userinfo[key]);
            }
            fileData.append("isChange", "1");
            dispatch(changeUser(fileData))
            // alert("修改成功！");
        }
    };

    const onSubmit = () => {
        let data = {isPassword:1,userId:userId,userPassword:userinfo["userPassword"]}
        dispatch(changeUser(data));
        alert("密码修改成功！");
        handleClose();
    };

    const handlePersonalChange = React.useCallback(event => {
        setUserinfo({ [event.target.name]: event.target.value });
        if ((event.target.name == "licenseImage" || event.target.name == "userImage") && event.target.files[0] != null) {
            setUserinfo({ [event.target.name]: event.target.files[0] });
            setUserinfo({ [event.target.name + "url"]: URL.createObjectURL(event.target.files[0]) });
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
            alert("您的资料保存成功，跳转到预约页面！");
            history.push("/web/myReservation");
        }
    };
    //查看个人信息修改结果
    const changemessage = useSelector(state => state.userData.changemessage);

    //查看修改信息
    useEffect(() => {
        console.log(changemessage);
        if(changemessage == "success"){
            alert("修改成功");
            dispatch(clearUser());
        }else if(changemessage == "fail"){
            alert("邮箱重复，请重新输入");
            dispatch(clearUser());
        }
    }, [changemessage])

    useEffect(() => {
        if (userData.data == null) {
            let data = { "isGet": 1, "userId": userId };
            dispatch(getUser(data));
        }
        if (userData.data != null) {
            setUserinfo(userData.data);
        }
    }, [dispatch, userData.data])

    return (
        <div>
            <div class="sin-wrap">
                <div class="sin-heading">E-Driving云端驾校欢迎你</div>
                <div class="container">
                    <div class="sin-main">
                        <MyMenu myinfo="active" />
                        <div class="sin-main-col">
                            <form class="sin-cells" onChange={handlePersonalChange}>
                                <div class="cell-heading">
                                    <div class="cell-tit">基本信息</div>
                                    <div class="cell-btns">
                                        <button onClick={()=>setOpen(true)} type="button" class="btn btn-save">修改密码</button>
                                    </div>
                                </div>
                                <div class="cell-body">
                                    <div class="">
                                        {/* <div class="basic-avatar">
                                            <input type="file" name="userImage" class="userImageInput" ref={register}></input>
                                            <img src={userinfo.userImageurl} />
                                        </div> */}
                                        <div class="row basic-row">
                                            <input type="hidden" name="userId" value={userinfo.userId} ref={register}></input>
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-row">
                                                    <div class="form-label">真实姓名(NAME 拼音，请和驾照相同)</div>
                                                    <div class="form-input">
                                                        <input type="text" name="userName" class="input-box" placeholder="" defaultValue={userinfo.userName} ref={register({
                                                                required: true
                                                            })} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-row">
                                                    <div class="form-label">电话 {errors.userPhone && <p className="input_error">{"请输入正确格式"}</p>}</div>
                                                    <div class="form-input">
                                                        <input type="tel" name="userPhone" class="input-box" defaultValue={userinfo.userPhone} ref={register({
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
                                                        <input type="text" name="userEmail" class="input-box" placeholder="" defaultValue={userinfo.userEmail} ref={register({
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
                                                        <input type="text" name="userLearningEmail" class="input-box" placeholder="学车邮箱须使用Gmail" defaultValue={userinfo.userLearningEmail} ref={register({
                                                                required: true,
                                                                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                                                            })} />
                                                    </div>
                                                    <span class="info-tip">E-DRIVING所有练车的邮件均自动发送至GMAIL邮箱，故学员务必注册并填写GMAIL邮箱，以更好与EDRIVING联系沟通</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-4 col-sm-6">
                                                <div class="form-btn-row">
                                                    <a href="https://www.google.com/gmail/about/" target="view_window" class="btn btn-solid">申请</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cell-btns">
                                        <button type="button" onClick={()=>onpersonalSubmit()} class="btn btn-save ml-1">保存</button>
                                    </div>
                                </div>
                            </form>
                            <form class="sin-cells" onChange={handlePersonalChange} >
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
                                                        <input type="file" id="up_img_WU_FILE_0" name="licenseImage" />
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
                                                    <input type="text" name="licenseName" class="input-box" placeholder="" defaultValue={userinfo.licenseName != "" ?userinfo.licenseName:userinfo.userName} ref={register({
                                                                required: true
                                                            })}/>
                                                     {errors.licenseName && <p className="input_error input_error_form">{"请填写姓名"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="row jz-in-row">
                                                <div class="col-xs-6">
                                                    <div class="form-row">
                                                        <div class="form-label">出生日期(DOB)</div>
                                                        <div class="form-input">
                                                            <input type="date" name="licenseBirthday" class="input-box" placeholder="" max={todayDate} defaultValue={userinfo.licenseBirthday} ref={register({
                                                                required: true
                                                            })}/>
                                                             {errors.licenseBirthday && <p className="input_error input_error_form">{"请填写出生日期"}</p>}                                                            
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
                                                    <input type="text" name="licensePhone" class="input-box" placeholder="" 
                                                        defaultValue={userinfo.licensePhone != ""?userinfo.licensePhone:userinfo.userPhone} ref={register({
                                                                required: true,
                                                                pattern: /^\d{10}$/
                                                            })}/>
                                                     {errors.licensePhone && <p className="input_error input_error_form">{"请填写正确电话"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">邮箱(EMAIL)</div>
                                                <div class="form-input">
                                                    <input type="text" name="licenseEmail" class="input-box" placeholder="" 
                                                    defaultValue={userinfo.licenseEmail != ""?userinfo.licenseEmail:userinfo.userEmail} ref={register({
                                                                required: true,
                                                                pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                                                            })}/>
                                                     {errors.licenseEmail && <p className="input_error input_error_form">{"请填写正确邮箱"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-lg-6">
                                            <div class="form-row">
                                                <div class="form-label">驾照号码(NO.)</div>
                                                <div class="form-input">
                                                    <input type="text" name="licenseNumber" class="input-box" placeholder="" defaultValue={userinfo.licenseNumber} ref={register({
                                                                required: true,
                                                                pattern: /^[a-zA-Z][0-9]{14}$/
                                                            })}/>
                                                     {errors.licenseNumber && <p className="input_error input_error_form">{"请填写正确驾照号码"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-lg-6">
                                            <div class="row jz-in-cell">
                                                <div class="col-xs-6">
                                                    <div class="form-row">
                                                        <div class="form-label">过期时间(EXP)</div>
                                                        <div class="form-input">
                                                            <input name="licenseExpireDate" type="date" class="input-box" placeholder="" defaultValue={userinfo.licenseExpireDate} ref={register({
                                                                required: true
                                                            })}/>
                                                             {errors.licenseExpireDate && <p className="input_error input_error_form">{"请填写日期"}</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-6">
                                                    <div class="form-row">
                                                        <div class="form-label">颁发时间(ISS)</div>
                                                        <div class="form-input">
                                                            <input name="licenseIssueDate" type="date" class="input-box" placeholder="" defaultValue={userinfo.licenseIssueDate} ref={register({
                                                                required: true
                                                            })}/>
                                                             {errors.licenseIssueDate && <p className="input_error input_error_form">{"请填写日期"}</p>}
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
                                                    <input name="licenseAddress" type="text" class="input-box" placeholder="" defaultValue={userinfo.licenseAddress} ref={register({
                                                                required: true
                                                            })}/>
                                                     {errors.licenseAddress && <p className="input_error input_error_form">{"请填写城市"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">接送地址</div>
                                                <div class="form-input">
                                                    <input name="licensePickupAddress" type="text" class="input-box" placeholder="" defaultValue={userinfo.licensePickupAddress} ref={register({
                                                                required: true
                                                            })}/>
                                                     {errors.licensePickupAddress && <p className="input_error input_error_form">{"请填写地址"}</p>}
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
                            <CommonReply commonReplytype="12"/>
                        </div>
                    </div>
                </div>
            </div>
            <ExtraLink />
            <Dialog open={open} onClose={handleClose} >
                <form class="modal-dialog modal-form" role="document" onChange={handlePersonalChange} onSubmit={handleSubmit(onSubmit)}>
                    <button type="button" class="modal-close" onClick={handleClose} data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <div class="modal-psv-body">
                        <div class="form-dialog-tit">修改密码</div>
                        <div class="form-row">
                            <div class="form-label">密码 {errors.userPassword && <p className="input_error">必填，长度至少6位</p>}</div>
                            <div class="form-input">
                                <input type="password" class="input-box" name="userPassword" ref={register({ required: true, minLength: 6 })} />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-label">确认密码 {errors.userrePassword && <p className="input_error">两次密码不一致</p>}</div>
                            <div class="form-input">
                                <input type="password" class="input-box" name="userrePassword" ref={register({
                                    validate: value => value === getValues('userPassword')
                                })} />
                            </div>
                        </div>
                        <div class="form-end">
                            <button type="submit" class="btn-submit" data-toggle="modal" >修改密码</button>
                        </div>
                    </div>
                </form>
            </Dialog>
        </div>
    );
}

// export default connect(mapStateToProps, mapDispatchToProps)(myInfroamtion);
export default (MyInfroamtion);




