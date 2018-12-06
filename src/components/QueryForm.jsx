/*
*  查询表单区域1
*
*/

import React, {PropTypes, Component}  from "react";
import { Input, DatePicker, Form, Button, Select,LocaleProvider,TreeSelect,Cascader  } from 'antd';

const { Item } = Form;

// 渲染方式二 纯函数组件
const PureForm = (props) => {
    const { getFieldDecorator } = props.form;
    return (
        <Form layout="inline">
            <Item label="Username">
                {
                    getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Username is required!' }],
                    })(<Input />)
                }
            </Item>
        </Form>
    );
}

// 渲染方式一React Class
class QueryForm extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount() {
        this.props.form.validateFields();
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        // if(this.props.loading) return;
        // typeof this.props.handleQuery === 'function' && this.props.handleQuery();
        // const { pathname } = this.props.location;
        // this.context.router.push({ pathname,query:{ pageIndex:1,timestamp:+new Date() }});
    }
    onChange(key,value,p3){
        console.log(key,'--p1---------',value,'------value------',p3,'p3');
    }
    render(){
        const { getFieldDecorator,getFieldValue, } = this.props.form;

        return <div className="query-from">
            <Form layout="inline">
                {
                    getFieldDecorator(`username`)(
                        <Input
                            style={{ width: 300,height: '35px',margin:'0 10px' }}
                            placeholder="请选择"
                            // onChange={ this.props.onChange.bind(this) }
                        />
                    )
                }
                {
                    getFieldDecorator('password', {
                        rules: [{
                            required: true,
                            message: 'password is required!'
                        }],
                    })(<Input />)
                }
                <Item style={{textAlign:'center',verticalAlign:'top'}}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="global-search-btn"
                        style={{marginRight:'15px'}}
                        onClick={ this.handleSubmit }
                    >
                        查询
                    </Button>
                    <Button className="global-search-reset" onClick={ this.props.handleReset }>
                        重置
                    </Button>
                </Item>
            </Form>
        </div>
    }
}

const Query = Form.create({
    onFieldsChange(props, changedFields) {
        // console.log(changedFields,'----------------onFieldsChange      第一次');
        // // const value = props.username.value.trim();
        // changedFields.username.value = changedFields.username.value.trim();
        props.onChange(changedFields);

    },
    mapPropsToFields(field) {
        //console.log({ ...field },'-----------------------')
        console.log({...field},'------{...field}--------表单上的所有属性');
        const keys = [...field.keys];
        // console.log(keys,'keys');
        // const getField = { ...field };
        const renderKeys = {};

        const getField = { ...field };
        const keysArr = [];
        for(let i in getField){
            keysArr.push(getField[i])
        }

        keys.forEach(keyName=>{
            if(typeof keyName ==='string'){
                renderKeys[keyName] =  Form.createFormField({
                    ...field[keyName],
                    // value: field.username.value,
                })
            }
        })

        console.log(keysArr,'--------------------------keysArr--------渲染数组');
        console.log(renderKeys,'--renderKeys');
        const username = Form.createFormField({
            ...field.username,
            // value: field.username.value,
        });

        const password = Form.createFormField({
            ...field.password,
            // value: field.password.value,
        });
        // console.log(username,'username');

        const renderField =  { username, password }
        // console.log(renderField,'-----------renderField------')
        return renderKeys;
    },
    onValuesChange(props, values) {
        console.log(props,values,'----------onValuesChange');
        // const value = values.username;
        // props.onChange({
        //     username: value.trim()
        // });
    },
})(QueryForm);


export default Query;


