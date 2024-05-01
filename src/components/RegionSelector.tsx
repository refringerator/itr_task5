import { Flex, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { settingsSelectors, setLocale } from "src/store";

const RegionSelector = () => {
  const dispatch = useDispatch();
  const locale = useSelector(settingsSelectors.getLocale);

  const handleChange = (value: { value: string; label: string }) => {
    dispatch(setLocale(value));
  };

  return (
    <Flex gap="small" align="center">
      Locale:
      <Select
        labelInValue
        defaultValue={locale}
        style={{ minWidth: 120 }}
        onChange={handleChange}
        options={[
          {
            value: "en",
            label: "English",
          },
          {
            value: "fr",
            label: "French",
          },
          {
            value: "de",
            label: "German",
          },
        ]}
      />
    </Flex>
  );
};

export default RegionSelector;
