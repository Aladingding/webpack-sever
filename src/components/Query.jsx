/*
*  查询表单区域0
*
*/

import React, {PropTypes, Component}  from "react";
import { Input, DatePicker, Form, Button, Select,LocaleProvider,TreeSelect,Cascader  } from 'antd';

import zhCN from 'antd/lib/locale-provider/zh_CN';
const { Item } = Form;
const { Option } = Select;

class Linkage3 extends React.Component {
    // 默认方法
    static getDerivedStateFromProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            return {
                ...(nextProps.value || {}),
            };
        }
        return null;
    }
    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            number: value.number || 0,
            currency: value.currency || 'rmb',
        };
    }
    handleCurrencyChange = (currency) => {
        if (!('value' in this.props)) {
            this.setState({ currency });
        }
        this.triggerChange({ currency });
    }
    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }
    render() {
        return (
            <span>
               <TreeSelect
                   dropdownStyle ={{width: '500px',height: 300}}
                   style={{ width: 300 }}
                   // value={ }
                   treeData={ this.props.treeData }
                   placeholder="请选择"
                   onChange={this.props.onChange.bind(this)}
               />
            </span>
        )
    }
}

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
        // To disabled submit button at the beginning.
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
        const { getFieldDecorator,getFieldValue,dynamicAdd } = this.props.form;
        const { formList } = this.props || {};


        const FormItems = Array.isArray(formList) && formList.length>0 && formList.map((item,i)=>{

            const {
                label, type, field, placeholder, maxLength,
                initialValue, size, colon, className,format,options,keys,hideDefaultKeys,
            } = item || {};

            const style = {
                width: size ? (this.size[size] || size) : this.size['default']
            };

            switch (type) {
                case 'select':
                    return <Item label={label} className={ className } key={i}>
                        {
                            getFieldDecorator([field])(
                                <Select style={ style } dropdownMatchSelectWidth={false}>
                                    { this.getOptions(keys,options,hideDefaultKeys) }
                                </Select>
                            )
                        }
                    </Item>
                    break;
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
    onChange(key,value,p3){
        console.log(key,'--p1---------',value,'------value------',p3,'p3');

        // this.setState({ value });
        // this.props.form.setFieldsValue({
        //     opts: value
        // })

        if(value===''){
            const keys = this.props.form.getFieldValue('keys');
            console.log(keys.length,'leng');
            for(let i=key;i<keys.length-1;i++){
                this.props.form.setFieldsValue({
                    [`account${i+1}`]: ''
                })
                this.dataTrees[i+1] = [];
            }
        }
    }
    onChange(key,value,p3){
        console.log(key,'--p1---------',value,'------value------',p3,'p3');

        // this.setState({ value });
        // this.props.form.setFieldsValue({
        //     opts: value
        // })

        if(value===''){
            const keys = this.props.form.getFieldValue('keys');
            console.log(keys.length,'leng');
            for(let i=key;i<keys.length-1;i++){
                this.props.form.setFieldsValue({
                    [`account${i+1}`]: ''
                })
                this.dataTrees[i+1] = [];
            }
        }

    }
    render(){
        const { getFieldDecorator,getFieldValue,
            dynamicAdd,dynamicRender,
            dataTrees,
        } = this.props.form;

        // 绑定动态新增
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');

        console.log(keys,'keys---------------------query');

        const formOpt = keys.map((k,index)=>{
            return (
                <Item
                    label={'查询范围'}
                    key={k}
                >
                    {getFieldDecorator(`account${k}`)(
                        <TreeSelect
                            dropdownStyle ={{ width: '500px',height: 300 }}
                            style={{ width: 300 }}
                            treeData={ this.props.dataTrees[index] }
                            placeholder="请选择"
                            onChange={ this.props.onChange.bind(this,k) }
                        />
                    )}
                </Item>
            )
        })

        return <div className="query-from">
            <Form layout="inline">
                {
                    formOpt
                }
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


