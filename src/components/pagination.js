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

const Pagination = ({ page, total, pageSize, onClick }) => {
  if (!total || !pageSize) return null;
  return (
    <StyledPagination>
      {Array.from(Array(Math.ceil(total / pageSize))).map((p, i) => {
        return (
          <NavLink
            to={`?page=${i + 1}`}
            className={`${page === i + 1 ? `active` : ``}`}
            key={i}
          >
            {i + 1}
          </NavLink>
        );
      })}
    </StyledPagination>
  );
};

export default Pagination;
