import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import ExtraLinks from './question_center/extra_links';
import Dialog from '@material-ui/core/Dialog';
import YouTube from 'react-youtube';

import { PIC_URL } from "../constants/actionTypes";
import { loginUser, signupUser } from '../actions/loginSignup';
import { getUser } from '../actions/user';

import { getVideo } from '../actions/video';
import { getLink } from '../actions/link';

import { translate_list } from './translate';

import Carousel, { autoplayPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
function Index() {
    let history = useHistory();
    const userLanguage = localStorage.getItem("userLanguage");
    const userId = localStorage.getItem("userId");

    const opts = {
        width: '600px',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    const smopts = {
        height: '180',
        width: '250',
        playerVars: {
            autoplay: 0,
        },
    };

    const dispatch = useDispatch();
    const [login, setlogin] = React.useState(true);
    const [loginRole, setLoginRole] = React.useState(0);
    //video
    const [currentDoc, setcurrentDoc] = React.useState(0);

    const { register, handleSubmit, watch, errors, getValues } = useForm();

    const onloginSubmit = (data) => {
        dispatch(loginUser(data));
    };

    const userData = useSelector(state => state.userData);
    // useEffect(() => {
    //     switch (userData.loginmessage) {
    //         case "nouser":
    //             alert(translate_list[userLanguage].nousermessage);
    //             break;
    //         case "wrongpassword":
    //             alert(translate_list[userLanguage].passwordmessage);
    //             break;
    //         case "success":
    //             localStorage.setItem("userId", userData.data.userId);
    //             localStorage.setItem("userRole", userData.data.userRole);
    //             window.location.reload(false);
    //             break;
    //         default:
    //             break;
    //     }

    // }, [dispatch, userData])
    useEffect(() => {
        if (userData.data == null && userId != null) {
            let data = { "isGet": 1, "userId": userId };
            dispatch(getUser(data));
        }
        if (userId != null) {
            setlogin(false);
        }
    }, [dispatch, userData.signupmessage])

    const userRole = localStorage.getItem("userRole");

    // const handleClose = () => {
    //     setOpen(false);
    // };

    const onSubmit = data => {
        data["isLogin"] = "";
        dispatch(signupUser(data))
    };

    const userdata = useSelector(state => state.userData);
    // //componentDidUpdate --- Only re-run the effect if message changes
    // useEffect(() => {
    //     if (userdata.signupmessage === "success") {
    //         handleClose();
    //         localStorage.setItem("userId", userdata.data.userId);
    //         localStorage.setItem("userRole", 0);
    //     }
    //     if (userdata.signupmessage === "fail") {
    //         handleClose();
    //     }
    //     if (userdata.signupmessage === "nouser") {
    //         alert(translate_list[userLanguage].noemailmessage);
    //     }
    //     if (userdata.signupmessage === "send") {
    //         alert(translate_list[userLanguage].sendmessage);
    //         handleForgetClose();
    //     }
    // }, [dispatch, userdata])
    // useEffect(() => {
    //     if (userId != null) {
    //         let data = { "isGet": 1, "userId": userId };
    //         dispatch(getUser(data));
    //         setlogin(false);
    //     }
    // }, [dispatch, successopen])

    const videoList = useSelector(state => state.videoData.data);

    useEffect(() => {
        dispatch(getVideo())
    }, [dispatch])

    const linkList = useSelector(state => state.linkData.showData);

    useEffect(() => {
        if (linkList == null) {
            dispatch(getLink());
        }
    }, [dispatch])

    if (userId == null && !login) {
        setlogin(true);
    }

    if ((userdata.data == null && userId != null) || videoList == null || linkList == null) {
        return "loading..."
    }
    return (
        <div>
            <div className="index-banner" style={{ backgroundImage: "url(" + PIC_URL + "images/banner.jpg)" }}>
                {/* <div className="index-banner"> */}
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 slider_container">

                            <Carousel
                                infinite
                                autoPlay={2000}
                                animationSpeed={1000}
                            >
                                {
                                    linkList[2].map((course, index) =>
                                        <img class="slide_image" src={PIC_URL + course.linkImage} />
                                        ||
                                        null
                                    )
                                }

                                {/* <img class="slide_image" src={PIC_URL + "images/banner.jpg"} /> */}
                                {/* <img class="slide_image" src={PIC_URL + "images/banner.jpg"} /> */}
                            </Carousel>
                        </div>
                        <div className="col-xs-12 col-sm-6 ">
                            <div className="form-cell banner-right-info">
                                <div class="jp-body text-center">
                                    {/* <h2 class="text-center m-20">学车流程</h2>
                                    <p>零基础学员，全科证书，识并看龙除主后是导名</p>
                                    <p>获得全科证书，识并看龙除主后是导名</p>
                                    <p>教练全科证书，识并看龙除主后是导名</p>
                                    <p>全科证书，识并看龙除主后是导名</p>
                                    <p>全科证书，识并看龙除主后是导名</p>
                                    <p>全科证书，识并看龙除主后是导名</p>
                                    <p>全科证书，识并看龙除主后是导名</p>
                                    <p>全科证书，识并看龙除主后是导名</p> */}
                                    <img src={PIC_URL + "images/study-schedule.jpg"} />

                                </div>
                            </div>
                        </div>
                        {/* {login == true &&
                            <div className="col-xs-12 col-sm-6 slider_container">
                                <div className="form-cell">
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
                                                            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                                                        })} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-label">{translate_list[userLanguage].password} {errors.userPassword && <p className="input_error">{translate_list[userLanguage].passworderror}</p>}</div>
                                                    <div className="form-input">
                                                        <input type="password" className="input-box" placeholder="" name="userPassword" ref={register({ required: true, minLength: 6 })} />
                                                    </div>
                                                </div>
                                                <div className="form-link"><a onClick={() => setForgetOpen(true)}>{translate_list[userLanguage].forgetpass}</a></div>
                                                <div className="form-tip">
                                                    {translate_list[userLanguage].noaccount}<a data-toggle="modal" onClick={() => handleClickOpen()}>{translate_list[userLanguage].typeregist}</a>
                                                </div>
                                                <div className="form-end">
                                                    <button type="submit" className="btn-submit">{translate_list[userLanguage].login}</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ||
                            <div className="user_login"></div>
                        } */}
                    </div>
                </div>
            </div>
            <div className="wrap">
                {
                    userRole == 1 &&
                    <div class="section">
                        <div class="container">
                            <div class="sec-heading">加入E-DRIVING易驾的理由</div>
                            <div class="explain-section">
                                <p>
                                E- DRIVING易驾可为加盟教练提供充沛的生源，优化加盟教练的生源区域，极大提高加盟教练的练车路考效率，增加经济收入。<br/>
                                E-DRIVING易驾可帮助解决加盟教练在教学过程中困扰教练的招生、学员答疑、筹备考期等等烦恼，让加盟教练专心致志的教学，极大提高教学质量和教车安全。<br/>
                                E-DRIVING易驾为加盟教练准备了快捷方便的网络教学管家，直观易用的预约排课系统，高度整合的考期编排系统，练车路考前自动短信提醒以及详细的学员资料，
                                将大大降低加盟教练的内务工作，提高教学效率。<br/>
                                信息时代，网络驾校已是滚滚的历史大势，E-DRIVING易驾愿协众加盟教练共赴未来！<br/>
                                Edriving易驾加盟咨询热线：416-427-9758。<br/>
                                </p>
                            </div>
                        </div>
                    </div>
                    ||
                    <div className="section">
                        <div className="container">
                            <div className="bk-panel">
                                <div className="bk-row">
                                    <div className="col-xs-6 col-sm-4">
                                        <div className="bk-cell">
                                            <div className="bk-grid">
                                                <img src={PIC_URL + "images/bk1.png"} />
                                                <div className="col">
                                                    <a href="/#/web/question">
                                                        <div className="bk-tit">{translate_list[userLanguage].questionpage}<br />{translate_list[userLanguage].newquestion}</div>
                                                    </a>
                                                </div>
                                            </div>
                                            <ul className="bk-list">
                                                <li><a href="/#/web/question">{translate_list[userLanguage].iconquestion}</a></li>
                                                <li><a href="/#/web/question">{translate_list[userLanguage].normalquestion}</a></li>
                                                <li><a href="/#/web/question">{translate_list[userLanguage].g1exam}</a></li>
                                                <li><a href="/#/web/question">{translate_list[userLanguage].wrongquestion}</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xs-6 col-sm-4">
                                        <div className="bk-cell">
                                            <div className="bk-grid">
                                                <img src={PIC_URL + "images/bk2.png"} />
                                                <div className="col">
                                                    <a href="/#/web/translatecenter">

                                                        <div className="bk-tit">{translate_list[userLanguage].chineselicense}<br />{translate_list[userLanguage].onlinetrans}</div>
                                                    </a>
                                                </div>
                                            </div>
                                            <ul className="bk-list">
                                                <li><a href="/#/web/translatecenter">{translate_list[userLanguage].chinesetrans}</a></li>
                                                <li><a href="/#/web/translatecenter">{translate_list[userLanguage].caragentrans}</a></li>
                                                <li><a href="/#/web/translatecenter">{translate_list[userLanguage].othertrans}</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xs-6 col-sm-4">
                                        <div className="bk-cell">
                                            <div className="bk-grid">
                                                <img src={PIC_URL + "images/bk3.png"} />
                                                <div className="col">
                                                    <a href="/#/web/courseselectarea">

                                                        <div className="bk-tit">{translate_list[userLanguage].g2gcourse}<br />{translate_list[userLanguage].bestcourse}</div>
                                                    </a>
                                                </div>
                                            </div>
                                            <ul className="bk-list">
                                                <li><a href="/#/web/courseselectarea">{translate_list[userLanguage].newbeecourse}</a></li>
                                                <li><a href="/#/web/courseselectarea">{translate_list[userLanguage].famliarcouse}</a></li>
                                                <li><a href="/#/web/courseselectarea">{translate_list[userLanguage].selfcourse}</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xs-6 col-sm-4">
                                        <div className="bk-cell">
                                            <div className="bk-grid">
                                                <img src={PIC_URL + "images/bk4.png"} />
                                                <div className="col">
                                                    <a href="/#/web/videoList">
                                                        {/* <div className="bk-tit">{translate_list[userLanguage].bdecourse}<br />{translate_list[userLanguage].onlinecourse}</div>
                                                         */}
                                                        <div className="bk-tit">视频教程</div>
                                                    </a>
                                                </div>
                                            </div>
                                            <ul className="bk-list">
                                                {/* <li><a href="/#/web/videoList">{translate_list[userLanguage].bde1}</a></li>
                                                <li><a href="/#/web/videoList">{translate_list[userLanguage].bde2}</a></li>
                                                <li><a href="/#/web/videoList">{translate_list[userLanguage].bde3}</a></li> */}
                                                <li><a href="/#/web/videoList">G2路考视频</a></li>
                                                <li><a href="/#/web/videoList">G路考视频</a></li>
                                                {/* <li><button href="/#/web/videoList"></button></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xs-6 col-sm-4">
                                        <div className="bk-cell">
                                            <div className="bk-grid">
                                                <img src={PIC_URL + "images/bk5.png"} />
                                                <div className="col">
                                                    <a href="/#/web/myReservation">
                                                        <div className="bk-tit">{translate_list[userLanguage].myedriving}<br />{translate_list[userLanguage].learnprocess}</div>
                                                    </a>
                                                </div>
                                            </div>
                                            <ul className="bk-list">
                                                <li><a href="/#/web/myReservation">{translate_list[userLanguage].reserveclass}</a></li>
                                                <li><a href="/#/web/myReservation">{translate_list[userLanguage].checkprocess}</a></li>
                                                <li><a href="/#/web/myReservation">{translate_list[userLanguage].stucoareview}</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xs-6 col-sm-4">
                                        <div className="bk-cell">
                                            <div className="bk-grid">
                                                <img src={PIC_URL + "images/bk6.png"} />
                                                <div className="col">
                                                    <a href="/#/web/Document">
                                                        <div className="bk-tit">{translate_list[userLanguage].g2gpoint}<br />{translate_list[userLanguage].exambook}</div>
                                                    </a>
                                                </div>
                                            </div>
                                            <ul className="bk-list">
                                                <li><a href="/#/web/Document">{translate_list[userLanguage].g2point}</a></li>
                                                <li><a href="/#/web/Document">{translate_list[userLanguage].gpoint}</a></li>
                                                <li><a href="/#/web/Document">{translate_list[userLanguage].examroute}</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="section">
                    <div className="sec-heading">{translate_list[userLanguage].onlineteach}</div>
                    <div className="container">
                        <div className="row edu-row">
                            <div className="col-md-7">
                                <div className="swiper-container swiper-video">
                                    <div className="vv-cell">
                                        <div class='embed-container'>
                                            <iframe src={'https://www.youtube.com/embed/' + videoList[currentDoc]['videoContent']} frameborder='0' allowfullscreen="allowfullscreen"></iframe>
                                        </div>
                                    </div>
                                    {/* <!-- Add Pagination --> */}
                                    <div className="vv-pagination"></div>
                                </div>
                                <script>
                                    {/* var swiper = new Swiper('.swiper-video', {
                                        centeredSlides: true,
                                        autoplay: {
                                            delay: 5500,
                                            disableOnInteraction: false,
                                        },
                                        pagination: {
                                            el: '.vv-pagination',
                                            clickable: true,
                                        },
                                    }); */}
                                </script>
                            </div>
                            <div className="col-md-5">
                                <div className="vv-cells">
                                    <div className="v-tit">{translate_list[userLanguage].onlinevideo}</div>
                                    <ul className="vv-list">
                                        {videoList.map((row, index) =>
                                            index < 4 &&
                                            <li><a onClick={() => setcurrentDoc(index)}>{row['videoTitle']}</a></li>
                                        )}
                                    </ul>
                                    <div className="v-foot"><a href="/#/web/videoList" className="vv-more">{translate_list[userLanguage].morevideo}</a></div>
                                </div>
                            </div>
                        </div>
                        <div className="vv-cells">
                            <div className="v-tit">{translate_list[userLanguage].onlinevideo}</div>
                            <div className="row vv-row">
                                {videoList.map((row, index) =>
                                    index < 3 &&
                                    <div className="col-xs-12 col-md-3">
                                        <div className="vv-cell">
                                            <div class='embed-container'>
                                                <iframe src={'https://www.youtube.com/embed/' + row['videoContent']} frameborder='0' allowfullscreen="allowfullscreen"></iframe>
                                            </div>
                                            <div className="vv-title">{row['videoTitle']}</div>
                                        </div>
                                    </div>
                                )}
                                <div className="col-xs-12 col-md-3">
                                    <div className="v-foot"><a href="/#/web/videoList" className="vv-more">{translate_list[userLanguage].morevideo}</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ExtraLinks />
                <div className="section">
                    <div className="sec-heading">{translate_list[userLanguage].usefulweb}</div>
                    <div className="container">
                        <div className="row lk-row">
                            {
                                linkList[1].map((course, index) =>
                                    <div className="col-md-4">
                                        <a href={course.linkContent} className="lk-box"><img src={course.linkImageurl} /></a>
                                        <div className="lk-text"><a href="">{course.linkTitle}</a></div>
                                        <div className="lk-arrow">
                                            <a href="javascript:void(0);" className="arrow"><i className="iconfont icon-right"></i></a>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* <Dialog open={open} onClose={handleClose} >
                    <form class="modal-dialog modal-form" role="document" onSubmit={handleSubmit(onSubmit)}>
                        <button type="button" class="modal-close" onClick={handleClose} data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <div class="modal-psv-body">
                            <div class="form-dialog-tit">{translate_list[userLanguage].signupaccount}</div>
                            <div class="form-row">
                                <div class="form-label">{translate_list[userLanguage].username} {errors.userName && <p className="input_error">{translate_list[userLanguage].usernameerror}</p>}</div>
                                <div class="form-input">
                                    <input type="hidden" class="input-box" name="isSignup" value={1} ref={register} />
                                    <input type="text" class="input-box" name="userName" ref={register({ required: true, maxLength: 12, minLength: 4 })} />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-label">{translate_list[userLanguage].email} {errors.userEmail && <p className="input_error">{translate_list[userLanguage].emailerror}</p>}</div>
                                <div class="form-input">
                                    <input type="text" class="input-box" name="userEmail" ref={register({
                                        required: true,
                                        pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                                    })} />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-label">{translate_list[userLanguage].phone} {errors.userEmail && <p className="input_error">{translate_list[userLanguage].phoneerror}</p>}</div>
                                <div class="form-input">
                                    <input type="text" class="input-box" name="userPhone" ref={register({ required: true })} />
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
                                <button type="submit" class="btn-submit" data-toggle="modal" >{translate_list[userLanguage].register}</button>
                            </div>
                        </div>
                    </form>
                </Dialog> */}
                {/* <Dialog open={forgetOpen} onClose={handleForgetClose} >
                    <form class="modal-dialog modal-form" role="document">
                        <button type="button" class="modal-close" onClick={handleClose} data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
                </Dialog> */}
            </div>
        </div>
    );
}

export default Index;




