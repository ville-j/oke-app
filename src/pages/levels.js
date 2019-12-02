import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "query-string";
import styled from "styled-components";
import { getLevelsAsync } from "../actions";
import { Table, TableRow, TableCell, Pagination } from "../components";

const Container = styled.div`
  margin-bottom: 150px;
`;

const PaginationContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  border-top: 1px solid #f7f7f7;
`;

const Levels = ({ location }) => {
  const dispatch = useDispatch();
  const levels = useSelector(state => state.levels.list);
  const { page } = qs.parse(location.search);

  useEffect(() => {
    dispatch(getLevelsAsync(page || 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (!page && levels.meta.page !== 1) return null;

  return (
    <Container>
      <Table>
        {levels.items.map(l => {
          return (
            <TableRow href={`/levels/${l.id}`} key={l.id}>
              <TableCell>{l.name}</TableCell>
            </TableRow>
          );
        })}
      </Table>
      <PaginationContainer>
        <Pagination {...levels.meta} />
      </PaginationContainer>
    </Container>
  );
};

export default Levels;
