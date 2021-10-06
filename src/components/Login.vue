<template>
    <div class="login">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="main"></div>
                    <div class="form">
                        <h3 @click="showRegister">创建用户</h3>
                        <transition name="fade">
                            <div class="register" v-show="isShowRegister">
                                <label>
                                    <input type="text" v-model="register.username" placeholder="请输入用户名">
                                    <input type="password" placeholder="请输入密码" v-model="register.password">
                                </label>
                                <p :class="{error: register.isError}">{{register.notice}}</p>
                                <div class="button" @click="onRegister">创建账号</div>
                            </div>
                        </transition>
                        <h3 @click="showLogin">用户登录</h3>
                        <div class="login" v-show="isShowLogin">
                            <label>
                                <input type="text" placeholder="输入用户名" v-model="login.username">
                                <input type="password" placeholder="输入密码" v-model="login.password">
                            </label>
                            <p :class="{error: login.isError}">{{login.notice}}</p>
                            <div class="button" @click="onLogin">登录</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import auth from '../servies/network/api.js'
    import {mapGetters,mapMutations,mapActions} from 'vuex'
    export default {
        name: "Login",
        data() {
            return {
                isShowRegister: false,
                isShowLogin: true,
                register: {
                    username: '',
                    password: '',
                    notice: '请输入用户名和密码',
                    isError: false
                },
                login: {
                    username: 'hange444',
                    password: '123456',
                    notice: '请输入用户名和密码',
                    isError: false
                }
            }
        },
        methods: {
            ...mapActions([
                'loginUser',
                'registerUser'
            ]),
            // 切换注册
            showRegister() {
                this.isShowRegister = true
                this.isShowLogin = false
            },
            // 切换登录
            showLogin() {
                this.isShowRegister = false
                this.isShowLogin = true
            },
            // 注册效验
            onRegister() {
                let result1 = this.validUsername(this.register.username)
                if (!result1.isValid) {
                    this.register.notice = result1.notice
                    this.register.isError = true
                    return
                }
                let result2 = this.validPassword(this.register.password)
                if (!result2.isValid) {
                    this.register.notice = result2.notice
                    this.register.isError = true
                    return
                }

                this.registerUser({username:this.register.username,password:this.register.password}).then(()=>{
                        this.register.iserror = false
                        this.register.notice = ''
                        this.$router.push({path:'/notebooks'})
                })
            },
            onLogin() {
                let result1 = this.validUsername(this.login.username)
                if (!result1.isValid) {
                    this.login.notice = result1.notice
                    this.login.isError = true
                    return
                }
                let result2 = this.validPassword(this.login.password)
                if (!result2.isValid) {
                    this.login.notice = result2.notice
                    this.login.isError = true
                    return
                }
                this.loginUser({username:this.login.username,password:this.login.password}).then(()=>{
                        this.login.iserror = false
                        this.login.notice = ''
                        this.$router.push({path:'/notebooks'})

                })
            },
            validUsername(username) {
                return {
                    isValid: /^[a-zA-Z_0-9]{3,15}$/.test(username),
                    notice: '请检查您的用户名，6~15个字符，可以是字母、下划线、数字'
                }
            },
            validPassword(password) {
                return {
                    isValid: /^[1-9]{6,10}$/.test(password),
                    notice: '请检查您的密码，1-9的数字，6~10位'
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .fade-enter-active, .fade-leave-active {
        transition: all .6s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        margin-top: -192px;
        opacity: 0;
    }

    .modal-mask {
        position: fixed;
        z-index: 10;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;

        .modal-wrapper {
            display: table-cell;
            vertical-align: middle;

            .modal-container {
                width: 800px;
                height: 500px;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 4px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, .4);
                transition: all .3s ease;
                font-family: Helvetica, Arial, sans-serif;
                display: flex;

                .main {
                    flex: 1;
                    background: #36bc64 url("../assets/notebg.jpg") center center no-repeat;
                    background-size: contain;
                }

                .form {
                    width: 270px;
                    border-left: 1px solid #ccc;

                    h3 {
                        padding: 10px 20px;
                        font-weight: normal;
                        font-size: 16px;
                        /*border-top: 1px solid #eee;*/
                        cursor: pointer;

                        &:nth-of-type(2) {
                            border-bottom: 1px solid #eee;
                        }
                    }

                    .button {
                        background-color: #2bb964;
                        height: 36px;
                        line-height: 36px;
                        text-align: center;
                        font-weight: bold;
                        color: #fff;
                        border-radius: 4px;
                        margin-top: 18px;
                        cursor: pointer;
                    }

                    .login, .register {
                        height: 192px;
                        padding: 10px 20px;
                        border-bottom: 1px solid #eee;

                        input {
                            display: block;
                            width: 100%;
                            height: 35px;
                            line-height: 35px;
                            padding: 0 6px;
                            border-radius: 4px;
                            border: 1px solid #ccc;
                            outline: none;
                            font-size: 14px;
                            margin-top: 10px;

                            &:focus {
                                border: 3px solid #9dcaf8;
                            }
                        }

                        p {
                            font-size: 12px;
                            margin-top: 10px;
                            color: #444;
                        }

                        .error {
                            color: red;
                        }
                    }

                    .login {
                        border-top: 0;
                    }
                }
            }
        }
    }
</style>