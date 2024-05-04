import { Flex } from "antd";
import { ErrorInput, ExportButton, RegionSelector, Seed } from "src/components";

const CommandPanel = () => {
  return (
    <Flex style={{ width: "100%" }} justify={"space-between"}>
      <RegionSelector />
      <ErrorInput />
      <Seed />
      <ExportButton />
    </Flex>
  );
};
export default CommandPanel;
