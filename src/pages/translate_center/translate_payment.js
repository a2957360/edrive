import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux';
import ExtraLinks from '../question_center/extra_links';
import StripeCheckout from 'react-stripe-checkout';
import Dialog from '@material-ui/core/Dialog';

import { PIC_URL } from "../../constants/actionTypes";
import { addTranslate, clearTranslate } from '../../actions/translate';
import CouponList from '../couponList';

function TranslatePayment() {
    const dispatch = useDispatch();
    let translateSectionList = JSON.parse(localStorage.getItem("translateform"));
    let userId = localStorage.getItem("userId");
    let translateId = localStorage.getItem("translateId");
    const [successopen, setSuccessOpen] = React.useState(false);
    //使用优惠券
    const [couponPrice, setcouponPrice] = React.useState(0);
    const [couponId, setcouponId] = React.useState(0);


    const translatemessage = useSelector(state => state.translateData.message);
    if(translatemessage!= null){
        dispatch(clearTranslate());
    }

    const useCoupon = (couponinfo) => {
        // setcouponPrice(parseFloat(couponPrice));
        setcouponPrice(couponinfo.couponPrice);
        setcouponId(couponinfo.couponId);
    }

    const onToken = (token) => {
        console.log(token);
        let fileData = new FormData();
        for (var key in translateSectionList) {
            fileData.append(key, translateSectionList[key]);
        }
        fileData.append("translateId", translateId);
        fileData.append("translateState", 1);
        fileData.append("translatePayment", "信用卡");
        dispatch(addTranslate(fileData));
        setSuccessOpen(true);
    }

    if (translateSectionList !== "") {
        //snappay
        translateSectionList["timestamp"] = Date.now();
        translateSectionList["couponPrice"] = couponPrice;
        translateSectionList["couponId"] = couponId;
        translateSectionList["out_order_no"] = "SnapPay"+translateSectionList["timestamp"]+userId;
        // translateSectionList["signPrice"] = 30;
        translateSectionList["taxPrice"] = (translateSectionList.translatePrice * 0.13).toFixed(2);
        translateSectionList["totalPrice"] = parseFloat(translateSectionList.taxPrice) + translateSectionList.translatePrice - couponPrice;
        // translateSectionList["totalPrice"] = 0.01;
    }

    return (
        <div>
            <div class="wrap">
                <div class="section">
                    <div class="container">
                        <div class="row pays-row">
                            <div class="col-md-6">
                                <div class="pay-example">
                                    <div class="p-cell">
                                        <div class="hd">说明</div>
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
                                {/* <CouponList useCoupon={useCoupon}></CouponList> */}
                            </div>
                            <div class="col-md-6">
                                <div class="pay-main">
                                    <div class="pay-hd">支付课程</div>
                                    <div class="pay-panel">
                                        <div class="p-row">
                                            <div class="txt">翻译名称</div>
                                            <div class="val">{translateSectionList.translateName}</div>
                                        </div>
                                        <div class="p-row">
                                            <div class="txt">翻译类型</div>
                                            <div class="val">{translateSectionList.type}</div>
                                        </div>
                                        <div class="p-row">
                                            <div class="txt">翻译目的</div>
                                            <div class="val">{translateSectionList.purpose}</div>
                                        </div>
                                    </div>
                                    <div class="pay-panel">
                                        <div class="p-row">
                                            <div class="txt">翻译费用</div>
                                            <div class="val">${translateSectionList.translatePrice}</div>
                                        </div>
                                        <div class="p-row">
                                            <div class="txt">优惠</div>
                                            <div class="val">${couponPrice}</div>
                                        </div>
                                        {/* <div class="p-row">
                                            <div class="txt">报名费</div>
                                            <div class="val">${translateSectionList.signPrice}</div>
                                        </div> */}
                                        <div class="p-row">
                                            <div class="txt">HST(13%)</div>
                                            <div class="val">${translateSectionList.taxPrice}</div>
                                        </div>
                                    </div>
                                    <div class="pay-panel">
                                        <div class="p-row p-total-row">
                                            <div class="txt">费用总计</div>
                                            <div class="val">${translateSectionList.totalPrice}</div>
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
                                            amount={translateSectionList.totalPrice * 100}
                                        >
                                            <button class="paybtn paybtn-visa">
                                                <img src={PIC_URL + "images/visa.png"} alt="" />
                                            </button>
                                        </StripeCheckout>
                                        <form action="http://edrive.renrenfreshdelivery.com/snappay/translatepayapi.php" method="POST">
                                            <input type="hidden" name="translateId" value={translateId} />
                                            <input type="hidden" name="couponId" value={couponId} />
                                            <input type="hidden" name="couponPrice" value={couponPrice} />
                                            <input type="hidden" name="trans_amount" value={translateSectionList.totalPrice} />
                                            <input type="hidden" name="out_order_no" value={translateSectionList.out_order_no} />
                                            <input type="hidden" name="timestamp" value={translateSectionList.timestamp} />
                                            <input type="hidden" name="description" value={translateSectionList.translateName} />
                                            <button type="submit" name="payment_method" value="WECHATPAY"  class="paybtn">
                                                <img src={PIC_URL + "images/wpay.png"} alt="" />
                                            </button>
                                            <button type="submit" name="payment_method" value="ALIPAY" class="paybtn paybtn-alipay">
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

            <div class="modal fade" id="myModal" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-md" role="document">
                    <div class="modal-content">
                        <button type="button" class="modal-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <div class="modal-psv-body">
                            <div class="modal-pay-tt">信用卡支付</div>
                            <div class="row psv-row">
                                <div class="col-md-6">
                                    <div class="p-label">Card Number*</div>
                                    <input type="text" value="6840 1324 2132 8324" class="form-control" />
                                </div>
                                <div class="col-md-2">
                                    <div class="p-label">MM *</div>
                                    <input type="text" value="06" class="form-control" />
                                </div>
                                <div class="col-md-2">
                                    <div class="p-label">YY *</div>
                                    <input type="text" value="06" class="form-control" />
                                </div>
                                <div class="col-md-2">
                                    <div class="p-label">CVV/CVC *</div>
                                    <input type="text" value="06" class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <div class="p-label">First Name *</div>
                                    <input type="text" value="Jason" class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <div class="p-label">Last Name *</div>
                                    <input type="text" value="Underwood " class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <div class="p-label">Address *</div>
                                    <input type="text" value="123 Street, Markham Toronto, ON" class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <div class="p-label">Postal Code *</div>
                                    <input type="text" value="M2K9L0" class="form-control" />
                                </div>
                            </div>
                        </div>
                        <div class="modal-btns">
                            <button type="button" class="btn btn-solid" data-dismiss="modal">确认支付</button>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={successopen} >
                <div class="modal-content">
                    <div class="modal-psv-body">
                        <div class="psv-icon">
                            <img src={PIC_URL + "images/successlg.png"} />
                            <h3>支付成功</h3>
                        </div>
                        <div class="psv-row">
                            <span class="item">项目：{translateSectionList.translateName}</span>
                            <span class="item">支付方式：信用卡</span>
                        </div>
                    </div>
                    <div class="modal-btns">
                        <a href="/#/web" class="btn btn-solid" data-dismiss="modal">返回首页</a>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

// const mapStateToProps = ({ liveData }) => {
//     const { message } = liveData;
//     return { message };
// };

// function mapDispatchToProps(dispatch) {
//     return {
//         getBarrageData: () => {
//             dispatch(getBarrageData());
//         },
//         addNewBarrage: (data) => {
//             dispatch(addBarrageData(data));
//         }
//     };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Question);
export default (TranslatePayment);




