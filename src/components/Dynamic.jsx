
import React, { Component } from "react";



import { Form, Input, Icon, Button,TreeSelect } from 'antd';

const FormItem = Form.Item;


// 三级联动
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
        console.log(value,'value');
        this.state = {
            value: value.value,
        };
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
                   treeData={ this.props.treeData }
                   placeholder="请选择"
                   onChange={this.triggerChange.bind(this)}
               />
            </span>
        )
    }
}




class DynamicFieldSet extends React.Component {
    state = {
        keys: [1]
    }
    // 动态移除
    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }
    // 动态新增
    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(keys.length);
        // can use data-binding to set
        // important! notify form to detect changes
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
    dataTrees = [
        [
            {title: '请选择', value: '', key: '',},
            {title: '湖北', value: '0', key: 0,
                children: [
                    {
                        title: '武汉',
                        value: '1',
                        key: 1,
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
    render() {
        const { getFieldDecorator, getFieldValue,getFieldsValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };

        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        // 绑定keys,getFieldValue('keys')返回一个keys数组
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');

        const formItems = keys.map((k, index) => {
            return (
                <FormItem
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'Passengers' : ''}
                    required={false}
                    key={k}
                >
                    {
                        getFieldDecorator(`account${k}`, {
                            validateTrigger: ['onChange', 'onBlur'],
                        }
                    )(
                        <TreeSelect dropdownStyle ={{width: '500px',height: 300}}
                            style={{ width: 300 }}
                            treeData={this.dataTrees[k]}
                            placeholder="请选择"
                            onChange={this.onChange.bind(this,k)}
                        />
                    )}
                    {keys.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={keys.length === 1}
                            onClick={() => this.remove(k)}
                        />
                    ) : null}
                </FormItem>
            );
        });


        return (
            <Form onSubmit={this.handleSubmit}>
                { formItems }
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> Add field
                    </Button>
                </FormItem>
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        );
    }
}

const Dynamic = Form.create()(DynamicFieldSet);
export default Dynamic;

