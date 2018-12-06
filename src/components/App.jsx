/*http://react-component.github.io/form/examples/redux.html 自定义表单集合*/
import React, { Component,PropTypes } from "react";
import 'antd/dist/antd.css';

import { Form,  Card, Input, Select, Button,Cascader,Icon  } from 'antd';
import Query from "./QueryForm";


import *as Query2 from "./Query/index.jsx";

const FormItem = Form.Item;



// function hasErrors(fieldsError) {
//     console.log(Object.keys(fieldsError),'errorKeys');
//
//     return Object.keys(fieldsError).some(field => {
//         console.log(fieldsError,fieldsError[field]);
//         return fieldsError[field]
//     });
// }

// class HorizontalLoginForm extends React.Component {
//     componentDidMount() {
//         // 防止在加载时提交
//         this.props.form.validateFields();
//         console.log(this.props.form.getFieldsError(),'----------didMount err')
//
//         // this.props.form.onValuesChange(function(props, changedValues, allValues){
//         //     console.log(props, changedValues, allValues,'--------props, changedValues, allValues)');
//         // });
//     }
//     onValuesChange(props, changedValues, allValues){
//         console.log(props, changedValues, allValues,'--------props)');
//     }
//     handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(this.props.form.getFieldsError(),'----------err')
//         this.props.form.validateFields((err, values) => {
//             if (!err) {
//                 console.log('Received values of form: ', values);
//             }
//             else {
//                 console.log(err,'------------ 错误');
//             }
//         });
//     }
//     checkFormConfig = (rule, value, cb) => {
//         if (value == '') {
//             cb('规则不能为空');
//         }
//
//     }
//     onChangeVals=(p1,p2,p3)=>{
//         console.log(p1.target,p1,'p1,p2,p3');
//         const val = p1.target.value;
//         this.props.form.setFields({
//             'userName': val
//         })
//     }
//     render() {
//         const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
//
//         // Only show error after a field is touched.
//         const userNameError = isFieldTouched('userName') && getFieldError('userName');
//         const passwordError = isFieldTouched('password') && getFieldError('password');
//
//         return (
//             <Form
//                 layout="horizontal"
//                 onSubmit={this.handleSubmit}
//                 style={{padding: '15vh',margin:'10vh auto'}}
//             >
//                 <FormItem
//                     validateStatus={userNameError ? 'error' : ''}
//                     help={userNameError || ''}
//                 >
//                     {
//                         getFieldDecorator('userName', {
//                             rules: [{
//                                 // max:11,
//                                 // len:11,
//                                 required: true,
//                                 //pattern: /(^\s*)|(\s*$)/g,
//                                //  pattern: new RegExp(/(^\s*)|(\s*$)/g, ""),
//                                 message: 'Please input your username!',
//                                 // validator: this.checkFormConfig.bind(this),
//                             }],
//                             onChange:this.onChangeVals,
//                             //  validateTrigger:['onChange'],
//                             // initialValue:'',
//                         })(
//                             <Input
//                                 prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                                 placeholder="Username"
//                                 maxLength={22}
//                             />
//                         )
//                     }
//                 </FormItem>
//                 <FormItem
//                     validateStatus={passwordError ? 'error' : ''}
//                     help={passwordError || ''}
//                 >
//                     {
//                         getFieldDecorator('password', {
//                             rules: [{ required: true, message: 'Please input your Password!' }],
//                         })(
//                             <Input
//                                 prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                                 type="password" placeholder="Password"
//                             />
//                         )
//                     }
//                 </FormItem>
//                 <FormItem>
//                     <Button
//                         type="primary"
//                         htmlType="submit"
//                         //disabled={hasErrors(getFieldsError())}
//                     >
//                         Log in
//                     </Button>
//                 </FormItem>
//             </Form>
//         );
//     }
// }
// const App = Form.create({
//     onFieldsChange(props, changedFields) {
//         console.log(changedFields,'changedFields')
//         //changedFields.username.value = changedFields.username.value.trim();
//         props.onChange(changedFields);
//     },
// })(HorizontalLoginForm);


// const Query = Form.create({
//     onFieldsChange(props, changedFields) {
//         props.onChange(changedFields);
//     },
//     mapPropsToFields(props) {
//         return {
//             username: Form.createFormField({
//                 ...props.username,
//                 value: props.username.value,
//             }),
//         };
//     },
//     onValuesChange(_, values) {
//         console.log(values);
//     },
// })((props) => {
//     const { getFieldDecorator } = props.form;
//     return (
//         <Form layout="inline">
//             <FormItem label="Username">
//                 {getFieldDecorator('username', {
//                     rules: [{ required: true, message: 'Username is required!' }],
//                 })(<Input />)}
//             </FormItem>
//         </Form>
//     );
// });

class DemoApp extends React.Component {
    state = {
        fields: {
            username: {
                value: 'benjycui',
            },
            password:  {
                value: 'nicaiya',
            },
        },
    }
    constructor(props){
        super(props)
        // 查询表单项
        this.formList = [
            {
                label: '搜索查询',
                type: 'input',
                field: 'searchContent',
                placeholder: "mac地址/设备名称/设备位置/",
                maxLength:'30'
            }
        ];
    }
    componentDidMount(){
        console.log(this.props,'this.props');
        console.log(this.formRef,'this.formRef');
        const { form } = this.formRef.props;
        const username = form.getFieldValue('username');
        console.log(username,'username');

        // form.setFieldsValue({
        //     username: username.trim()
        // });
    }
    handleChange = (changedFields) => {
        console.log(changedFields,'changedFields');
        this.setState(({ fields }) =>
            {
                // console.log({ fields },'fields是上一次的state', { ...fields, ...changedFields },
                //     'all--------------------------域');

                const o = { ...changedFields };
                console.log(o,'------去空格前');
                for(let i in o){
                    o[i].value = o[i].value === '' ? '':o[i].value.trim();
                }
                console.log(o,'...-------去空格');

                const newFields = {
                    // { ...fields, ...changedFields } 等效于 Object.assign({},objA,objB)
                    // fields: { ...fields, ...changedFields },
                    fields: { ...fields, ...o },
                }
                console.log(newFields,'...-------新的渲染值----------');
                return newFields;
            }
        );

        // const value =  changedFields.username.value;
        // this.formRef.props.form.setFieldsValue({
        //     username: value.trim()
        // });
    }
    handleReset=()=>{

    }
    render() {
        const fields = this.state.fields;
        // ref = { inst  => { this.formRef = inst }  }
        // wrappedComponentRef={ inst  => {this.formRef = inst}  }
        return (
            <div style={{padding: '15vh 8vh'}}>
                <Query
                    {...fields}
                    wrappedComponentRef={ inst => this.formRef = inst }
                    onChange={ this.handleChange }
                    keys = {['username','password']}
                />
                <pre className="language-bash">
                    {JSON.stringify(fields, null, 2)}
                </pre>
            </div>
        );
    }
}


class QueryForm extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount() {
        //this.props.form.validateFields();
    }
    // 生成表单项
    generateFormItems(){
        const { getFieldDecorator } = this.props.form;
        const { fields } = this.props || {};
        console.log('getFieldDecorator',getFieldDecorator);
        const ItemsArray = [];
        for(let i in fields){
            // ItemsArray.push(fields[i]);
            const field = fields[i];
            const keyName = i;
            const type = field.type;
            switch (type) {
                case 'input':
                    console.log();
                    const dom = <FormItem  style={{display:'block',marginBottom:'16px'}} key={i}>
                        {
                            getFieldDecorator(keyName, {
                                rules: [{ required: true, message: 'Username is required!' }],
                            })(<Input />)}
                        }
                    </FormItem>
                    ItemsArray.push(dom);
                    break;
            }
        }

        console.log(ItemsArray,'ItemsArray -------generateFormItems');
        return ItemsArray;
    }
    render(){
        const { getFieldDecorator,getFieldValue,formField } = this.props.form
        // const { getFieldDecorator } = props.form;;
        console.log(this.props,'this.props-------------------渲染中');
        return <div className="query-from">
            <Form  layout="inline">
                { this.generateFormItems() }
                {/*{*/}
                    {/*getFieldDecorator('username', {*/}
                    {/*rules: [{ required: true, message: 'Username is required!' }],*/}
                {/*})(<Input />)}*/}
             </Form>
        </div>
    }
}

// 自定义表单
const CustomizedForm = Form.create({
    onFieldsChange(props, changedFields) {
        console.log(changedFields,'执行顺序  第二执行');
        const fields = props.fields;
        for(let i in fields){
            const key = i;
            console.log(key,changedFields[key],'key------------');
            if(changedFields[key]!==undefined && changedFields[key].value!==undefined){
                changedFields[key].value = changedFields[key].value.trim()
            }
        }
        console.log(changedFields,'changedFields');
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        const fields = props.fields;

        const renderField = {
            // { ...props.fields.username,} 此句相当于 { value: props.username.value, label:'用户名' }
            username: Form.createFormField({ ...props.fields.username,})
        };
        const renderFields = {};

        for(let i in fields){
            const key = i;
            // console.log(key,'key------------');
            renderFields[key] = Form.createFormField({ ...fields[key],})
        }

        console.log(renderFields,'renderFields------------');
        // const news = Object.assign({},{...props.username},{value: props.username.value})
        // console.log(fieldsValue,{...props.username},{value: props.username.value},
        //     '------------fieldsValue-------------',news);
        console.log(renderField,'renderField');
        return renderFields;

        // // 创建渲染表单域
        // return {
        //     username: Form.createFormField({
        //         ...props.username, // 此句相当于 { value: props.username.value, label:'用户名' }
        //         // 这里没有必要，重复值
        //         // value: props.username.value,
        //     }),
        // };
    },
    onValuesChange(_, values) {
        console.log(values);
    },
})(QueryForm

//     (props) => {
//     const { getFieldDecorator } = props.form;
//     return (
//         <Form layout="inline">
//             <FormItem label="Username">
//                 {getFieldDecorator('username', {
//                     rules: [{ required: true, message: 'Username is required!' }],
//                 })(<Input />)}
//             </FormItem>
//         </Form>
//     );
// }

);



class Demo extends React.Component {
    state = {
        fields: {
            username: {
                value: 'benjycui',
                label: '用户名',
                type: 'input'
            },
            password: {
                value: 'mima',
                label: '密码',
                type: 'input'
            }
        },
    }
    handleFormChange = (changedFields) => {
        this.setState(({ fields }) => {
            console.log(fields,changedFields,'onchange  fields,changedFields');
            const newFields = {
                // 合并新旧值
                fields: { ...fields, ...changedFields },
            };
            console.log(newFields,'-------------newFields----------');
            return newFields;
            // return {
            //     fields: { ...fields, ...changedFields },
            // }
        });
    }
    render(){
        const fields = this.state.fields;
        console.log(this.state.fields,'this.state.fields');
        return (
            <div style={{padding: '15vh 15vh'}}>
                <CustomizedForm
                    {...fields}
                    fields = { this.state.fields }
                    onChange={this.handleFormChange}
                    wrappedComponentRef={ inst  => {this.formRef = inst}  }
                />
                <pre className="language-bash">
                    { JSON.stringify(fields, null, 2) }
                </pre>
            </div>
        )
    }
}








const App = Demo ||  DemoApp;
export default App;

