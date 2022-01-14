import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import ExtraLinks from './extra_links';
import { useForm } from "react-hook-form";


import { getBarrageData, addBarrageData } from '../../actions/live';

function QuestionResult() {
    const dispatch = useDispatch();
    let history = useHistory();

    let questionSectionList = JSON.parse(localStorage.getItem("questionList"));
    let questionType = localStorage.getItem("questionType");
    let questionListNum = localStorage.getItem("questionListNum");
    let typename = questionType == "icon"?"标识题库":"理论题库";
    

    let tmpquestionSectionList= questionSectionList[questionType][questionListNum];
    const questionList = useSelector(state => state.questionData.questionData);
    let rightnum = 0;
    let wrongnum = 0;
    tmpquestionSectionList.forEach(element => {
        if(element.rightAnswer == element.userAnswer){
            rightnum++;
        }else{
            wrongnum++;
        }
    });

    let nextlistnum = parseInt(questionListNum)+1;
    if(!questionSectionList[questionType].hasOwnProperty(nextlistnum)){
        if(questionType == "icon"){
            questionType="normal";
            nextlistnum = 1;
        }else{
            nextlistnum = -1;
        }

    }

    const nexttest = () =>{
        localStorage.setItem("questionType", questionType);
        localStorage.setItem("questionListNum", nextlistnum);
        localStorage.setItem("questionNum", 0);
        history.push("/web/questionAnswer");
    };
    const retest = () =>{
        questionSectionList[questionType][questionListNum].forEach((element,index) => {
            questionSectionList[questionType][questionListNum][index]["userAnswer"] = "";
        });
        localStorage.setItem("questionList", JSON.stringify(questionSectionList));
        localStorage.setItem("questionType", questionType);
        localStorage.setItem("questionNum", 0);
        history.push("/web/questionAnswer");
    };

    let rightpercentage = parseFloat(rightnum) / parseFloat(tmpquestionSectionList.length) * 100;
    let wrongpercentage = parseFloat(wrongnum) / parseFloat(tmpquestionSectionList.length) * 100;

        return (
            <div>
                <div class="wrap">
                    <div class="sin-page">
                        <div class="container">
                            <ol class="breadcrumb">
                            <li><a href="/#/web/question">G1考试题库项目</a></li>
                            <li>{typename+questionListNum}</li>
                            </ol>
                            <div class="row exm-row">
                                <div class="result-cells">
                                    <div class="res-title">测试结果</div>
                                    <div class="res-progress clearfix">
                                        <div class="res-progress-bar" style={{width: rightpercentage+"%"}}>
                                            <div class="res-success">答对{rightnum}道题</div>
                                            <div class="res-bar success-bar"></div>
                                        </div>
                                        <div class="res-progress-bar" style={{width: wrongpercentage+"%"}}>
                                            <div class="res-false">答错{wrongnum}道题</div>
                                            <div class="res-bar false-bar"></div>
                                        </div>
                                    </div>
                                    <div class="res-foot">
                                        <ul class="row res-btns">
                                            <li class="col-xs-4">
                                                <a href="/#/web/questionWrongAnswer" class="res-btn">查看错题</a>
                                            </li>
                                            <li class="col-xs-4">
                                                <a onClick={()=>retest()} class="res-btn">再做一次</a>
                                            </li>
                                            <li class="col-xs-4">
                                                {nextlistnum == 1 &&
                                                <a onClick={()=>nexttest()} class="res-btn">{"理论题库"+nextlistnum}</a>
                                                ||
                                                nextlistnum == -1 &&
                                                <a href="/#/web/wrongQuestion" class="res-btn">{"错题汇总"}</a>
                                                ||
                                                <a onClick={()=>nexttest()} class="res-btn">{typename+nextlistnum}</a>}
                                            </li>
                                        </ul>
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

export default (QuestionResult);




