import React from "react";
import PropTypes from "prop-types";
import "../styles/filter-component.css";

const FilterComponent = ({
  filterOptions,
  filterLabel,
  onFilterChange,
  selectedFilter,
}) => {
  return (
    <div className="filter-container">
      <label className="filter-label" htmlFor="filterSelect">
        {filterLabel}:
      </label>
      <select
        id="filterSelect"
        value={selectedFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="filter-select"
      >
        <option value="">All</option>
        {filterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

FilterComponent.propTypes = {
  filterOptions: PropTypes.array.isRequired,
  filterLabel: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
};

export default FilterComponent;
