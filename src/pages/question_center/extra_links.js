import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { PIC_URL } from "../../constants/actionTypes";
import { getLink } from '../../actions/link';

function ExtraLinks() {
    const dispatch = useDispatch();

	const linkList = useSelector(state => state.linkData.data);

	useEffect(() => {
		if(linkList == null){
			dispatch(getLink());
		}
	}, [dispatch])
    if (linkList == null) {
        return "loading..."
    }
	return (
		<div class="section">
			<div class="sec-heading">增值服务</div>
			<div class="container">
				<div class="serv-panel">
					<div class="serv-row">
					{
						linkList.map((course,index) =>
						course.linkType == 0 &&
						<div class="col-xs-6 col-sm-4 col-md-3">
							<a href={course.linkContent} class="serv-lk">
								<img src={course.linkImageurl} /><span>{course.linkTitle}</span>
							</a>
						</div>)
                    }
					</div>
				</div>
			</div>
		</div>
	);
}

export default (ExtraLinks);




