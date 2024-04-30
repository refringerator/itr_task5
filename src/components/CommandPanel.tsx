import ErrorInput from "./ErrorInput";
import ExportButton from "./ExportButton";
import RegionSelector from "./RegionSelector";
import Seed from "./Seed";

const CommandPanel = () => {
  return (
    <>
      <RegionSelector />
      <ErrorInput />
      <Seed />
      <ExportButton />
    </>
  );
};
export default CommandPanel;
