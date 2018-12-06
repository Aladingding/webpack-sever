const { Form, Input } = antd;

const FormItem = Form.Item;

const CustomizedForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props,p2,p3) {
        console.log(props,'props');
        // console.log(Form.createFormField({
        //     ...props.username,
        //     value: props.username.value,
        //   }),'--------????');
        // console.log({
        //   username: Form.createFormField({
        //     ...props.username,
        //     value: props.username.value,
        //   }),
        // },'--------最终执行值');

//      const keyName = props ? (()=>{
//      })():'';
        for(let i in props){
            console.log(i,'----------建值');
            //return i;
        }
        //console.log(keyName,'keyName');
        return {
            username: Form.createFormField({
                ...props.username,
                value: props.username.value,
            }),
            password: Form.createFormField({
                ...props.password,
                value: props.password.value,
            }),
        };
    },
    onValuesChange(_, values) {
        console.log(values);
    },
})((props) => {
    const { getFieldDecorator } = props.form;
    return (
        <Form layout="inline">
        <FormItem label="Username">
        {getFieldDecorator('username', {
        rules: [{ required: true, message: 'Username is required!' }],
    })(<Input />)}
</FormItem>
    <FormItem label="Password">
        {getFieldDecorator('password', {
        rules: [{ required: true, message: 'password is required!' }],
    })(<Input />)}
</FormItem>
    </Form>
);
});

class Demo extends React.Component {
    state = {
        fields: {
            username: {
                value: 'benjycui',
            },
            password:  {
                value: 'nicaiya',
            },
        },
    };

    handleFormChange = (changedFields) => {
        this.setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }));
    }
    render() {
        const fields = this.state.fields;
        return (
            <div>
            <CustomizedForm {...fields} onChange={this.handleFormChange} />
        <pre className="language-bash">
            {JSON.stringify(fields, null, 2)}
    </pre>
        </div>
    );
    }
}

const App = Demo;
export default App;