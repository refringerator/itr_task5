import React, { useEffect, useMemo, useState } from "react";
import { Space, Table } from "antd";
import type { TableProps } from "antd";
import { useGetUsersQuery, useLazyGetUsersQuery } from "src/service/users";

interface RecordType {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  address1: string;
  address2: string;
  address3: string;
}

const fixedColumns: TableProps<RecordType>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    width: 100,
  },
  {
    title: "FistName",
    dataIndex: "firstName",
    width: 120,
  },
  {
    title: "LastName",
    dataIndex: "lastName",
    width: 120,
  },
  {
    title: "Address 3",
    dataIndex: "address3",
    width: 120,
  },
];

const columns: TableProps<RecordType>["columns"] = [
  {
    title: "#",
    dataIndex: "index",
    width: 100,
  },
  {
    title: "ID",
    dataIndex: "id",
    width: 100,
  },
  {
    title: "Full name",
    dataIndex: "name",
    width: 120,
  },
  {
    title: "Address",
    dataIndex: "address",
    width: 120,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    width: 120,
  },
];

const MyTable = ({ data, onScroll }) => {
  const containerHeight = window.innerHeight - 48 - 60 - 30;

  return (
    <Table
      bordered={true}
      virtual
      columns={columns}
      //   sticky={{ offsetHeader: 64 }}
      scroll={{ y: containerHeight }}
      rowKey="id"
      dataSource={data}
      pagination={false}
      onScroll={onScroll}
    />
  );
};

export default MyTable;
