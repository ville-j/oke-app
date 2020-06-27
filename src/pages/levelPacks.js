import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Plus } from "react-feather";
import { SideView, MultiView, ScrollView } from "../layouts";

import {
  getLevelPacksAsync,
  getLevelPackAsync,
  getLevelTimesAsync,
} from "../actions";
import { Table, TableRow, TableCell, TextBox, LevelCard } from "../components";
import { pad, alphaSort } from "../utils";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  grid-gap: 8px;
  margin: 8px;
`;

const Cell = styled.div``;

const Head = styled.div`
  display: flex;
  border-bottom: 1px solid #f7f7f7;
`;

const Title = styled.div`
  flex: 1;
  padding: 12px;
  h3 {
    margin: 0;
  }
`;

const CreatePack = styled.div`
  flex: 0 0 50px;
`;

const Container = styled.div`
  display: inline-flex;
  padding: 12px;
  border-radius: 50%;
  color: #66af30;
  cursor: default;

  &:hover {
    background: #ebebeb;
  }
`;

const IconButton = () => {
  return (
    <Container>
      <Plus />
    </Container>
  );
};

const Side = ({ packName }) => {
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLevelPacksAsync());
    /* eslint-disable-next-line */
  }, []);

  const packs = useSelector((state) => state.levels.packs.items);

  return (
    <MultiView>
      <Head>
        <Title>Level packs</Title>
        <CreatePack>
          <IconButton />
        </CreatePack>
      </Head>
      <div>
        <TextBox
          placeholder="Filter"
          hideValidation
          fullSize
          value={filter}
          onChange={(e) => {
            setFilter(e.currentTarget.value);
          }}
        />
      </div>
      <ScrollView>
        <Table>
          {packs
            .filter(
              (p) =>
                !filter ||
                p.name_short.toLowerCase().indexOf(filter.toLowerCase()) > -1
            )
            .map((p) => {
              return (
                <TableRow
                  href={`/levelpacks/${p.name_short}`}
                  key={p.id}
                  active={p.name_short === packName ? 1 : 0}
                >
                  <TableCell>{p.name_short}</TableCell>
                </TableRow>
              );
            })}
        </Table>
      </ScrollView>
    </MultiView>
  );
};

const LevelCardHead = styled.div`
  padding: 12px;
  display: flex;
  background: #333;
  color: #d8d8d8;
  border-bottom: 1px solid #484848;
  font-weight: 200;
  > * {
    flex: 1;
    display: flex;
    &:last-child {
      justify-content: flex-end;
    }
  }
`;

const Card = ({ level, head }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLevelTimesAsync(level));
    /* eslint-disable-next-line */
  }, [level]);

  const levelTimes = useSelector((state) => state.levels.times[level]);

  return (
    <LevelCard
      key={level}
      level={level}
      head={head}
      times={levelTimes}
      footer="Level details"
      footerUrl={`/levels/${level}`}
    />
  );
};

const PackHeader = styled.div`
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #f7f7f7;
`;

const LevelList = ({ packName }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    packName && dispatch(getLevelPackAsync(packName));
    /* eslint-disable-next-line */
  }, [packName]);

  const details = useSelector((state) =>
    packName ? state.levels.packDetails[packName.toLowerCase()] : null
  );

  if (!packName || !details) return null;

  const packNameLength = details.levels.length.toString().length;

  return (
    <MultiView>
      <PackHeader>
        <div>
          {details.name_short} {details.name_long}
        </div>
      </PackHeader>
      <ScrollView>
        <Grid>
          {details.levels.sort(alphaSort("lev_name")).map((l, i) => {
            return (
              <Cell key={l.lev_id}>
                <Card
                  level={l.lev_id}
                  head={
                    <LevelCardHead>
                      <div>
                        {details.name_short} #{pad(i + 1, packNameLength)}
                      </div>
                      <div>{l.lev_name}.lev</div>
                    </LevelCardHead>
                  }
                />
              </Cell>
            );
          })}
        </Grid>
      </ScrollView>
    </MultiView>
  );
};

const LevelPacks = ({
  match: {
    params: { name },
  },
}) => {
  return (
    <SideView
      stack
      stickySide
      side={<Side packName={name} />}
      main={name ? <LevelList packName={name} /> : null}
    />
  );
};

export default LevelPacks;
