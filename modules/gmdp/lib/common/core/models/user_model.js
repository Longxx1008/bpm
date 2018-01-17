/**
 * Created by ShiHukui on 2016/2/29.
 */
// 引入mongoose工具类
var mongoUtils  = require('../../core/mongodb/mongoose_utils');

var mongoose = mongoUtils.init();

var Schema    = mongoose.Schema;
var ObjectId  = Schema.Types.ObjectId;

var commonOrgSchema = new Schema(
    {
        org_code : String,// 机构编号
        org_name : String,// 机构名
        org_fullname : String,// 机构全名
        org_order : Number,// 排序号
        org_type : String,// 机构类型
        org_pid : String,// 机构父节点
        org_belong : String,// 机构所属区县
        org_status : Number,// 机构状态
        org_remark : String,// 机构描述
        child_count:Number//机构子节点统计
    },
    {collection: "common_bpm_org_info"}//mongodb集合名
);

// 机构model
var CommonCoreOrg = mongoose.model('CommonCoreOrg', commonOrgSchema);
exports.$CommonCoreOrg = CommonCoreOrg;

var commonOrgAttachAttrSchema = new Schema(
    {
        org_id : {type: Schema.Types.ObjectId, ref: 'CommonCoreOrg'},// 所在部门
        start_time:Date,
        end_time:Date,
        attr_items:[{type:String}],
        status:Number
    },
    {collection: "common_org_attach_attr"}//mongodb集合名
);

// 机构附加属性model
var CommonCoreOrgAttachAttr = mongoose.model('CommonCoreOrgAttachAttr', commonOrgAttachAttrSchema);
exports.$CommonCoreOrgAttachAttr = CommonCoreOrgAttachAttr;

var commonSysSchema = new Schema(
    {
        "sys_code" : String,
        "sys_name" : String,
        "sys_url" : String,
        "sys_status" : Number,
        "sys_remark" : String,
        "sys_main_url" : String,
        "sys_theme_layout" : String
    },
    {collection: "common_system_info"}//mongodb集合名
);

// 系统model
var CommonCoreSys = mongoose.model('CommonCoreSys', commonSysSchema);
exports.$CommonCoreSys = CommonCoreSys;

var commonRoleSchema = new Schema(
    {
        "role_code" : String,
        "role_name" : String,
        "role_status" : Number,
        "sys_id" : String,
        "role_order" : Number,
        "role_level" : String,
        "role_tag" : String,
        "role_remark" : String
    },
    {collection: "common_bpm_role_info"}//mongodb集合名
);

// 角色model
var CommonCoreRole = mongoose.model('CommonCoreRole', commonRoleSchema);
exports.$CommonCoreRole = CommonCoreRole;

var commonUserSchema = new Schema(
    {
        login_account : String,// 登陆账号
        login_password : String,// 登陆密码
        user_no : String,// 用户工号
        user_name : String,// 用户姓名
        user_photo : String,// 用户头像/照片
        user_gender : Number,// 用户性别
        user_phone : String,// 用户手机
        user_tel : String,// 用户联系电话
        user_email : String,// 用户邮箱
        user_status : Number,// 用户状态
        user_org : [{type: Schema.Types.ObjectId, ref: 'CommonCoreOrg'}],// 所在部门
        user_sys : {type: String, ref: 'CommonCoreSys'},// 所属系统
        user_roles : [{type: Schema.Types.ObjectId, ref: 'CommonCoreRole'}],// 所拥有的角色
        user_duties : [{type: String}],// 人员职责
        user_tag : Number,// 标记
        user_area:{
                city_id:String, // 地市ID
                city_name:String, // 地市名
                county_id:String, // 区县ID
                county_name:String // 区县名称
        },
        theme_name : String,// 使用主题
        theme_skin : String// 使用皮肤
    },
    {collection: "common_bpm_user_info"}//mongodb集合名
);

// 账号model
exports.$ = mongoose.model('CommonCoreUser', commonUserSchema);




var commonUploadUserSchema = new Schema(
    {
        login_account : String,// 登陆账号
        login_password : String,// 登陆密码
        user_no : String,// 用户工号
        user_name : String,// 用户姓名
        user_photo : String,// 用户头像/照片
        user_gender : Number,// 用户性别
        user_phone : String,// 用户手机
        user_tel : String,// 用户联系电话
        user_email : String,// 用户邮箱
        user_status : Number,// 用户状态
        user_sys : {type: String, ref: 'CommonCoreSys'},// 所属系统
        user_duties : [{type: String}],// 人员职责
        user_tag : Number,// 标记
        user_area:{
            city_id:String, // 地市ID
            city_name:String, // 地市名
            county_id:String, // 区县ID
            county_name:String // 区县名称
        },
        theme_name : String,// 使用主题
        theme_skin : String// 使用皮肤
    },
    {collection: "common_bpm_user_info"}//mongodb集合名
);

// 导入账号model
exports.$CommonCoreUploadUser = mongoose.model('CommonCoreUploadUser', commonUploadUserSchema);



/**
 * 用户登陆错误日志
 */
var commonUserLoginErrorLogSchema = new Schema(
    {
        login_account : {type:String, index:true},// 登陆账号
        login_password : String,// 登陆密码
        login_date : {type:String, index:true},// 登陆日期
        login_time:Date// 登陆时间
    },
    {collection: "common_user_login_error_log"}//mongodb集合名
);

// 账号model
exports.$CommonUserLoginErrorLog = mongoose.model('commonUserLoginErrorLog', commonUserLoginErrorLogSchema);

var commonUserLoginLogSchema = new Schema(
    {
        login_account : {type:String, index:true},// 登陆账号
        org_name:String,
        org_id:String,
        login_port:String,
        login_time:Date,
        user_phone:String,
        user_tag:String,
        user_name:String,
        user_no:String

    },
    {collection: "common_user_login_log"}//mongodb集合名
);
//login_account,user_id,name,user_tag,phone_info,create_time,login_port,org_id,org_name
// 账号model
exports.$CommonUserLoginLog = mongoose.model('commonUserLoginLog', commonUserLoginLogSchema);
