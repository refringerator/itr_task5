import { Space } from "antd";
import { UsersTable } from "src/components";
import useObsElementsAndQuery from "src/hooks/useObsElementsAndQuery";

const params = {
  mistakes: 10,
  seed: "string",
  region: "en",
};

const limit = 20;

const InfiniteScrollUserTable = () => {
  const rows = useObsElementsAndQuery(params, limit);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <UsersTable data={rows} />
    </Space>
  );
};

export default InfiniteScrollUserTable;
