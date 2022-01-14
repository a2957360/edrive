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

    let examList = JSON.parse(localStorage.getItem("examList"));
    let examtype = localStorage.getItem("questionListNum");

    let iconrightnum = 0;
    let iconwrongnum = 0;
    let normalrightnum = 0;
    let normalwrongnum = 0;
    examList["icon"].forEach(element => {
        if (element.rightAnswer == element.userAnswer) {
            iconrightnum++;
        } else {
            iconwrongnum++;
        }
    });
    examList["normal"].forEach(element => {
        if (element.rightAnswer == element.userAnswer) {
            normalrightnum++;
        } else {
            normalwrongnum++;
        }
    });    
    
    const continueexam = () =>{
        console.log("kaoshi ");
        localStorage.setItem("questionListNum", "normal");
        localStorage.setItem("questionNum", 0);
        history.push("/web/examAnswer");
    };

    let iconrightpercentage = parseFloat(iconrightnum) / parseFloat(examList["icon"].length) * 100;
    let iconwrongpercentage = parseFloat(iconwrongnum) / parseFloat(examList["icon"].length) * 100;
    let normalrightpercentage = parseFloat(normalrightnum) / parseFloat(examList["normal"].length) * 100;
    let normalwrongpercentage = parseFloat(normalwrongnum) / parseFloat(examList["normal"].length) * 100;

    return (
        <div>
            <div class="wrap">
                <div class="sin-page">
                    <div class="container">
                        <ol class="breadcrumb">
                            <li><a href="/#/web/question">G1考试题库项目</a></li>
                            <li>模拟考试</li>
                        </ol>
                        <div class="row exm-row">
                            <div class="result-cells">
                                <div class="res-title">测试结果</div>
                                <div class="res-cell">
                                    {iconrightnum >= 15 &&
                                        <div class="res-hd">标识部分 <span class="text-green">PASS</span></div>
                                        ||
                                        <div class="res-hd">标识部分 <span class="text-red">FAIL</span></div>
                                    }
                                    <div class="res-progress clearfix">
                                        <div class="res-progress-bar" style={{ width: iconrightpercentage + "%" }}>
                                            <div class="res-success">答对{iconrightnum}道题</div>
                                            <div class="res-bar success-bar"></div>
                                        </div>
                                        <div class="res-progress-bar" style={{ width: iconwrongpercentage + "%" }}>
                                            <div class="res-false">答错{iconwrongnum}道题</div>
                                            <div class="res-bar false-bar"></div>
                                        </div>
                                    </div>
                                </div>
                                {examtype == "normal" &&
                                    <div class="res-cell">
                                        {normalrightnum > 15 &&
                                            <div class="res-hd">理论部分 <span class="text-green">PASS</span></div>
                                            ||
                                            <div class="res-hd">理论部分 <span class="text-red">FAIL</span></div>
                                        }
                                        <div class="res-progress clearfix">
                                            <div class="res-progress-bar" style={{ width: normalrightpercentage + "%" }}>
                                                <div class="res-success">答对{normalrightnum}道题</div>
                                                <div class="res-bar success-bar"></div>
                                            </div>
                                            <div class="res-progress-bar" style={{ width: normalwrongpercentage + "%" }}>
                                                <div class="res-false">答错{normalwrongnum}道题</div>
                                                <div class="res-bar false-bar"></div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div class="res-foot">
                                    {examtype == "icon" &&
                                        <ul class="row res-btns">
                                            <li class="col-xs-4">
                                                <a onClick={()=>continueexam()} class="res-btn">继续理论题</a>
                                            </li>
                                        </ul>
                                        ||
                                        <ul class="row res-btns">
                                            <li class="col-xs-4">
                                                <a href="/#/web/examCheckAnswer" class="res-btn">查看错题</a>
                                            </li>
                                            <li class="col-xs-4">
                                                <a href="/#/web/question" class="res-btn">再试一次</a>
                                            </li>
                                        </ul>
                                    }
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




