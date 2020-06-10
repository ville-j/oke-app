import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setCountryAsync, setTeamAsync } from "../actions";

import { Label, Dropdown, TextBox, Button, Divider } from "../components";
import countries from "../countries";

const Container = styled.div`
  padding: 0 12px;
`;

const Wrap = styled.div`
  max-width: 400px;
`;

const Settings = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [teamData, setTeamData] = useState({
    password: "",
    errorField: "",
  });

  const teamNameInput = useRef(null);
  const teamPasswordInput = useRef(null);

  if (!user) return null;

  return (
    <Container>
      <Wrap>
        <h3>Settings</h3>
        <div>
          <Label text="Nationality"></Label>
        </div>
        <Dropdown
          value={user.country.toLowerCase()}
          options={countries}
          onSelect={(e, val) => {
            dispatch(setCountryAsync(val));
          }}
        />
      </Wrap>
      <Divider />
      <Wrap>
        <h3>Team information</h3>
        <div>
          <Label text="Team name"></Label>
        </div>
        <TextBox fullSize defaultValue={user.team} ref={teamNameInput} />
        <div>
          <Label text="Team password"></Label>
        </div>
        <TextBox
          fullSize
          validationMessage={
            teamData.errorField === "password" && teamData.errorText
          }
          ref={teamPasswordInput}
        />
        <Button
          text="Join team"
          primary
          onClick={async () => {
            const r = await dispatch(
              setTeamAsync(
                teamNameInput.current.value,
                teamPasswordInput.current.value
              )
            );

            if (!r.ok) {
              setTeamData({
                errorField: r.field,
                errorText: r.text,
              });
            } else {
              setTeamData({
                errorField: "",
                errorText: "",
              });
            }
          }}
        />
      </Wrap>
    </Container>
  );
};

export default Settings;
