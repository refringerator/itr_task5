import React from "react";
import { Space, Table } from "antd";
import type { TableProps } from "antd";
import { useGetUsersQuery } from "src/service/users";

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

// const getData = (count: number) => {
//   const data: RecordType[] = new Array(count).fill(null).map((_, index) => ({
//     id: index,
//     index: index,
//     full_name: `First_${index.toString(16)}`,
//     lastName: `Last_${index.toString(16)}`,
//     telephone: 25 + (index % 10),
//     address: `New York No. ${index} Lake Park`,
//   }));

//   return data;
// };

const params = {
  skip: 0,
  limit: 20,
  mistakes: 0,
  seed: "string",
  region: "en",
};

const InfiniteScrollTable = () => {
  const { data: users, isLoading, isFetching } = useGetUsersQuery(params);

  const bordered = true;
  const count = 10000;

  const tblRef: Parameters<typeof Table>[0]["ref"] = React.useRef(null);
  // const data = React.useMemo(() => getData(count), [count]);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Table
        bordered={bordered}
        virtual
        columns={columns}
        scroll={{ y: 400 }}
        rowKey="id"
        dataSource={users}
        pagination={false}
        ref={tblRef}
      />
    </Space>
  );
};

export default InfiniteScrollTable;
