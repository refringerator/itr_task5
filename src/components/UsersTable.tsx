import { Table } from "antd";
import type { TableProps } from "antd";
import { LegacyRef } from "react";

export interface RecordType {
  index: number;
  id: string;
  name: string;
  address: string;
  phone: string;
  ref?: LegacyRef<HTMLSpanElement>;
}

const columns: TableProps<RecordType>["columns"] = [
  {
    title: "#",
    dataIndex: "index",
    width: 40,
    render: (_, record) => <span ref={record?.ref}>{record.index}</span>,
  },
  {
    title: "ID",
    dataIndex: "id",
    width: 180,
  },
  {
    title: "Full name",
    dataIndex: "name",
    width: 100,
  },
  {
    title: "Address",
    dataIndex: "address",
    width: 160,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    width: 100,
  },
];

const HeadersAndPaddingSize = 48 + 60 + 30;

const UsersTable = ({ data }: { data: RecordType[] }) => {
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

export default UsersTable;
