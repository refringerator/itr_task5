import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { RowParams, User, useLazyGetUsersQuery } from "src/service/users";

const useObsElements = (params: RowParams, limit: number) => {
  const obsIndex = Math.ceil(limit * 0.25);
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
      // Set intersection observer to the N-th element from the end
      const nr = data.items.map((val, i) => ({
        ...val,
        ref: i === data.items.length - obsIndex ? ref : null,
      }));

      setRows((rows) => [...rows.map((v) => ({ ...v, ref: null })), ...nr]);
    }
  }, [data?.offset, isLoading]);

  return rows;
};

export default useObsElements;
