import React from 'react'
import Select, { components } from 'react-select'



const MultiValueRemove = (props) => {
    if (props.data.isFixed) {
        return null;
    }
    return <components.MultiValueRemove {...props} />;
};

const users = ({ users }) => {
    console.log(users)
    let endList = []
    users.forEach(user => endList.push({ value: user.pk, label: user.first_name + ' ' + user.last_name }))
    return endList
}

const options = [
    { value: 'chocolate', label: 'Chocolate', isFixed: true },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const MyComponent = () => (
    <Select isMulti options={users} defaultValue={[users[0]]} isClearable={false}
        components={{ MultiValueRemove }} />
)

export default MyComponent
