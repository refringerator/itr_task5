import { Flex } from "antd";

import ErrorInput from "./ErrorInput";
import ExportButton from "./ExportButton";
import RegionSelector from "./RegionSelector";
import Seed from "./Seed";

const CommandPanel = () => {
  return (
    <Flex style={{ width: "100vw" }} justify={"space-around"}>
      <RegionSelector />
      <ErrorInput />
      <Seed />
      <ExportButton />
    </Flex>
  );
};
export default CommandPanel;
