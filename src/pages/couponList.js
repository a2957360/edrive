import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { PIC_URL } from "../constants/actionTypes";
import { getCoupon, addCoupon } from '../actions/coupon';

function MyCoupon(props) {
    const dispatch = useDispatch();

    const userId = localStorage.getItem("userId");
    const couponData = useSelector(state => state.couponData.data);

    const applyCoupon = (couponId) => {
        props.useCoupon(couponData[couponId]);
    }

    useEffect(() => {
        if (couponData == null) {
            let data = { "isGet": 1, "userId": userId };

            dispatch(getCoupon(data));
        }
    }, [dispatch, couponData])

    if (couponData == null) {
        return "loading...";
    }
    if(couponData.length == 0){
        return "";
    }
    return (

        <div>
            <div class="acc-heading">已有抵用券</div>
            <div class="row row-coupon">
                {
                    couponData.map((course, index) =>
                        course.couponState == "1" &&
                        <div class="coupon_block">
                            <div class="d-coupon payment_coupon">
                                <div class="d-price"><sup><img src={PIC_URL + "images/fh.png"} /></sup>{course.couponPrice}</div>
                                <div class="d-desc">抵用券号</div>
                                <div class="dp-number"><span class="dp-span">{course.couponCode}</span></div>
                                <div class="d-foot"><button onClick={()=>applyCoupon(index)} class="btn btn-solid">使用</button></div>
                            </div>
                        </div>)
                }

            </div>
        </div>

    );
}

export default MyCoupon;




