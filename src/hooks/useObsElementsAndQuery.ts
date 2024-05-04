import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { RowParams, User, useLazyGetUsersQuery } from "src/service/users";

const useObsElementsAndQuery = (params: RowParams, limit: number) => {
  const [trigger, { data, isLoading }] = useLazyGetUsersQuery();
  const [rows, setRows] = useState<User[]>([]);
  const skip = useRef(0);

  const { ref, inView } = useInView({
    threshold: 1,
    trackVisibility: true,
    delay: 100,
    triggerOnce: false,
  });

  useEffect(() => {
    if (!isLoading) {
      trigger({
        ...params,
        skip: skip.current,
        limit,
      });
      skip.current += limit;
    }
  }, [isLoading, inView, trigger]);

  useEffect(() => {
    if (!isLoading && data) {
      // Set intersection observer to the last element
      const nr = data.items.map((val, i) => ({
        ...val,
        ref: i === data.items.length - 1 ? ref : null,
      }));

      setRows((rows) => [...rows.map((v) => ({ ...v, ref: null })), ...nr]);
    }
  }, [data?.offset, isLoading]);

  return rows;
};

export default useObsElementsAndQuery;
