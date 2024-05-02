import CommandPanel from "./components/CommandPanel";

import Layout from "./components/Layout";
import InfiniteScrollTable from "./components/InfiniteScrollTable";

function App() {
  return (
    <Layout header={<CommandPanel />}>
      <InfiniteScrollTable />
    </Layout>
  );
}

export default App;
