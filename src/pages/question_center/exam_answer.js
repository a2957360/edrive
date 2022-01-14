import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import ExtraLinks from './extra_links';
import { useForm } from "react-hook-form";


import { getExamQuestion } from '../../actions/question';

function QuestionAnswer() {
    const dispatch = useDispatch();
    let history = useHistory();

    const [questionDate, setQuestionDate] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { questionTitle: "", questionImage: "", questionTip: "", answer1: "", answer2: "", answer3: "", answer4: "" }
    );

    const tmpexamList = useSelector(state => state.questionData.examdata);
    let questionNum = localStorage.getItem("questionNum");
    let examtype = localStorage.getItem("questionListNum");
    let examList = JSON.parse(localStorage.getItem("examList"));

    let realquestionnum = parseFloat(questionNum) + 1;

    const setanswer = (answer) => {
        examList[examtype][questionNum]["userAnswer"] = answer;
    };

    const prevquestion = () => {
        if (questionNum > 0) {
            questionNum--;
            localStorage.setItem("questionNum", questionNum);
            setQuestionDate(examList[examtype][questionNum]);
        } else {
            alert("没有上一题了");
        }
    };

    const nextquestion = () => {
        if (examList[examtype][questionNum]["userAnswer"] == "") {
            alert("请选择答案");
            return;
        }
        questionNum++;
        if (questionNum < examList[examtype].length) {
            localStorage.setItem("examList", JSON.stringify(examList));
            localStorage.setItem("questionNum", questionNum);
            let data = examList[examtype][questionNum];
            data["answerClass"] = questionNum;
            setQuestionDate(data);
            // console.log(questionDate);

        } else {
            localStorage.setItem("examList", JSON.stringify(examList));
            history.push("/web/examResult");
        }
    };

    useEffect(() => {
        if (tmpexamList != null && examList['icon'][19]['userAnswer'] == "") {
            localStorage.setItem("examList", JSON.stringify(tmpexamList));
            examList = tmpexamList;
            console.log("111");
        }
        if (examList !== null) {
            setQuestionDate(examList[examtype][questionNum]);
            console.log("222");
        }
    }, [dispatch])
    if (examList == null) {
        return "loading..."
    }
    let maxQuestion = examList[examtype].length;
    let answerPercentage = parseFloat(realquestionnum) / parseFloat(maxQuestion) * 100;
    return (
        <div>
            <div class="wrap">
                <div class="sin-page">
                    <div class="container examwidth">
                        <ol class="breadcrumb">
                            <li><a href="/#/web/question">G1考试题库项目</a></li>
                            <li>模拟考试</li>
                        </ol>
                        <div class="row exm-row">
                            <div class="col-md-7">
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
                                            <li class={questionDate.answerClass}>
                                                <a href="#A" aria-controls="A" role="tab" data-toggle="tab" onClick={() => setanswer(1)}>{questionDate.answer1}</a>
                                            </li>
                                            <li class={questionDate.answerClass}>
                                                <a href="#B" aria-controls="B" role="tab" data-toggle="tab" onClick={() => setanswer(2)}>{questionDate.answer2}</a>
                                            </li>
                                            <li class={questionDate.answerClass}>
                                                <a href="#C" aria-controls="C" role="tab" data-toggle="tab" onClick={() => setanswer(3)}>{questionDate.answer3}</a>
                                            </li>
                                            <li class={questionDate.answerClass}>
                                                <a href="#D" aria-controls="D" role="tab" data-toggle="tab" onClick={() => setanswer(4)}>{questionDate.answer4}</a>
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
                                                <li class="previous"><a onClick={() => prevquestion()}>上一题</a></li>
                                                <li class="next"><a onClick={() => nextquestion()}>下一题</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="col-tips">
                                    <div class="tit">TIPS</div>
                                    <div class="cont">
                                        {/* <p>{questionDate.questionTip}</p> */}
                                    </div>
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
export default QuestionAnswer;




