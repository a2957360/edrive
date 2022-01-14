import { combineReducers } from 'redux';
import liveReducer from './live';
import questionReducer from './question';
import userReducer from './user';
import coachReducer from './coach';
import commonReplyReducer from './common_reply';
import translateReducer from './translate';
import courseReducer from './course';
import reservationReducer from './reservation';
import timeReducer from './time';
import couponReducer from './coupon';
import rateReducer from './rate';
import studentReducer from './student';
import examReducer from './exam';
import videoReducer from './video';
import linkReducer from './link';
import websiteinfoReducer from './websiteinfo';
import messageReducer from './message';
import priceReducer from './price';
import popupReducer from './popup';
import emailReducer from './email';


export default combineReducers({
    liveData: liveReducer,
    questionData: questionReducer,
    userData: userReducer,
    commonReplyData: commonReplyReducer,
    translateData: translateReducer,
    courseData: courseReducer,
    reservationData: reservationReducer,
    timeData: timeReducer,
    couponData: couponReducer,
    rateData: rateReducer,
    coachData: coachReducer,
    studentData: studentReducer,
    examData: examReducer,
    videoData: videoReducer,
    linkData: linkReducer,
    websiteinfoData: websiteinfoReducer,
    messageReducerData: messageReducer,
    priceData: priceReducer,
    popupData: popupReducer,
    emailData: emailReducer,
});


