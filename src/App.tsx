import AntConfigProvider from "./components/AntConfigProvider";
import CommandPanel from "./components/CommandPanel";

import Layout from "./components/Layout";
import Table from "./components/Table";

function App() {
  return (
    <AntConfigProvider>
      <Layout header={<CommandPanel />}>
        <Table />
      </Layout>
    </AntConfigProvider>
  );
}

export default App;
