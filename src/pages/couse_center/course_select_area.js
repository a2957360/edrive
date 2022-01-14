import React from 'react';
import { connect } from 'react-redux';
import ExtraLinks from '../question_center/extra_links';
import { useHistory } from "react-router-dom";

import { PIC_URL } from "../../constants/actionTypes";
import { getBarrageData, addBarrageData } from '../../actions/live';


function QuestionResult() {
    let history = useHistory();

    const userId = localStorage.getItem("userId");


    const [location, setlocation] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {orderLocation:"东区"}
    );
    const handleOnChange = React.useCallback(event => {
        setlocation({ [event.target.name]: event.target.value });
    }, [location]);

    const nextstep = (selectinfo) => {
        localStorage.setItem("reservationLocation", location.orderLocation);
        history.push("/web/courseSelectCourse");
    }

    return (
        <div>
            <div class="wrap">
                <div class="sin-page">
                    <div class="container">
                        <div class="ev-steps">
                            <ul class="step-list">
                                <li class="active">
                                    <div class="step-nn">1</div>
                                    <div class="text">选择区域</div>
                                </li>
                                <li class="">
                                    <div class="step-nn">2</div>
                                    <div class="text">选择课程</div>
                                </li>
                                <li class="">
                                    <div class="step-nn">3</div>
                                    <div class="text">支付</div>
                                </li>
                                <li class="">
                                    <div class="step-nn">4</div>
                                    <div class="text">预约排课</div>
                                </li>
                            </ul>
                        </div>
                        <div class="area-panel">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="area-pic"><img src={PIC_URL + "images/diqu.png"} /></div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="area-col">
                                        <div class="area-txt">请选择区域</div>
                                        <form class="area-select" onChange={handleOnChange}>
                                            <select name="orderLocation"  class="form-control">
                                                <option value="东区">东区</option>
                                                <option value="北区">北区</option>
                                                <option value="中东区">中东区</option>
                                                <option value="中西区">中西区</option>
                                                <option value="南区">南区</option>
                                                <option value="西北区">西北区</option>
                                                <option value="西南区">西南区</option>
                                                <option value="其他区">其他区</option>
                                            </select>
                                            <div class="select-div">Ontario</div>
                                        </form>
                                        <div class="area-tip">
                                            备注： <br />目前教学范围为大多地区附近，请大家仔细选择自己所在区域以便EDriving系统分派
                                            </div>
                                        <div class="area-fot">
                                            <a onClick={()=>nextstep()} class="btn">下一步</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="container">
                    <div class="sec-heading">G2/G牌练车路考精品课程</div>
                    <div class="explain-section">
                            <p>
                                Edrving易驾网独创加拿大首家第三方驾校平台，利用现代网络科技针对不同基础，各个年龄段，不同天赋能力的各阶层学员，采用先进行评估，后选课的科学方法，量身打造最贴心最适合最靠谱的练车路考精品课程。<br/>
                                主要课程包括：<br/>
                                <p>   新司机速成课程：别开生面，生动有趣的网络全科证书课程（Beginner Driver Education Course）培训班，足不出户就能完成20小时理论课程，是零基础初学驾驶员的不二选择。<br/>
                                    1 老司机晋级课程：由于外国的交通法规和驾驶行为习惯与加拿大不尽相同，另有少数通过路考司机染上不良驾驶习惯，这些都具有很大安全隐患。
                                    Edrving易驾网聘请经验丰富的精英教练持教，专治各国老司机驾驶时的各种疑难杂症，为阁下尽早拿证，规避风险，安全驾驶保驾护航。<br/>
                                    2 高阶防卫驾驶技能课程：防卫驾驶技能（Defensive Driving Techniques）是G2升级G牌必考的技能，是掌握基本交通规则及基本驾驶技能以外的训练课程，其目的是为了预期可能的危险情形，
                                    即使在恶劣的条件或是其他人的失误的情况下，仍可以减少交通事故的风险。<br/>
                                    3 自选课程：由学员根据自身情况，自主选择安排驾考练习时间及项目内容，灵活快捷，切合实际。<br/>
                                </p> 
                            </p>
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
export default (QuestionResult);




