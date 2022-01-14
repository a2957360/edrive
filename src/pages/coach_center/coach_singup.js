import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {translate_list} from '../translate';

import Dialog from '@material-ui/core/Dialog';
import ExtraLink from '../question_center/extra_links'
import { PIC_URL } from "../../constants/actionTypes";
import { getUser, changeUser, changeLicense } from '../../actions/user';
import { loginUser, signupUser } from '../../actions/loginSignup';

function CoachSignup(props) {
    const dispatch = useDispatch();

    const userData = useSelector(state => state.userData.data);
    // const changemessage = useSelector(state => state.userData.changemessage);
    const userLanguage = localStorage.getItem("userLanguage");
    const userId = localStorage.getItem("userId");

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { register, handleSubmit, watch, errors, getValues } = useForm();
    const onSubmit = data => dispatch(signupUser(data));

    const [successopen, setSuccessOpen] = React.useState(false);

    const onpersonalSubmit = (data) => {
        let fileData = new FormData();
        for (var key in userData) {
            fileData.append(key, userData[key]);
            console.log(key, userData[key]);
        }
        fileData.set("userRole", "1");
        fileData.append("isChange", "1");
        dispatch(changeUser(fileData))
    };

    useEffect(() => {
        if (userData == null) {
            let data = { "isGet": 1, "userId": userId };
            dispatch(getUser(data));
        }
    }, [dispatch, userData])

    // useEffect(() => {
    //     if (changemessage == "success") {
    //         localStorage.setItem("userRole", "1");
    //         setSuccessOpen(true);
    //     }
    // }, [dispatch, changemessage])

    const userdata = useSelector(state => state.userData);
    useEffect(() => {
        if (userdata.signupmessage === "coach success") {
            handleClose();
            setSuccessOpen(true);
            // localStorage.setItem("userId", userdata.data.userId);
            // localStorage.setItem("userRole", 1);
        }
        if (userdata.signupmessage === "fail") {
            handleClose();
            // setfailopen(true);
            // localStorage.setItem("userId", userdata.data.userId);
        }
    }, [dispatch, userdata])

    return (
        <div>
            <div class="edu-banner" style={{ backgroundImage: "url(" + PIC_URL + "images/edbanner.png)" }}>
                <div class="sin-text">平等 合作 团结！五星联盟欢迎您的加入</div>
            </div>
            <div class="wrap">
                <div class="section">
                    <div class="container">
                        <div class="join-cells">
                            <div class="j-title">加入E-Driving 云端驾照的理由</div>
                            <div class="j-body">
                                Edriving易驾云端驾校是网路时代的新型驾校，学校秉承“诚信、平等、互助、互利、共赢”原则，致力于为加盟教练提供完善的网络支持，
                                可为加盟教练提供充足的学员，并通过优化加盟教练生源的区域，在为加盟教练的教学提供极大便利同时增加加盟教练的经济收益。<br /><br />
                                Edriving易驾云端驾校可通过强大的网络平台帮助加盟教练解决困扰的教练在教学的同时还要招生、答疑、约换考期等等琐事的烦恼，
                                让加盟教练专心致志的教学，极大提高教学质量和教学安全。
                                Edriving易驾云端驾校为加盟教练提供快捷方便的网络教学管家，可以使用直观易用的预约排课系统，高度整合的考期编排系统，
                                练车路考的提醒系统，将极大降低加盟教练的内务工作，提高备课效率。<br /><br />
                                Edriving易驾云端驾校热忱期待各位具备资质、耐心诚恳、富有责任心的教练加入我们的团队！
                                让我们一起顺应历史的潮流，在网络时代共同成长进步！<br /><br />
                                Edriving易驾云端驾校加盟咨询热线：416-427-9758.

						</div>
                            <div class="j-foot">
                                <a onClick={() => handleClickOpen()} class="btn btn-solid">注册为教练</a>
                            </div>
                        </div>
                    </div>
                </div>
                <ExtraLink></ExtraLink>
            </div>

            <Dialog open={successopen}  onClose={()=>setSuccessOpen(false)}  >
                <div class="modal-dialog modal-form" role="document">
                    <button type="button" class="modal-close" onClick={()=>setSuccessOpen(false)} data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <div class="modal-tips-body">
                        <div class="cell-icon">
                            <img src={PIC_URL + "images/sucx.png"} />
                            <h4>您已经成功注册成教练,请等待我们后台人员审核。</h4>
                        </div>
                        <div class="form-end">
                            {/* <a href="/#/web/coachInformation" class="btn-submit">进入账户</a> */}
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog open={open} onClose={handleClose} >
                <form class="modal-dialog modal-form" role="document" onSubmit={handleSubmit(onSubmit)}>
                    <button type="button" class="modal-close" onClick={handleClose} data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <div class="modal-psv-body">
                        <div class="form-dialog-tit">{translate_list[userLanguage].signupaccount}</div>
                        <div class="form-row">
                            <div class="form-label">{translate_list[userLanguage].username} {errors.userName && <p className="input_error">{translate_list[userLanguage].usernameerror}</p>}</div>
                            <div class="form-input">
                                <input type="hidden" class="input-box" name="isCoachSignup" value={1} ref={register} />
                                <input type="text" class="input-box" name="userName" ref={register({ required: true, maxLength: 20})} />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-label">{translate_list[userLanguage].email} {errors.userEmail && <p className="input_error">{translate_list[userLanguage].emailerror}</p>}</div>
                            <div class="form-input">
                                <input type="text" class="input-box" name="userEmail" ref={register({
                                    required: true,
                                    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                                })} />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-label">{translate_list[userLanguage].phone} {errors.userEmail && <p className="input_error">{translate_list[userLanguage].phoneerror}</p>}</div>
                            <div class="form-input">
                                <input type="text" class="input-box" name="userPhone" ref={register({
                                                                required: true,
                                                                pattern: /^\d{10}$/
                                                            })} />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-label">{translate_list[userLanguage].password} {errors.userPassword && <p className="input_error">{translate_list[userLanguage].passworderror}</p>}</div>
                            <div class="form-input">
                                <input type="password" class="input-box" name="userPassword" ref={register({ required: true, minLength: 6 })} />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-label">{translate_list[userLanguage].ensurepassword} {errors.userrePassword && <p className="input_error">{translate_list[userLanguage].passwordnomatch}</p>}</div>
                            <div class="form-input">
                                <input type="password" class="input-box" name="userrePassword" ref={register({
                                    validate: value => value === getValues('userPassword')
                                })} />
                            </div>
                        </div>
                        <div class="form-end">
                            {/* <button type="button" class="btn-submit" data-toggle="modal" data-target="#succModal">注册</button> */}
                            <button type="submit" class="btn-submit" data-toggle="modal" >{translate_list[userLanguage].register}</button>
                        </div>
                    </div>
                </form>
            </Dialog>
        </div>
    );
}

export default CoachSignup;




