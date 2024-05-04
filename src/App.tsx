import { Layout, CommandPanel, InfiniteScrollUserTable } from "src/components";

function App() {
  return (
    <Layout header={<CommandPanel />}>
      <InfiniteScrollUserTable />
    </Layout>
  );
}

export default App;
