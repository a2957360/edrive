import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';

import ExtraLink from '../question_center/extra_links'
import MyMenu from './my_menu'
import CommonReply from '../comreply';

import {PIC_URL} from "../../constants/actionTypes";
import { getCoupon, addCoupon } from '../../actions/coupon';
import { useHistory } from "react-router-dom";

function MyCoupon() {
    const dispatch = useDispatch();

    const userId = localStorage.getItem("userId");

    const history = useHistory();
    if(userId=="" || userId==null){
        alert("请登录后再操作。");
        history.push("/web/");
    }

    const couponData = useSelector(state => state.couponData.data);
    const couponMessage = useSelector(state => state.couponData.addMessage);

    const [imageinfo, setImageinfo] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {couponImageurl: PIC_URL+"images/upload.png"}
    );

    const { register, handleSubmit, watch, errors, getValues } = useForm();

    const handleOnChange = React.useCallback(event => {
        setImageinfo({ [event.target.name]: event.target.files[0] });
        setImageinfo({ [event.target.name + "url"]: URL.createObjectURL(event.target.files[0]) });
    }, [couponData]);

    const couponSubmit = () => {
        console.log(imageinfo["couponImage"])
        if(imageinfo["couponImage"] == null){
            alert("请添加图片");
            return;
        }
        let fileData = new FormData();
        for (var key in imageinfo) {
            fileData.append(key, imageinfo[key]);
        }
        fileData.append("userId", userId);
        setImageinfo({couponImageurl: PIC_URL+"images/upload.png",couponImage:null});
        dispatch(addCoupon(fileData));
    };

    useEffect(() => {
        if (couponData == null) {
            console.log("coupon");
            let data = { "isGet": 1, "userId": userId };
            console.log(data);

            dispatch(getCoupon(data));
        }
    }, [dispatch, couponData])

    if(couponData == null){
        return "loading...";
    }
    return (
        <div>
            <div class="sin-wrap">
                <div class="sin-heading">Hi, E-Driving云端驾校欢迎你</div>
                <div class="container">
                    <div class="sin-main">
                        <MyMenu mycou="active"/>
                        <div class="sin-main-col">
                            <form class="acc-cells" onChange={handleOnChange} onSubmit={handleSubmit(couponSubmit)}>
                                <ul class="row upload-rows" id="warp">
                                    <li class="col-xs-12">
                                        <div class="upload-cell" style={{marginBottom: "0"}}>
                                            <div class="txt">朋友圈截图</div>
                                            <div class="uplad-box">
                                                <input type="file" id="up_img_WU_FILE_0" name="couponImage" ref={register} />
                                                <img id="imgShow_WU_FILE_0" src={imageinfo.couponImageurl} />
                                            </div>
                                        </div>
                                    </li>
                                    <li class="col-xs-12">
                                        <div class="upload-btns">
                                            <button type="submit" class="btn btn-solid btn-upload">
                                                上传图片
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </form>
                            <div class="acc-cells">
                                <div class="acc-heading">已有抵用券</div>
                                <div class="row row-coupon">
                                    {
                                    couponData.map((course,index) =>
                                    course.couponCode == ""&&
                                    <div class="col-xs-12 col-md-4">
                                            <div class="d-coupon">
                                                <div class="d-image"><img src={PIC_URL+course.couponImage} /></div>
                                                <div class="d-desc"></div>
                                                <div class="dp-number"><span class="dp-span">正在审核</span></div>
                                            </div>
                                        </div>||
                                        course.couponCode == ""&&
                                        <div class="col-xs-12 col-md-4">
                                            <div class="d-coupon">
                                                <div class="d-price"><sup><img src={PIC_URL + "images/fh.png"} /></sup>{course.couponPrice}</div>
                                                <div class="d-desc">抵用券号</div>
                                                <div class="dp-number"><span class="dp-span">{course.couponCode}</span></div>
                                                <div class="d-foot"><a href="#/web/courseselectarea" class="btn btn-solid">使用</a></div>
                                            </div>
                                        </div>)
                                    }

                                </div>
                            </div>
                            <CommonReply commonReplytype="12"/>
                        </div>
                    </div>
                </div>
            </div>
            <ExtraLink />
        </div>
    );
}

export default MyCoupon;




