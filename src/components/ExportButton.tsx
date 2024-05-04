import { Button, Flex } from "antd";
import { shallowEqual, useSelector } from "react-redux";
import { API_URL } from "src/constants";
import { settingsSelectors } from "src/store";

const ExportButton = () => {
  const { region, seed, mistakes } = useSelector(
    settingsSelectors.getParams,
    shallowEqual
  );
  const skip = useSelector(settingsSelectors.getSkip);

  const handleDownload = () => {
    const fileUrl = `${API_URL}/users_csv/?region=${region}&seed=${seed}&mistakes=${mistakes}&skip=${skip}`;

    // Create a link element
    const link = document.createElement("a");
    link.href = fileUrl;

    // Programmatically trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Flex gap="small" align="center">
      <Button onClick={handleDownload} size="large">
        Export
      </Button>
    </Flex>
  );
};

export default ExportButton;
