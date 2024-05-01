import { useState } from "react";
import type { InputNumberProps } from "antd";
import { Col, InputNumber, Slider, Flex } from "antd";
import { useDispatch } from "react-redux";
import { setErrors } from "src/store";

const ErrorInput = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(0);
  const onChange: InputNumberProps["onChange"] = (value) => {
    if (isNaN(value as number)) {
      return;
    }
    setInputValue(value as number);
    dispatch(setErrors(value as number));
  };

  return (
    <Flex gap="small" align="center">
      <Col>Errors:</Col>
      <Col span={12}>
        <Slider
          min={0}
          max={10}
          onChange={onChange}
          value={typeof inputValue === "number" ? inputValue : 0}
          step={0.25}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={0}
          max={1000}
          step={1}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </Flex>
  );
};
export default ErrorInput;
