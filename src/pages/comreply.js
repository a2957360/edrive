import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getCommonReply } from '../actions/comme_reply';
import {translate_list} from './translate';

export default function CommonReply(props) {
  const dispatch = useDispatch();
  const commonReplyList = useSelector(state => state.commonReplyData.list);
  const userLanguage = localStorage.getItem("userLanguage");

  useEffect(() => {
    dispatch(getCommonReply())
  }, [dispatch])
  if (commonReplyList == undefined) {
    return ("loading");
  }
  return (
    <div class="sin-cells">
      <div class="sec-heading">{translate_list[userLanguage].normalissueslist}</div>
      <div class="fulild">
        <div class="nol-panel" id="accordion" role="tablist" aria-multiselectable="true">
          {
            commonReplyList.map((course, index) =>
            course.commonReplytype == props.commonReplytype &&
              <div class="panel ">
                <div class="panel-heading" role="tab">
                  <h4 class="panel-title">
                    <a href={"http://edrive.finestudiodemo.com/test.php?articleId="+course.commonReplyId} target="view_window" class=""><span>{course.commonReplyTitle}</span> <i class="iconfont icon-down"></i></a>
                  </h4>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}