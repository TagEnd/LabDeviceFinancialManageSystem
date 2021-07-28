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
                        <th style="min-width: 200px;" >设备类型</th>
                        <th style="width: 110px;" >品牌</th>
                        <th style="width: 110px;" >型号</th>
                        <th style="width: 150px;" >存放地点</th>
                        <!-- <th style="width: 110px;" >购买日期</th>
                        <th style="width: 110px;" >报废日期</th> -->
                        <th style="width: 110px;">规格</th>
                        <!-- <th style="width: 110px;">单价</th> -->
                        <!-- <th style="width: 110px;">购买人id</th> -->
                        <th style="width: 90px;" >是否报账</th>
                        <th style="width: 90px;" >是否报废</th>
                        <th style="width: 90px;" >是否分配</th>
                        <th style="width: 100px;">使用人id</th>
                        <th style="width: 110px;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="Device in DataInformation" >
                        <td>{{Device.equipmentType}}</td>
                        <td>{{Device.brand}}</td>
                        <td>{{Device.model}}</td>
                        <td>{{Device.place}}</td>
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
                        <td>
                            <button type="button" class="TableButtonStyle DetailButtonStyle " >详情</button>
                            <button type="button" class="TableButtonStyle EnterHouseButtonStyle" >入库</button>
                            <button type="button" class="TableButtonStyle ScrappedButtonStyle" >报废</button>
                            <button type="button" class="TableButtonStyle DeleteButtonStyle" >删除</button>
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
    },
    methods: {
        CurrentPageChange(val){
            // console.log(val);
            this.GetAllDeviceInformation(val);
        },
        async GetAllDeviceInformation(RequirePage) {
            const {data: result} = await this.$http.get('/api/equipment/getAllEquipment/'+RequirePage+'/'+this.PageSize, {
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
                    message: result.messgae,
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
        }
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
        vertical-align: middle;
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
        background-color: #76ACFE;
        color: white;
        width: 40px;
        border: 1px solid black;
        outline: none;
        border-radius: 4px;
        -moz-appearance: none; /* Firefox */
        -webkit-appearance: none; /* Safari and Chrome */
    }
    .DetailButtonStyle {
        background-color: #f4f4f5;
        color: #909399;
        border-color: #d3d4d6;
    }
    .DetailButtonStyle:hover {
        background: #a6a9ad;
        border-color: #a6a9ad;
        color: #fff;
    }
    .EnterHouseButtonStyle {
        color: #409eff;
        background: #ecf5ff;
        border-color: #b3d8ff;
    }
    .EnterHouseButtonStyle:hover {
        background: #66b1ff;
        border-color: #66b1ff;
        color: #fff
    }
    .ScrappedButtonStyle {
        color: #e6a23c;
        background: #fdf6ec;
        border-color: #f5dab1;
    }
    .ScrappedButtonStyle:hover {
        background: #e6a23c;
        border-color: #e6a23c;
        color: #fff;
    }
    .DeleteButtonStyle {
        color: #f56c6c;
        background: #fef0f0;
        border-color: #fbc4c4;
    }
    .DeleteButtonStyle:hover {
        background: #f56c6c;
        border-color: #f56c6c;
        color: #fff;
    }
</style>