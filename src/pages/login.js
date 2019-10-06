import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUser } from "../actions";

import { TextBox, Label, Button } from "../components";
import { register, login } from "../api";

const StyledLogin = styled.div`
  margin-top: 50px;
  display: flex;

  @media (max-width: 799px) {
    flex-direction: column;
    margin-top: 0;
  }

  > div {
    flex: 1;
    display: flex;
    :first-child {
      @media (min-width: 800px) {
        justify-content: flex-end;
      }
    }
  }
`;

const Box = styled.div`
  background: ${props => (props.primary ? "#66af30" : "#fff")};
  color: ${props => (props.primary ? "#fff" : "")};
  padding: 30px;
  width: 350px;

  h2 {
    margin-top: 0;
  }

  @media (max-width: 799px) {
    width: 100%;
  }
`;

const Group = styled.div`
  margin-bottom: 8px;
`;

const initForm = {
  loginUsername: "",
  loginUsernameError: "",
  loginPassword: "",
  loginPasswordError: "",
  registerUsername: "",
  registerUsernameError: "",
  registerPassword: "",
  registerPasswordError: ""
};

const Login = ({ history }) => {
  const [form, setForm] = useState(initForm);
  const dispatch = useDispatch();
  return (
    <StyledLogin>
      <div>
        <Box primary>
          <h2>Log in</h2>
          <Group>
            <div>
              <Label text="Username"></Label>
            </div>
            <TextBox
              value={form.loginUsername}
              fullSize
              validationMessage={form.loginUsernameError}
              onChange={e => {
                setForm({
                  ...form,
                  loginUsername: e.target.value,
                  loginUsernameError: ""
                });
              }}
            />
          </Group>
          <Group>
            <div>
              <Label text="Password"></Label>
            </div>
            <TextBox
              password
              fullSize
              validationMessage={form.loginPasswordError}
              onChange={e => {
                setForm({
                  ...form,
                  loginPassword: e.target.value,
                  loginPasswordError: ""
                });
              }}
            />
          </Group>
          <Button
            text="Log in"
            style={{ marginTop: 15 }}
            onClick={async () => {
              const res = await login(form.loginUsername, form.loginPassword);
              if (res) {
                dispatch(getUser());
                history.push("/");
              } else {
                setForm({ ...form, loginPasswordError: "Wrong password" });
              }
            }}
          />
        </Box>
      </div>
      <div>
        <Box>
          <h2>Register</h2>
          <Group>
            <div>
              <Label text="Username"></Label>
            </div>
            <TextBox
              fullSize
              validationMessage={form.registerUsernameError}
              onChange={e => {
                setForm({
                  ...form,
                  registerUsername: e.target.value,
                  registerUsernameError: ""
                });
              }}
            />
          </Group>
          <Group>
            <div>
              <Label text="Password"></Label>
            </div>
            <TextBox
              password
              validationMessage={form.registerPasswordError}
              fullSize
              onChange={e => {
                setForm({
                  ...form,
                  registerPassword: e.target.value,
                  registerPasswordError: ""
                });
              }}
            />
          </Group>
          <Button
            text="Register"
            style={{ marginTop: 15 }}
            primary
            onClick={async () => {
              try {
                await register(form.registerUsername, form.registerPassword);
                await login(form.registerUsername, form.registerPassword);

                dispatch(getUser());
                history.push("/");
              } catch (e) {
                const { data } = e.response;

                data.field === "name" &&
                  setForm({
                    ...form,
                    registerUsernameError: data.text
                  });
                data.field === "password" &&
                  setForm({
                    ...form,
                    registerPasswordError: data.text
                  });
              }
            }}
          />
        </Box>
      </div>
    </StyledLogin>
  );
};

export default withRouter(Login);