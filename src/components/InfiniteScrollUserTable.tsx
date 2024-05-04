import { Space } from "antd";

import { UsersTable } from "src/components";
import useObsElementsAndQuery from "src/hooks/useObsElementsAndQuery";

const InfiniteScrollUserTable = () => {
  const { rows, isLoading } = useObsElementsAndQuery();

  if (isLoading) return <h1>LOADING</h1>;

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <UsersTable data={rows} />
    </Space>
  );
};

export default InfiniteScrollUserTable;
