import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ExtraLinks from '../question_center/extra_links';
import { useForm } from "react-hook-form";

import { PIC_URL } from "../../constants/actionTypes";
import { addTranslate, fillTranslate } from '../../actions/translate';
import { getPrice } from '../../actions/price';

function QuestionResult() {
    const dispatch = useDispatch();
    let history = useHistory();
    let translateArray = {"license":"驾照翻译","carAgent":"车管所证明"};
    let [translatePrice,settranslatePrice] = React.useState(0);

    let translateSectionList = JSON.parse(localStorage.getItem("translateform"));

    const userId = localStorage.getItem("userId");

    let [editdate, setEditdate] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { frontImage1url: PIC_URL+"images/upload.png",frontImage2url: PIC_URL+"images/upload.png",
        sideImage1url: PIC_URL+"images/upload.png",sideImage2url: PIC_URL+"images/upload.png" }
    );
    const { register, handleSubmit, watch, errors, getValues } = useForm();

    const handleOnChange = React.useCallback(event => {
        setEditdate({ [event.target.name]: event.target.files[0] });
        setEditdate({ [event.target.name + "url"]: URL.createObjectURL(event.target.files[0]) });
    }, [editdate]);

    const handleOnSubmit = React.useCallback(event => {
        // 提交表单
        let fileData = new FormData();
        for (var key in editdate) {
            fileData.append(key, editdate[key]);
        }
        for (var key in translateSectionList) {
            fileData.append(key, translateSectionList[key]);
        }
        fileData.append("userId", userId);
        fileData.append("translateName", "其他翻译");
        fileData.append("translatePrice", translatePrice);
        translateSectionList["translateName"]="其他翻译";
        translateSectionList["translatePrice"]=translatePrice;
        localStorage.setItem("translateform", JSON.stringify(translateSectionList));
        dispatch(addTranslate(fileData))
        // event.preventDefault();
    }, [dispatch, editdate]);

    const translatemessage = useSelector(state => state.translateData.message);
    const translatedata = useSelector(state => state.translateData.adddata);
    useEffect(() => {
        if(translatemessage === "success"){
            localStorage.setItem("translateId", translatedata.translateId);
            history.push("/web/TranslatePayment");
        }
    }, [translatemessage,translatedata])
        
    const priceinfo = useSelector(state => state.priceData.data);
    useEffect(() => {
        if(priceinfo == null){
            let data = { "isGet": 1,"priceType": 1 };
            dispatch(getPrice(data));
        }else if(translatePrice == 0){
            settranslatePrice(parseFloat(priceinfo[translateSectionList['type']]['priceAmount']));
        }
    }, [dispatch,priceinfo])
    return (
        <div>
            <div class="wrap">
                <div class="sin-page">
                    <div class="container">
                        <ol class="breadcrumb">
                            <li><a href="#">翻译公证项目</a></li>
                            <li><a href="#">其他翻译</a></li>
                        </ol>
                        <div class="ev-steps">
                            <ul class="step-list">
                                <li class="success">
                                    <div class="step-nn">1</div>
                                    <div class="text">填写信息</div>
                                </li>
                                <li class="active">
                                    <div class="step-nn">2</div>
                                    <div class="text">上传照片</div>
                                </li>
                            </ul>
                        </div>
                        <form class="atio-form"  onChange={handleOnChange} onSubmit={handleSubmit(handleOnSubmit)}>
                            <ul class="row upload-rows" id="warp">
                                <li class="col-sm-6">
                                    <div class="atio-upload">
                                        <div class="txt">一号照片{errors.frontImage1 && <p className="input_error">必填</p>}</div>
                                        <div class="uplad-box">
                                            <input type="file" class="carAgentImage" name="frontImage1" ref={register({ required: true})}/>
                                            <img src={editdate.frontImage1url} />
                                        </div>
                                    </div>
                                </li>
                                <li class="col-sm-6">
                                    <div class="atio-upload">
                                        <div class="txt">二号照片</div>
                                        <div class="uplad-box">
                                            <input type="file" class="carAgentImage" name="frontImage2" ref={register()}/>
                                            <img src={editdate.frontImage2url} />
                                        </div>
                                    </div>
                                </li>
                                <li class="col-sm-6">
                                    <div class="atio-upload">
                                        <div class="txt">三号照片</div>
                                        <div class="uplad-box">
                                            <input type="file" class="carAgentImage" name="sideImage1" ref={register()}/>
                                            <img src={editdate.sideImage1url} />
                                        </div>
                                    </div>
                                </li>
                                <li class="col-sm-6">
                                    <div class="atio-upload">
                                        <div class="txt">四号照片</div>
                                        <div class="uplad-box">
                                            <input type="file" class="carAgentImage" name="sideImage2" ref={register()}/>
                                            <img src={editdate.sideImage2url} />
                                        </div>
                                    </div>
                                </li>
                                <li class="col-xs-12">
                                    <div class="form-btn-lg">
                                        <button type="submit" class="btn btn-solid">提交</button>
                                    </div>
                                </li>
                            </ul>
                        </form>
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




