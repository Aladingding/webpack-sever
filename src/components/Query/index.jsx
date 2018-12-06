/*
*  查询表单区域 22
*
*/

import React, {PropTypes, Component}  from "react";
import { Input, DatePicker, Form, Button, Select, LocaleProvider, Cascader } from 'antd';

import zhCN from 'antd/lib/locale-provider/zh_CN';
import './index.less';
const { Item } = Form;
const { Option } = Select;

class QueryForm extends Component {
    size = {
        large: '250px',
        default: '200px',
        small: '150px'
    }
    // static contextTypes = {
    //     router: PropTypes.object.isRequired
    // }
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
    // 返回select的option选项 hideDefaultKeys默认为false
    getOptions =(keys,data,hideDefaultKeys)=>{
        if(Array.isArray(data) && data.length>0){
            const Options = data.map((item,idx) => <Option value={item[keys['id']]} key={idx}>
                    { item[keys['name']] }
                </Option>
            );
            // console.log(hideDefaultKeys,data,keys,'hideDefaultKeys data keys');
            // 添加请选择选项，默认都添加
            // if(data[0].id !=='' /*hideDefaultKeys*/){
            //     console.log(keys['name'],'keys["name"]');
            //     Options.unshift(<Option value={''} key={ keys.name /*keys['name']*/}>请选择</Option>)
            // }
            return Options;
        }
        return <Option value={''} key={keys['name']}>请选择</Option>;
    }
    // 返回表单项
    getFormItems(){
        const { getFieldDecorator } = this.props.form;
        const { formList } = this.props || {};
        const FormItems = Array.isArray(formList) && formList.length>0 && formList.map((item,i)=>{

            const {
                label, type, field, placeholder,
                maxLength, initialValue, size, colon, className,
                format, options, keys, hideDefaultKeys, event,
            } = item || {};

            const style = {
                width: size ? (this.size[size] || size) : this.size['default']
            };

            switch (type) {
                // 级联选择器
                case 'cascade':
                    // console.log(size,'cascade size');
                    return <Item  style={{display:'block',marginBottom:'16px'}} label={label} className={ className } key={i}>
                        {
                            getFieldDecorator(field)(
                                <Cascader
                                    placeholder = { placeholder }
                                    options={ options }
                                    loadData={ event.loadData }
                                    onChange={ event.onChange }
                                    changeOnSelect
                                    style={{width:size}}
                                />
                            )
                        }
                    </Item>
                    break;
                // 下拉选框
                case 'select':
                    return <Item label={label} className={ className } key={i}>
                        {
                            getFieldDecorator([field], {
                                valuePropName: 'value',
                                initialValue: initialValue
                            })(
                                <Select style={ style } dropdownMatchSelectWidth={false}>
                                    { this.getOptions(keys,options,hideDefaultKeys) }
                                </Select>
                            )
                        }
                    </Item>
                    break;
                // 输入框
                case 'input':
                    return <Item key={i}>
                        {
                            getFieldDecorator(field)(
                                <Input type="text"
                                       style={ style }
                                       placeholder={placeholder}
                                       autoComplete="off"
                                       maxLength={ maxLength || 20 }
                                />
                            )
                        }
                    </Item>;
                    break;
                // 时间日历选择控件
                case 'time':
                    return <Item key={i} label={label} colon={!!colon && true} className={className}>
                        {
                            <LocaleProvider locale={zhCN}>
                                {
                                    getFieldDecorator(field)(
                                        <DatePicker
                                            style={ style }
                                            showTime={ false }
                                            showToday={ false }
                                            placeholder={ placeholder || '请选择时间' }
                                            format={ format || 'YYYY-MM-DD' }
                                            locale={zhCN}
                                        />
                                    )
                                }
                            </LocaleProvider>
                        }
                    </Item>
                    break;

            };
        })
        return FormItems;
    }
    render(){
        return <div className="query-from">
            <Form layout="inline" >
                { this.getFormItems() }
                <Item style={{textAlign:'center'}}>
                    <Button type="primary"
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

const Query = Form.create()(QueryForm);
export default Query;




