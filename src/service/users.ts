import { api } from "./api";

export interface User {
  id: string;
  index: number;
  name: string;
  address: string;
  phone: string;
}

export interface RowParams {
  mistakes: number;
  seed: string;
  region: string;
}
export interface QueryParams extends RowParams {
  skip: number;
  limit: number;
}

type UsersResponse = {
  items: User[];
  offset: number;
};

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<UsersResponse, QueryParams>({
      query: ({ skip, limit, mistakes, seed, region }) => ({
        url: `users/?region=${region}&seed=${seed}&mistakes=${mistakes}&skip=${skip}&limit=${limit}`,
      }),
      //   providesTags: (result = []) => [
      //     ...result.map(
      //       ({ index }) => ({ type: "Users", id: index, seed: seed } as const)
      //     ),
      //     { type: "Issues" as const, id: "LIST" },
      //   ],
    }),
  }),
});

export const { useGetUsersQuery, useLazyGetUsersQuery } = usersApi;

export const {
  endpoints: { getUsers },
} = usersApi;
