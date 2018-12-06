import React, { Component,PropTypes } from "react";
import { Form,  Card, Input, Select, Button,Cascader  } from 'antd';

const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        isLeaf: false,
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        isLeaf: false,
    }
];

class LazyOptions extends React.Component {
    state = {
        options,
    };
    onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    }

    loadData = (selectedOptions) => {
        console.log(selectedOptions,'selectedOptions');
        const targetOption = selectedOptions[selectedOptions.length - 1];
        console.log(targetOption,'targetOption');
        targetOption.loading = true;

        // load options lazily
        setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = [{
                label: `${targetOption.label} Dynamic 1`,
                value: 'dynamic1',
            }, {
                label: `${targetOption.label} Dynamic 2`,
                value: 'dynamic2',
            }];
            this.setState({
                options: [...this.state.options],
            });
        }, 3000);

    }
    render() {
        console.log(this.state.options,'this.state.options');
        return (
            <Cascader
                options={this.state.options}
                loadData={this.loadData}
                onChange={this.onChange}
                changeOnSelect
            />
      );
    }
}

export default LazyOptions;