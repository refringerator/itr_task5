import CommandPanel from "./components/CommandPanel";

import Layout from "./components/Layout";
import Table from "./components/Table";

function App() {
  return (
    <Layout header={<CommandPanel />}>
      <Table />
    </Layout>
  );
}

export default App;
