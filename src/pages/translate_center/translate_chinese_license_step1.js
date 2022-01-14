import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { connect } from 'react-redux';
import ExtraLinks from '../question_center/extra_links';


import { addTranslate, fillTranslate } from '../../actions/translate';


function QuestionResult() {
    const dispatch = useDispatch();
    let history = useHistory();
    const translateType = localStorage.getItem("translateType");

    const { register, handleSubmit, watch, errors, getValues } = useForm();
    const onSubmit = data => saveform(data);
    // const onSubmit = data => console.log(data);
    const saveform = (data) => {
        localStorage.setItem("translateform", JSON.stringify(data));
        localStorage.setItem("translateType", data['type']);
        switch (translateType) {
            case "license":
                history.push("/web/chineselicensestep2");
                break;
            case "carAgent":
                history.push("/web/carAgentStep2");
                break;
            case "other":
                history.push("/web/otherStep2");
                break;

            default:
                break;
        }
    }
    const translatedata = useSelector(state => state.translateData);
    // //componentDidUpdate --- Only re-run the effect if message changes
    useEffect(() => {

    }, [dispatch, translatedata])

    return (
        <div>
            <div class="wrap">
                <div class="sin-page">
                    <form class="container" onSubmit={handleSubmit(onSubmit)}>
                        <ol class="breadcrumb">
                            <li><a href="/#/web/chineselicensestep1">翻译公证项目</a></li>
                        </ol>
                        <div class="ev-steps">
                            <ul class="step-list">
                                <li class="active">
                                    <div class="step-nn">1</div>
                                    <div class="text">填写信息</div>
                                </li>
                                <li>
                                    <div class="step-nn">2</div>
                                    <div class="text">上传照片</div>
                                </li>
                            </ul>
                        </div>
                        <div class="atio-form">
                            <div class="row jz-row">
                                <div class="col-xs-12">
                                    <div class="atio-form-hd">联系人信息</div>
                                </div>
                                <div class="col-xs-12 ">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-row">
                                                <div class="form-label">姓名{errors.name && <p className="input_error">必填，长度为2-12</p>}</div>
                                                <div class="form-input">
                                                    <input type="text" class="input-box" name="name" ref={register({ required: true, maxLength: 12, minLength: 2 })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-6">
                                    <div class="form-row">
                                        <div class="form-label">电话{errors.phone && <p className="input_error">必填,请填写正确电话</p>}</div>
                                        <div class="form-input">
                                            <input type="text" class="input-box" name="phone" ref={register({
                                                required: true,
                                                pattern: /^\d{10}$/
                                            })} />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-6">
                                    <div class="form-row">
                                        <div class="form-label">邮件{errors.email && <p className="input_error">请填写正确邮箱</p>}</div>
                                        <div class="form-input">
                                            <input type="text" class="input-box" name="email" ref={register({
                                                pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                                            })} />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12 ">
                                    <div class="form-row">
                                        <div class="form-label">地址</div>
                                        <div class="form-input">
                                            <input type="text" class="input-box" name="address" ref={register()} />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="atio-form-hd">翻译信息</div>
                                </div>
                                {
                                    translateType == "other" &&
                                    <div class="col-xs-12 col-sm-6">
                                        <div class="form-row">
                                            <div class="form-label">翻译件类型{errors.type && <p className="input_error">必填</p>}</div>
                                            <div class="form-input">
                                                <div class="form-select">
                                                    <select class="input-box" name="type" ref={register({ required: true })}>
                                                        <option value="出生证明">出生证明</option>
                                                        <option value="户口本">户口本</option>
                                                        <option value="身份证">身份证</option>
                                                        <option value="结婚证">结婚证</option>
                                                        <option value="离婚证">离婚证</option>
                                                        <option value="学位证">学位证</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div class="col-xs-12 col-sm-6">
                                    <div class="form-row">
                                        <div class="form-label">取件方式{errors.type && <p className="input_error">必填</p>}</div>
                                        <div class="form-input">
                                            <div class="form-select">
                                                <select class="input-box" name="hurry" ref={register({ required: true })}>
                                                    <option value="邮政平邮">邮政平邮</option>
                                                    <option value="加急自取">加急自取</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-6">
                                    <div class="form-row">
                                        <div class="form-label">翻译件用途{errors.purpose && <p className="input_error">必填</p>}</div>
                                        <div class="form-input">
                                            <div class="form-select">
                                                <select class="input-box" name="purpose" ref={register({ required: true })}>
                                                    <option value="免等学车">免等学车</option>
                                                    <option value="租车旅游">租车旅游</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-btn-lg">
                                        <button type="submit" class="btn btn-solid">继续</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
                <div class="container">
                    <div class="col-xs-12">
                        <div class="sec-heading">ATIO在线翻译说明</div>
                        <div class="explain-section">
                            <p>
                                1 在线提交后翻译公证件将在5个工作日内送达，若需加急当日可上门自取，自取地址：203-3033 Palstan Rd Mississauga,ON L4Y 2Z7”；<br />
                                2 ATIO翻译公证的中国驾照、中国驾照所在地车管所驾驶员信息查询表（简称：车管所证明）以及其他证件文件，在安大略省的有效使用期为6个月；<br />
                                3 持有中国驾照原件及ATIO翻译公证件在年满16岁，有合法保险情况下，自登陆起可驾驶2-3个月（详情查阅相关问题）；<br />
                                4 持有中国驾照、车管所原件及相应ATIO翻译公证件，递交安省任何驾照考试地点DRIVETEST（笔试路考中心）后，可获12或24个月免等期（详情查阅相关问题）。<br />
                                5 安省交通厅（MTO）免等条款规定比较复杂，请详细查阅相关问题的论述，或及时联系Edriving易驾云端驾校客服。
                            </p>
                        </div>
                    </div>
                </div>
                <ExtraLinks />
            </div>
        </div>
    );
}
export default (QuestionResult);




