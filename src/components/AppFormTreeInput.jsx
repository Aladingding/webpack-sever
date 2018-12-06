
import React, { Component,PropTypes } from "react";
import 'antd/dist/antd.css';
import Dynamic from './Dynamic.jsx';
import TenField from './TenField.jsx';
import LazyOptions from './LazyOptions.jsx';

import Query from './Query.jsx';
import _ from 'lodash';

import { Form,  Card, Input, Select, Button,Cascader  } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class PriceInput extends React.Component {
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
        const { size } = this.props;
        const state = this.state;
        return (
            <span style={{ width: '300px' }}>
        <Select
            value={state.currency}
            size={size}
            style={{ width: '300px' }}
            onChange={this.handleCurrencyChange}
        >
          <Option value="rmb">RMB</Option>
          <Option value="dollar">Dollar</Option>
        </Select>
      </span>
        );
    }
}

class Demo extends React.Component {
    static contextTypes = {
        // router: PropTypes.object.isRequired
    }
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.formRef.props.form.validateFields();

        const { form } =  this.formRef.props;
        console.log(form,'----------form-----------');
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(keys.length);
        // // can use data-binding to set
        // // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    handleChange(value){
        console.log(value,'value');
    }
    // 查询表单项
    formList = [
        // {
        //     label: '查询范围',
        //     type: 'treeSelect',
        //     field: '',
        //     initialValue: '',
        //     options: [{
        //         productId: '',
        //         productName: '请选择' ,
        //     }],
        //     keys: {
        //         id:'productId',
        //         name:'productName'
        //     },
        //     size: 'small',
        // },
        // {
        //     label: '设备类型',
        //     type: 'select',
        //     field: 'productId',
        //     initialValue: '',
        //     options: [{
        //         productId: '',
        //         productName: '请选择' ,
        //     }],
        //     keys: {
        //         id:'productId',
        //         name:'productName'
        //     },
        //     size: 'small',
        // },
        {
            label: '创建时间',
            type: 'time',
            field: 'createTime',
            initialValue: new Date(),
            colon: true,
            placeholder: "创建时间",
            size: 'small',
        },
        {
            type: 'input',
            field: 'searchContent',
            placeholder: "请输入方案名称或使用单位",
            maxLength:'30'
        }
    ]
    dataTrees = [
        [
            {title: '请选择', value: '', key: '',},
            {title: '湖北', value: '0', key: 0,
                children: [
                    {
                        title: '武汉',
                        value: '1',
                        key: 1,
                        children: [
                            {
                                title: '光明新区',
                                value: '111',
                                key: 111,
                                level: 3
                            },
                            {
                                title: '江南区',
                                value: '222',
                                key: 222,
                                level: 3
                            }
                        ],
                    },
                    {
                        title: '湘潭',
                        value: '20',
                        key: 20,
                    }
                ],
            },
            {title: '广西', value: '3', key: 3,}
        ],
        [
            {title: '请选择', value: '', key: '',},
            {title: '深圳', value: '4', key: 4,}
        ],
        [
            {title: '请选择', value: '', key: '',},
            {title: '福田', value: '6', key: 6,},
            {title: '南山', value: '5', key: 5,}
        ]
    ];
    onChange(key,value,p3){
        console.log(key,'--p1---------',value,'------value------',p3,'p3');

        // this.setState({ value });
        // this.props.form.setFieldsValue({
        //     opts: value
        // })

        if(value===''){
            const keys = this.formRef.props.form.getFieldValue('keys');
            console.log(keys.length,'leng');
            for(let i=key;i<keys.length-1;i++){
                this.props.form.setFieldsValue({
                    [`account${i+1}`]: ''
                })
                this.dataTrees[i+1] = [];
            }
        }
        function findValue(sourceData, value, res) {
            const result = res || {};
            if (sourceData instanceof Array) {
                for (let i = 0; sourceData[i]; i++) {
                    const item = sourceData[i];
                    if (item.value === value){
                        res.title = item.title;
                        res.value = item.value;
                        res.key = item.key;
                        res.level = item.level;
                        return res;
                    }
                    item.children && findValue(item.children, value, result);
                }
                return result;
            }
        }

        // 根据选中id查询展开列表子级
        if(key===0 && value!==''){
            const dataLinkage = this.dataTrees[0];
            const selectItem = findValue(dataLinkage,value,{});
            console.log(selectItem,'selectItem');

            const { form } =  this.formRef.props;
            if(+selectItem.level===3){
                console.log(form,'----------form-----------');
                // can use data-binding to get
                const keys = form.getFieldValue('keys');
                if(keys.length<2){
                    const nextKeys = keys.concat(keys.length);
                    console.log(nextKeys,'nextKeys');
                    form.setFieldsValue({
                        keys: [0,1]
                    });

                    form.setFieldsValue({
                        [`account${1}`]: ''
                    });
                }
            }
            else{
                form.setFieldsValue({
                    keys: [0]
                });
            }
        }


        // https://blog.csdn.net/u012907049/article/details/71540970
    }
    findValue(sourceData, value, res) {
        const result = res || {};
        if (sourceData instanceof Array) {
            for (let i = 0; sourceData[i]; i++) {
                const item = sourceData[i];
                if (item.value === value){
                    res.title = item.title;
                    res.value = item.value;
                    res.key = item.key;
                    res.level = item.level;
                    return res;
                }
                item.children && findValue(item.children, value, result);
            }
            return result;
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <section>
                <LazyOptions />
                <Dynamic dynamicRender = { true } />
                <Query
                    dynamicRender = { true }
                    dataTrees = { this.dataTrees }
                    formList={ this.formList }
                    handleReset = { this.handleReset }
                    onChange = { this.onChange.bind(this) }
                    wrappedComponentRef={ instance  => this.formRef = instance  }
                    loading={ false }
                    location={ this.props.location }
                />
            </section>
        )
            // || <TenField/>
            // || <Dynamic></Dynamic>
            // || (
            //     {/*<Form layout="inline" onSubmit={this.handleSubmit}>
            //     <FormItem label="Price">
            //         {getFieldDecorator('price', {
            //             initialValue: { number: 0, currency: 'rmb' },
            //
            //         })(<PriceInput onChange = {this.handleChange.bind(this)}  />)}
            //     </FormItem>
            //     <FormItem>
            //         <Button type="primary" htmlType="submit">Submit</Button>
            //     </FormItem>
            // </Form>*/}
            // );
    }
}
const App = Form.create()(Demo);
export default App;

