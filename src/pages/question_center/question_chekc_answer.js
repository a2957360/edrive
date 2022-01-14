import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import ExtraLinks from './extra_links';
import { useForm } from "react-hook-form";


import { getQuestion } from '../../actions/question';


function QuestionCheckAnswer() {
    const dispatch = useDispatch();
    let history = useHistory();

    let questionSectionList = JSON.parse(localStorage.getItem("questionList"));
    let questionType = localStorage.getItem("questionType");
    let questionListNum = localStorage.getItem("questionListNum");
    let typename = questionType == "icon"?"标识":"理论";
    questionSectionList= questionSectionList[questionType][questionListNum];
    
    const questionList = useSelector(state => state.questionData.questionData);

    const [questionDate, setQuestionDate] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { questionTitle: "", questionImage: "", questionTip: "", answer1: "", answer2: "", answer3: "", answer4: "", userAnswer: "", rightAnswer: "", questionNum: "" }
    );
    let questionNum = 0;

    const setQuestion = (Num) => {
        setQuestionDate(questionList[questionSectionList[Num]["questionId"]]);
        setQuestionDate(questionSectionList[Num]);
        setQuestionDate({questionNum: Num});
    };

    useEffect(() => {
        if (questionList == undefined) {
            dispatch(getQuestion())
            // setQuestionDate(questionList[questionSectionList[0]["questionId"]]);
        }
        if (questionList !== undefined) {
            setQuestionDate(questionList[questionSectionList[questionNum]["questionId"]]);
        }
    }, [dispatch])

    return (
        <div>
            <div class="wrap">
                <div class="sin-page">
                    <div class="container">
                        <ol class="breadcrumb">
                            <li><a href="/#/web/question">G1考试题库项目</a></li>
                            <li>{typename+questionListNum}</li>
                        </ol>
                        <div class="exm-row">
                            <div class="res-title">查看错题</div>
                            <div class="row nums-row">
                                <dv class="col-md-12">
                                    <div class="num-tit">标识</div>
                                    <ul class="num-list">
                                        {questionSectionList.map((question, index) =>
                                            question.rightAnswer == question.userAnswer &&
                                            <li>
                                                <a onClick={() => setQuestion(index)} class="box">{index + 1}</a>
                                            </li> ||
                                            <li>
                                                <a onClick={() => setQuestion(index)} class="box red-solid">{index + 1}</a>
                                            </li>
                                        )
                                        }
                                    </ul>
                                </dv>
                            </div>
                        </div>
                        <div class="row exm-row">
                            <div class="col-md-6">
                                <div class="exam-cells text-center">
                                    <div class="exam-pic">
                                        <img src={questionDate.questionImage} />
                                    </div>
                                    <div class="exam-desc">{questionDate.questionTitle}</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="ex-num-tt">第{questionDate.questionNum + 1}题</div>
                                <div class="exam-list">
                                    <ul class="exam-tabs" role="tablist">
                                        {/* <li class="active ex-wrong">
                                            <a href="#A" aria-controls="A" role="tab" data-toggle="tab">{questionDate.answer1}</a>
                                        </li>
                                        <li class="ex-success">
                                            <a href="#B" aria-controls="B" role="tab" data-toggle="tab">{questionDate.answer2}</a>
                                        </li> */}
                                        <li class={[questionDate.userAnswer == 1 && questionDate.userAnswer!= questionDate.rightAnswer ? "ex-wrong" : "",questionDate.rightAnswer == 1 ? "ex-success" : ""].join(' ')}>
                                            <a href="#A" aria-controls="A" role="tab" data-toggle="tab">{questionDate.answer1}</a>
                                        </li>
                                        <li class={[questionDate.userAnswer == 2 && questionDate.userAnswer!= questionDate.rightAnswer ? "ex-wrong" : "",questionDate.rightAnswer == 2 ? "ex-success" : ""].join(' ')}>
                                            <a href="#B" aria-controls="B" role="tab" data-toggle="tab">{questionDate.answer2}</a>
                                        </li>
                                        <li class={[questionDate.userAnswer == 3 && questionDate.userAnswer!= questionDate.rightAnswer ? "ex-wrong" : "",questionDate.rightAnswer == 3 ? "ex-success" : ""].join(' ')}>
                                            <a href="#C" aria-controls="C" role="tab" data-toggle="tab">{questionDate.answer3}</a>
                                        </li>
                                        <li class={[questionDate.userAnswer == 4 && questionDate.userAnswer!= questionDate.rightAnswer ? "ex-wrong" : "",questionDate.rightAnswer == 4 ? "ex-success" : ""].join(' ')}>
                                            <a href="#D" aria-controls="D" role="tab" data-toggle="tab">{questionDate.answer4}</a>
                                        </li>
                                    </ul>
                                    <script type="text/javascript">
                                        {/* $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                                                console.log(e.target)
                                            }) */}
                                    </script>
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
export default (QuestionCheckAnswer);




