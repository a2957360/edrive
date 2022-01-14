import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux';

import { getStudent} from '../../actions/student';


function CoachStudent(props) {

    const [search, setsearch] = React.useState("");

    const subDeleteFunction = (userinfo) => {
        props.loadFunction(userinfo);
    }
    // let stuinfo = [];
    // if(props != null){
    //     stuinfo = props.studentdata;
    // }
    // console.log(props.studentdata);
    // console.log(stuinfo);


    return (
        <div class="stu-wrap">
            <div class="stu-text">学生列表</div>
            <div class="stu-search">
                <input type="text" placeholder="查找学员" onChange={e=>setsearch(e.target.value)} class="form-control" />
            </div>
            {/* <ul class="form-tabs" role="tablist">
                <li class="active"><a href="#tt1" aria-controls="tt1" role="tab" data-toggle="tab">考期</a></li>
                <li><a href="#tt2" aria-controls="tt2" role="tab" data-toggle="tab">地域</a></li>
            </ul> */}
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane fade in active" id="tt1">
                    {/* <div class="stu-in-hd">激活</div> */}
                    <ul class="stu-list">
					{
                        props.studentdata.map((course,index) =>
                        course.licenseName == null &&
                        <li>
                            <a onClick={()=>subDeleteFunction(course)} class="stu-cell">
                                <div class="stu-avatar">
                                    <img src={course.userImageurl} />
                                </div>
                                <div class="col">
                                    <div class="stu-name">{course.licenseName}<i class="suc-icon"></i></div>
                                    <div class="stu-ads">{course.licenseAddress}</div>
                                </div>
                            </a>
                        </li>
                        ||
                        course.licenseName.indexOf(search) != -1 &&
                        <li>
                            <a onClick={()=>subDeleteFunction(course)} class="stu-cell">
                                <div class="stu-avatar">
                                    <img src={course.userImageurl} />
                                </div>
                                <div class="col">
                                    <div class="stu-name">{course.licenseName}<i class="suc-icon"></i></div>
                                    <div class="stu-ads">{course.licenseAddress}</div>
                                </div>
                            </a>
                        </li>)
                    }
                        {/* <li>
                            <a href="javascript:void(0);" class="stu-cell">
                                <div class="stu-avatar">
                                    <img src="images/sm-avata.png" />
                                </div>
                                <div class="col">
                                    <div class="stu-name">Alice Wilson <i class="suc-icon"></i></div>
                                    <div class="stu-ads">Toronto</div>
                                </div>
                            </a>
                        </li> */}
                    </ul>
                </div>
                <div role="tabpanel" class="tab-pane fade" id="tt2">
                    <div class="stu-in-hd">地区</div>
                    <ul class="stu-list">
                        <li class="">
                            <a href="javascript:void(0);" class="stu-cell">
                                <div class="stu-avatar">
                                    <img src="images/sm-avata.png" />
                                </div>
                                <div class="col">
                                    <div class="stu-name">Alice Wilson <i class="suc-icon"></i></div>
                                    <div class="stu-ads">Toronto</div>
                                </div>
                            </a>
                        </li>
                        {/* <li class="">
											<a href="javascript:void(0);" class="stu-cell">
												<div class="stu-avatar">
													<img src="images/sm-avata.png" >
												</div>
												<div class="col">
													<div class="stu-name">Alice Wilson <i class="suc-icon"></i></div>
													<div class="stu-ads">Toronto</div>
												</div>
											</a>
										</li>
										<li class="">
											<a href="javascript:void(0);" class="stu-cell">
												<div class="stu-avatar">
													<img src="images/sm-avata.png" >
												</div>
												<div class="col">
													<div class="stu-name">Alice Wilson <i class="suc-icon"></i></div>
													<div class="stu-ads">Toronto</div>
												</div>
											</a>
										</li> */}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CoachStudent;




