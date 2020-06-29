import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Plus } from "react-feather";
import { Link } from "react-router-dom";
import { SideView, MultiView, ScrollView } from "../layouts";

import {
  getLevelPacksAsync,
  getLevelPackAsync,
  getLevelTimesAsync,
} from "../actions";

import {
  Table,
  TableRow,
  TableCell,
  TextBox,
  LevelCard,
  IconButton,
  Header,
  Tabs,
  Tab,
  TitleBar,
} from "../components";
import { pad, alphaSort } from "../utils";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  grid-gap: 8px;
  margin: 8px;
`;

const Cell = styled.div``;

const Title = styled.div`
  flex: 1;
  padding: 12px;
`;

const BrowseLink = styled.div`
  > * {
    display: block;
    padding: 12px;
  }
`;

const Side = ({ packName }) => {
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLevelPacksAsync());
    /* eslint-disable-next-line */
  }, []);

  const packs = useSelector((state) => state.levels.packs.items);
  const user = useSelector((state) => state.user);

  return (
    <MultiView>
      <TitleBar>
        <Title>
          <Header>Level packs</Header>
        </Title>
        {user && <IconButton url="/editlevelpack" icon={<Plus />} />}
      </TitleBar>
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
            .sort(alphaSort("name_short"))
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
      <BrowseLink>
        <Link to="/levels">Browse all levels</Link>
      </BrowseLink>
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
  border-bottom: 1px solid #f7f7f7;
  display: flex;

  > * {
    :first-child {
      flex: 1;
    }
    :last-child {
      text-align: right;
    }
  }
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
  const user = useSelector((state) => state.user);

  if (!packName || !details) return null;

  const packNameLength = details.levels.length.toString().length;

  return (
    <MultiView>
      <PackHeader>
        <div>
          <Header>{details.name_long}</Header>
        </div>
        <div>
          {user && user.id === details.kuski_id && (
            <Link to={`/editlevelpack/${details.id}`}>Edit</Link>
          )}
        </div>
      </PackHeader>
      <Tabs>
        <Tab to={`/levelpacks/${details.name_short}`}>Levels</Tab>
        <Tab to={`/levelpacks/${details.name_short}/stats`}>Stats</Tab>
      </Tabs>
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
