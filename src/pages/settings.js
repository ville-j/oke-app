import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setCountryAsync } from "../actions";

import { Label, Dropdown } from "../components";
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
    </Container>
  );
};

export default Settings;
