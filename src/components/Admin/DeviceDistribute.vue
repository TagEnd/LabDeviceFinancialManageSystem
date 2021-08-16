<template>
    <div style="height: 100%; overflow: auto; margin: 0 auto;" >
        <div class="ConditionDivStyle" >
            <input type="text" name="" id="" class="ConditionInputStyle" placeholder="品牌" v-model="DeviceBrand" />
            <input type="text" name="" id="" class="ConditionInputStyle" placeholder="设备类型" v-model="DeviceName" />
            <input type="text" name="" id="" class="ConditionInputStyle" placeholder="型号" v-model="DeviceModel" />
            <!-- DeviceBrand: '', //设备品牌
            DeviceName: '',  // 设备名称
            DeviceModel: '', // 设备型号 -->
            <!-- <el-checkbox-group style="vertical-align: middle;display: inline-block; font-size: 14px;" v-model="checkList" > -->
            <button type="button" class="SearchButtonStyle el-icon-search" @click="SearchButtonClick" ></button>
            
            <el-checkbox label="已分配" v-model="YesDistribute" ></el-checkbox>
            <el-checkbox label="未分配" v-model="NoDistribute" ></el-checkbox>
            <el-checkbox label="已报账" v-model="YesReimbursement" ></el-checkbox>
            <el-checkbox label="未报账" v-model="NoReimbursement" ></el-checkbox>
            <el-checkbox label="已报废" v-model="YesScrapped" ></el-checkbox>
            <el-checkbox label="未报废" v-model="NoScrapped" ></el-checkbox>
            <!-- </el-checkbox-group> -->
            <button type="button" class="FilterButtonStyle" @click="FilterButtonClick" >筛选</button>
        </div>
        <div class="DeviceInformationDivStyle" >

            <table class="DeviceInformationTable">
                <thead>
                     <tr>
                        <th style="min-width: 110px;" >设备类型</th>
                        <th style="width: 110px;" >设备编号</th>
                        <th style="width: 150px;" >品牌</th>
                        <th style="width: 150px;" >型号</th>
                        <th style="width: 150px;">规格</th>
                        <th style="width: 100px;" >是否报账</th>
                        <th style="width: 100px;" >是否报废</th>
                        <th style="width: 100px;" >是否分配</th>
                        <th style="width: 110px;">使用人账号</th>
                        <th style="width: 154px;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="Device in DataInformation" >
                        <td>{{Device.equipmentType}}</td>
                        <td>{{Device.equipmentId}}</td>
                        <td>{{Device.brand}}</td>
                        <td>{{Device.model}}</td>
                        <!-- <td>{{Device.purchaseDate}}</td>
                        <td>{{Device.retirementDate}}</td> -->
                        <td>{{Device.specification}}</td>
                        <!-- <td>{{Device.unitPrice}}</td>
                        <td>{{Device.purchaserId}}</td> -->
                        <td v-if="Device.isRecorded" >是</td>
                        <td v-else >否</td>
                        <td v-if="Device.isRetired" >是</td>
                        <td v-else >否</td>
                        <td v-if="Device.isAssigned" >是</td>
                        <td v-else >否</td>

                        <td>{{Device.userId}}</td>
                        <td style="font-size: 0px; text-align: center;" >
                            <button type="button" class="TableButtonStyle DetailButtonStyle" @click="DetailButtonClick(Device)" >详情</button>
                            <button type="button" class="TableButtonStyle DistributeButtonStyle" @click="DistributionButtonClick(Device)" >分配</button>
                            <button type="button" class="TableButtonStyle CancelDistributeButtonStyle" @click="CancelDistributionButtonClick(Device)" >取消</button>
                            <button type="button" class="TableButtonStyle DetailButtonStyle" @click="ChangeDeviceInformationButtonClick(Device)" >修改</button>
                            <button type="button" class="TableButtonStyle DistributeButtonStyle" @click="ScrapDeviceButtonClick(Device)" >报废</button>
                            <button type="button" class="TableButtonStyle CancelDistributeButtonStyle" @click="DeleteDeviceButton(Device)" >删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="PageNumberStyleDivStyle" >
            <el-pagination
            
            @current-change="CurrentPageChange"
            :current-page.sync="CurrentPage"
            :page-size="PageSize"
            layout="prev, pager, next, jumper"
            :total="DataTotal">
          </el-pagination>
        </div>
        <el-dialog
        title="详情"
        :visible.sync="DetailDialogVisible"
        width="400px">
        <div class="DetailInformationDivStyle clearfix" >
            <div style="float: left; width: 100px; " >
                <div class="DeviceInformationContentStyle" style="text-align: right;" >设备编号</div>
                <div class="DeviceInformationContentStyle" style="text-align: right;" >单价</div>
                <div class="DeviceInformationContentStyle" style="text-align: right;" >存放地点</div>
                <div class="DeviceInformationContentStyle" style="text-align: right;" >购买者账号</div>
                <div class="DeviceInformationContentStyle" style="text-align: right;" >购买日期</div>
                <div class="DeviceInformationContentStyle" style="text-align: right;" >报废日期</div>
            </div>
            <div style="float: left; width: calc(100% - 110px); margin-left: 10px; " >
                <div class="DeviceInformationContentStyle" >{{DetailDeviceInformation.equipmentId}}</div>
                <div class="DeviceInformationContentStyle" >{{DetailDeviceInformation.unitPrice}}</div>
                <div class="DeviceInformationContentStyle" >{{DetailDeviceInformation.place}}</div>
                <div class="DeviceInformationContentStyle" >{{DetailDeviceInformation.purchaserId}}</div>
                <div class="DeviceInformationContentStyle" >{{DetailDeviceInformation.purchaseDate}}</div>
                <div class="DeviceInformationContentStyle" >{{DetailDeviceInformation.retirementDate}}</div>
            </div>

        </div>
        </el-dialog>
        <el-dialog
        title="修改设备信息"
        :visible.sync="ChangeDeviceDialogVisible"
        width="400px">
        <div id="AddDeviceInputDiv" >
            <el-tooltip class="item" effect="dark" content="品牌" placement="top">
              <input ref="ChangeDeviceBrandInput" type="text" class="DeviceTypeInputStyle" id="AddDeviceBrandInput" data-name="品牌" v-model="ChangeDeviceBrand" placeholder="品牌" @blur="CheckAddDeviceInputInformation" >
            </el-tooltip>
            <div class="InputDeviceTypeTip" id="ChangeDeviceBrandTip" ></div>
            <el-tooltip class="item" effect="dark" content="型号" placement="top">
                <input ref="ChangeDeviceModelInput" type="text" class="DeviceTypeInputStyle" id="AddDeviceModelInput" data-name="型号" v-model="ChangeDeviceModel" placeholder="型号" @blur="CheckAddDeviceInputInformation" >
            </el-tooltip>
            <div class="InputDeviceTypeTip" id="ChangeDeviceModelTip" ></div>
            <el-tooltip class="item" effect="dark" content="规格" placement="top">
                <input ref="ChangeDeviceSpecificationInput" type="text" class="DeviceTypeInputStyle" id="AddDeviceSpecificationInput" data-name="规格" v-model="ChangeDeviceSpecification" placeholder="规格" @blur="CheckAddDeviceInputInformation" >
            </el-tooltip>
            <div class="InputDeviceTypeTip" id="ChangeDeviceSpecificationTip" ></div>
            <el-tooltip class="item" effect="dark" content="单价" placement="top">
                <input ref="ChangeDeviceUnitPriceInput" type="text" class="DeviceTypeInputStyle" id="AddDeviceUnitPriceInput" data-name="单价" v-model="ChangeDeviceUnitPrice" placeholder="单价" @blur="CheckAddDeviceInputInformation" >
            </el-tooltip>
            <div class="InputDeviceTypeTip" id="ChangeDeviceUnitPriceTip" ></div>
            <el-tooltip class="item" effect="dark" content="设备类型" placement="top">
                <el-select ref="AddDeviceTypeSelect" v-model="ChangeDeviceType" id="AddDeviceTypeSelect" class="ChangeDeviceSelectStyle" placeholder="设备类型" data-name="设备类型" >
                    <el-option
                    v-for="item in AllDeviceType"
                    :key="item.typeId"
                    :label="item.typeName"
                    :value="item.typeName">
                    </el-option>
                </el-select>
            </el-tooltip>
            <div class="InputDeviceTypeTip" id="AddDeviceTypeTip" ></div>
            <el-tooltip class="item" effect="dark" content="存放地点" placement="top">
                <el-select ref="AddDevicePlaceSelect" v-model="ChangeDevicePlace" id="AddDevicePlaceSelect" class="ChangeDeviceSelectStyle" placeholder="存放地点" data-name="存放地点">
                    <el-option
                    v-for="item in SchoolAllPlace"
                    :key="item.placeId"
                    :label="item.placeName"
                    :value="item.placeName">
                    </el-option>
                </el-select>
            </el-tooltip>
            <div class="InputDeviceTypeTip" id="AddDevicePlaceTip" ></div>
            <el-tooltip class="item" effect="dark" content="购买人账户" placement="top">
                <el-select ref="AddDeviceUserSelect" v-model="ChangeDevicePurchaser" id="AddDeviceUserSelect" class="ChangeDeviceSelectStyle" placeholder="购买人账户" data-name="购买人账户" >
                    <el-option
                    v-for="item in SelectAllUser"
                    :key="item.userId"
                    :label="item.userName+' ('+ item.userId +')'"
                    :value="item.userName">
                    </el-option>
                </el-select>
            </el-tooltip>
            <div class="InputDeviceTypeTip" id="AddDeviceUserTip" ></div>
            <el-tooltip class="item" effect="dark" content="购买日期" placement="top">
                <div>
                    <el-date-picker
                    class="ChangeDeviceSelectStyle"
                    id="AddPurchaseDateSelect"
                    v-model="ChangePurchaseDate"
                    type="date"
                    :picker-options="StartTimeLimit"
                    placeholder="购买日期"
                    ref="AddPurchaseDateSelect"
                    data-name="购买日期">
                    </el-date-picker>
                    <div class="InputDeviceTypeTip" id="AddPurchaseDateTip" ></div>
                </div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="报废日期" placement="top">
                <div>
                    <el-date-picker
                    class="ChangeDeviceSelectStyle"
                    id="AddRetirementDateSelect"
                    v-model="ChangeRetirementDate"
                    type="date"
                    :picker-options="EndTimeLimit"
                    placeholder="报废日期"
                    ref="AddRetirementDateSelect"
                    data-name="报废日期">
                    </el-date-picker>
                    <div class="InputDeviceTypeTip" id="AddRetirementDateTip" ></div>
                </div>
            </el-tooltip>
            <div style="height: 20px; " >
                <span style="height: 30px; display: inline-block;" >是否入账： </span>
                <el-radio v-model="ChangeIsRecorded" :label=true>是</el-radio>
                <el-radio v-model="ChangeIsRecorded" :label=false>否</el-radio>
            </div>
            <div style="height: 20px; margin-top: 10px; " >
                <span style="height: 30px; display: inline-block;" >是否报废： </span>
                <el-radio v-model="ChangeIsRetired" :label=true>是</el-radio>
                <el-radio v-model="ChangeIsRetired" :label=false>否</el-radio>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="ChangeDeviceDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="DetermineChangeDeviceInformation">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog
        title="设备分配"
        :visible.sync="DistributionDialogVisible"
        width="400px">
            <div id="AddDeviceInputDiv" >
                <el-select ref="DistributionDeviceUserSelect" v-model="DistributionDeviceUser" id="DistributionDeviceUserSelect" class="ChangeDeviceSelectStyle" placeholder="使用者账户" data-name="使用者账户" @change="CheckDistributionDeviceSelect($refs.DistributionDeviceUserSelect.$el)" >
                    <el-option
                    v-for="item in SelectAllUser"
                    :key="item.userId"
                    :label="item.userName+' ('+ item.userId +')'"
                    :value="item.userId">
                    </el-option>
                </el-select>
                <div class="InputDeviceTypeTip" id="AddDeviceUserTip" ></div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DistributionDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="DetermineDistributionClick">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            YesDistribute: false, // 已分配
            NoDistribute: false,  // 未分配
            YesReimbursement: false, // 已报账
            NoReimbursement: false, // 未报账
            YesScrapped: false, // 已报废
            NoScrapped: false, // 未报废
            PageSize: 14, // 页面中数据数量
            DeviceBrand: '', //设备品牌
            DeviceName: '',  // 设备名称
            DeviceModel: '', // 设备型号

            CurrentPage: 1, //当前页面
            DataTotal: 0,  // 数组总数
            DataInformation: [], // 数据信息

            SerachObj: {
                DeviceBrand: '',
                DeviceName: '',
                DeviceModel: '',
            },
            FilterObj: {
                IsDistribute: '',
                IsReimbursement: '',
                IsScrapped: '',
            },
            DetailDialogVisible: false,
            DetailDeviceInformation: {},

            ChangeDeviceDialogVisible: false,
            // 设备修改参数
            ChangePurchaseDate: '', // 购买日期
            ChangeRetirementDate: '', // 报废日期
            StartTimeLimit: this.LimitStartTime(),
            EndTimeLimit: this.LimitEndTime(),
            ChangeIsRecorded: '', // 是否报账
            ChangeIsRetired: '',
            ChangeDevicePlace: '', // 设备存放地点
            ChangeDevicePurchaser: '', //设备购买者
            ChangeDeviceType: '', //设备类型
            ChangeDeviceBrand: '', // 设备品牌
            ChangeDeviceModel: '', // 设备型号
            ChangeDeviceSpecification: '', // 设备规格
            ChangeDeviceUnitPrice: '', // 设备单价
            ChangeDeviceUserId: '', // 使用者id
            ChangeDeviceId: '', // 使用者id
            ChangeIsAssigned: '', //是否分配

            AllDeviceType: [],
            SchoolAllPlace: [],
            SelectAllUser: [],

            DistributionDialogVisible: false,
            DistributionDeviceUser: '',
            DistributionDeviceId: '',
        };
    },
    computed: {

    },
    watch: {
        YesDistribute(NewVal, OldVal) {
            if(NewVal) {
                this.NoDistribute = false;
            }
        },
        NoDistribute(NewVal, OldVal){
            if(NewVal) {
                this.YesDistribute = false;
            }
        },
        YesReimbursement(NewVal, OldVal) {
            if(NewVal) {
                this.NoReimbursement = false;
            }
        },
        NoReimbursement(NewVal, OldVal){
            if(NewVal) {
                this.YesReimbursement = false;
            }
        },
        YesScrapped(NewVal, OldVal) {
            if(NewVal) {
                this.NoScrapped = false;
            }
        },
        NoScrapped(NewVal, OldVal){
            if(NewVal) {
                this.YesScrapped = false;
            }
        },
    },
    async created() {
        this.GetAllDeviceInformation(1);
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
                    return time.getTime() < self.ChangePurchaseDate;
                }
            }
        },
        LimitStartTime() {
            let self = this;
            return {
                disabledDate(time) {
                    if(self.ChangeRetirementDate!=''){
                        return time.getTime() > self.ChangeRetirementDate;
                    }
                },
            }
        },
        DetailButtonClick(obj) {
            this.DetailDialogVisible = true;
            console.log(obj);
            this.DetailDeviceInformation = obj;
        },
        InitChangeDeviceElement() {
            if(this.$refs.ChangeDeviceBrandInput) {
                this.$refs.ChangeDeviceBrandInput.style = '';
                this.getNextElementSibling(this.$refs.ChangeDeviceBrandInput).innerText = ''
                this.$refs.ChangeDeviceModelInput.style = '';
                this.getNextElementSibling(this.$refs.ChangeDeviceModelInput).innerText = ''
                this.$refs.ChangeDeviceSpecificationInput.style = '';
                this.getNextElementSibling(this.$refs.ChangeDeviceSpecificationInput).innerText = ''
                this.$refs.ChangeDeviceUnitPriceInput.style = '';
                this.getNextElementSibling(this.$refs.ChangeDeviceUnitPriceInput).innerText = ''
            }

        },
        ChangeDeviceInformationButtonClick(obj) {
            this.InitChangeDeviceElement();
            this.ChangeDeviceDialogVisible = true;
            console.log(obj);
            this.ChangePurchaseDate = obj.purchaseDate;
            this.ChangeRetirementDate = obj.retirementDate;
            this.ChangeIsRecorded = obj.isRecorded;
            this.ChangeIsRetired = obj.isRetired;
            this.ChangeDevicePlace = obj.place;
            this.ChangeDevicePurchaser = obj.purchaserId;
            this.ChangeDeviceType = obj.equipmentType;
            this.ChangeDeviceBrand = obj.brand;
            this.ChangeDeviceSpecification = obj.specification;
            this.ChangeDeviceModel = obj.model;
            this.ChangeDeviceUnitPrice = obj.unitPrice;
            this.ChangeDeviceUserId = obj.userId;
            this.ChangeDeviceId = obj.equipmentId;
            this.ChangeIsAssigned = obj.isAssigned;
        },
        CheckAddDeviceInputInformation(e) {
            var BortherElement = this.getNextElementSibling(e.currentTarget);
            console.log(BortherElement);
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
        CheckChangeDeviceInformation() {
            var flag = true;
            if(this.ChangeDeviceBrand == '') {
                this.$refs.ChangeDeviceBrandInput.style = 'border: 1px solid #f56c6c;'
                document.querySelector('#ChangeDeviceBrandTip').innerHTML =  '品牌不能为空'
                flag = false;
            }
            if(this.ChangeDeviceModel == '') {
                this.$refs.ChangeDeviceModelInput.style = 'border: 1px solid #f56c6c;'
                document.querySelector('#ChangeDeviceModelTip').innerHTML =  '型号不能为空'
                flag = false;
            }
            if(this.ChangeDeviceSpecification == '') {
                this.$refs.ChangeDeviceSpecificationInput.style = 'border: 1px solid #f56c6c;'
                document.querySelector('#ChangeDeviceSpecificationTip').innerHTML =  '规格不能为空'
                flag = false;
            }
            if(this.ChangeDeviceUnitPrice == '') {
                this.$refs.ChangeDeviceUnitPriceInput.style = 'border: 1px solid #f56c6c;'
                document.querySelector('#ChangeDeviceUnitPriceTip').innerHTML =  '单价不能为空'
                flag = false;
            }
            return flag
        },
        async DetermineChangeDeviceInformation() {
            if(this.CheckChangeDeviceInformation()){
                const {data: result} = await this.$http.post('/api/equipment/alterEquipment/'+this.ChangeDeviceId,{
                    place: this.ChangeDevicePlace,
                    brand: this.ChangeDeviceBrand,
                    isAssigned: this.ChangeIsAssigned,
                    isRecorded: this.ChangeIsRecorded,
                    isRetired: this.ChangeIsRetired,
                    model: this.ChangeDeviceModel,
                    equipmentType: this.ChangeDeviceType,
                    purchaseDate: this.ChangePurchaseDate,
                    purchaserId: this.ChangeDevicePurchaser,
                    retirementDate: this.ChangeRetirementDate,
                    specification: this.ChangeDeviceSpecification,
                    unitPrice: this.ChangeDeviceUnitPrice,
                    userId: this.ChangeDeviceUserId,
                })
                console.log(result);
                if(result.code == 200 && result.success){
                    this.$message({
                        message: result.message,
                        type: 'success',
                        duration: 1000,
                    })
                    this.GetAllDeviceInformation(this.CurrentPage);
                    this.ChangeDeviceDialogVisible = false;
                }
                // this.ChangeDeviceDialogVisible = false;
            }
            // this.ChangeDeviceDialogVisible = false;
        },
        CurrentPageChange(val){
            // console.log(val);
            this.GetAllDeviceInformation(val);
        },
        async GetAllDeviceInformation(RequirePage) {
            const {data: result} = await this.$http.get('/api/equipment/getAllEquipment/'+RequirePage+'/'+this.PageSize+'/'+'purchase_date', {
                params: {
                    brand: this.SerachObj.DeviceBrand,
                    equipmentType: this.SerachObj.DeviceName,
                    model: this.SerachObj.DeviceModel,
                    isAssigned: this.FilterObj.IsDistribute,
                    isRecorded: this.FilterObj.IsReimbursement,
                    isRetired: this.FilterObj.IsScrapped,
                }
            });
            if(result.code==200 && result.success){
                this.DataTotal = result.data.total;
                this.DataInformation = result.data.rows;
                console.log(this.DataInformation);
            }
            else {
                this.$message({
                    message: result.message,
                    type: 'error',
                    duration: 1000,
                });
            }

        },
        SearchButtonClick() {
            this.SerachObj.DeviceBrand = this.DeviceBrand;
            this.SerachObj.DeviceName = this.DeviceName;
            this.SerachObj.DeviceModel = this.DeviceModel;
            this.GetAllDeviceInformation(1);
        },
        FilterButtonClick() {
            var IsDistribute = '';
            var IsReimbursement = '';
            var IsScrapped = '';
            if(this.YesDistribute){
                IsDistribute = true;
            }
            if(this.NoDistribute) {
                IsDistribute = false;
            }
            if(this.YesReimbursement){
                IsReimbursement = true;
            }
            if(this.NoReimbursement) {
                IsReimbursement = false;
            }
            if(this.YesScrapped){
                IsScrapped = true;
            }
            if(this.NoScrapped) {
                IsScrapped = false;
            }
            this.FilterObj.IsDistribute = IsDistribute;
            this.FilterObj.IsReimbursement = IsReimbursement;
            this.FilterObj.IsScrapped = IsScrapped;
            this.GetAllDeviceInformation(1);
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
        DistributionButtonClick(obj) {
            this.DistributionDeviceId = obj.equipmentId;
            this.DistributionDialogVisible = true;
        },
        CheckDistributionUserId() {
            console.log(this.$refs.DistributionDeviceUserSelect.$el);
            if(this.DistributionDeviceUser == '') {
                this.$refs.DistributionDeviceUserSelect.$el.querySelector('.el-input__inner').style = 'border: 1px solid #f56c6c'
                this.getNextElementSibling(this.$refs.DistributionDeviceUserSelect.$el).innerText = '使用者不能为空'
                return false
            }
            return true
        },
        async DetermineDistributionClick() {
            if(this.CheckDistributionUserId()) {
                const {data: result} = await this.$http.post('/api/equipment/assignEquipment/'+this.DistributionDeviceId+'/'+this.DistributionDeviceUser)
                console.log(result);
                if(result.code == 200 && result.success) {
                    this.$message({
                        message: result.message,
                        type: 'success',
                        duration: 1000,
                    })
                    this.GetAllDeviceInformation(this.CurrentPage);
                    this.DistributionDialogVisible = false;
                }
            }

            // this.DistributionDialogVisible = false;
        },
        CheckDistributionDeviceSelect(e) {
            console.log(e);
            e.querySelector('.el-input__inner').style = '';
            var bother = this.getNextElementSibling(e);
            bother.innerText = ''
        },
        CancelDistributionButtonClick(obj) {
            console.log(obj);
            this.$confirm('是否取消该设备分配',  {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
            }).then(async ()=>{
                const {data :result} = await this.$http.post('/api/equipment/unassignEquipmentByForce/'+ obj.equipmentId);
                console.log(result);
                if(result.code ==200 && result.success) {
                    this.GetAllDeviceInformation(1);
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
        ScrapDeviceButtonClick(obj) {
            console.log(obj);
            this.$confirm('是否报废该设备',  {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
            }).then(async ()=>{
                const {data :result} = await this.$http.post('/api/equipment/retireEquipment/'+ obj.equipmentId);
                console.log(result);
                if(result.code ==200 && result.success) {
                    this.GetAllDeviceInformation(1);
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
        DeleteDeviceButton(obj){
            console.log(obj);
            this.$confirm('是否删除该设备',  {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
            }).then(async ()=>{
                const {data :result} = await this.$http.delete('/api/equipment/deleteEquipment/'+ obj.equipmentId);
                console.log(result);
                if(result.code ==200 && result.success) {
                    this.GetAllDeviceInformation(1);
                    this.CurrentPage = 1;
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
    }
}
</script>
<style scoped>
    .ConditionDivStyle {
        height: 30px;
        /* width: 800px; */
        min-width: 1300px;
        /* background-color: aqua; */
        white-space: nowrap;
    }
    .ConditionInputStyle {
        /* float: left; */
        vertical-align:middle;
        box-sizing: border-box;
        border: 1px solid #ebeef5;
        height: 30px;
        width: 200px;
        min-width: 100px;
        min-width: 100px;
        border-radius: 5px;
        font-size: 14px;
        /* line-height: 30px; */
        
        padding: 0 20px;
        outline: none;
        margin-right: 10px;
    }
    .ConditionInputStyle:focus {
        border: 1px solid #76ACFE;
    }
    .SearchButtonStyle {
        /* float: left; */
        vertical-align:middle;
        box-sizing: border-box;
        height: 30px;
        border: 1px solid #ebeef5;
        border-radius: 5px;
        width: 30px;
        font-size: 20px;
        outline: none;
        color: #606266;
        background-color: transparent;
        /* margin-left: 10px; */
        margin-right: 20px;
    }
    .SearchButtonStyle:focus {
        border: 1px solid #76ACFE;
    }
    .el-checkbox {
        margin-right: 20px;
    }
    .FilterButtonStyle {
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
    }
    .DeviceInformationDivStyle {
        min-width: 1300px;
        margin-top: 10px;
        height: calc(100% - 80px);
        border-top: 2px solid #ebeef5;
        box-sizing: border-box;
        overflow-y: scroll;
        overflow-x: auto;
        
    }


    .PageNumberStyleDivStyle {
        margin-top: 10px;
        height: 30px;
        min-width: 1300px;
        /* background-color: aquamarine; */
    }
    .DeviceInformationTable {
        border-collapse: collapse;
        width: 100%;
        min-width: 1280px;
        box-sizing: border-box;
        font-size: 14px;
    }
    .DeviceInformationTable thead th {
        padding: 0 10px;
        min-width: 0;
        height: 47px;
        text-overflow: ellipsis;
        text-align: left;
        box-sizing: border-box;
        border: 2px solid #ebeef5;
        box-sizing: border-box;
        border-top: 0px;
    }
    .DeviceInformationTable tbody td {
        padding: 0 10px;
        min-width: 0;
        height: 47px;
        text-overflow: ellipsis;
        text-align: left;
        border: 2px solid #ebeef5;
        box-sizing: border-box;
    }
    .DeviceInformationTable tr:hover {
        background-color: #f5f7fa;
    }
    >>> .el-pagination {
        height: 30px;
        box-sizing: border-box;
        text-align: right;
        vertical-align: middle;
        padding: 1px 5px;
    }
    .TableButtonStyle {
        box-sizing: border-box;
        height: 20px;
        line-height: 18px;
        background-color: #76ACFE;
        color: white;
        width: 40px;
        border: 1px solid black;
        outline: none;
        border-radius: 4px;
        font-size: 14px;
        -moz-appearance: none; /* Firefox */
        -webkit-appearance: none; /* Safari and Chrome */
    }
    .DetailButtonStyle {
        background-color: #f4f4f5;
        color: #909399;
        border-color: #d3d4d6;
        margin-right: 5px;
    }
    .DetailButtonStyle:hover {
        background: #a6a9ad;
        border-color: #a6a9ad;
        color: #fff;
    }
    .EnterHouseButtonStyle {
        box-sizing: border-box;
        vertical-align: middle;
        height: 30px;
        font-size: 14px;
        color: #409eff;
        padding: 0 10px;
        border-radius: 5px;
        background-color: #ecf5ff;
        border: 1px solid #b3d8ff;
        outline: none;
    }
    .EnterHouseButtonStyle:hover {
        background: #66b1ff;
        border-color: #66b1ff;
        color: #fff
    }
    .DistributeButtonStyle {
        color: #e6a23c;
        background: #fdf6ec;
        border-color: #f5dab1;
        margin-right: 5px;
    }
    .DistributeButtonStyle:hover {
        background: #e6a23c;
        border-color: #e6a23c;
        color: #fff;
    }
    .CancelDistributeButtonStyle {
        color: #f56c6c;
        background: #fef0f0;
        border-color: #fbc4c4;
    }
    .CancelDistributeButtonStyle:hover {
        background: #f56c6c;
        border-color: #f56c6c;
        color: #fff;
    }
    .DetailInformationDivStyle {
        font-size: 14px;
        margin-bottom: 20px;
    }
    .DeviceInformationContentStyle {
        height: 30px;
        line-height: 30px;
    }
    >>> .el-dialog__body {
        padding: 5px 20px;
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
    .ChangeDeviceSelectStyle {
        width: 80%;
    }
    >>>.ChangeDeviceSelectStyle .el-select {
        height: 30px;
        width: 100%; 
    }
    >>>.ChangeDeviceSelectStyle .el-input {
        height: 30px;
        color: black;
    }
    >>>.ChangeDeviceSelectStyle .el-input__inner {
        height: 30px;
        color: black;
        border: 1px solid #ebeef5;
    }
    >>>.ChangeDeviceSelectStyle .el-input__inner:focus {
        border: 1px solid #76acfe;
    }
    >>>.ChangeDeviceSelectStyle .el-input__inner::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        color: #7D7D7D;
        font-size: 14px;
    }
    >>>.ChangeDeviceSelectStyle .el-input__inner::-moz-placeholder {
        /* Firefox 19+ */
        color: #7D7D7D;
        font-size: 14px;
    }
    >>>.ChangeDeviceSelectStyle .el-input__inner:-ms-input-placeholder {
        /* IE 10+ */
        color: #7D7D7D;
        font-size: 14px;
    } 
    >>>.ChangeDeviceSelectStyle .el-input__inner:-moz-placeholder {
        /* Firefox 18- */
        color: #7D7D7D;
        font-size: 14px;
    }
    >>>.ChangeDeviceSelectStyle .el-input__icon {
        line-height: 30px;
    }
    >>>.ChangeDeviceSelectStyle .el-date-editor {
        width: 80%;
    }
</style>