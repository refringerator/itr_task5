import { Table } from "antd";
import type { TableProps } from "antd";

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
    render: (_, record) => <span ref={record?.ref}>{record.index}</span>,
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

const HeadersAndPaddingSize = 48 + 60 + 30;

const MyTable = ({ data }) => {
  const containerHeight = window.innerHeight - HeadersAndPaddingSize;

  return (
    <Table
      virtual
      rowKey="id"
      columns={columns}
      dataSource={data}
      scroll={{ y: containerHeight }}
      bordered={true}
      pagination={false}
    />
  );
};

export default MyTable;
