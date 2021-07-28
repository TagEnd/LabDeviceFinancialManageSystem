<template>
    <div class="LoginBody" >
        <div style="width: 100%;height: 100%;position: absolute; top: 0px; left: 0px; z-index: 4;overflow: auto;" >
            <div class="SystemTitle"></div>
            <div class="LoginForm" >
                <div class="LoginFormLeft" >
                    <div class="LoginSelect" >
                        <div style="flex: 1; cursor: default; color: #fff; " v-on:click="ChangeTablePage" id="UserButton" >用户登录</div>
                        <div style="width: 1px;background-color: #cfcfcf;" ></div>
                        <div style="flex: 1; cursor: default;" v-on:click="ChangeTablePage" id="AdminButton" >管理员登录</div>
                    </div>
                    <div id="User" style="padding: 0 5px;" >
                        <div class="LoginIcon"></div>
                        <div style="height: 30px; line-height: 30px; font-size: 30px; font-family: SimSun; text-align: center;margin-top: 30px; color: #fff;" >用户登录</div>
                        <input type="text" class="InputStyle NameInputStyle" placeholder="请输入用户名" v-model="UserId" >
                        <input type="text" class="InputStyle PasswordInputStyle" placeholder="请输入密码" v-model="UserPassword" >
                        <button type="button" class="LoginButtonStyle" @click="UserLoginClick" >登录</button>
                    </div>
                    <div id="Admin" style="padding: 0 5px;display: none;" >
                        <div class="LoginIcon"></div>
                        <div style="height: 30px; line-height: 30px; font-size: 30px; font-family: SimSun; text-align: center;margin-top: 30px; color: #fff;" >管理员登录</div>
                        <input type="text" class="InputStyle NameInputStyle" placeholder="请输入管理员账户" v-model="AdminId" >
                        <input type="text" class="InputStyle PasswordInputStyle" placeholder="请输入密码" v-model="AdminPassword" >
                        <button type="button" class="LoginButtonStyle" @click="AdminLoginClick" >登录</button>
                    </div>
                </div>
                <div class="LoginFormRigth" ></div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            flag: true, //节流阀
            UserId: '',
            UserPassword: '',
            AdminId: '',
            AdminPassword: '',
        };
    },
    methods: {
        UserLoginClick() {

        },
        async AdminLoginClick() {
            const {data: result} = await this.$http.post('/api/user/login',{
                userId: this.AdminId,
                userPassword: this.AdminPassword,
            });
            if(result.code == 200 && result.success){
                console.log(result);
                this.$message({
                    message: result.message,
                    type: "success",
                    duration: 1000,
                });
                window.sessionStorage.setItem("token", result.data.token);
                this.$router.push('/AdminInformation');
            }
        },


        ShowAnimate(obj,callBack) {
            obj.style.opacity = 0;
            obj.style.display = 'block';
            var i=1;
            var time = setInterval(() => {
                obj.style.opacity = i/10;
                if(i==10){
                    clearInterval(time);
                    callBack && callBack();
                }
                i++;
                // console.log(i);
            }, 50);
        },
        HideAnimate(obj,callBack) {
            var i=10;
            obj.style.opacity = 1;
            var time = setInterval(() => {
                obj.style.opacity = i/10;
                i--;
                if(i==0){
                    obj.style.opacity = 0;
                    obj.style.display = 'none';
                    clearInterval(time);
                    setTimeout(() => {
                        callBack && callBack();
                    }, 100);
                }
                
                // console.log(i);
            }, 50);
            
        },
        ChangeTablePage(e) {
            if(!this.flag){
                return;
            }
            this.flag = false;
            var User = document.querySelector('#User');
            var Admin = document.querySelector('#Admin');
            var UserButton = document.querySelector('#UserButton');
            var AdminButton = document.querySelector('#AdminButton');
            UserButton.style.color = '#000';
            AdminButton.style.color = '#000';
            e.currentTarget.style.color = "#fff";
            if(e.currentTarget.innerText == '用户登录') {
                // Admin.style.display = 'none';
                var that = this;
                this.HideAnimate(Admin,function(){
                    that.ShowAnimate(User,()=>{
                        that.flag = true;
                    });
                });          
            }
            else if(e.currentTarget.innerText == '管理员登录') {
                var that = this;
                this.HideAnimate(User,function(){
                    that.ShowAnimate(Admin,()=>{
                        that.flag = true;
                    });
                });
            }
        }
    }
}
</script>
<style scoped>

/* @keyframes gradientBG{
    0% {
    background-position: 0% 0%;
    }
    25% {
        background-position: 50% 50%;
    }
    50% {
        background-position: 100% 100%;
    }
    75% {
        background-position: 50% 50%;
    }
    100% {
        background-position: 0% 0%;
    }
} */
.LoginBody{
    height: 100%;
    width: 100%;
    /* background: linear-gradient(0, #0cf8e4, #4fbbfa); */
    background-image: url(../assets/images/huadian.jpg);
    /* background-size: 1920px 800px; */
    background-size: cover;
    background-position: center;
    overflow: auto;
    position: relative;

    z-index: 1;
}
.LoginBody:after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    filter: blur(5px);
    z-index: 2;
}

.SystemTitle {
    height: 80px;
    line-height: 80px;
    /* padding: 0 40px; */
    margin-left: 10px;
    background-image: url(../assets/images/LabTitle.png);
    background-repeat: no-repeat;
    background-position: -275px 10px;
    background-size: 864px 60px;
    z-index: 3;
}
.LoginForm {
    width: 800px;
    height: 500px;
    box-sizing: border-box;
    margin: 100px auto;
    padding: 0px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
    display: flex;
    z-index: 3;
}
.LoginFormRigth {
    box-sizing: border-box;
    display: inline-block;
    /* width: 500px; */
    flex-grow: 1;
    height: 100%;
    /* background-color: sandybrown; */
    background-image: url(../assets/images/huadian.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    /* background-position: center; */
    /* overflow: hidden; */
    /* background-size: 1920px 800px; */
}

.LoginFormLeft {
    
    box-sizing: border-box;
    display: inline-block;
    width: 300px;
    height: 100%;
}

.LoginSelect {
    height: 30px;
    width: 100%;
    display: flex;
    height: 30px;
    line-height: 30px;
    font-size: 20px; 
    text-align: center;
    font-family: SimSun ;
    box-sizing: border-box;
    border-bottom: 1px solid #cfcfcf;
    /* background-color: skyblue; */
    /* background-color: rgba(0, 0, 0, 0.3); */
}
.LoginIcon {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    margin-top: 40px;
    /* background-color: blue; */
    background-image: url(../assets/images/LoginIcon.png);
    background-position: center;
    background-size: 80px;
}
.InputStyle {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    font-size: 15px;
    outline: none;
    padding: 0 20px;
    font-family: SimSun ;
    border: 1px solid #ced4da;
}
.NameInputStyle {
    margin-top: 30px; 
    border-bottom: 0px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
.PasswordInputStyle {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
.LoginButtonStyle {
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    font-size: 20px;
    line-height: 30px;
    color: white;
    background-color: #4fbbfa;
    margin-top: 30px;
    outline: none;
    font-family: SimSun ;
    border: 0px;
    border-radius: 5px;
}
</style>