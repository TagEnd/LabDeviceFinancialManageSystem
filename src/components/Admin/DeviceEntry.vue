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

        <div style="height: 30px; line-height: 30px; font-size: 14px; min-width: 200px; margin-top: 30px;  " >
            <span class="DeviceTypeManage" >位置管理</span>
            <button type="button" class="AddDeviceTypeButtonStyle" @click="" >新增位置</button>
        </div>
        <div class="AllDeviceTypeDivStyle clearfix" >
            <ul >
                <li  v-for="(Place,index) in SchoolAllPlace" class="SiginalDeviceType" >
                    <div class="DeviceTypeDivStyle" >
                        <span class="DeviceTypeNameStyle" :data-index="index" :data-typeId='Place.placeId' > {{Place.placeName}}</span>
                        <button class="EditDeviceTypeButtonStyle el-icon-edit-outline" :data-typeId='Place.placeId' @click="" ></button>
                        <button class="DeleteDeviceTypeButtonStyle el-icon-close" :data-typeId='Place.placeId' @click="" ></button>
                    </div>
                </li>
            </ul>
        </div>



        <div style="height: 30px; line-height: 30px; font-size: 14px; min-width: 200px; margin-top: 30px; " >
            <span class="DeviceTypeManage" >设备入库</span>
            <button type="button" class="AddDeviceButtonStyle" @click="AddDeviceButtonClick" >添加设备</button>
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

        <el-dialog
        title="添加设备"
        :visible.sync="AddDeviceDialogVisible"
        width="400px">
        <div id="AddDeviceInputDiv" >
            <input ref="AddDeviceBrandInput" type="text" class="DeviceTypeInputStyle" id="AddDeviceBrandInput" data-name="品牌" v-model="AddDeviceBrand" placeholder="品牌" @blur="CheckAddDeviceInputInformation" >
            <div class="InputDeviceTypeTip" id="AddDeviceBrandTip" ></div>
            <!-- <input type="text" class="DeviceTypeInputStyle" id="AddDeviceInput" data-name="设备名称" placeholder="设备名称" @blur="CheckAddDeviceInputInformation" >
            <div class="InputDeviceTypeTip" ></div> -->
            <input ref="AddDeviceModelInput" type="text" class="DeviceTypeInputStyle" id="AddDeviceModelInput" data-name="型号" v-model="AddDeviceModel" placeholder="型号" @blur="CheckAddDeviceInputInformation" >
            <div class="InputDeviceTypeTip" id="AddDeviceModelTip" ></div>
            <input ref="AddDeviceSpecificationInput" type="text" class="DeviceTypeInputStyle" id="AddDeviceSpecificationInput" data-name="规格" v-model="AddDeviceSpecification" placeholder="规格"  @blur="CheckAddDeviceInputInformation" >
            <div class="InputDeviceTypeTip" id="AddDeviceSpecificationTip" ></div>
            <input ref="AddDeviceUnitPriceInput" type="text" class="DeviceTypeInputStyle" id="AddDeviceUnitPriceInput" data-name="单价" v-model="AddDeviceUnitPrice" placeholder="单价" @blur="CheckAddDeviceInputInformation" >
            <div class="InputDeviceTypeTip" id="AddDeviceUnitPriceTip" ></div>
            <el-select ref="AddDeviceTypeSelect" v-model="AddDeviceType" id="AddDeviceTypeSelect" class="AddDeviceSelectStyle" placeholder="设备类型" data-name="设备类型" @change="CheckAddDeviceInformationSelect($refs.AddDeviceTypeSelect.$el)" >
                <el-option
                  v-for="item in AllDeviceType"
                  :key="item.typeId"
                  :label="item.typeName"
                  :value="item.typeName">
                </el-option>
            </el-select>
            <div class="InputDeviceTypeTip" id="AddDeviceTypeTip" ></div>

            <el-select ref="AddDevicePlaceSelect" v-model="AddDevicePlace" id="AddDevicePlaceSelect" class="AddDeviceSelectStyle" placeholder="存放地点" data-name="存放地点" @change="CheckAddDeviceInformationSelect($refs.AddDevicePlaceSelect.$el)">
                <el-option
                  v-for="item in SchoolAllPlace"
                  :key="item.placeId"
                  :label="item.placeName"
                  :value="item.placeName">
                </el-option>
            </el-select>
            <div class="InputDeviceTypeTip" id="AddDevicePlaceTip" ></div>

            <el-select ref="AddDeviceUserSelect" v-model="AddDeviceUser" id="AddDeviceUserSelect" class="AddDeviceSelectStyle" placeholder="购买人账户" data-name="购买人账户"  @change="CheckAddDeviceInformationSelect($refs.AddDeviceUserSelect.$el)">
                <el-option
                  v-for="item in SelectAllUser"
                  :key="item.userId"
                  :label="item.userName+' ('+ item.userId +')'"
                  :value="item.userName">
                </el-option>
            </el-select>
            <div class="InputDeviceTypeTip" id="AddDeviceUserTip" ></div>

            <el-date-picker
            class="AddDeviceSelectStyle"
            id="AddPurchaseDateSelect"
            v-model="AddPurchaseDate"
            type="date"
            :picker-options="StartTimeLimit"
            placeholder="购买日期"
            ref="AddPurchaseDateSelect"
            @change="CheckAddDeviceInformationSelect($refs.AddPurchaseDateSelect.$el)"
            data-name="购买日期">
            </el-date-picker>
            <div class="InputDeviceTypeTip" id="AddPurchaseDateTip" ></div>

            <el-date-picker
            class="AddDeviceSelectStyle"
            id="AddRetirementDateSelect"
            v-model="AddRetirementDate"
            type="date"
            :picker-options="EndTimeLimit"
            placeholder="报废日期"
            ref="AddRetirementDateSelect"
            @change="CheckAddDeviceInformationSelect($refs.AddRetirementDateSelect.$el)"
            data-name="报废日期">
            </el-date-picker>
            <div class="InputDeviceTypeTip" id="AddRetirementDateTip" ></div>

            <div style="height: 20px; " >
                <span style="height: 30px; display: inline-block;" >是否入账： </span>
                <el-radio v-model="AddIsRecorded" :label=true>是</el-radio>
                <el-radio v-model="AddIsRecorded" :label=false>否</el-radio>
            </div>
            <div id="DeviceNumberInput" style="height: 30px; margin-top: 10px; ">
                <span style="float: left; height: 30px; line-height: 30px;" >数量： </span>
                <el-input-number v-model="DeviceNumber" controls-position="right" :min="1" ></el-input-number>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="AddDeviceDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="DetermineAddDevice">确 定</el-button>
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
            
            // 设备入库参数
            AddPurchaseDate: '', // 购买日期
            AddRetirementDate: '', // 报废日期
            StartTimeLimit: this.LimitStartTime(),
            EndTimeLimit: this.LimitEndTime(),
            AddIsRecorded: true, // 是否报账
            AddDevicePlace: '', // 设备存放地点
            AddDeviceUser: '', //设备购买者
            AddDeviceType: '', //设备类型
            AddDeviceBrand: '', // 设备品牌
            AddDeviceModel: '', // 设备型号
            AddDeviceSpecification: '', // 设备规格
            AddDeviceUnitPrice: '', // 设备单价
            DeviceNumber: 1, //设备数量


            SchoolAllPlace: [],
            // /api/place/selectAllPlace
            SelectAllUser: [],
        }
    },
    created() {
        this.GetAllDeviceType();
        this.GetSelectAllPlace();
        this.GetSelectAllUser();
    },

    methods: {

        async GetAllDeviceType() {
            const {data: result} = await this.$http('/api/type/selectAllType');
            
            if(result.code == 200 && result.success) {
                console.log(result);
                this.AllDeviceType = result.data.list;
                this.AllDeviceTypeName=[];
                for(let i=0;i<this.AllDeviceType.length;i++){
                    this.AllDeviceTypeName.push(this.AllDeviceType[i].typeName)
                }
            }
        },
        async GetSelectAllPlace() {
            const {data: result} = await this.$http('/api/place/selectAllPlace');
            if(result.code == 200 && result.success) {
                console.log(result);
                this.SchoolAllPlace = result.data.list;
                console.log(this.SchoolAllPlace );
            }
        },
        async GetSelectAllUser() {
            const {data: result} = await this.$http('/api/user/selectAllUser');
            if(result.code == 200 && result.success) {
                console.log(result);
                this.SelectAllUser = result.data.list;
                console.log(this.SelectAllUser );
            }
        },
        LimitEndTime() {
            let self = this;
            return {
                disabledDate(time){
                    return time.getTime() < self.AddPurchaseDate;
                }
            }
        },
        LimitStartTime() {
            let self = this;
            return {
                disabledDate(time) {
                    if(self.AddRetirementDate!=''){
                        return time.getTime() > self.AddRetirementDate;
                    }
                },
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
        initAddDeviceStyle() {
            console.log(this.$refs.AddDeviceTypeSelect);
            if(this.$refs.AddDeviceBrandInput){
                this.$refs.AddDeviceBrandInput.style = '';
                this.getNextElementSibling(this.$refs.AddDeviceBrandInput).innerText='';
                this.$refs.AddDeviceModelInput.style = '';
                this.getNextElementSibling(this.$refs.AddDeviceModelInput).innerText='';
                this.$refs.AddDeviceSpecificationInput.style = '';
                this.getNextElementSibling(this.$refs.AddDeviceSpecificationInput).innerText='';
                this.$refs.AddDeviceUnitPriceInput.style = '';
                this.getNextElementSibling(this.$refs.AddDeviceUnitPriceInput).innerText='';

                var AddDeviceTypeSelect = document.querySelector('#AddDeviceTypeSelect')
                var AddDeviceTypeTip = document.querySelector('#AddDeviceTypeTip')
                AddDeviceTypeSelect.style = ''
                AddDeviceTypeTip.innerText = ''

                var AddDevicePlaceSelect = document.querySelector('#AddDevicePlaceSelect')
                var AddDevicePlaceTip = document.querySelector('#AddDevicePlaceTip')
                AddDevicePlaceSelect.style = ''
                AddDevicePlaceTip.innerText = ''

                var AddDeviceUserSelect = document.querySelector('#AddDeviceUserSelect')
                var AddDeviceUserTip = document.querySelector('#AddDeviceUserTip')
                AddDeviceUserSelect.style = ''
                AddDeviceUserTip.innerText = ''

                var AddPurchaseDateSelect = document.querySelector('#AddPurchaseDateSelect')
                var AddPurchaseDateTip = document.querySelector('#AddPurchaseDateTip')
                AddPurchaseDateSelect.style = ''
                AddPurchaseDateTip.innerText = ''

                var AddRetirementDateSelect = document.querySelector('#AddRetirementDateSelect')
                var AddRetirementDateTip = document.querySelector('#AddRetirementDateTip')
                AddRetirementDateSelect.style = ''
                AddRetirementDateTip.innerText = ''
            }
            // this.$refs.AddDeviceBrandInput.style = '';
            // this.$refs.AddDeviceModelInput.style = '';
            // this.$refs.AddDeviceSpecificationInput.style = '';
            // this.$refs.AddDeviceUnitPriceInput.style = '';
        },
        AddDeviceButtonClick() {
            this.initAddDeviceStyle();
            this.AddPurchaseDate = ''
            this.AddRetirementDate = ''
            this.AddIsRecorded = true
            this.AddDevicePlace = ''
            this.AddDeviceUser = ''
            this.AddDeviceType = ''
            this.AddDeviceBrand = ''
            this.AddDeviceModel = ''
            this.AddDeviceSpecification = ''
            this.AddDeviceUnitPrice = ''
            this.AddDeviceDialogVisible = true
            this.DeviceNumber = 1
        },
        CheckAddDeviceInputInformation(e) {
            var BortherElement = this.getNextElementSibling(e.currentTarget);
            if(e.currentTarget.value == '') {
                BortherElement.innerText =e.currentTarget.getAttribute('data-name') + '不能为空';
                e.currentTarget.style = 'border: 1px solid #f56c6c'
                return false;
            }
            else {
                BortherElement.innerText = '';
                e.currentTarget.style = '';
                return true;
            }
        },
        CheckAddDeviceInformationSelect(e) {
            console.log(e);
            e.querySelector('.el-input__inner').style = '';
            var bother = this.getNextElementSibling(e);
            bother.innerText = ''
        },
        CheckAddDeviceInformation() {
            var flag = true;
            if(this.AddDeviceBrand == ''){
                var target = {
                    currentTarget: document.querySelector('#AddDeviceBrandInput'),
                }
                this.CheckAddDeviceInputInformation(target)
                flag = false;
            }
            if(this.AddDeviceModel == ''){
                var target = {
                    currentTarget: document.querySelector('#AddDeviceModelInput'),
                }
                this.CheckAddDeviceInputInformation(target)
                flag = false;
            }
            if(this.AddDeviceSpecification == ''){
                var target = {
                    currentTarget: document.querySelector('#AddDeviceSpecificationInput'),
                }
                this.CheckAddDeviceInputInformation(target)
                flag = false;
            }
            if(this.AddDeviceUnitPrice == ''){
                var target = {
                    currentTarget: document.querySelector('#AddDeviceUnitPriceInput'),
                }
                this.CheckAddDeviceInputInformation(target)
                flag = false;
            }
            if(this.AddDeviceType == ''){
                var AddDeviceTypeSelect = document.querySelector('#AddDeviceTypeSelect')
                var AddDeviceTypeTip = document.querySelector('#AddDeviceTypeTip')
                AddDeviceTypeSelect.style = 'border: 1px solid #f56c6c'
                AddDeviceTypeTip.innerText = '设备类型不能为空'
                flag = false;
            }
            if(this.AddDevicePlace == ''){
                var AddDevicePlaceSelect = document.querySelector('#AddDevicePlaceSelect')
                var AddDevicePlaceTip = document.querySelector('#AddDevicePlaceTip')
                AddDevicePlaceSelect.style = 'border: 1px solid #f56c6c'
                AddDevicePlaceTip.innerText = '存放地点不能为空'
                flag = false;
            }
            if(this.AddDeviceUser == ''){
                var AddDeviceUserSelect = document.querySelector('#AddDeviceUserSelect')
                var AddDeviceUserTip = document.querySelector('#AddDeviceUserTip')
                AddDeviceUserSelect.style = 'border: 1px solid #f56c6c'
                AddDeviceUserTip.innerText = '购买人账户不能为空'
                flag = false;
            }
            if(this.AddPurchaseDate == ''){
                var AddPurchaseDateSelect = document.querySelector('#AddPurchaseDateSelect')
                var AddPurchaseDateTip = document.querySelector('#AddPurchaseDateTip')
                AddPurchaseDateSelect.style = 'border: 1px solid #f56c6c'
                AddPurchaseDateTip.innerText = '购买日期不能为空'
                flag = false;
            }
            if(this.AddRetirementDate == ''){
                var AddRetirementDateSelect = document.querySelector('#AddRetirementDateSelect')
                var AddRetirementDateTip = document.querySelector('#AddRetirementDateTip')
                AddRetirementDateSelect.style = 'border: 1px solid #f56c6c'
                AddRetirementDateTip.innerText = '报废日期不能为空'
                flag = false;
            }
            return flag;
        },
        async DetermineAddDevice() {
            if(this.CheckAddDeviceInformation()) {
                const {data: result} = await this.$http.post('/api/equipment/addEquipment?amount='+this.DeviceNumber,{
                    brand: this.AddDeviceBrand,
                    equipmentType: this.AddDeviceType,
                    isRecorded: this.AddIsRecorded,
                    model: this.AddDeviceModel,
                    place: this.AddDevicePlace,
                    purchaseDate: this.AddPurchaseDate,
                    retirementDate: this.AddRetirementDate,
                    purchaserId: this.AddDeviceUser,
                    specification: this.AddDeviceSpecification,
                    unitPrice: this.AddDeviceUnitPrice,
                })

                console.log(result);
                this.AddDeviceDialogVisible = false;
            }
            // this.AddDeviceDialogVisible = false;
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
    .AddDeviceButtonStyle,
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
    .AddDeviceSelectStyle {
        width: 80%;
    }
    >>>.AddDeviceSelectStyle .el-select {
        height: 30px;
        width: 100%; 
    }
    >>>.AddDeviceSelectStyle .el-input {
        height: 30px;
        color: black;
    }
    >>>.AddDeviceSelectStyle .el-input__inner {
        height: 30px;
        color: black;
        border: 1px solid #ebeef5;
    }
    >>>.AddDeviceSelectStyle .el-input__inner:focus {
        border: 1px solid #76acfe;
    }
    >>>.AddDeviceSelectStyle .el-input__inner::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        color: #7D7D7D;
        font-size: 14px;
    }
    >>>.AddDeviceSelectStyle .el-input__inner::-moz-placeholder {
        /* Firefox 19+ */
        color: #7D7D7D;
        font-size: 14px;
    }
    >>>.AddDeviceSelectStyle .el-input__inner:-ms-input-placeholder {
        /* IE 10+ */
        color: #7D7D7D;
        font-size: 14px;
    } 
    >>>.AddDeviceSelectStyle .el-input__inner:-moz-placeholder {
        /* Firefox 18- */
        color: #7D7D7D;
        font-size: 14px;
    }
    >>>.AddDeviceSelectStyle .el-input__icon {
        line-height: 30px;
    }
    >>>.AddDeviceSelectStyle .el-date-editor {
        width: 80%;
    }
    >>>#DeviceNumberInput .el-input-number {
        width: 50%;
        line-height: 30px;
    }
    >>>#DeviceNumberInput .el-input {
        height: 30px;
        line-height: 30px;
    }
    >>>#DeviceNumberInput .el-input__inner {
        height: 30px;
        line-height: 30px;
        position: absolute;
        top: 0px;
        border: 1px solid #ebeef5;
    }
    >>>#DeviceNumberInput .el-input__inner:focus {
        border: 1px solid #76acfe;
    }
    >>>#DeviceNumberInput .el-input-number__increase {
        line-height: 14px;
    }
    >>>#DeviceNumberInput .el-input-number__decrease {
        line-height: 14px;
    }
</style>