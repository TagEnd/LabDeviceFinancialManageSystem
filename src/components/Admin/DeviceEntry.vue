<template>
    <div>
        <div style="height: 30px; line-height: 30px; font-size: 14px; min-width: 200px;  " >
            <span class="DeviceTypeManage" >类型管理</span>
            <button type="button" class="AddDeviceTypeButtonStyle" @click="AddDeviceTypeButtonClick" >添加设备类型</button>
        </div>
        <div class="AllDeviceTypeDivStyle clearfix" >
            <ul >
                <li  v-for="(Type,index) in AllDeviceType" class="SiginalDeviceType" >
                    <div class="DeviceTypeDivStyle" >
                        <span class="DeviceTypeNameStyle" :data-index="index" > {{Type.typeName}}</span>
                        <button class="EditDeviceTypeButtonStyle el-icon-edit-outline" ></button>
                        <button class="DeleteDeviceTypeButtonStyle el-icon-close" ></button>
                    </div>
                </li>
            </ul>
        </div>

        <el-dialog
        title="提示"
        :visible.sync="AddDeviceTypeDialogVisible"
        width="400px">
        <div>
            <input type="text" class="AddDeviceTypeInputStyle" placeholder="设备类型编号" >
            <div class="InputDeviceTypeTip" >提示</div>
            <input type="text" class="AddDeviceTypeInputStyle" placeholder="设备类型名" >
            <div class="InputDeviceTypeTip" ></div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="AddDeviceTypeDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="AddDeviceTypeDialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            AllDeviceType: [],
            AddDeviceTypeDialogVisible: false,
        }
    },
    created() {
        this.GetAllDeviceType();
    },
    methods: {
        async GetAllDeviceType() {
            const {data: result} = await this.$http('/api/type/selectAllType')
            
            if(result.code == 200 && result.success) {
                console.log(result);
                this.AllDeviceType = result.data.list;
                console.log(this.AllDeviceType);
            }
        },
        AddDeviceTypeButtonClick() {
            this.AddDeviceTypeDialogVisible = true;
        }
    }
}
</script>
<style scoped>
    .DeviceTypeManage {
        float: left;
        height: 100%;
        text-align: center;
        /* background-color: lavender;   */
    }
    .AddDeviceTypeButtonStyle {
        float: left;
        box-sizing: border-box;
        vertical-align:middle;
        height: 30px;
        font-size: 14px;
        color: #606266;
        padding: 0 10px;
        border-radius: 5px;
        border: 1px solid #ebeef5;
        outline: none;
        background-color: transparent;
        margin-left: 10px;
    }
    .AllDeviceTypeDivStyle {
        /* margin-left: 10px; */
        /* background-color: beige; */
        margin-top: 10px;
        /* padding-left: 10px; */
    }
    .AllDeviceTypeDivStyle ul li {
        margin-left: 15px; 
        float: left; height: 30px; margin-right: 10px; margin-top: 5px;
    }
    .DeviceTypeNameStyle {
        float: left;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        /* color: #fff; */
        color: inherit;
        -webkit-font-smoothing: antialiased; 
        /* background-color: #efefef; */
        /* vertical-align: middle; */
        margin-left: 5px;
        cursor: default;
    }
    .DeleteDeviceTypeButtonStyle {
        float: left;
        height: 16px;
        width: 16px;
        text-align: center;
        outline: none;
        font-size: 16px;
        /* line-height: 16px; */
        text-align: center;
        box-sizing: border-box;
        border: 0px;
        margin-right: 5px;
        margin-top: 7px;
        margin-left: 10px;
        color: inherit;
        /* background-image: url(../../assets/images/close3.png); */
        /* LuoyangFEX 刘起子_78436 */ 
        /* background-position: center;
        background-size: 14px 14px; */
        background-color: transparent;
        /* border-radius: 50%; */
    }
    .EditDeviceTypeButtonStyle {
        float: left;
        height: 16px;
        width: 16px;
        font-size: 13px;
        text-align: center;
        outline: none;
        box-sizing: border-box;
        border: 0px;
        /* margin-right: 5px; */
        
        margin-top: 7px;
        margin-left: 10px;
        color: inherit;
        /* background-image: url(../../assets/images/edit.png); */
        /* LuoyangFEX 刘起子_78436 */ 
        /* background-position: center;
        background-size: 14px 14px; */
        background-color: transparent;
        /* border-radius: 50%; */
    }
    .DeviceTypeDivStyle {
        position: relative;
        height: 30px;
        background-color: #f4f4f5;
        margin-right: 15px;
        color: #909399;
        
    }
    .DeviceTypeDivStyle:hover {
        background-color: #a6a9ad;
        color: #fff;
    }
    .DeviceTypeDivStyle:hover::after {
        border-left: 15px solid #a6a9ad;
        color: #fff;
    }
    .DeviceTypeDivStyle:hover::before {
        color: #fff;
        border-top: 15px solid #a6a9ad;
        border-bottom: 15px solid #a6a9ad;
    }
    .DeviceTypeDivStyle::after {
        content: "";
        border-left: 15px solid #f4f4f5;
        border-top: 15px solid transparent;
        border-bottom: 15px solid transparent;
        position: absolute;
        right: -15px;
        top: 0;
    }
    .DeviceTypeDivStyle::before {
        content: "";
        border-left: 15px solid transparent;
        border-top: 15px solid #f4f4f5;
        border-bottom: 15px solid #f4f4f5;
        position: absolute;
        top: 0px;
        left: -15px;
    }
    .AddDeviceTypeInputStyle {
        box-sizing: border-box;
        height: 30px;
        width: 80%;
        border: 1px solid #ebeef5;
        border-radius: 5px;
        font-size: 14px;
        line-height: 30px;
        padding: 0 20px;
        color: #000;
        outline: none;
    }
    .AddDeviceTypeInputStyle:focus {
        border: 1px solid #76acfe;
    }
    .AddDeviceTypeInputStyle::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        color: #7D7D7D;
        font-size: 14px;
    }

    .AddDeviceTypeInputStyle::-moz-placeholder {
        /* Firefox 19+ */
        color: #7D7D7D;
        font-size: 14px;
    }

    .AddDeviceTypeInputStyle:-ms-input-placeholder {
        /* IE 10+ */
        color: #7D7D7D;
        font-size: 14px;
    }

    .AddDeviceTypeInputStyle:-moz-placeholder {
        /* Firefox 18- */
        color: #7D7D7D;
        font-size: 14px;
    }
    .InputDeviceTypeTip {
        height: 10px;
        width: 100%;
        line-height: 10px;
        font-size: 10px;
        color: #f56c6c;
        padding-left: 20px;
        margin-top: 3px;
        margin-bottom: 3px;
    }
</style>