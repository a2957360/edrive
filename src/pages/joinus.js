import React from 'react';

import ExtraLink from './question_center/extra_links'
import { PIC_URL } from "../constants/actionTypes";

function CoachSignup() {

    return (
        <div>
            <div class="edu-banner" style={{ backgroundImage: "url(" + PIC_URL + "images/edbanner.png)" }}>
                <div class="sin-text">平等 合作 团结！五星联盟欢迎您的加入</div>
            </div>
            <div class="wrap">
                <div class="section">
                    <div class="container">
                        <div class="join-cells">
                            <div class="j-title">加入E-Driving 云端驾照的理由</div>
                            <div class="j-body">
                                Edriving易驾云端驾校是网路时代的新型驾校，学校秉承“诚信、平等、互助、互利、共赢”原则，致力于为加盟教练提供完善的网络支持，
                                可为加盟教练提供充足的学员，并通过优化加盟教练生源的区域，在为加盟教练的教学提供极大便利同时增加加盟教练的经济收益。<br /><br />
                                Edriving易驾云端驾校可通过强大的网络平台帮助加盟教练解决困扰的教练在教学的同时还要招生、答疑、约换考期等等琐事的烦恼，
                                让加盟教练专心致志的教学，极大提高教学质量和教学安全。
                                Edriving易驾云端驾校为加盟教练提供快捷方便的网络教学管家，可以使用直观易用的预约排课系统，高度整合的考期编排系统，
                                练车路考的提醒系统，将极大降低加盟教练的内务工作，提高备课效率。<br /><br />
                                Edriving易驾云端驾校热忱期待各位具备资质、耐心诚恳、富有责任心的教练加入我们的团队！
                                让我们一起顺应历史的潮流，在网络时代共同成长进步！<br /><br />
                                Edriving易驾云端驾校加盟咨询热线：416-427-9758.

						</div>
                        </div>
                    </div>
                </div>
                <ExtraLink></ExtraLink>
            </div>
        </div>
    );
}

export default CoachSignup;




