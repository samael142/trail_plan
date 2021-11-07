import React from "react";
import { useParams } from "react-router-dom";




const TableItem = ({item}) => {
    return (
        <tr>
            <td>{item.good}</td>
            <td>{item.quantity}</td>
            <td>{item.unit}</td>
            <td>{item.price}</td>
            <td>{item.user}</td>
        </tr>
    )
}

const TableItemsList = ({items}) => {
    let { id } = useParams()
    let filtered_items = items.filter((item) => item.table === +id)
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Название</th>
                <th>Количество</th>
                <th>Единиц</th>
                <th>Цена</th>
                <th>Кто</th>
            </tr>
            </thead>
            <tbody>
            {filtered_items.map((item) => <TableItem item={item}/>)}
            </tbody>
        </table>
    )
}


export default TableItemsList