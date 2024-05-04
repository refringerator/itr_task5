import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { shallowEqual, useSelector } from "react-redux";
import { settingsSelectors } from "src/store";
import { API_URL } from "src/constants";

const fetchUsers = async ({ queryKey, pageParam }) => {
  const { seed, region, mistakes } = queryKey[1];
  const { skip = 0, limit = 20 } = pageParam || {};

  const result = await fetch(
    `${API_URL}/users/?region=${region}&seed=${seed}&mistakes=${mistakes}&skip=${skip}&limit=${limit}`
  );
  return result.json();
};

const useObsElementsAndQuery = () => {
  const params = useSelector(settingsSelectors.getParams, shallowEqual);

  const { ref, inView } = useInView({
    threshold: 1,
    trackVisibility: true,
    delay: 200,
    triggerOnce: true,
  });

  const { isLoading, isFetching, data, fetchNextPage } = useInfiniteQuery(
    ["users", { ...params }],
    fetchUsers,
    {
      getNextPageParam: (lastPage, _pages) => lastPage.next_page,
    }
  );

  useEffect(() => {
    if (!isFetching) fetchNextPage();
  }, [inView]);

  return {
    rows: (data?.pages.flatMap((page) => [...page.items]) || []).map(
      (v, i, a) => ({ ...v, ref: i === a.length - 1 ? ref : null })
    ),
    isLoading,
  };
};

export default useObsElementsAndQuery;
