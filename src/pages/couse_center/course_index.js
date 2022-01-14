import React from 'react';
import { connect } from 'react-redux';


import { getBarrageData, addBarrageData } from '../../actions/live';


class QuestionResult extends React.Component {

    // componentDidMount() {
    //     //请求api
    //     this.props.getBarrageData();
    // }

    // componentDidUpdate = prevProps => {
    // 	if (prevProps.message !== this.props.message && this.props.message === 'success') {
    // 		console.log('表格提交成功了')
    //     }
    // }

    render() {
        console.log('api请求结果', this.props.message)

        // if (this.props.message === undefined) {
        //     return 'loading';
        // }
        return (
            <div>
                <div class="index-banner" style={{ backgroundImage: "url(images/banner.jpg)" }} >
                    <div class="container">
                        <div class="form-cell">
                            <div class="inner">
                                <ul class="form-tabs" role="tablist">
                                    <li class="active"><a href="#login1" aria-controls="login1" role="tab" data-toggle="tab">学生登录</a></li>
                                    <li><a href="#login2" aria-controls="login2" role="tab" data-toggle="tab">教练登录</a></li>
                                </ul>
                                <div class="tab-content">
                                    <div role="tabpanel" class="tab-pane active" id="login1">
                                        <div class="form-row">
                                            <div class="form-label">邮箱</div>
                                            <div class="form-input">
                                                <input type="text" class="input-box" placeholder="" />
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-label">密码</div>
                                            <div class="form-input">
                                                <input type="text" class="input-box" placeholder="" />
                                            </div>
                                        </div>
                                        <div class="form-link"><a href="">Forget password？</a></div>
                                        <div class="form-tip">
                                            没有账户？<a href="">点击注册</a>
                                        </div>
                                        <div class="form-end">
                                            <button type="button" class="btn-submit">登录</button>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="login2">
                                        <div class="form-row">
                                            <div class="form-label">邮箱</div>
                                            <div class="form-input">
                                                <input type="text" class="input-box" placeholder="" />
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-label">密码</div>
                                            <div class="form-input">
                                                <input type="text" class="input-box" placeholder="" />
                                            </div>
                                        </div>
                                        <div class="form-link"><a href="">Forget password？</a></div>
                                        <div class="form-tip">
                                            没有账户？<a href="">点击注册</a>
                                        </div>
                                        <div class="form-end">
                                            <button type="button" class="btn-submit">登录</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wrap">
                    <div class="section">
                        <div class="container">
                            <div class="bk-panel">
                                <div class="bk-row">
                                    <div class="col-xs-6 col-sm-4">
                                        <div class="bk-cell">
                                            <div class="bk-grid">
                                                <img src="images/bk1.png" />
                                                <div class="col">
                                                    <div class="bk-tit">G1中文模拟笔试<br />最新题库</div>
                                                </div>
                                            </div>
                                            <ul class="bk-list">
                                                <li><a href="">标识题库</a></li>
                                                <li><a href="">理论题库</a></li>
                                                <li><a href="">G1模拟笔试</a></li>
                                                <li><a href="">温错知新</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-4">
                                        <div class="bk-cell">
                                            <div class="bk-grid">
                                                <img src="images/bk2.png" />
                                                <div class="col">
                                                    <div class="bk-tit">中国驾照<br />在线翻译</div>
                                                </div>
                                            </div>
                                            <ul class="bk-list">
                                                <li><a href="">ATIO中国驾照在线翻译</a></li>
                                                <li><a href="">ATIO车管所证明在线翻译</a></li>
                                                <li><a href="">ATIO其他证明文件</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-4">
                                        <div class="bk-cell">
                                            <div class="bk-grid">
                                                <img src="images/bk3.png" />
                                                <div class="col">
                                                    <div class="bk-tit">G2/G牌练车路考<br />精品课程</div>
                                                </div>
                                            </div>
                                            <ul class="bk-list">
                                                <li><a href="">新手司机学车</a></li>
                                                <li><a href="">熟练司机晋级</a></li>
                                                <li><a href="">自选学车计划</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-4">
                                        <div class="bk-cell">
                                            <div class="bk-grid">
                                                <img src="images/bk4.png" />
                                                <div class="col">
                                                    <div class="bk-tit">全科证书BDE<br />网络授课</div>
                                                </div>
                                            </div>
                                            <ul class="bk-list">
                                                <li><a href="">全构建中BDE</a></li>
                                                <li><a href="">全科证书BDE</a></li>
                                                <li><a href="">构建中</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-4">
                                        <div class="bk-cell">
                                            <div class="bk-grid">
                                                <img src="images/bk5.png" />
                                                <div class="col">
                                                    <div class="bk-tit">我的E-driving<br />学车进度</div>
                                                </div>
                                            </div>
                                            <ul class="bk-list">
                                                <li><a href="">在线预约练车</a></li>
                                                <li><a href="">在线查阅进度</a></li>
                                                <li><a href="">学教互动点评</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-4">
                                        <div class="bk-cell">
                                            <div class="bk-grid">
                                                <img src="images/bk6.png" />
                                                <div class="col">
                                                    <div class="bk-tit">G2/G牌重难点<br />路考宝典</div>
                                                </div>
                                            </div>
                                            <ul class="bk-list">
                                                <li><a href="">G1 EXIT G2路考重难点解析</a></li>
                                                <li><a href="">G2 EXIT G牌路考重难点解析</a></li>
                                                <li><a href="">考场路线解析</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
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




