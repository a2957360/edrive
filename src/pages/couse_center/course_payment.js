import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux';
import ExtraLinks from '../question_center/extra_links';
import StripeCheckout from 'react-stripe-checkout';
import Dialog from '@material-ui/core/Dialog';
import { useHistory } from "react-router-dom";

import { PIC_URL } from "../../constants/actionTypes";
import { addReservation } from '../../actions/reservation';
import { getUser } from '../../actions/user';

import CouponList from '../couponList';

function CoursePayment() {
    const dispatch = useDispatch();
    let history = useHistory();

    let couseInfo = JSON.parse(localStorage.getItem("courseInfo"));
    let userId = localStorage.getItem("userId");
    let reservationId = localStorage.getItem("reservationId");
    //使用优惠券
    const [couponPrice, setcouponPrice] = React.useState(0);
    const [couponId, setcouponId] = React.useState(0);

    const useCoupon = (couponinfo) => {
        // setcouponPrice(parseFloat(couponPrice));
        setcouponPrice(couponinfo.couponPrice);
        setcouponId(couponinfo.couponId);
    }

    const [successopen, setSuccessOpen] = React.useState(false);

    const onToken = (token) => {
        couseInfo["coursePayment"] = "信用卡";
        couseInfo["reservationId"] = reservationId;
        couseInfo["reservationState"] = 1;
        console.log(couseInfo);
        dispatch(addReservation(couseInfo));
        setSuccessOpen(true);
        // fetch('/save-stripe-token', {
        //   method: 'POST',
        //   body: JSON.stringify(token),
        // }).then(response => {
        //   response.json().then(data => {
        //     alert(`We are in business, ${data.email}`);
        //   });
        // });
    }
    //   useEffect(() => {
    //     if(submitmessage == "success"){
    //         history.push("/web/coursePayment");
    //     }
    // }, [submitmessage])
    if (couseInfo !== "") {
        //snappay
        couseInfo["timestamp"] = Date.now();
        couseInfo["couponPrice"] = couponPrice;
        couseInfo["couponId"] = couponId;
        couseInfo["out_order_no"] = "SnapPay" + couseInfo["timestamp"] + userId;
        couseInfo["signPrice"] = 15;
        if (couseInfo["courseTime"] > 0) {
            couseInfo["govermentPrice"] = 15;
        }
        couseInfo.govermentPrice = couseInfo.govermentPrice != null ? couseInfo.govermentPrice : 0;
        couseInfo["taxPrice"] = (couseInfo.coursePrice * 0.13).toFixed(2);
        couseInfo["totalPrice"] = parseFloat((couseInfo.coursePrice * 1.13) + couseInfo.signPrice + couseInfo.govermentPrice - couponPrice).toFixed(2);
    }

    const userdata = useSelector(state => state.userData.data);

    useEffect(() => {
        if (userdata == null) {
            let data = { "isGet": 1, "userId": userId };
            dispatch(getUser(data));
        } else if (userdata != null) {
            if (userdata.reservationId != "") {
                alert("您已经有一个课程，请在该课程结束后，再购买新的课程");
                history.push("/web");
            }
        }
    }, [dispatch, userdata])

    return (
        <div>
            <div class="wrap">
                <div class="container">
                    <div class="ev-steps">
                        <ul class="step-list">
                            <li class="success">
                                <a href="/#/web/courseselectarea">
                                    <div class="step-nn">1</div>
                                    <div class="text">选择区域</div>
                                </a>
                            </li>
                            <li class="success">
                                <a href="/#/web/courseSelectCourse">
                                    <div class="step-nn">2</div>
                                    <div class="text">挑选课程</div>
                                </a>
                            </li>
                            <li class="active">
                                <div class="step-nn">3</div>
                                <div class="text">支付</div>
                            </li>
                            <li class="">
                                <div class="step-nn">4</div>
                                <div class="text">预约排课</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="section">
                    <div class="container">
                        <div class="row pays-row">
                            <div class="col-md-6">
                                <div class="pay-example">
                                    <div class="p-cell">
                                        <div class="hd">课程说明</div>
                                        <div class="bd">
                                            1.识并看龙除主后是导名，程什造报查标六有复论。<br />
										2.济子属种布林能保，向己隶事几领别。<br />
										3.度权存面准又达火发，开第今小信争圆论。<br />
										4.克间心，认化问提且便看科复，反厂6持态询位素。
									</div>
                                    </div>
                                    <div class="p-cell">
                                        <div class="hd">课程条款</div>
                                        <div class="bd">识并看龙除主后是导名，程什造报查标六有复论，除合Z太干民求。 手际千及例法年处及，济子属种布林能保，向己隶事几领别。 机万并引万价风身天，工拉会专这斯约，油她B是积茎江。 度权存面准又达火发，开第今小信争圆论，任青C观住消规些。 事农年队而内毛新段中，所元属共验山适知，验周W惹多惹确盛。</div>
                                    </div>
                                </div>
                                <CouponList useCoupon={useCoupon}></CouponList>
                            </div>
                            <div class="col-md-6">
                                <div class="pay-main">
                                    <div class="pay-hd">支付课程</div>
                                    <div class="pay-panel">
                                        <div class="p-row">
                                            <div class="txt">课程名称</div>
                                            <div class="val">{couseInfo.courseName}</div>
                                        </div>
                                        <div class="p-row">
                                            <div class="txt">适合学员</div>
                                            <div class="val">{couseInfo.courseTarget}</div>
                                        </div>
                                        <div class="p-row">
                                            <div class="txt">理论课程</div>
                                            <div class="val">{couseInfo.courseTime}Hr</div>
                                        </div>
                                        <div class="p-row">
                                            <div class="txt">车上练习</div>
                                            <div class="val">{couseInfo.carTime}Hr</div>
                                        </div>
                                        {
                                            couseInfo["courseTime"] > 0 &&
                                            <div class="p-row">
                                                <div class="txt">证书申报</div>
                                                <div class="val"><img src={PIC_URL + "images/bdui.png"} /></div>
                                            </div>
                                        }
                                        <div class="p-row">
                                            <div class="txt">视频教学</div>
                                            <div class="val"><img src={PIC_URL + "images/bdui.png"} /></div>
                                        </div>
                                        <div class="p-row">
                                            <div class="txt">防御性驾驶技能</div>
                                            <div class="val"><img src={PIC_URL + "images/bdui.png"} /></div>
                                        </div>
                                        <div class="p-row">
                                            <div class="txt">路试套餐</div>
                                            <div class="val">{couseInfo.courseExamTime}次</div>
                                        </div>
                                    </div>
                                    <div class="pay-panel">
                                        <div class="p-row">
                                            <div class="txt">学习计划费用</div>
                                            <div class="val">${couseInfo.coursePrice}</div>
                                        </div>
                                        <div class="p-row">
                                            <div class="txt">报名费</div>
                                            <div class="val">${couseInfo.signPrice}</div>
                                        </div>
                                        {
                                            couseInfo.govermentPrice != 0 &&
                                            <div class="p-row">
                                                <div class="txt">MTO政府费</div>
                                                <div class="val">${couseInfo.govermentPrice}</div>
                                            </div>
                                        }
                                        <div class="p-row">
                                            <div class="txt">优惠</div>
                                            <div class="val">${couponPrice}</div>
                                        </div>
                                        <div class="p-row">
                                            <div class="txt">HST(13%)</div>
                                            <div class="val">${couseInfo.taxPrice}</div>
                                        </div>
                                    </div>
                                    <div class="pay-panel">
                                        <div class="p-row p-total-row">
                                            <div class="txt">费用总计</div>
                                            <div class="val">${couseInfo.totalPrice}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pay-style">
                                    <div class="p-text">支付方式</div>
                                    <div class="pay-list showblock">
                                        <StripeCheckout
                                            token={onToken}
                                            stripeKey="pk_test_51HFoQIGghZcUsgCYkuCLhLMhM8WgKczTDWPXqhd2ie7DYzrwpKjOUNVgsjdIvkhaTqPeIgguFB4bqfud6mzy93lT00otdEn38s"
                                            currency="CAD"
                                            amount={couseInfo.totalPrice * 100}
                                        >
                                            <button class="paybtn paybtn-visa">
                                                <img src={PIC_URL + "images/visa.png"} alt="" />
                                            </button>
                                        </StripeCheckout>
                                        <form action="./snappay/payapi.php" method="POST">
                                            <input type="hidden" name="reservationId" value={reservationId} />
                                            <input type="hidden" name="couponId" value={couponId} />
                                            <input type="hidden" name="couponPrice" value={couponPrice} />
                                            <input type="hidden" name="trans_amount" value={couseInfo.totalPrice} />
                                            <input type="hidden" name="out_order_no" value={couseInfo.out_order_no} />
                                            <input type="hidden" name="timestamp" value={couseInfo.timestamp} />
                                            <input type="hidden" name="description" value={couseInfo.courseName} />
                                            <button type="submit" name="payment_method" value="WECHATPAY" class="paybtn">
                                                <img src={PIC_URL + "images/wpay.png"} alt="" />
                                            </button>
                                            <button type="submit" name="payment_method" value="ALIPAY" class="paybtn  paybtn-alipay">
                                                <img src={PIC_URL + "images/alipay.png"} alt="" />
                                            </button>
                                        </form>
                                    </div>
                                    <div class="p-space"></div>
                                    {/* <div class="pay-list">
                                        <a href="" class="pay-item">
                                            <img src={PIC_URL + "images/wpay.png"} alt="" />
                                        </a>
                                        <a href="" class="pay-item">
                                            <img src={PIC_URL + "images/alipay.png"} alt="" />
                                        </a>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ExtraLinks />
            </div>

            <Dialog open={successopen} >
                <div class="modal-content">
                    <div class="modal-psv-body">
                        <div class="psv-icon">
                            <img src={PIC_URL + "images/successlg.png"} />
                            <h3>支付成功</h3>
                        </div>
                        <div class="psv-row">
                            <span class="item">项目：{couseInfo.courseName}</span>
                            <span class="item">支付方式：信用卡</span>
                        </div>
                    </div>
                    <div class="modal-btns">
                        <a href="/#/web/myInformation" class="btn btn-solid" data-dismiss="modal">完善信息</a>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default (CoursePayment);




