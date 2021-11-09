import React from 'react'
import Select, {components} from 'react-select'


const MultiValueRemove = (props) => {
    if (props.data.isFixed) {
        return null;
    }
    return <components.MultiValueRemove {...props} />;
};

const MultiUserSelect = ({users, usersState}) => (
    <Select isMulti options={users}
            defaultValue={[users.find(el => el.value === parseInt(localStorage.getItem('loginId')))]}
            isClearable={false}
            components={{MultiValueRemove}} onChange={(event) => usersState(event)}/>
)

export default MultiUserSelect
