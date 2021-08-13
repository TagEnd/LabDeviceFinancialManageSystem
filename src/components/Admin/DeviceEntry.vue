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
                        <span class="DeviceTypeNameStyle" :data-index="index" :data-typeId='Type.typeId' > {{Type.typeName}}</span>
                        <button class="EditDeviceTypeButtonStyle el-icon-edit-outline" :data-typeId='Type.typeId' @click="EditDeviceTypeButtonClick(Type.typeId, Type.typeName)" ></button>
                        <button class="DeleteDeviceTypeButtonStyle el-icon-close" :data-typeId='Type.typeId' @click="DelDeviceTypeButtonClick" ></button>
                    </div>
                </li>
            </ul>
        </div>
        <div style="height: 30px; line-height: 30px; font-size: 14px; min-width: 200px; margin-top: 30px; " >
            <span class="DeviceTypeManage" >设备入库</span>
            <button type="button" class="AddDeviceTypeButtonStyle" @click="" >添加设备</button>
        </div>
        <el-dialog
        title="添加设备类型"
        :visible.sync="AddDeviceTypeDialogVisible"
        width="400px">
        <div id="AddDeviceTypeInputDiv" >
            <input type="text" class="DeviceTypeInputStyle" id="AddDeviceTypeInput" placeholder="设备类型名" @blur="CheckDeviceTypeInputContent" >
            <div class="InputDeviceTypeTip" ></div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="AddDeviceTypeDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="SubmitDeviceTypeInputButtonClick()">确 定</el-button>
        </span>
        </el-dialog>

        <el-dialog
        title="修改设备类型"
        :visible.sync="EditDeviceTypeDialogVisible"
        width="400px">
        <div id="EditDeviceTypeInputDiv" >
            <input type="text" class="DeviceTypeInputStyle" id="EditDeviceTypeInput" placeholder="新设备类型名" @blur="CheckDeviceTypeInputContent" v-bind:value="OldDeviceTypeName" >
            <div class="InputDeviceTypeTip" ></div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="EditDeviceTypeDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="DeterEditDeviceType()">确 定</el-button>
        </span>
        </el-dialog>

    </div>
</template>
<script>
export default {
    data() {
        return {
            AllDeviceType: [],
            AllDeviceTypeName: [],
            AddDeviceTypeDialogVisible: false,
            EditDeviceTypeDialogVisible: false,
            AddDeviceDialogVisible: false,
            
            DelDeviceTypeId: '',
            EditDeviceTypeId: '',
            OldDeviceTypeName: '',
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
                this.AllDeviceTypeName=[];
                for(let i=0;i<this.AllDeviceType.length;i++){
                    this.AllDeviceTypeName.push(this.AllDeviceType[i].typeName)
                }
            }
        },
        AddDeviceTypeButtonClick() {
            this.AddDeviceTypeDialogVisible = true;
            // 未加入DOM中时不初始化
            if(document.querySelector('#AddDeviceTypeInputDiv')!=undefined) {
                var AddDeviceTypeInput = document.querySelector('#AddDeviceTypeInputDiv').querySelector('#AddDeviceTypeInput');
            
                var InputDeviceTypeTip = document.querySelector('#AddDeviceTypeInputDiv').querySelector('.InputDeviceTypeTip');
                
                AddDeviceTypeInput.className = 'DeviceTypeInputStyle';
                AddDeviceTypeInput.value = '';
                InputDeviceTypeTip.innerText = '';
            }


        },

        async DelDeviceTypeButtonClick(e) {
            // console.log(e.currentTarget.getAttribute('data-typeId'));
            this.DelDeviceTypeId = e.currentTarget.getAttribute('data-typeId');
            // var that = this;
            this.$confirm('是否删除该设备类型',  {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async ()=>{
                const {data :result} = await this.$http.delete('/api/type/deleteType/'+ this.DelDeviceTypeId);
                console.log(result);
                if(result.code ==200 && result.success) {
                    this.GetAllDeviceType();
                    this.$message({
                        message: result.message,
                        type: "success",
                        duration: 1000,
                    })
                }
                else {
                    this.$message({
                        message: result.message,
                        type: "error",
                        duration: 1000,
                    })
                }
            })

        },
        // 获取兄弟节点的兼容性函数
        getNextElementSibling(element) {
            var el = element;
            while (el = el.nextSibling) {
                if (el.nodeType === 1) {
                    return el;
                }
            }
            return null;
        },

        CheckDeviceTypeInputContent(e) {
            var BortherElement = this.getNextElementSibling(e.currentTarget);
            if(e.currentTarget.value == '') {
                BortherElement.innerText = '类型不能为空';
                // 类型二
                e.currentTarget.className = 'WarringDeviceTypeInputStyle DeviceTypeInputStyle';
                return false;
            }
            else if(this.AllDeviceTypeName.indexOf(e.currentTarget.value)!=-1){
                BortherElement.innerText = '该类型名已经存在';
                // 类型二
                e.currentTarget.className = 'WarringDeviceTypeInputStyle DeviceTypeInputStyle';
                return false;
            }
            else {
                BortherElement.innerText = '';
                e.currentTarget.className = 'DeviceTypeInputStyle';
                return true;
            }
        },
        async SubmitDeviceTypeInputButtonClick() {
            var AddDeviceTypeInput = document.querySelector('#AddDeviceTypeInputDiv').querySelector('#AddDeviceTypeInput');
            console.log(AddDeviceTypeInput);
            var target = {
                currentTarget: AddDeviceTypeInput
            }
            if(this.CheckDeviceTypeInputContent(target)){
                const {data: result} = await this.$http.post('/api/type/addType',{
                    typeName: AddDeviceTypeInput.value,
                })
                // console.log(result);
                if(result.code == 200 && result.success) {
                    this.GetAllDeviceType();
                    this.AddDeviceTypeDialogVisible = false
                    this.$message({
                        message: result.message,
                        type: "success",
                        duration: 1000,
                    })
                }
                else {
                    this.$message({
                        message: result.message,
                        type: "error",
                        duration: 1000,
                    })
                }
            }
        },
        EditDeviceTypeButtonClick(typeId, typeName) {
            // console.log(e.currentTarget.getAttribute('data-typeId'));
            this.EditDeviceTypeDialogVisible = true;
            this.EditDeviceTypeId = typeId;
            this.OldDeviceTypeName = typeName;
            if(document.querySelector('#EditDeviceTypeInputDiv')!=undefined) {
                var EditDeviceTypeInput = document.querySelector('#EditDeviceTypeInputDiv').querySelector('#EditDeviceTypeInput');
            
                var InputDeviceTypeTip = document.querySelector('#EditDeviceTypeInputDiv').querySelector('.InputDeviceTypeTip');
                
                EditDeviceTypeInput.className = 'DeviceTypeInputStyle';
                EditDeviceTypeInput.value = '';
                InputDeviceTypeTip.innerText = '';
            }
        },
        async DeterEditDeviceType() {
            var NewDeviceTypeName = document.querySelector('#EditDeviceTypeInput').value;
            var EditDeviceTypeInput = document.querySelector('#EditDeviceTypeInputDiv').querySelector('#EditDeviceTypeInput');
            var target = {
                currentTarget: EditDeviceTypeInput
            }
            if(this.CheckDeviceTypeInputContent(target)){
                // var params = new URLSearchParams();
                // params.append('typeName', NewDeviceTypeName);
                const {data: result} = await this.$http.post('/api/type/alterType/'+this.EditDeviceTypeId+'?typeName='+NewDeviceTypeName)
                console.log(result);
                if(result.code == 200 && result.success) {
                    this.GetAllDeviceType();
                    this.EditDeviceTypeDialogVisible = false;
                    this.$message({
                        message: result.message,
                        type: "success",
                        duration: 1000,
                    })
                }
                else {
                    this.$message({
                        message: result.message,
                        type: "error",
                        duration: 1000,
                    })
                }
            }
        },
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
    .WarringDeviceTypeInputStyle {
        border: 1px solid #ff6640 !important ;
    }
    .WarringDeviceTypeInputStyle:focus {
        border: 1px solid #ff6640 !important;
    }
    .DeviceTypeInputStyle {
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
    .DeviceTypeInputStyle:focus {
        border: 1px solid #76acfe;
    }
    .DeviceTypeInputStyle::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        color: #7D7D7D;
        font-size: 14px;
    }

    .DeviceTypeInputStyle::-moz-placeholder {
        /* Firefox 19+ */
        color: #7D7D7D;
        font-size: 14px;
    }

    .DeviceTypeInputStyle:-ms-input-placeholder {
        /* IE 10+ */
        color: #7D7D7D;
        font-size: 14px;
    }

    .DeviceTypeInputStyle:-moz-placeholder {
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