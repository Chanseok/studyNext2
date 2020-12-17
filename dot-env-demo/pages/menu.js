import React from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: '메뉴',
        dataIndex: '메뉴',
        key: '메뉴',
    },
    {
        title: '가격',
        dataIndex: '가격',
        key: '가격',
    },
];


export default function Menu(props) {

    return (
        <>
            <Table dataSource={props.menu} columns={columns} rowKey={'메뉴'}></Table>
        </>
    )

}

Menu.getInitialProps = async () => {
    const response = await fetch('http://localhost:3000/api/menudata');
    const menu = await response.json();

    return { menu }
}
