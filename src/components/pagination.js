import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledPagination = styled.div`
  a {
    display: inline-block;
    min-width: 45px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    padding: 0 2px;
    box-sizing: border-box;

    &:hover {
      background: #f7f7f7;
    }

    &.active {
      background: #66af30;
      color: #fff;
    }
  }
`;

const getVisiblePages = (pages, currentPage) => {
  const visiblePages = [];
  for (let i = 0; i < pages; i++) {
    const hide =
      Math.abs(currentPage - (i + 1)) >
        (currentPage < 4
          ? 4 - currentPage
          : pages - currentPage < 2
          ? 3 - (pages - currentPage)
          : 1) &&
      i !== pages - 1 &&
      i !== 0;
    if (!hide) {
      visiblePages.push(i);
    }
  }
  return visiblePages;
};

const Pagination = ({ page, total, pageSize, onClick }) => {
  if (!total || !pageSize) return null;
  const pages = Math.ceil(total / pageSize);
  return (
    <StyledPagination>
      {getVisiblePages(pages, page).map(p => (
        <NavLink
          to={`?page=${p + 1}`}
          className={`${page === p + 1 ? `active` : ``}`}
          key={p}
        >
          {p + 1}
        </NavLink>
      ))}
    </StyledPagination>
  );
};

export default Pagination;
