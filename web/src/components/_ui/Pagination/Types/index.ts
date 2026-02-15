export type IPaginationProps = {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};
