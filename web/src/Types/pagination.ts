export type IPaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};
