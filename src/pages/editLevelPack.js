import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import { X } from "react-feather";
import { SideView, MultiView, ScrollView } from "../layouts";
import { TextBox, Label, Button, IconButton, Header } from "../components";
import {
  createLevelPack,
  editLevelPack,
  getLevelPacks,
  removeLevelPackLevel,
  addLevelPackLevel,
  deleteLevelPack,
  search,
} from "../api";
import { alphaSort } from "../utils";

const SideContainer = styled.div``;

const Title = styled.div`
  padding: 12px;
  border-bottom: 1px solid #f7f7f7;
`;

const Pad = styled.div`
  padding: 12px;
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  > * {
    flex: 1;
    :last-child {
      text-align: right;
    }
  }
`;

const Side = withRouter(({ packId, packData, history }) => {
  const shortNameInput = useRef(null);
  const longNameInput = useRef(null);
  const descriptionInput = useRef(null);

  const save = async () => {
    const shortName = shortNameInput.current.value;
    const longName = longNameInput.current.value;
    const description = descriptionInput.current.value;

    try {
      const res = packId
        ? await editLevelPack(packId, shortName, longName, description)
        : await createLevelPack(shortName, longName, description);

      const { id } = res.data;

      if (!packId && id) {
        history.push(`/editlevelpack/${id}`);
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const deletePack = async () => {
    await deleteLevelPack(packId);
    history.push(`/levelpacks`);
  };

  return (
    <SideContainer>
      <Title>
        <Header>Level pack information</Header>
      </Title>
      <Pad>
        <Label text="Short name"></Label>
        <TextBox
          fullSize
          ref={shortNameInput}
          defaultValue={packData ? packData.name_short : ""}
        />
        <Label text="Long name"></Label>
        <TextBox
          fullSize
          ref={longNameInput}
          defaultValue={packData ? packData.name_long : ""}
        />
        <Label text="Description"></Label>
        <TextBox
          fullSize
          ref={descriptionInput}
          defaultValue={packData ? packData.descrip : ""}
        />
        <Buttons>
          <div>
            <Button text="Save information" primary onClick={save} />
          </div>
          <div>
            {packId && (
              <Button
                text="Delete pack"
                onClick={deletePack}
                confirm="Delete level pack?"
                confirmContent={
                  <div>
                    This action will unlink all associated levels and delete the
                    level pack.
                  </div>
                }
              />
            )}
          </div>
        </Buttons>
      </Pad>
    </SideContainer>
  );
});

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 12px;
  border-bottom: 1px solid #f7f7f7;
`;

const LevelContainer = styled.div`
  padding: 12px 0;
  a {
    color: inherit;
    :hover {
      text-decoration: underline;
    }
  }
`;

const No = styled.div`
  width: 50px;
`;

let _timeout;

const Main = ({ packData }) => {
  const [levels, setLevels] = useState(packData.levels);
  const [suggestions, setSuggestions] = useState([]);
  return (
    <MultiView>
      <Title>
        <Header>Level pack levels</Header>
      </Title>
      <TextBox
        fullSize
        placeholder="Search levels"
        hideValidation
        suggestions={suggestions.filter(
          (s) => !levels.find((l) => l.lev_id === s.id)
        )}
        suggestionRenderer={(s) => {
          return `${s.text}.lev`;
        }}
        onSuggestionClick={async (e, el) => {
          await addLevelPackLevel(packData.id, el.id);
          setLevels([
            ...levels.filter((l) => l.lev_id !== el.id),
            {
              lev_id: el.id,
              lev_name: el.name,
            },
          ]);
        }}
        onChange={(e) => {
          setSuggestions([]);
          clearTimeout(_timeout);
          const val = e.currentTarget.value;

          if (val.length > 0) {
            _timeout = setTimeout(async () => {
              const res = await search(val, "level");
              setSuggestions(
                res.levels
                  .sort(alphaSort("name"))
                  .map((l) => ({ ...l, text: l.name }))
              );
            }, 700);
          } else {
            setSuggestions([]);
          }
        }}
      />
      <ScrollView>
        <LevelContainer>
          {levels.sort(alphaSort("lev_name")).map((l, i) => {
            return (
              <Row key={l.lev_id}>
                <div
                  style={{
                    width: 50,
                    color: "#66af30",
                  }}
                >
                  <IconButton
                    icon={<X size="1.5em" />}
                    onClick={async () => {
                      await removeLevelPackLevel(packData.id, l.lev_id);
                      setLevels(levels.filter((le) => le.lev_id !== l.lev_id));
                    }}
                  />
                </div>
                <No>{i + 1}.</No>
                <div>
                  <Link to={`/levels/${l.lev_id}`}>{l.lev_name}.lev</Link>
                </div>
              </Row>
            );
          })}
        </LevelContainer>
      </ScrollView>
    </MultiView>
  );
};

const EditLevelPack = ({
  match: {
    params: { id },
  },
}) => {
  const [packData, setPackData] = useState(null);
  useEffect(() => {
    const f = async () => {
      const res = await getLevelPacks(id);
      setPackData(res);
    };
    id && f();
  }, [id]);

  if (id && !packData) return null;
  return (
    <SideView
      side={<Side packData={packData} packId={id} />}
      main={id ? <Main packData={packData} /> : null}
    />
  );
};

export default EditLevelPack;
