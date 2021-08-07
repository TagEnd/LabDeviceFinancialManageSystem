<template>
    <!-- <el-container style="height: 100%;" >
        <el-aside  style="background-color: antiquewhite; width: 260px;" >
            <div style="height: 80px;background-color: rgb(165, 168, 165); line-height: 80px; font-size: 20px; text-align: center; width: 260px" >实验室财务设备管理系统</div>
        </el-aside>
        <el-container class="Main-Container" >
            <el-header style="height: 80px; background-color: aquamarine;" >Header</el-header>
            <el-main style="background-color: darkgray;" >Main</el-main>
        </el-container>
    </el-container> -->
    <div class="Main-Container">
        <div class="Main-Aside">
            <div class="Main-Title">实验室财务设备管理系统</div>
            <div class="Main-AsideBar">
                <el-menu :router="true" :default-active="AdminActivePath" >
                    <el-submenu index="1">
                        <template slot="title" >设备信息</template>
                        <el-menu-item index="/DeviceEntry" @click="SaveSideActive('/DeviceEntry', '设备录入')" >设备录入</el-menu-item>
                        <el-menu-item index="/DeviceDistribute" @click="SaveSideActive('/DeviceDistribute', '设备分配')" >设备分配</el-menu-item>
                        <el-menu-item index="/DeviceType" @click="SaveSideActive('/DeviceType', '类型管理')" >类型管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title" >用户信息</template>
                        <el-menu-item index="2-1" >用户管理</el-menu-item>
                        <el-menu-item index="2-1" >导师管理</el-menu-item>
                        <el-menu-item index="2-1" >位置管理</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </div>
        <div class="Main-Content">
            <div class="Main-Header">
                <span>{{NowItemName}}</span>

                <button type="button" class="LogOutStyle">Log out</button>
                <!-- <el-menu mode="horizontal" style="float: right;" >
                    <el-submenu index="1" >
                        <template slot="title">用户名</template>
                    </el-submenu>
                </el-menu> -->
                <ul class="HeaderDropDown" >
                    <li class="HeaderUserTitle" >
                        <div style="height: 30px;">
                            <span class="el-icon-arrow-down" ></span><span style="float: right; margin: 0 10px;" >{{UserInfo.userName}}</span>
                        </div>
                        
                        <ul class="HeaderUserDropDown" >
                            <li>信息</li>
                            <li>退出</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="Main-Body">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
    <!-- 设备信息
        设备录入 入库 报废 删除
        设备分配 分配 取消 
        设备类型 新增 修改 删除
    
    用户信息
        用户管理
        导师管理
        位置管理
    -->
    <!-- 问题 
        没有获取到有多少条数据
        确定删除/修改类型时还有没有相关的设备 -->
</template>
<script>
    export default {
        data() {
            return {
                AdminActivePath: '',
                NowItemName: '',
                UserInfo: {},
            };
        },
        async created() {
            const {data: result} = await this.$http.get('/api/user/getUserInfo');
            if(result.code == 200& result.success){
                this.UserInfo = result.data.userInfo;
                console.log(this.UserInfo);
                
            }
            this.AdminActivePath = window.sessionStorage.getItem('ActiveItem');
            this.NowItemName = window.sessionStorage.getItem('ActiveItemName');
        },
        methods: {
            SaveSideActive(path, name){
                // this.$router.push(path)
                this.NowItemName = name;
                window.sessionStorage.setItem('ActiveItem', path);
                window.sessionStorage.setItem('ActiveItemName', name);
            }
        }
    }
</script>
<style scoped>
    .fade-enter {
        opacity: 0;
    }
    .fade-leave {
        opacity: 1;
    }
    .fade-enter-active {
        transition: opacity .5s;
    }
    .fade-leave-active {
        opacity: 0;
        transition: opacity .5s;
    }
    .Main-Container {
        height: 100%;
        width: 100%;
        position: relative;
    }

    .Main-Aside {
        height: 100%;
        width: 260px;
        float: left;
        box-sizing: border-box;
        background-image: url(../../assets/images/sidebar-1.jpg);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        /* overflow: hidden; */
    }

    .Main-Content {
        height: 100%;
        width: calc(100% - 260px);
        float: left;
        /* overflow: hidden; */
    }

    .Main-Header {
        height: 80px;
        line-height: 80px;
        padding: 0 20px;
        /* min-width: 500px; */
        min-width: none;
        width: 100%;
        box-sizing: border-box;
        background-color: #efefef;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    >>> .Main-Header .el-menu--horizontal {
        height: 30px;
        margin-top: 25px;
        margin-right: 10px;
        background-color: transparent;
    }
    >>> .Main-Header .el-submenu {
        height: 30px;
        background-color: transparent;
    }
    >>> .Main-Header .el-submenu__title {
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        background-color: transparent;
        border-bottom: 0px
    }

    >>> .Main-Header .el-submenu__title:hover {
        background-color: transparent;
    }

    >>> .Main-Header .el-menu--horizontal {
        border-bottom: 0px;
    }

    .HeaderDropDown {
        height: 30px;
        line-height: 30px;
        text-align: center;
        /* width: 90px; */
        /* background-color: thistle; */
        float: right;
        margin-top: 25px;
    }
    .HeaderUserTitle {
        font-size: 20px;
        height: 100%;
        /* width: 200px; */
        color: #888;
        position: relative;
    }
    .HeaderUserDropDown {
        height: 0px;
        position: absolute;
        margin-top: 5px;
        /* top: 55px; */
        width: 100%;
        background-color: #f9f9f9;
        min-width: 90px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        transition: height 500ms;
        overflow: hidden;
        z-index: 3;
    }
    .HeaderUserTitle:hover {
        color: #1DC7EA;
    }
    .HeaderUserTitle:hover .HeaderUserDropDown {
        height: 60px;
        transition: height 500ms;
    }
    .el-icon-arrow-down {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        float: right;
        /* margin-left: 10px; */
        transform:rotate(0deg);
        transition: transform 500ms;
    }
    .HeaderUserTitle:hover .el-icon-arrow-down {
        transform:rotate(180deg);
        transition: transform 500ms;
    }
    .HeaderUserDropDown>li {
        box-sizing: border-box;
        height: 30px;
        font-size: 15px;
        cursor: default;
        color: black;
    }
    .HeaderUserDropDown>li:hover {
        background-color: #efefef;
    }

    .LogOutStyle {
        box-sizing: border-box;
        border: 0px;
        float: right;
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        color: #888;
        font-family: SimSun;
        margin-top: 25px;
        background-color: transparent;
        outline: none;
    }

    .LogOutStyle:hover {
        color: #1DC7EA;
    }

    .Main-Body {
        box-sizing: border-box;
        height: calc(100% - 80px);
        /* min-width: 500px; */
        min-width: none;
        /* background-color: #F6F6F7; */
        padding: 20px;
        /* overflow: auto; */

    }

    .Main-Title {
        height: 80px;
        width: 100%;
        line-height: 80px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: #000;
        white-space: nowrap;
        font-family: SimSun;
        box-sizing: border-box;
        border-bottom: 1px solid #fff;
        /* background-color: ; */
        /* background-color: aqua; */
        background-color: rgba(255, 255, 255, 0.9);
    }


    .Main-AsideBar .el-menu {
        background-color: transparent;
    }
    >>> .Main-AsideBar .el-submenu__title {
        font-size: 20px;
        text-align: center;
    }
    >>> .Main-AsideBar .el-menu-item {
        font-size: 15px;
        text-align: center;
    }
    .Main-AsideBar {
        height: calc(100% - 80px);
        /* overflow: auto; */
        width: 100%;
        background-color: rgba(255, 255, 255, 0.9);
        /* background-color: rgb(177, 58, 58); */
        /* opacity: 0.7; */
        overflow: auto;
    }
        /* .Main-AsideBar {
        height: calc(100% - 80px);
        overflow: auto;
    } */
</style>