import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import ExtraLinks from './extra_links';
import { useForm } from "react-hook-form";
import Dialog from '@material-ui/core/Dialog';

import { PIC_URL } from "../../constants/actionTypes";
import { getQuestion } from '../../actions/question';

function QuestionAnswer() {
    const dispatch = useDispatch();
    let history = useHistory();

    let questionSectionList = JSON.parse(localStorage.getItem("questionList"));
    let questionNum = localStorage.getItem("questionNum");
    let questionType = localStorage.getItem("questionType");
    let questionListNum = localStorage.getItem("questionListNum");
    let typename = questionType == "icon"?"标识题库":"理论题库";
    let questionWrongList = localStorage.getItem("questionWrongList") != null?JSON.parse(localStorage.getItem("questionWrongList")):{};

    const [successopen, setSuccessOpen] = React.useState(false);
    const handleSucessClose = () => {
        setSuccessOpen(false);
    };

    let realquestionnum = parseFloat(questionNum) + 1;

    const questionList = useSelector(state => state.questionData.questionData);
    
    const [questionDate, setQuestionDate] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { questionTitle: "", questionImage: "", questionTip: "", answer1: "", answer2: "", answer3: "", answer4: "" }
    );
    // console.log("1111111111111",questionList[questionSectionList[questionNum]["questionId"]]);
    // useEffect(() => {
    //     if (questionList !== undefined) {
    //         setQuestionDate(questionList[questionSectionList[questionNum]["questionId"]]);
    //         // console.log("1111111111111",Object.keys(questionList));
    //     }
    // }, [dispatch,questionDate])
    const restartQuestion = () =>{
        questionSectionList[questionType][questionListNum].forEach((element,index) => {
            questionSectionList[questionType][questionListNum][index]["userAnswer"] = "";
        });
        localStorage.setItem("questionList", JSON.stringify(questionSectionList));
        questionNum = 0;
        localStorage.setItem("questionNum", questionNum);
        setQuestionDate({questionId:"",userAnswer:null,rightAnswer:""});
        setQuestionDate(questionList[questionSectionList[questionType][questionListNum][questionNum]["questionId"]]);
        console.log(questionDate);
    };
    const setanswer = (answer) =>{
        questionSectionList[questionType][questionListNum][questionNum]["userAnswer"] = answer;
    };

    const prevquestion = () =>{
        if(questionNum > 0 ){
            questionNum--;
            localStorage.setItem("questionNum", questionNum);
            setQuestionDate(questionList[questionSectionList[questionType][questionListNum][questionNum]["questionId"]]);
        }else{
            alert("没有上一题了");
        }
    };

    const nextquestion = () =>{
        if(questionSectionList[questionType][questionListNum][questionNum]["userAnswer"] == ""){
            alert("请选择答案");
            return;
        }
        if(questionDate.questionId != questionSectionList[questionType][questionListNum][questionNum]["questionId"]){
            let tmpquestion = questionSectionList[questionType][questionListNum][questionNum];
            setQuestionDate(questionSectionList[questionType][questionListNum][questionNum]);
            if(tmpquestion.rightAnswer != tmpquestion.userAnswer){
                let wrongquestion = questionDate;
                wrongquestion["userAnswer"] = questionSectionList[questionType][questionListNum][questionNum]["userAnswer"]
                wrongquestion["rightAnswer"] = questionSectionList[questionType][questionListNum][questionNum]["rightAnswer"]
                questionWrongList[tmpquestion["questionId"]] = wrongquestion;
            }
            localStorage.setItem("questionList", JSON.stringify(questionSectionList));
            localStorage.setItem("questionWrongList", JSON.stringify(questionWrongList));
            return;
        }
        questionNum++;
        if(questionNum < questionSectionList[questionType][questionListNum].length ){
            localStorage.setItem("questionNum", questionNum);
            setQuestionDate(questionList[questionSectionList[questionType][questionListNum][questionNum]["questionId"]]);
            setQuestionDate({questionId:"",userAnswer:"",rightAnswer:"",resetAnswer:questionNum});
            console.log(questionDate);
        }else{
            history.push("/web/questionResult");
        }
    };

    let maxQuestion = questionSectionList[questionType][questionListNum].length;
    let answerPercentage = parseFloat(realquestionnum) / parseFloat(maxQuestion) * 100;

    useEffect(() => {
        setSuccessOpen(true);
        if (questionList == null) {
            dispatch(getQuestion())
        }
        if (questionList != null) {
            setQuestionDate(questionList[questionSectionList[questionType][questionListNum][questionNum]["questionId"]]);
        }
    }, [dispatch,questionList])
    return (
        <div>
            <div class="wrap">
                <div class="sin-page">
                    <div class="container examwidth">
                        <ol class="breadcrumb">
                            <li><a href="/#/web/question">G1考试题库项目</a></li>
                            <li><a onClick={()=>restartQuestion()}>{typename+questionListNum}</a></li>
                        </ol>
                        <div class="row exm-row">
                            <div class="col-md-7 col-xs-12">
                                <div class="exam-cells text-center">
                                    <div class="progress-cell">
                                        <div class="hd">进度</div>
                                        <div class="progress">
                                            <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{ width: answerPercentage + "%" }}>
                                                <span class="sr-only">{answerPercentage}% Complete</span>
                                            </div>
                                        </div>
                                        <div class="ft">{realquestionnum}/{maxQuestion}</div>
                                    </div>
                                    <div class="exam-pic">
                                        <img src={questionDate.questionImage} />
                                    </div>
								<div class="exam-desc">{questionDate.questionTitle}</div>
                                    <div class="exam-list">
                                        <ul class="exam-tabs" role="tablist">
                                            {/* <li class="active ex-wrong"><a href="#A" aria-controls="A" role="tab" data-toggle="tab">{questionDate.answer1}</a></li>
                                            <li class="ex-success"><a href="#B" aria-controls="B" role="tab" data-toggle="tab">{questionDate.answer2}</a></li> */}
                                            <li class={[questionDate.userAnswer == 1 && questionDate.userAnswer!= questionDate.rightAnswer ? "ex-wrong" : "",questionDate.userAnswer != null && questionDate.rightAnswer == 1 ? "ex-success" : "",questionDate.resetAnswer].join(' ')}>
                                                <a href="#A" aria-controls="A" role="tab" data-toggle="tab" onClick={()=>setanswer(1)}>{questionDate.answer1}</a>
                                                </li>
                                            <li class={[questionDate.userAnswer == 2 && questionDate.userAnswer!= questionDate.rightAnswer ? "ex-wrong" : "",questionDate.userAnswer != null && questionDate.rightAnswer == 2 ? "ex-success" : "",questionDate.resetAnswer].join(' ')}>
                                                <a href="#B" aria-controls="B" role="tab" data-toggle="tab" onClick={()=>setanswer(2)}>{questionDate.answer2}</a>
                                                </li>
                                            <li class={[questionDate.userAnswer == 3 && questionDate.userAnswer!= questionDate.rightAnswer ? "ex-wrong" : "",questionDate.userAnswer != null && questionDate.rightAnswer == 3 ? "ex-success" : "",questionDate.resetAnswer].join(' ')}>
                                                <a href="#C" aria-controls="C" role="tab" data-toggle="tab" onClick={()=>setanswer(3)}>{questionDate.answer3}</a>
                                                </li>
                                            <li class={[questionDate.userAnswer == 4 && questionDate.userAnswer!= questionDate.rightAnswer ? "ex-wrong" : "",questionDate.userAnswer != null && questionDate.rightAnswer == 4 ? "ex-success" : "",questionDate.resetAnswer].join(' ')}>
                                                <a href="#D" aria-controls="D" role="tab" data-toggle="tab" onClick={()=>setanswer(4)}>{questionDate.answer4}</a>
                                                </li>
                                        </ul>
                                        <script type="text/javascript">
                                            {/* $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                                            console.log(e.target)
                                            }) */}
                                        </script>
                                    </div>
                                    <div class="ex-page">
                                        <nav aria-label="...">
                                            <ul class="pager">
                                                <li class="previous"><a  onClick={()=>prevquestion()}>上一题</a></li>
                                                <li class="next"><a  onClick={()=>nextquestion()}>下一题</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-5 col-xs-12 tips-border">
                                <div class="col-tips">
                                    <div class="tit">TIPS</div>
                                    <div class="cont">
                                        <pre class="tip">{questionDate.questionTip}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ExtraLinks />
            </div>

            <Dialog open={successopen} onClose={handleSucessClose} >
                <div class="modal-dialog modal-form" role="document">
                    <button onClick={() => handleSucessClose()} type="button" class="modal-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <div class="modal-tips-body">
                        <div class="cell-icon">
                            <img class="tip_icon" src={PIC_URL + "images/alert.png"} />
                            <h4>刷题库时，结合TIPS学习，会事倍功半, TIPS电脑版在右侧，手机版在下方。</h4>
                        </div>
                        {/* <div class="form-end">
                            <a href="" class="btn-submit">进入账户</a>
                        </div> */}
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default QuestionAnswer;




