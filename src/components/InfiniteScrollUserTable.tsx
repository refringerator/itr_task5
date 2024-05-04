import { Space } from "antd";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useSelector } from "react-redux";
import { UsersTable } from "src/components";
import { settingsSelectors } from "src/store";

const InfiniteScrollUserTable = () => {
  const params = useSelector(settingsSelectors.getParams);

  console.log(params);

  const { ref, inView } = useInView({
    threshold: 1,
    trackVisibility: true,
    delay: 200,
    triggerOnce: true,
  });

  const fetchUsers = async ({ queryKey, pageParam }) => {
    const { seed, region, mistakes } = queryKey[1];
    const { skip = 0, limit = 20 } = pageParam || {};

    const res = await fetch(
      `http://127.0.0.1:9191/users/?region=${region}&seed=${seed}&mistakes=${mistakes}&skip=${skip}&limit=${limit}`
    );
    return res.json();
  };

  const { isLoading, isFetching, data, fetchNextPage } = useInfiniteQuery(
    ["users", { ...params }],
    fetchUsers,
    {
      getNextPageParam: (lastPage, pages) => lastPage.next_page,
    }
  );

  useEffect(() => {
    if (!isFetching) fetchNextPage();
  }, [inView]);

  if (isLoading) return <h1>LOADING</h1>;

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <UsersTable
        data={(data?.pages.flatMap((page) => [...page.items]) || []).map(
          (v, i, a) => ({ ...v, ref: i === a.length - 1 ? ref : null })
        )}
      />
    </Space>
  );
};

export default InfiniteScrollUserTable;
