import { Flex, Select } from "antd";

const RegionSelector = () => {
  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value);
  };

  return (
    <Flex gap="small" align="center">
      Region:
      <Select
        labelInValue
        defaultValue={{ value: "lucy", label: "Lucy (101)" }}
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          {
            value: "jack12312",
            label: "Jack (100)jack12312",
          },
          {
            value: "lucy",
            label: "Lucy (101)",
          },
        ]}
      />
    </Flex>
  );
};

export default RegionSelector;
