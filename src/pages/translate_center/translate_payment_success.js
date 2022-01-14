import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux';
import ExtraLinks from '../question_center/extra_links';
import StripeCheckout from 'react-stripe-checkout';
import Dialog from '@material-ui/core/Dialog';

import { PIC_URL } from "../../constants/actionTypes";
import { addTranslate, clearTranslate } from '../../actions/translate';

function TranslatePaymentSuccess() {
    const dispatch = useDispatch();
    let translateSectionList = JSON.parse(localStorage.getItem("translateform"));
    let userId = localStorage.getItem("userId");
    let translateId = localStorage.getItem("translateId");
    const [successopen, setSuccessOpen] = React.useState(false);

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
    if (translateSectionList !== "") {
        //snappay
        translateSectionList["timestamp"] = Date.now();
        translateSectionList["out_order_no"] = "SnapPay"+translateSectionList["timestamp"]+userId;
        translateSectionList["signPrice"] = 30;
        translateSectionList["taxPrice"] = (translateSectionList.translatePrice * 0.13).toFixed(2);
        translateSectionList["totalPrice"] = parseFloat((translateSectionList.translatePrice * 1.13).toFixed(2)) + translateSectionList.signPrice;
    }
    return (
        <div>
            <div class="wrap">
                <div class="section">
                    <div class="container">
                        <div class="row pays-row">
                            <div class="col-md-12">
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
                                        <div class="hd">支付完成</div>
                                        <div class="bd">识并看龙除主后是导名，程什造报查标六有复论，除合Z太干民求。 手际千及例法年处及，济子属种布林能保，向己隶事几领别。 机万并引万价风身天，工拉会专这斯约，油她B是积茎江。 度权存面准又达火发，开第今小信争圆论，任青C观住消规些。 事农年队而内毛新段中，所元属共验山适知，验周W惹多惹确盛。</div>
                                    </div>
                                </div>
                                <div class="pay-style">
                                    <div class="p-text"><a>返回首页</a></div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ExtraLinks />
            </div>
        </div>
    );
}
export default (TranslatePaymentSuccess);




