import { useEffect, useState } from "react";
import { Space } from "antd";
import { User, useLazyGetUsersQuery } from "src/service/users";
import Table from "./Table";

const params = {
  mistakes: 0,
  seed: "string",
  region: "en",
};

const limit = 20;

const InfiniteScrollTable = () => {
  const [rows, setRows] = useState<User[]>([]);
  const [skip, setSkip] = useState(0);
  const [fetching, setFetching] = useState(false);

  const [trigger, { data, isLoading }] = useLazyGetUsersQuery({
    ...params,
    skip,
    limit,
  });

  useEffect(() => {
    trigger({
      ...params,
      skip,
      limit,
    });
  }, []);

  useEffect(() => {
    if (!isLoading)
      if (data) {
        setRows([...rows, ...data.items]);
        setFetching(false);
      }
  }, [data?.offset, isLoading]);

  const onScroll = (e) => {
    const st = e.currentTarget.scrollTop;
    const stm = e.currentTarget.scrollHeight;
    const p = st / stm;
    const dif = stm - st;

    console.log({ dif, isLoading, fetching, st, stm, e });

    if (isLoading || fetching) return;

    if (dif < 1000) {
      setFetching(true);
      trigger({ ...params, skip: skip + limit, limit });
      setSkip(skip + limit);
    }
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Table data={rows} onScroll={onScroll} />
    </Space>
  );
};

export default InfiniteScrollTable;
