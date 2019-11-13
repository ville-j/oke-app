import React, { useState, useEffect } from "react";
import qs from "query-string";
import styled from "styled-components";
import { search } from "../api";
import { Table, TableRow, TableCell } from "../components";

const NoResults = styled.div`
  padding: 8px 12px;
  color: #d0d0d0;
`;

const Search = ({ location }) => {
  const [results, setResults] = useState(null);
  const { q } = qs.parse(location.search);
  useEffect(() => {
    setResults(null);
    search(q).then(r => setResults(r));
  }, [q]);
  return (
    <Table>
      {results &&
        results.kuskis.map(k => {
          return (
            <TableRow href={`/kuskis/${k.name}`} key={k.id}>
              <TableCell>{k.name}</TableCell>
            </TableRow>
          );
        })}
      {results &&
        results.levels.map(l => {
          return (
            <TableRow href={`/levels/${l.id}`} key={l.id}>
              <TableCell>{l.name}</TableCell>
            </TableRow>
          );
        })}
      {results && results.levels.length < 1 && results.kuskis.length < 1 && (
        <NoResults>no results for "{q}"</NoResults>
      )}
    </Table>
  );
};

export default Search;
