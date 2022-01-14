import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';

import ExtraLink from '../question_center/extra_links'
import MyMenu from './my_menu'
import CommonReply from '../comreply';

import { PIC_URL } from "../../constants/actionTypes";

import { getReservation } from '../../actions/reservation';
import { getTranslate } from '../../actions/translate';
import { useHistory } from "react-router-dom";

function MyBill() {
    const dispatch = useDispatch();
    const userId = localStorage.getItem("userId");
    const history = useHistory();
    if(userId=="" || userId==null){
        alert("请登录后再操作。");
        history.push("/web/");
    }

    const reservationData = useSelector(state => state.reservationData.data);
    const translateData = useSelector(state => state.translateData.data);

    useEffect(() => {
        if (reservationData == null) {
            let data = { "isGet": 1, "userId": userId };
            dispatch(getReservation(data));
        }
        if (translateData == null) {
            let data = { "isGet": 1, "userId": userId };
            dispatch(getTranslate(data));
        }
    }, [dispatch, reservationData, translateData])

    if (translateData == null || reservationData == null) {
        return "loading...";
    }
    return (
        <div>
            <div class="sin-wrap">
                <div class="sin-heading">Hi, E-Driving云端驾校欢迎你</div>
                <div class="container">
                    <div class="sin-main">
                        <MyMenu mybill="active" />
                        <div class="sin-main-col">
                            <div class="acc-cells">
                                <div class="acc-heading">我的账单</div>
                                <div class="xc-table-container">
                                    <div class="table-responsive">
                                        <table class="table xc-table">
                                            <thead>
                                                <tr>
                                                    <td style={{ width: 20 + "%" }}>订单时间</td>
                                                    <td style={{ width: 16 + "%" }}>订单项目</td>
                                                    <td style={{ width: 32 + "%" }}>订单内容</td>
                                                    <td style={{ width: 20 + "%" }}>付款方式</td>
                                                    <td class="text-right">付款金额</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                reservationData.hasOwnProperty('list') &&
                                                reservationData.list.map((course, index) =>
                                                    <tr>
                                                        <td><div class="acc-time">{course.createTime}</div></td>
                                                        <td>{course.reservationName}</td>
                                                        <td>{course.carTime}小时路考+{course.courseExamTime}路考</td>
                                                        <td>{course.coursePayment}</td>
                                                        <td class="text-right">${course.coursePrice}</td>
                                                    </tr>
                                                )
                                                }
                                                {translateData.map((course, index) =>
                                                    <tr>
                                                        <td><div class="acc-time">{course.createTime}</div></td>
                                                        <td>{course.translateName}</td>
                                                        <td>{course.translateType}+{course.translatePurpose}</td>
                                                        <td>{course.translatePayment}</td>
                                                        <td class="text-right">${course.translatePrice}</td>
                                                    </tr>
                                                )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="acc-cells">
                                <div class="acc-heading">说明</div>
                                <div class="sin-tips">
                                    <div class="bd">
                                        <p>1.识并看龙除主后是导名，程什造报查标六有复论，除合Z太干民求。 手际千及例法年处及 </p>
                                        <p>2.济子属种布林能保，向己隶事几领别。 机万并引万价风身天，工拉会专这斯约，油她B是积茎江。 </p>
                                        <p>3.度权存面准又达火发，开第今小信争圆论，任青C观住消规些。 事农年队而内毛新段中，所元属共验山适知，验周W惹多惹确盛。 </p>
                                        <p>4.整运前明料层一信大，得结研之省片高精，世物D新强类霸克。 划严极做约相二克间心，认化问提且便看科复，反厂6持态询位素。 约养感在求就各书今叫</p>
                                    </div>
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

export default MyBill;




