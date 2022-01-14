import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getBarrageData, addBarrageData } from '../../actions/live';


function CoachMenu(props) {

        return (
                <ul class="sin-nav">
                    <li class={props.coachinfo}><a href="/#/web/coachInformation">教练资料</a></li>
                    <li class={props.coachclass}><a href="/#/web/coachClass">预约排课</a></li>
                    <li class={props.coachexam}><a href="/#/web/coachExam">考期列表</a></li>
                    <li class={props.coachepro}><a href="/#/web/coachProcess">学生进度</a></li>
                    <li class={props.coachestu}><a href="/#/web/coachStudentInfo">学生资料</a></li>
                    <li class={props.coachbill}><a href="/#/web/coachBill">对账资料</a></li>
                </ul>
        );
}

export default CoachMenu;




