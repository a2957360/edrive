import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import MaterialTable from "material-table";

import { PIC_URL } from "../../constants/actionTypes";
import { getUser, changeUser, changeLicense } from '../../actions/user';
import { getCoach, changeCoach } from '../../actions/coach';
import { getReservation } from '../../actions/reservation';

function MyInfroamtion(props) {
    const dispatch = useDispatch();

    const headCells = [
        { field: 'createTime', title: '报名时间' },
        // { field: 'licienceName', title: '学员名称' },
        // { field: 'userNumber', title: '学员编号' },
        // { field: 'licensePhone', title: '学员电话' },
        // { field: 'licenseNumber', title: '学员驾照' },
        // { field: 'licenseExpireDate', title: '驾照过期' },
        { field: 'reservationName', title: '项目名字' },
        { field: 'coachName', title: '教练名字' },
        { field: 'carTimeShow', title: '学车时间' },
        { field: 'courseTimeShow', title: 'BDE时间' },
        { field: 'examTimeShow', title: '考试次数' },
        { field: 'coursePrice', title: '价格' },
        { field: 'reservationTypeName', title: '来源' },
    ];

    const userData = useSelector(state => state.userData);
    const reservationData = useSelector(state => state.reservationData.data);

    const userId = props.userId;

    const [userinfo, setUserinfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {}
    );

    const { register, handleSubmit, watch,triggerValidation, errors, getValues } = useForm();
    const onpersonalSubmit = async () => {
        const result = await triggerValidation(["userName","userPhone","userEmail","userLearningEmail"]);
        if(result){
            // setUserinfo(data);
            let fileData = new FormData();
            for (var key in userinfo) {
                fileData.append(key, userinfo[key]);
                console.log(key, userinfo[key]);
            }
            fileData.append("isChange", "1");
            dispatch(changeUser(fileData))
            alert("修改完成");
        }
    };

    const handlePersonalChange = React.useCallback(event => {
        setUserinfo({ [event.target.name]: event.target.value });
        if ((event.target.name.indexOf("Image") != -1 || event.target.name == "qrCode") && event.target.files[0] != null) {
            setUserinfo({ [event.target.name]: event.target.files[0] });
            setUserinfo({ [event.target.name + "url"]: URL.createObjectURL(event.target.files[0]) });
        }
    }, [userinfo]);

    const tmponlicenseSubmit = async () => {
        const result = await triggerValidation(["licenseName","licenseBirthday","licensePhone","licenseEmail","licenseNumber","licenseExpireDate","licenseIssueDate","licenseAddress","licensePickupAddress"]);
        if(result){
            let fileData = new FormData();
            console.log(userinfo);
            for (var key in userinfo) {
                fileData.append(key, userinfo[key]);
            }
            fileData.append("isLicense", "1");
            dispatch(changeLicense(fileData));
            alert("修改完成");
        }
    };

    useEffect(() => {
        if (userData.data == null) {
            let data = { "isGet": 1, "userId": userId };
            dispatch(getUser(data));
        }
        if (userData.data != null) {
            setUserinfo(userData.data);
        }
    }, [dispatch, userData.data, userId])
    useEffect(() => {
        let data1 = { "isGet": 1, "userId": userId };
        dispatch(getUser(data1));
    }, [userId])

    useEffect(() => {
        if (reservationData == null) {
            let data = { "isGet": 1, "userId": userId };
            dispatch(getReservation(data));
        }
    }, [dispatch])
    if(reservationData == null){
        return "loading..."
    }
    return (
        <div>
            <div class="sin-wrap">
                <div class="container">
                    <div class="sin-main">
                        <div class="">
                        <form class="sin-cells" onChange={handlePersonalChange}>
                                <div class="cell-heading">
                                    <div class="cell-tit">基本信息</div>

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
                                                    <div class="form-label">真实姓名(NAME 拼音，请和驾照相同) {errors.userName && <p className="input_error">{"请输入真实姓名"}</p>}</div>
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
                                                                pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
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
                                                                pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                                                            })} />
                                                    </div>
                                                    <span class="info-tip">E-DRIVING所有练车的邮件均自动发送至GMAIL邮箱，故学员务必注册并填写GMAIL邮箱，以更好与EDRIVING联系沟通</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="cell-btns">
                                        <button type="button" onClick={()=>onpersonalSubmit()} class="btn btn-save ml-1">保存</button>
                                </div>
                            </form>
                            <form class="sin-cells" onChange={handlePersonalChange} >
                                <div class="cell-heading">
                                    <div class="cell-tit">驾照信息</div>

                                </div>
                                <div class="cell-body">
                                    <div class="row jz-row">
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
                                                    <input type="text" name="licenseName" class="input-box" placeholder="" defaultValue={userinfo.licenseName} ref={register({
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
                                                            <input type="date" name="licenseBirthday" class="input-box" placeholder="" defaultValue={userinfo.licenseBirthday} ref={register({
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
                                                    <input type="text" name="licensePhone" class="input-box" placeholder="" defaultValue={userinfo.licensePhone} ref={register({
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
                                                    <input type="text" name="licenseEmail" class="input-box" placeholder="" defaultValue={userinfo.licenseEmail} ref={register({
                                                                required: true,
                                                                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                                                            })}/>
                                                     {errors.licenseEmail && <p className="input_error">{"请填写正确邮箱"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">驾照号码(NO.)</div>
                                                <div class="form-input">
                                                    <input type="text" name="licenseNumber" class="input-box" placeholder="" defaultValue={userinfo.licenseNumber} ref={register({
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
                                                            <input name="licenseExpireDate" type="date" class="input-box" placeholder="" defaultValue={userinfo.licenseExpireDate} ref={register({
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
                                                            <input name="licenseIssueDate" type="date" class="input-box" placeholder="" defaultValue={userinfo.licenseIssueDate} ref={register({
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
                                                    <input name="licenseAddress" type="text" class="input-box" placeholder="" defaultValue={userinfo.licenseAddress} ref={register({
                                                                required: true
                                                            })}/>
                                                     {errors.licenseAddress && <p className="input_error">{"请填写地址"}</p>}
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
                                                     {errors.licensePickupAddress && <p className="input_error">{"请填写地址"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="row jz-in-cell">
                                                <div class="col-xs-6">
                                                    <div class="form-row">
                                                        <div class="form-label">熟练语言（国语/粤语/英语/其它）</div>
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
                                                                <option value="3" selected={userinfo.licenseYear == 3}>三年</option>
                                                            </select>
                                                        </div>
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
                            </form>
                            <div class="reservationList">
                                <MaterialTable
                                    columns={headCells}
                                    data={reservationData.list}
                                    title="课程列表"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default (MyInfroamtion);