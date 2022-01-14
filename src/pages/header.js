import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import Dialog from '@material-ui/core/Dialog';
import { translate_list } from './translate';

import '../styles/bootstrap.css';
import '../styles/swiper.min.css';
import '../styles/common.css';
import '../styles/css.css';

import { PIC_URL } from "../constants/actionTypes";
import { loginUser, signupUser } from '../actions/loginSignup';
import { getUser } from '../actions/user';
import { getWebsiteInfo } from '../actions/websiteinfo';
import { getMessage } from '../actions/message';
import { popUpSignupOff } from '../actions/loginSignup';


function Header() {
    const dispatch = useDispatch();
    let history = useHistory();

    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");
    const userLanguage = localStorage.getItem("userLanguage");

    //注册弹窗
    const [login, setlogin] = React.useState(true);

    const [open, setOpen] = React.useState(false);
    const [successopen, setSuccessOpen] = React.useState(false);
    const [failopen, setfailopen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSucessClose = () => {
        setSuccessOpen(false);
    };

    const handleFailClose = () => {
        setfailopen(false);
    };

    const logout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        // window.location.reload(false);
        setlogin(true);
        history.push("/web");
    };

    const { register, handleSubmit, watch, errors, getValues } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        dispatch(signupUser(data));
    }
    // const onSubmit = data => console.log(data);

    const userdata = useSelector(state => state.userData);
    // //componentDidUpdate --- Only re-run the effect if message changes

    //登录
    const [loginOpen, setLoginOpen] = React.useState(false);
    const handleLoginClose = () => {
        setLoginOpen(false);
    };
    const [loginRole, setLoginRole] = React.useState(0);
    const onloginSubmit = (data) => {
        data['userRole'] = loginRole;
        dispatch(loginUser(data));
    };

    const userData = useSelector(state => state.userData);
    //忘记密码
    const [forgetEmail, setForgetEmail] = React.useState("");
    const [forgetOpen, setForgetOpen] = React.useState(false);
    const handleForgetClose = () => {
        setForgetOpen(false);
    };
    const sendForgetEmail = () => {
        let data = { isForget: 1, userEmail: forgetEmail };
        dispatch(signupUser(data))
    };

    const linkToSignup = () => {
        if (loginRole == 0) {
            handleClickOpen();
            handleLoginClose();
        } else if (loginRole == 1) {
            setLoginOpen(false);
            history.push("/web/coachSignup");
        }
    }
    const openForget = () => {
        setForgetOpen(true);
        handleLoginClose();
    }
    const openLogin = () => {
        setLoginOpen(true)
        setLoginRole(0);
    }

    useEffect(() => {
        //注册
        if (userdata.signupmessage === "success") {
            handleClose();
            handleLoginClose();
            setSuccessOpen(true);
            localStorage.setItem("userId", userdata.data.userId);
            localStorage.setItem("userRole", 0);
        }
        if (userdata.signupmessage === "email error") {
            alert("该邮箱已被注册");
        }
        if (userdata.signupmessage === "fail") {
            setfailopen(true);
            handleClose();
        }
        if (userdata.signupmessage === "nouser") {
            alert(translate_list[userLanguage].noemailmessage);
        }
        if (userdata.signupmessage === "send") {
            alert(translate_list[userLanguage].sendmessage);
            handleForgetClose();
        }
        //登录
        switch (userData.loginmessage) {
            case "nouser":
                alert(translate_list[userLanguage].nousermessage);
                break;
            case "notallow":
                alert("您的教练资格还在审批中");
                break;
            case "wrongpassword":
                alert(translate_list[userLanguage].passwordmessage);
                break;
            case "success":
                localStorage.setItem("userId", userData.data.userId);
                localStorage.setItem("userRole", userData.data.userRole);
                window.location.reload(false);
                break;
            default:
                break;
        }
    }, [dispatch, userdata])

    useEffect(() => {
        if (userId != null) {
            let data = { "isGet": 1, "userId": userId };
            dispatch(getUser(data));
            setlogin(false);
        }
    }, [dispatch, successopen])

    const websiteinfoList = useSelector(state => state.websiteinfoData.usedata);
    useEffect(() => {
        if (websiteinfoList == null) {
            dispatch(getWebsiteInfo())
        }
    }, [dispatch])

    const messageList = useSelector(state => state.messageReducerData.data);
    useEffect(() => {
        if (userLanguage == null) {
            localStorage.setItem("userLanguage", "zh");
        }
        if (messageList == null) {
            let data = { isGet: 1, userId: userId }
            dispatch(getMessage(data))
        }
    }, [dispatch, successopen])

    const popupData = useSelector(state => state.popupData.popup);
    useEffect(() => {
        if (popupData) {
            setLoginOpen(true);
            dispatch(popUpSignupOff());
        }
    }, [dispatch, popupData])

    if ((userdata.data == null && userId != null) || websiteinfoList == null || (messageList == null && userId != null)) {
        return "loading..."
    }
    return (
        <div>
            <header className="site-header">
                <div class="topbar">
                    <div class="container">
                        <a class="navbar-logo" href="/#/web"><img src={PIC_URL + websiteinfoList['Logo'].infoImage} alt="" /></a>
                        <ul class="top-nav navbar-right  clearfix">
                            {/* <li><a href="/#/web/aboutus">关于我们</a></li> */}
                            {
                                login == true &&
                                <li><a class="btn-circle" onClick={() => openLogin()}>{translate_list[userLanguage].login}</a></li>
                            }
                            {
                                login == true &&
                                <li><a class="btn-circle" onClick={handleClickOpen}>{translate_list[userLanguage].register}</a></li> ||
                                <li><a >{userdata.data.userName}</a><a onClick={() => logout()}>{translate_list[userLanguage].logout}</a></li>
                            }
                            {/* <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img
                                    src={PIC_URL + "images/cn.png"} /> 中文 <span class="iconfont icon-down"></span></a>
                                <ul class="dropdown-menu">
                                    <li><a href="#">英文</a></li>
                                </ul>
                            </li> */}
                        </ul>
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false"
                            aria-controls="navbar">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    </div>
                </div>
                <div className="navbar-main">
                    <div className="container">
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav navbar-right" id="nav">
                                <li className="">
                                    <a href="/#/web">{translate_list[userLanguage].homepage}</a>
                                </li>
                                {
                                    userRole != 1 &&
                                    <li className="">
                                        <a href="/#/web/question">{translate_list[userLanguage].questionpage}</a>
                                    </li>
                                }
                                {
                                    userRole != 1 &&
                                    <li className="">
                                        <a href="/#/web/translatecenter">{translate_list[userLanguage].translatepage}</a>
                                    </li>
                                }
                                <li className="">
                                    <a href="/#/web/courseselectarea">{translate_list[userLanguage].coursepage}</a>
                                </li>
                                {/* <li className="">
                                    <a href="">网络学堂</a>
                                </li>
                                <li className="">
                                    <a href="">增值服务</a>
                                </li> */}
                                {
                                    userRole != 1 &&
                                    <li className="">
                                        {/* <a href="/#/web/Document">{translate_list[userLanguage].commonquestionpage}</a> */}
                                        <a href="/#/web/Document">驾考宝典</a>
                                    </li>
                                }
                                {
                                    userRole == 1 &&
                                    <li className="">
                                        <a href="/#/web/joinus">加入我们</a>
                                    </li>
                                    ||
                                    <li className="">
                                        <a href="/#/web/aboutus">{translate_list[userLanguage].aboutus}</a>
                                    </li>
                                }
                                {
                                    userRole == 1 &&
                                    <li className="">
                                        <a href="/#/web/coachrules">教练守则</a>
                                    </li>
                                }
                                {
                                    userRole == 0 &&
                                    <li className="">
                                        <a href="/#/web/myInformation">{translate_list[userLanguage].myaccount}</a>
                                    </li>
                                    ||
                                    userRole == 1 &&
                                    <li className="">
                                        <a href="/#/web/coachInformation">教练管家</a>
                                    </li>
                                }
                                {/* {
                                    userRole == null &&
                                    <li className="">
                                        <a href="/#/web/coachSignup">{translate_list[userLanguage].registerascoach}</a>
                                    </li>
                                } */}
                                {
                                    login == true &&
                                    <li className="display-mobile">
                                        <a class="btn-circle" onClick={() => setLoginOpen(true)}>{translate_list[userLanguage].login}</a>
                                    </li>
                                }
                                {
                                    login == true &&
                                    <li className="display-mobile"><a class="btn-circle" onClick={handleClickOpen}>{translate_list[userLanguage].register}</a></li> ||
                                    <li className="display-mobile"><a >{userdata.data.userName}</a><a onClick={() => logout()}>{translate_list[userLanguage].logout}</a></li>
                                }
                                {userRole == 0 &&
                                    <li className="">
                                        <a href="" class="dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{translate_list[userLanguage].message}</a>
                                        <div class="dropdown-menu message-content" aria-labelledby="dropdownMenuLink">
                                            {
                                                messageList == null &&
                                                <div></div> ||
                                                messageList.length > 0 &&
                                                messageList.map((row) =>
                                                    <p class="dropdown-item message-single" href="#">{row.messageContent}</p>
                                                )
                                                ||
                                                messageList.length == 0 &&
                                                <p class="dropdown-item message-single" href="#">{translate_list[userLanguage].nomessage}</p>
                                            }
                                        </div>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            {/* 注册弹窗 */}
            <Dialog open={open} onClose={handleClose}>
                <form class="modal-dialog modal-form" role="document" onSubmit={handleSubmit(onSubmit)}>
                    <button type="button" class="modal-close" onClick={handleClose} data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <div class="modal-psv-body">
                        <div class="form-dialog-tit">{translate_list[userLanguage].signupaccount}</div>
                        <div class="form-row">
                            <div class="form-label">{translate_list[userLanguage].username} {errors.userName && <p className="input_error">{translate_list[userLanguage].usernameerror}</p>}</div>
                            <div class="form-input">
                                <input type="hidden" class="input-box" name="isSignup" value={1} ref={register} />
                                <input type="text" class="input-box" name="userName" ref={register({ required: true, maxLength: 20 })} />
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
                            <div class="form-label">{translate_list[userLanguage].phone} {errors.userPhone && <p className="input_error">{translate_list[userLanguage].phoneerror}</p>}</div>
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
            {/* 注册成功 */}
            <Dialog open={successopen} onClose={handleSucessClose} >
                <div class="modal-dialog modal-form" role="document">
                    <button onClick={() => handleSucessClose()} type="button" class="modal-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <div class="modal-tips-body">
                        <div class="cell-icon">
                            <img src={PIC_URL + "images/sucx.png"} />
                            <h4>{translate_list[userLanguage].registsuccess}</h4>
                        </div>
                        {/* <div class="form-end">
                            <a href="" class="btn-submit">进入账户</a>
                        </div> */}
                    </div>
                </div>
            </Dialog>
            {/* 注册失败 */}
            <Dialog open={failopen} onClose={handleFailClose} >
                <div class="modal-dialog modal-form" role="document">
                    <button onClick={() => handleFailClose()} type="button" class="modal-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <div class="modal-tips-body">
                        <div class="cell-icon">
                            <h4>{translate_list[userLanguage].emailduplicate}</h4>
                        </div>
                    </div>
                </div>
            </Dialog>

            {/* 登录 */}
            <Dialog open={loginOpen} onClose={handleLoginClose} >
                <div className="col-xs-12 slider_container">
                    <div className="form-cell no_shadow table">
                        <div className="inner">
                            <ul className="form-tabs" role="tablist">
                                <li className="active"><a href="#login1" onClick={() => setLoginRole(0)} aria-controls="login1" role="tab" data-toggle="tab">{translate_list[userLanguage].stulogin}</a></li>
                                <li><a href="#login2" onClick={() => setLoginRole(1)} aria-controls="login2" role="tab" data-toggle="tab">{translate_list[userLanguage].coachlogin}</a></li>
                            </ul>
                            <div className="tab-content">
                                <form role="tabpanel" className="tab-pane active" id="login1" onSubmit={handleSubmit(onloginSubmit)}>
                                    <input type="hidden" name="isLogin" value="1" ref={register}></input>
                                    <div className="form-row">
                                        <div className="form-label">{translate_list[userLanguage].email} {errors.userEmail && <p className="input_error">{translate_list[userLanguage].emailerror}</p>}</div>
                                        <div className="form-input">
                                            <input type="text" className="input-box" placeholder="" name="userEmail" ref={register({
                                                required: true,
                                                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                                            })} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-label">{translate_list[userLanguage].password} {errors.userPassword && <p className="input_error">{translate_list[userLanguage].passworderror}</p>}</div>
                                        <div className="form-input">
                                            <input type="password" className="input-box" placeholder="" name="userPassword" ref={register({ required: true, minLength: 6 })} />
                                        </div>
                                    </div>
                                    <div className="form-link"><a onClick={() => openForget()}>{translate_list[userLanguage].forgetpass}</a></div>
                                    <div className="form-tip">
                                        {translate_list[userLanguage].noaccount}<a data-toggle="modal" onClick={() => linkToSignup()}>{translate_list[userLanguage].typeregist}</a>
                                    </div>
                                    <div className="form-end">
                                        <button type="submit" className="btn-submit">{translate_list[userLanguage].login}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>

            {/* 忘记密码 */}
            <Dialog open={forgetOpen} onClose={handleForgetClose} >
                <form class="modal-dialog modal-form" role="document">
                    <button type="button" class="modal-close" onClick={handleForgetClose} data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <div class="modal-psv-body">
                        <div class="form-dialog-tit">{translate_list[userLanguage].findpassword}</div>
                        <div class="form-row">
                            <div class="form-label">{translate_list[userLanguage].email} {errors.userPassword && <p className="input_error">{translate_list[userLanguage].emailerror}</p>}</div>
                            <div class="form-input">
                                <input onChange={e => setForgetEmail(e.target.value)} type="text" class="input-box" name="userEmail" ref={register({
                                    required: true,
                                    pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                                })} />
                            </div>
                        </div>
                        <div class="form-end">
                            <button onClick={() => sendForgetEmail()} type="button" class="btn-submit" data-toggle="modal" >{translate_list[userLanguage].sendemail}</button>
                        </div>
                    </div>
                </form>
            </Dialog>

        </div>
    );
}

export default Header;