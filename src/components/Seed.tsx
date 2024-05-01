import { RetweetOutlined } from "@ant-design/icons";
import { Input, Button, Flex, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSeed, generateSeed, settingsSelectors } from "src/store";

const Seed = () => {
  const dispatch = useDispatch();
  const seed = useSelector(settingsSelectors.getSeed);

  const onClick = () => {
    dispatch(generateSeed());
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSeed(e.target.value));
  };

  return (
    <Flex gap="small" align="center">
      Seed:
      <Input
        style={{ width: "120px" }}
        placeholder="Seed"
        defaultValue={seed}
        value={seed}
        onChange={onChange}
      />
      <Tooltip title="generate">
        <Button
          shape="circle"
          icon={<RetweetOutlined />}
          size="large"
          onClick={onClick}
        />
      </Tooltip>
    </Flex>
  );
};

export default Seed;
