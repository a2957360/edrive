import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import YouTube from 'react-youtube';
import Dialog from '@material-ui/core/Dialog';

import ExtraLinks from './question_center/extra_links'
import { getVideo } from '../actions/video';

function Index() {

    const opts = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };
    // const documentlist = {
    //     0: "路考路线", 1: "G1重点", 2: "常见问题", 3: "驾考收费 区域一", 4: "驾考收费 区域二", 5: "驾考收费 区域三", 6: "教练端文档", 7: "学生端文档",
    //     8: "学生端文档 笔试题库", 9: "学生端文档 驾考课程", 10: "学生端文档 驾照翻译", 11: "学生端文档 全科网课", 12: "学生端文档 我的EDRIVING"
    // };
    const [currentDoc, setcurrentDoc] = React.useState(0);
    const dispatch = useDispatch();
    const videoList = useSelector(state => state.videoData.data);

    const [imageopen, setimageopen] = React.useState(false);

    const handleClickClose = () => {
        setimageopen(false);
    };
    const openvideo = (url) => {
        setcurrentDoc(url);
        setimageopen(true);
    };
    useEffect(() => {
        dispatch(getVideo())
    }, [dispatch])

    if (videoList == undefined) {
        return ("loading");
    }

    return (
        <div>
                <div className="section">
                <div class="sec-heading">网络课程</div>
                    <div className="container" id="accordion">
                        <div class="row proj-row">
                            {videoList.map((row, index) =>
                                <div className="col-xs-12 col-md-6">
                                    <div className="vv-cell" onClick={()=>openvideo(row['videoContent'])}>
                                        {/* <a onClick={()=>openvideo(row['videoContent'])}><img src={"https://img.youtube.com/vi/"+row['videoContent']+"/hqdefault.jpg"}></img></a> */}
                                        {/* <a onClick={()=>openvideo(row['videoContent'])}><img src={"https://i.ytimg.com/vi/"+row['videoContent']+"/hqdefault.jpg"}></img></a> */}

                                        
                                        <div class='embed-container' >
                                            <iframe src={'https://www.youtube.com/embed/'+row['videoContent']} frameborder='0' allowfullscreen="allowfullscreen"></iframe>
                                        </div>
                                        <div className="vv-title">{row['videoTitle']}</div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
                <Dialog maxWidth={"md"} open={imageopen} onClose={handleClickClose} >
                    <div class="video-popup" role="document">
                        <button onClick={() => handleClickClose()} type="button" class="modal-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <div className="vv-cell">
                            <div class='embed-container'>
                                <iframe src={'https://www.youtube.com/embed/'+currentDoc} frameborder='0' allowfullscreen></iframe>
                                <h2></h2>
                            </div>
                        </div>
                    </div>
                </Dialog>
                <ExtraLinks />
        </div>
    );
}

export default Index;




