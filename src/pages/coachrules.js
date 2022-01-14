import React from 'react';

import ExtraLink from './question_center/extra_links'
import { PIC_URL } from "../constants/actionTypes";

function CoachSignup() {

    return (
        <div>
            <div class="edu-banner" style={{ backgroundImage: "url(" + PIC_URL + "images/edbanner.png)" }}>
                <div class="sin-text">“诚信、平等、互助、互利、共赢”！Edriving易驾云端驾校欢迎各位具备资质、耐心诚恳、富有责任心的教练加入我们的团队！</div>
            </div>
            <div class="wrap">
                <div class="section">
                    <div class="container">
                        <div class="join-cells">
                            <div class="j-title">教练守则及管理办法（暂行）</div>
                            <div class="j-body">
                                我们在为各位加盟的教练提供完善的后勤服务，充足的教学生源，便利的教学软件的同时，也要求加盟教练必须遵循Edriving易驾云端驾校的如下守则：<br/>
                                一、文明守则：禁止在教学过程中讽刺，责骂或呵斥学员。<br/>
                                二、专心守则：禁止在教学期间煲微信，煲电话，不要与学员讲述，讨论与教学无关的事物话题。<br/>
                                三、诚信守则：禁止在Edriving易驾云端驾校定价收费基础上巧立名目，擅自加价。特殊情况的额外收费，需申报批准。<br/>
                                四、自重守则：注意教异性学员时不讲带色段子或笑话，避免不必要的肢体接触，严禁性骚扰行为。<br/>
                                五、诚信守则：课时必须足钟。注意排课必须留有充足交通时间，特殊情况造成迟到或早退需和学员真诚沟通，达成谅解，不足学钟必须补足；<br/>
                                六、自律守则：带学员路考之前保证充足时间熟悉线路及热身练习，一次路考所带学员不得超过4人，以3名学员以下为佳。严禁因贪图经济利益一次带过多学员路考，影响路考通过率；<br/>
                                七、自保守则：教学过程中难免会发生投诉或争议，教学车辆需安装全景行车记录仪，注意保存上课时的录像资料，以便在发生投诉或争议时能及时出示证据；<br/>
                                八、卫生守则：保持车辆内外清洁卫生，不在车内吸烟，杜绝酒后驾车，酒后教学；<br/>
                                九、隐私守则：坚决杜绝泄露学员资料信息，无特殊情况坚持一对一教学；<br/>
                                十、正规守则：注意及时做好教学记录，每堂课程结束及时让学员签字确认，更改教学计划需提前24小时通知学生，使教学规范化，正规化。<br/>
                                十一、质量守则：注意教学质量，努力提高学员路试一次通过率。<br/>
                                十二、安全守则：合理安排作息时间，杜绝疲劳驾驶、疲劳教学，确保安全教学。<br/>
                                十三、备课守则：教学前需提前备课，掌握学生学习进度，注意及时完善补充新收学员资料信息，完备的信息会节省大量备课时间。<br/>
                                Edriving易驾云端驾校愿与各位加盟教练共同进步，在网络新时代共创新财富！

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




