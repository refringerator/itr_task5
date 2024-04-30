import AntConfigProvider from "./components/AntConfigProvider";
import CommandPanel from "./components/CommandPanel";

import Layout from "./components/Layout";

function App() {
  return (
    <AntConfigProvider>
      <Layout header={<CommandPanel />}>Content</Layout>
    </AntConfigProvider>
  );
}

export default App;
