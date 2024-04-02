import { FC, PropsWithChildren } from "react"
import { ReactComponent as IconFilter } from "app/icons/icon-filter-blue.svg";
import { ReactComponent as IconClose } from "app/icons/icon-cancel-white.svg";
import styles from "./FilterTopBarWrapper.module.scss";

interface IFilterBarWrapper {
  toggleFilter: () => void;
  clearFilter: () => void;
  isFiltersActive: boolean;
};

export const FilterBarWrapper: FC<PropsWithChildren<IFilterBarWrapper>> = ({ children, toggleFilter, clearFilter, isFiltersActive }) => {
  const showFilters = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    toggleFilter();
  };

  const clearFilters = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    clearFilter();
  };

  return (
    <div className={styles["filter-bar"]}>
      <div className={styles["toggle-filter-wrapper"]} onClick={showFilters}>
        <p>All Filters</p>
        <IconFilter className={`${styles.icon} ${isFiltersActive ? styles.active : ""}`} />
      </div>
      {isFiltersActive &&
        <div className={styles["toggle-filter-wrapper"]} onClick={clearFilters}>
          <p>Reset</p>
          <IconClose className={styles.icon} />
        </div>
      }
      {children}
    </div>
  )
}