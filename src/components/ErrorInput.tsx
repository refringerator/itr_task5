import { useState } from "react";
import type { InputNumberProps } from "antd";
import { Col, InputNumber, Row, Slider } from "antd";

const ErrorInput = () => {
  const [inputValue, setInputValue] = useState(0);
  const onChange: InputNumberProps["onChange"] = (value) => {
    if (isNaN(value as number)) {
      return;
    }
    setInputValue(value as number);
  };

  return (
    <p>
      panel{" "}
      <Row>
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
            style={{ margin: "0 16px" }}
            step={1}
            value={inputValue}
            onChange={onChange}
          />
        </Col>
      </Row>
    </p>
  );
};
export default ErrorInput;
