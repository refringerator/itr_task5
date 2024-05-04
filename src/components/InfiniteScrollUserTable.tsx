import { Space } from "antd";
import Table from "./Table";
import useObsElements from "src/hooks/useObsElements";

const params = {
  mistakes: 10,
  seed: "string",
  region: "en",
};

const limit = 20;

const InfiniteScrollUserTable = () => {
  const rows = useObsElements(params, limit);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Table data={rows} />
    </Space>
  );
};

export default InfiniteScrollUserTable;
