import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getBarrageData, addBarrageData } from '../../actions/live';


function MyMenu(props) {
    // componentDidMount() {
    //     //请求api
    //     this.props.getBarrageData();
    // }

    // componentDidUpdate = prevProps => {
    // 	if (prevProps.message !== this.props.message && this.props.message === 'success') {
    // 		console.log('表格提交成功了')
    //     }
    // }
        return (
            <div class="sin-bar">
                <ul class="sin-nav">
                    <li class={props.myinfo}><a href="/#/web/myInformation">我的资料</a></li>
                    <li class={props.myre}><a href="/#/web/myReservation">我的预约</a></li>
                    <li class={props.mypro}><a href="/#/web/myProcess">我的进度</a></li>
                    <li class={props.myco}><a href="/#/web/myCoach">我的教练</a></li>
                    <li class={props.mycou}><a href="/#/web/myCoupon">我的优惠</a></li>
                    <li class={props.mybill}><a href="/#/web/myBill">我的账单</a></li>
                </ul>
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

// export default connect(mapStateToProps, mapDispatchToProps)(myProcess);
export default MyMenu;




