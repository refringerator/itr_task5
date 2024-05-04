import { RetweetOutlined } from "@ant-design/icons";
import { Input, Button, Flex, Tooltip } from "antd";
import debounce from "debounce";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSeed, generateSeed, settingsSelectors } from "src/store";

const update = debounce((v, f) => f(v), 400);

const Seed = () => {
  const dispatch = useDispatch();
  const seed = useSelector(settingsSelectors.getSeed);
  const [value, setValue] = useState(seed);

  useEffect(() => {
    setValue(seed);
  }, [seed]);

  const onClick = () => {
    dispatch(generateSeed());
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    update(e.target.value, (v: string) => dispatch(setSeed(v)));
  };

  return (
    <Flex gap="small" align="center">
      Seed:
      <Input
        style={{ width: "120px" }}
        placeholder="Seed"
        defaultValue={value}
        value={value}
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
