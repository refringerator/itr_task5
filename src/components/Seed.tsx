import { RetweetOutlined } from "@ant-design/icons";
import { Input, Button, Flex, Tooltip } from "antd";

const Seed = () => (
  <Flex gap="small" align="center">
    Seed:
    <Input placeholder="Seed" />
    <Tooltip title="generate">
      <Button shape="circle" icon={<RetweetOutlined />} size="large" />
    </Tooltip>
  </Flex>
);

export default Seed;
