import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import MaterialTable from "material-table";

import { getUser, changeUser, changeLicense,clearUser } from '../../actions/user';
import { getCoach, changeCoach } from '../../actions/coach';
import { getCoachBalance } from '../../actions/coach';

function MyInfroamtion(props) {
    const dispatch = useDispatch();

    const headCells = [
        { field: 'createTime', title: '报名时间' },
        { field: 'licenseName', title: '学员名称' },
        { field: 'reservationName', title: '项目名称' },
        { field: 'carTime', title: '项目时长/次数' },
        { field: 'reservationType', title: '领取/代收' },
        { field: 'coursePrice', title: '价格' },
    ];

    const userData = useSelector(state => state.userData);
    const coachData = useSelector(state => state.coachData.data);
    const reservationData = useSelector(state => state.reservationData.data);

    //查看个人信息修改结果
    const changemessage = useSelector(state => state.userData.changemessage);


    const userId = props.userId;

    const [userinfo, setUserinfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {}
    );

    const [coachinfo, setCoachinfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {}
    );

    const { register, handleSubmit,triggerValidation, watch, errors, getValues } = useForm();

    const onpersonalSubmit = async () => {
        const result = await triggerValidation(["userName","userPhone","userEmail"]);
        if(result){
            let fileData = new FormData();
            for (var key in userinfo) {
                fileData.append(key, userinfo[key]);
            }
            fileData.append("isChange", "1");
            dispatch(changeUser(fileData))
        }
    };

    const handlePersonalChange = React.useCallback(event => {
        setUserinfo({ [event.target.name]: event.target.value });
        if ((event.target.name.indexOf("Image") != -1 || event.target.name == "qrCode") && event.target.files[0] != null) {
            setUserinfo({ [event.target.name]: event.target.files[0] });
            setUserinfo({ [event.target.name + "url"]: URL.createObjectURL(event.target.files[0]) });
        }
    }, [userinfo]);
    const handleCoachChange = React.useCallback(event => {
        setCoachinfo({ [event.target.name]: event.target.value });
        if (event.target.name.indexOf("Image") != -1 && event.target.files[0] != null) {
            setCoachinfo({ [event.target.name]: event.target.files[0] });
            setCoachinfo({ [event.target.name + "url"]: URL.createObjectURL(event.target.files[0]) });
        }
    }, [coachinfo]);

    const tmponlicenseSubmit = async () => {
        const result = await triggerValidation(["licenseName","licenseBirthday","licensePhone","licenseEmail","licenseNumber","licenseExpireDate","licenseIssueDate","licenseAddress"]);
        if(result){
            let fileData = new FormData();
            for (var key in userinfo) {
                fileData.append(key, userinfo[key]);
            }
            // console.log(fileData['licenseImage']);
            fileData.append("isLicense", "1");
            dispatch(changeLicense(fileData));
            alert("修改成功");
        }
    };

    const oncoachlicensesubmit = async () => {
        const result = await triggerValidation(["coachLicenseNumber","coachLicenseIssueData","coachLicenseExpireDate","cityLicenseNumber","cityLicenseIssueData","cityLicenseCity","insuranceCompany","insuranceNumber"]);
        if(result){
            let fileData = new FormData();
            for (var key in coachinfo) {
                fileData.append(key, coachinfo[key]);
            }
            fileData.append("isCoachLicense", "1");
            dispatch(changeCoach(fileData));
            alert("修改成功");
        }
    };

    const oncoachcarsubmit = async () => {
        const result = await triggerValidation(["carBrand","carPlate","carModel","carDriveDistense","coachPlate","coachProvincePlate"]);
        if(result){
            let fileData = new FormData();
            for (var key in coachinfo) {
                fileData.append(key, coachinfo[key]);
            }
            fileData.append("isCoachCar", "1");
            dispatch(changeCoach(fileData));
            alert("修改成功");
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
        console.log(userData.data);
    }, [dispatch, userData.data, userId])

    useEffect(() => {
        if (coachData == null) {
            let data = { "isGetCoach": 1, "userId": userId };
            dispatch(getCoach(data));
        }
        if (coachData != null) {
            setCoachinfo(coachData);
        }
    }, [dispatch, coachData, userId])

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
        let data1 = { "isGet": 1, "userId": userId };
        dispatch(getUser(data1));
        let data2 = { "isGetCoach": 1, "userId": userId };
        dispatch(getCoach(data2));
    }, [userId])

    //获取教练练车、考试次数
    const coachbalancedata = useSelector(state => state.coachData.balancedata);
    useEffect(() => {
        let data = { "isGetPoint": 1, "coachId": userId };
        dispatch(getCoachBalance(data));
    }, [dispatch])

    if (coachbalancedata == null) {
        return "loading...";
    }
    return (
        <div>
            <div class="sin-wrap">
                <div class="container">
                    <div class="sin-main">
                        <div class="">
                            <form class="sin-cells" onChange={handlePersonalChange}>
                                <input type="hidden" name="userId" value={userinfo.userId} ref={register}></input>
                                <div class="cell-heading">
                                    <div class="cell-tit">基本信息</div>
                                    <div class="cell-btns">
                                        <button onClick={() => onpersonalSubmit()} type="button" class="btn-save ml-1">保存</button>
                                    </div>
                                </div>
                                <div class="cell-body">
                                    <div class="basic-form">
                                        <div class="basic-avatar">
                                            <input type="file" name="userImage" class="userImageInput" ref={register}></input>
                                            <img src={userinfo.userImageurl} /></div>
                                        <div class="row basic-row">
                                        <div class="col-xs-12 col-sm-12">
                                                <div class="form-row">
                                                    <div class="form-label">审核资格</div>
                                                    <div class="form-select">
                                                        <select class="input-box" name="userState" ref={register}>
                                                            <option value="0" selected={userinfo.userState == "0"}>未批准</option>
                                                            <option value="1" selected={userinfo.userState == "1"}>已批准</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-row">
                                                    <div class="form-label">真实姓名(NAME 拼音，请和驾照相同) {errors.userName && <p className="input_error">{"请填写真实姓名"}</p>}</div>
                                                    <div class="form-input">
                                                        <input type="text" class="input-box" name="userName" value={userinfo.userName} ref={register({
                                                            required: true
                                                        })} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-row">
                                                    <div class="form-label">电话 {errors.userPhone && <p className="input_error">{"请填写正确电话"}</p>}</div>
                                                    <div class="form-input">
                                                        <input type="text" class="input-box" name="userPhone" value={userinfo.userPhone} ref={register({
                                                            required: true,
                                                            pattern: /^\d{10}$/
                                                        })} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-row">
                                                    <div class="form-label">邮箱 {errors.userEmail && <p className="input_error">{"请填写正确邮箱"}</p>}</div>
                                                    <div class="form-input">
                                                        <input type="text" class="input-box" name="userEmail" value={userinfo.userEmail} ref={register({
                                                            required: true,
                                                            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                                                        })} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xs-12 col-sm-6 hidden-xs">
                                                <div class="hide-space"></div>
                                            </div>
                                            <div class="col-xs-8 col-sm-12">
                                                <ul id="warp">
                                                    <li class="upload-cell">
                                                        <div class="txt">微信二维码</div>
                                                        <div class="uplad-box">
                                                            <input type="file" id="up_img_WU_FILE_0" name="qrCode" ref={register} />
                                                            <img id="imgShow_WU_FILE_0" src={userinfo.qrCodeurl} />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="col-xs-8 col-sm-6">
                                                <div class="form-row">
                                                    <div class="form-label">教学区域</div>
                                                    <div class="form-select">
                                                        <select class="input-box" name="serverLocation" ref={register}>
                                                            <option value="无" selected={userinfo.serverLocation == "无"}>无</option>
                                                            <option value="东区" selected={userinfo.serverLocation == "东区"}>东区</option>
                                                            <option value="北区" selected={userinfo.serverLocation == "北区"}>北区</option>
                                                            <option value="中东区" selected={userinfo.serverLocation == "中东区"}>中东区</option>
                                                            <option value="中西区" selected={userinfo.serverLocation == "中西区"}>中西区</option>
                                                            <option value="南区" selected={userinfo.serverLocation == "南区"}>南区</option>
                                                            <option value="西北区" selected={userinfo.serverLocation == "西北区"}>西北区</option>
                                                            <option value="西南区" selected={userinfo.serverLocation == "西南区"}>西南区</option>
                                                            <option value="其他区" selected={userinfo.serverLocation == "其他区"}>其他区</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-8 col-sm-6">
                                                <div class="form-row">
                                                    <div class="form-label">备选区域</div>
                                                    <div class="form-select">
                                                        <select class="input-box" name="backupServerLocation" ref={register}>
                                                            <option value="无" selected={userinfo.backupServerLocation == "无"}>无</option>
                                                            <option value="东区" selected={userinfo.backupServerLocation == "东区"}>东区</option>
                                                            <option value="北区" selected={userinfo.backupServerLocation == "北区"}>北区</option>
                                                            <option value="中东区" selected={userinfo.backupServerLocation == "中东区"}>中东区</option>
                                                            <option value="中西区" selected={userinfo.backupServerLocation == "中西区"}>中西区</option>
                                                            <option value="南区" selected={userinfo.backupServerLocation == "南区"}>南区</option>
                                                            <option value="西北区" selected={userinfo.backupServerLocation == "西北区"}>西北区</option>
                                                            <option value="西南区" selected={userinfo.backupServerLocation == "西南区"}>西南区</option>
                                                            <option value="其他区" selected={userinfo.backupServerLocation == "其他区"}>其他区</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-12">
                                                <div class="form-area">
                                                    <img src="images/diqu.png" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <form class="sin-cells" onChange={handlePersonalChange}>
                                <div class="cell-heading">
                                    <div class="cell-tit">驾照信息</div>
                                    <div class="cell-btns">
                                        {/* <a href="javascript:void(0);" class="btn-reset">取消</a> */}
                                        <button onClick={() => tmponlicenseSubmit()} type="button" class="btn-save">保存</button>
                                    </div>
                                </div>
                                <div class="cell-body">
                                    <div class="row jz-row">
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
                                                    <input type="text" name="licenseName" class="input-box" placeholder="" defaultValue={userinfo.licenseName} ref={register({
                                                        required: true
                                                    })} />
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
                                                            })} />
                                                            {errors.licenseBirthday && <p className="input_error">{"请填写日期"}</p>}
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
                                                    })} />
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
                                                    })} />
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
                                                    })} />
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
                                                            })} />
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
                                                            })} />
                                                            {errors.licenseIssueDate && <p className="input_error">{"请填写日期"}</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">是否矫正视力(REST)</div>
                                                <div class="form-input">
                                                    <select name="licenseEye" class="input-box">
                                                        <option value="0" selected={userinfo.licenseEye == 0}>是</option>
                                                        <option value="1" selected={userinfo.licenseEye == 1}>否</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">驾照地址</div>
                                                <div class="form-input">
                                                    <input name="licenseAddress" type="text" class="input-box" placeholder="" defaultValue={userinfo.licenseAddress} ref={register({
                                                        required: true
                                                    })} />
                                                    {errors.licenseAddress && <p className="input_error">{"请填写地址"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">接送地址</div>
                                                <div class="form-input">
                                                    <input name="licensePickupAddress" type="text" class="input-box" placeholder="" value={userinfo.licensePickupAddress} />
                                                </div>
                                            </div>
                                        </div> */}
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="row jz-in-cell">
                                                <div class="col-xs-12">
                                                    <div class="form-row">
                                                        <div class="form-label">熟练语言（国语/粤语/英语/其它）</div>
                                                        <div class="form-input">
                                                            <input name="licenseLanguage" type="text" class="input-box" placeholder="" defaultValue={userinfo.licenseLanguage} />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div class="col-xs-6">
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
                                                </div> */}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                            <form class="sin-cells" onChange={handleCoachChange}>
                                <div class="cell-heading">
                                    <div class="cell-tit">三险一金</div>
                                    <div class="cell-btns">
                                        <button onClick={() => oncoachlicensesubmit()} type="button" class="btn-save">保存</button>
                                    </div>
                                </div>
                                <div class="cell-body">
                                    <ul class="row photo-rows" id="warp2">
                                        <li class="col-xs-12 col-sm-6 col-md-4">
                                            <div class="upload-cell">
                                                <div class="txt">教练执照</div>
                                                <div class="uplad-box">
                                                    <input type="file" id="up_img_WU_FILE_0" name="coachLicenseImage" ref={register} />
                                                    <img id="imgShow_WU_FILE_0" src={coachinfo.coachLicenseImageurl} />
                                                </div>
                                            </div>
                                        </li>
                                        <li class="col-xs-12 col-sm-6 col-md-4">
                                            <div class="upload-cell">
                                                <div class="txt">教练市政执照</div>
                                                <div class="uplad-box">
                                                    <input type="file" id="up_img_WU_FILE_0" name="coachCityLicenseImage" ref={register} />
                                                    <img id="imgShow_WU_FILE_0" src={coachinfo.coachCityLicenseImageurl} />
                                                </div>
                                            </div>
                                        </li>
                                        <li class="col-xs-12 col-sm-6 col-md-4">
                                            <div class="upload-cell">
                                                <div class="txt">年检证照</div>
                                                <div class="uplad-box">
                                                    <input type="file" id="up_img_WU_FILE_0" name="coachYearLicenseImage" ref={register} />
                                                    <img id="imgShow_WU_FILE_0" src={coachinfo.coachYearLicenseImageurl} />
                                                </div>
                                            </div>
                                        </li>
                                        <li class="col-xs-12 col-sm-6 col-md-4">
                                            <div class="upload-cell">
                                                <div class="txt">商业险照</div>
                                                <div class="uplad-box">
                                                    <input type="file" id="up_img_WU_FILE_0" name="coachInsuranceLicenseImage" ref={register} />
                                                    <img id="imgShow_WU_FILE_0" src={coachinfo.coachInsuranceLicenseImageurl} />
                                                </div>
                                            </div>
                                        </li>
                                        <li class="col-xs-12 col-sm-6 col-md-4">
                                            <div class="upload-cell">
                                                <div class="txt">其他证件照</div>
                                                <div class="uplad-box">
                                                    <input type="file" id="up_img_WU_FILE_0" name="coachOtherLicenseImage" ref={register} />
                                                    <img id="imgShow_WU_FILE_0" src={coachinfo.coachOtherLicenseImageurl} />
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="row jz-row">
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">教练执照号码</div>
                                                <div class="form-input">
                                                    <input type="text" class="input-box" name="coachLicenseNumber" defaultValue={coachinfo.coachLicenseNumber} ref={register({
                                                        required: true
                                                    })} />
                                                    {errors.coachLicenseNumber && <p className="input_error">{"必填"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="row jz-in-row">
                                                <div class="col-xs-6">
                                                    <div class="form-row">
                                                        <div class="form-label">发证日期(DOB)</div>
                                                        <div class="form-input">
                                                            <input type="date" class="input-box" name="coachLicenseIssueData" defaultValue={coachinfo.coachLicenseIssueData} ref={register({
                                                                required: true
                                                            })} />
                                                            {errors.coachLicenseIssueData && <p className="input_error">{"必填"}</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-6">
                                                    <div class="form-row">
                                                        <div class="form-label">过期日期</div>
                                                        <div class="form-input">
                                                            <input type="date" class="input-box" name="coachLicenseExpireDate" defaultValue={coachinfo.coachLicenseExpireDate} ref={register({
                                                                required: true
                                                            })} />
                                                            {errors.coachLicenseExpireDate && <p className="input_error">{"必填"}</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="row jz-in-row">
                                                <div class="col-xs-6">
                                                    <div class="form-row">
                                                        <div class="form-label">教练市政执照号</div>
                                                        <div class="form-input">
                                                            <input type="text" class="input-box" name="cityLicenseNumber" defaultValue={coachinfo.cityLicenseNumber} ref={register({
                                                                required: true
                                                            })} />
                                                            {errors.cityLicenseNumber && <p className="input_error">{"必填"}</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-6">
                                                    <div class="form-row">
                                                        <div class="form-label">颁发日期</div>
                                                        <div class="form-input">
                                                            <input type="date" class="input-box" name="cityLicenseIssueData" defaultValue={coachinfo.cityLicenseIssueData} ref={register({
                                                                required: true
                                                            })} />
                                                            {errors.cityLicenseIssueData && <p className="input_error">{"必填"}</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">教练市政执照城市</div>
                                                <div class="form-input">
                                                    <input type="text" class="input-box" name="cityLicenseCity" defaultValue={coachinfo.cityLicenseCity} ref={register({
                                                        required: true
                                                    })} />
                                                    {errors.cityLicenseCity && <p className="input_error">{"必填"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">保险公司</div>
                                                <div class="form-input">
                                                    <input type="text" class="input-box" name="insuranceCompany" defaultValue={coachinfo.insuranceCompany} ref={register({
                                                        required: true
                                                    })} />
                                                    {errors.insuranceCompany && <p className="input_error">{"必填"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">保险单号</div>
                                                <div class="form-select">
                                                    <input type="text" class="input-box" name="insuranceNumber" defaultValue={coachinfo.insuranceNumber} ref={register({
                                                        required: true
                                                    })} />
                                                    {errors.insuranceNumber && <p className="input_error">{"必填"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <form class="sin-cells" onChange={handleCoachChange}>
                                <div class="cell-heading">
                                    <div class="cell-tit">车辆信息</div>
                                    <div class="cell-btns">
                                        <button onClick={() => oncoachcarsubmit()} type="button" class="btn-save">保存</button>
                                    </div>
                                </div>
                                <div class="cell-body">
                                    <ul class="row photo-rows" id="warp3">
                                        <li class="col-xs-12 col-sm-6 col-md-4">
                                            <div class="upload-cell">
                                                <div class="txt">车辆正面照片</div>
                                                <div class="uplad-box">
                                                    <input type="file" id="up_img_WU_FILE_0" name="carImage1" ref={register} />
                                                    <img id="imgShow_WU_FILE_0" src={coachinfo.carImage1url} />
                                                </div>
                                            </div>
                                        </li>
                                        <li class="col-xs-12 col-sm-6 col-md-4">
                                            <div class="upload-cell">
                                                <div class="txt">车辆侧面照片</div>
                                                <div class="uplad-box">
                                                    <input type="file" id="up_img_WU_FILE_0" name="carImage2" ref={register} />
                                                    <img id="imgShow_WU_FILE_0" src={coachinfo.carImage2url} />
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="row jz-row">
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">车辆品牌</div>
                                                <div class="form-input">
                                                    <input type="text" class="input-box" name="carBrand" defaultValue={coachinfo.carBrand} ref={register({
                                                        required: true
                                                    })} />
                                                    {errors.carBrand && <p className="input_error">{"必填"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">车牌号码</div>
                                                <div class="form-input">
                                                    <input type="text" class="input-box" name="carPlate" defaultValue={coachinfo.carPlate} ref={register({
                                                        required: true
                                                    })} />
                                                    {errors.carPlate && <p className="input_error">{"必填"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">车辆型号</div>
                                                <div class="form-input">
                                                    <input type="text" class="input-box" name="carModel" defaultValue={coachinfo.carModel} ref={register({
                                                        required: true
                                                    })} />
                                                    {errors.carModel && <p className="input_error">{"必填"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">行驶里程</div>
                                                <div class="form-input">
                                                    <input type="text" class="input-box" name="carDriveDistense" defaultValue={coachinfo.carDriveDistense} ref={register({
                                                        required: true
                                                    })} />
                                                    {errors.carDriveDistense && <p className="input_error">{"必填"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">市政教练车牌</div>
                                                <div class="form-input">
                                                    <input type="text" class="input-box" name="coachPlate" defaultValue={coachinfo.coachPlate} ref={register({
                                                        required: true
                                                    })} />
                                                    {errors.coachPlate && <p className="input_error">{"必填"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">市政教练车牌2</div>
                                                <div class="form-input">
                                                    <input type="text" class="input-box" name="coachProvincePlate" defaultValue={coachinfo.coachProvincePlate} ref={register({
                                                        required: true
                                                    })} />
                                                    {errors.coachProvincePlate && <p className="input_error">{"必填"}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 ">
                                            <div class="form-row">
                                                <div class="form-label">自我简介</div>
                                                <div class="form-input">
                                                    <input type="text" class="input-box" name="coachDescription" defaultValue={coachinfo.coachDescription} ref={register} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div class="reservationList">
                                <MaterialTable
                                    columns={headCells}
                                    data={coachbalancedata['list']}
                                    title="对账列表"
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