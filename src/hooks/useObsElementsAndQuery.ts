import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { QueryFunctionContext, QueryKey, useInfiniteQuery } from "react-query";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { settingsSelectors, setSkip } from "src/store";
import { API_URL } from "src/constants";

interface Params {
  seed: string;
  region: string;
  mistakes: number;
}

const fetchUsers = async ({
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey>) => {
  const { seed, region, mistakes } = queryKey[1] as Params;
  const { skip = 0, limit = 20 } = pageParam || {};

  const result = await fetch(
    `${API_URL}/users/?region=${region}&seed=${seed}&mistakes=${mistakes}&skip=${skip}&limit=${limit}`
  );
  return result.json();
};

const useObsElementsAndQuery = () => {
  const params = useSelector(settingsSelectors.getParams, shallowEqual);
  const dispatch = useDispatch();

  const { ref, inView } = useInView({
    threshold: 1,
    trackVisibility: true,
    delay: 200,
    triggerOnce: true,
  });

  const { isLoading, data, fetchNextPage } = useInfiniteQuery(
    ["users", { ...params }],
    fetchUsers,
    {
      getNextPageParam: (lastPage, _pages) => lastPage.next_page,
    }
  );

  const rows = (data?.pages.flatMap((page) => [...page.items]) || []).map(
    (v, i, a) => ({ ...v, ref: i === a.length - 1 ? ref : null })
  );

  useEffect(() => {
    fetchNextPage();
    dispatch(setSkip(rows.length));
  }, [inView]);

  return {
    rows,
    isLoading,
  };
};

export default useObsElementsAndQuery;
