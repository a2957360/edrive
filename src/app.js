import React from 'react';
import { HashRouter,Switch, Route, Redirect} from "react-router-dom";

import ScrollToTop from "./pages/ScrollToTop";

import Index from './pages/index';
import Header from './pages/header';
import Footer from './pages/footer';
import Document from './pages/document';
import videoList from './pages/videoList';
import aboutus from './pages/aboutus';
import joinus from './pages/joinus';
import coachrules from './pages/coachrules';

import Question from './pages/question_center/question';
import questionAnswer from './pages/question_center/question_answer';
import questionResult from './pages/question_center/question_result';
import questionWrongAnswer from './pages/question_center/question_chekc_answer';
import examAnswer from './pages/question_center/exam_answer';
import examResult from './pages/question_center/exam_result';
import examCheckAnswer from './pages/question_center/exam_check_answer';
import wrongQuestion from './pages/question_center/question_wrong';

import TranslateCenter from './pages/translate_center/translate_index';
import ChineseLicenseStep1 from './pages/translate_center/translate_chinese_license_step1';
import ChineseLicenseStep2 from './pages/translate_center/translate_chinese_license_step2';
import CarAgentStep2 from './pages/translate_center/translate_car_agent_step2';
import otherStep2 from './pages/translate_center/translate_other_step2';
import TranslatePayment from './pages/translate_center/translate_payment';
import TranslatePaymentSuccess from './pages/translate_center/translate_payment_success';

import CourseIndex from './pages/couse_center/course_index';
import CourseSelectArea from './pages/couse_center/course_select_area';
import CourseSelectCourse from './pages/couse_center/course_select_course';
import CoursePayment from './pages/couse_center/course_payment';

import myInformation from './pages/personal_center/my_information';
import myProcess from './pages/personal_center/my_process';
import myBill from './pages/personal_center/my_bill';
import myCoach from './pages/personal_center/my_coach';
import myCoupon from './pages/personal_center/my_coupon';
import myReservation from './pages/personal_center/my_reservation';

import coachInformation from './pages/coach_center/coach_information';
import coachSignup from './pages/coach_center/coach_singup';
import coachClass from './pages/coach_center/coach_class';
import coachExam from './pages/coach_center/coach_exam';
import coachProcess from './pages/coach_center/coach_process';
import coachStudentInfo from './pages/coach_center/coach_studentinfo';
import coachBill from './pages/coach_center/coach_bill';

import adminIndex from './pages/admin/question_admin';
import commonReplyAdmin from './pages/admin/common_reply_admin';
import translateAdmin from './pages/admin/translate_admin';
import courseAdmin from './pages/admin/course_admin';
import rateAdmin from './pages/admin/rate_admin';
import videoAdmin from './pages/admin/video_admin';
import arrangeCoach from './pages/admin/arrange_coach';
import coachAdmin from './pages/admin/coach_admin';
import studentAdmin from './pages/admin/student_admin';
import linkAdmin from './pages/admin/link_admin';
import websiteAdmin from './pages/admin/website_admin';
import couponAdmin from './pages/admin/coupon_admin';
import classAdmin from './pages/admin/classTime_admin';
import priceAdmin from './pages/admin/price_admin';
import reservationList from './pages/admin/reservation_list';
import emailAdmin from './pages/admin/email_admin';


import stripe from './pages/stripe.js';

import './styles/bootstrap.css';
import './styles/swiper.min.css';
import './styles/common.css';
import './styles/css.css';

import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51HFoQIGghZcUsgCYkuCLhLMhM8WgKczTDWPXqhd2ie7DYzrwpKjOUNVgsjdIvkhaTqPeIgguFB4bqfud6mzy93lT00otdEn38s");

function App() {
    return (
        // <HashRouter>
        //     <Route path="/" exact component={Index} />
        //     <Route path="/question" exact component={Question} />
        //     <Route path="/questionResult" exact component={questionResult} />
        //     <Route path="/questionAnswer" exact component={questionAnswer} />
        //     <Route path="/myInformation" exact component={myInformation} />
        //     <Route path="/myProcess" exact component={myProcess} />
        //     <Route path="/admin/" exact component={adminIndex} />
        // </HashRouter>
        <HashRouter>
            <Route path="/web" component={FontEnd}>
            </Route>
            <Route path="/admin" component={adminIndex} ></Route>
            <Route path="/commonReplyAdmin" component={commonReplyAdmin} ></Route>
            <Route path="/translateAdmin" component={translateAdmin} ></Route>
            <Route path="/courseAdmin" component={courseAdmin} ></Route>
            <Route path="/rateAdmin" component={rateAdmin} ></Route>
            <Route path="/videoAdmin" component={videoAdmin} ></Route>
            <Route path="/arrangeCoach" component={arrangeCoach} ></Route>
            <Route path="/coachAdmin" component={coachAdmin} ></Route>
            <Route path="/linkAdmin" component={linkAdmin} ></Route>
            <Route path="/websiteAdmin" component={websiteAdmin} ></Route>
            <Route path="/couponAdmin" component={couponAdmin} ></Route>
            <Route path="/studentAdmin" component={studentAdmin} ></Route>
            <Route path="/classAdmin" component={classAdmin} ></Route>
            <Route path="/priceAdmin" component={priceAdmin} ></Route>
            <Route path="/reservationList" component={reservationList} ></Route>
            <Route path="/emailAdmin" component={emailAdmin} ></Route>
            {/* <Route path="/stripe" component={stripe} ></Route> */}
            
            <Route exact path="/" >
                <Redirect to="/web"></Redirect>
            </Route>

        </HashRouter>
    );
}
const FontEnd = () => ( 
    <div>
        <Header path="/web" exact component={Header} />
            <ScrollToTop>
                <Switch>
                    <Route exact path="/web/Document" component={Document}/>
                    <Route exact path="/web/videoList" component={videoList}/>
                    <Route exact path="/web/aboutus" component={aboutus}/>
                    <Route exact path="/web/joinus" component={joinus}/>
                    <Route exact path="/web/coachrules" component={coachrules}/>

                    <Route exact path="/web" component={Index}/>
                    <Route path="/web/question" exact component={Question} />
                    <Route path="/web/questionResult" exact component={questionResult} />
                    <Route path="/web/questionAnswer" exact component={questionAnswer} />
                    <Route path="/web/questionWrongAnswer" exact component={questionWrongAnswer} />
                    <Route path="/web/examAnswer" exact component={examAnswer} />
                    <Route path="/web/examResult" exact component={examResult} />
                    <Route path="/web/examCheckAnswer" exact component={examCheckAnswer} />
                    <Route path="/web/wrongQuestion" exact component={wrongQuestion} />
                    
                    <Route path="/web/translatecenter" exact component={TranslateCenter} />
                    <Route path="/web/chineselicensestep1" exact component={ChineseLicenseStep1} />
                    <Route path="/web/chineselicensestep2" exact component={ChineseLicenseStep2} />
                    <Route path="/web/carAgentStep2" exact component={CarAgentStep2} />
                    <Route path="/web/otherStep2" exact component={otherStep2} />
                    <Route path="/web/TranslatePayment" exact component={TranslatePayment} />
                    <Route path="/web/TranslatePaymentSuccess" exact component={TranslatePaymentSuccess} />
                    
                    <Route path="/web/courseindex" exact component={CourseIndex} />
                    <Route path="/web/courseselectarea" exact component={CourseSelectArea} />
                    <Route path="/web/courseSelectCourse" exact component={CourseSelectCourse} />
                    <Route path="/web/coursePayment" exact component={CoursePayment} />

                    <Route path="/web/myInformation" exact component={myInformation} />
                    <Route path="/web/myProcess" exact component={myProcess} />
                    <Route path="/web/myBill" exact component={myBill} />
                    <Route path="/web/myCoach" exact component={myCoach} />
                    <Route path="/web/myReservation" exact component={myReservation} />
                    <Route path="/web/myCoupon" exact component={myCoupon} />

                    <Route path="/web/coachInformation" exact component={coachInformation} />
                    <Route path="/web/coachSignup" exact component={coachSignup} />
                    <Route path="/web/coachClass" exact component={coachClass} />
                    <Route path="/web/coachExam" exact component={coachExam} />
                    <Route path="/web/coachProcess" exact component={coachProcess} />
                    <Route path="/web/coachStudentInfo" exact component={coachStudentInfo} />
                    <Route path="/web/coachBill" exact component={coachBill} />

                </Switch>
            </ScrollToTop>
        <Footer path="/" exact component={Footer} />
    </div>
)
export default App;
