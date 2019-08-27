import { getBattle, getBattles } from "./api";
const GET_BATTLE = "GET_BATTLE";
const GET_BATTLES = "GET_BATTLES";

const actionGetBattles = data => ({
  type: GET_BATTLES,
  data
});

const actionGetBattle = data => ({
  type: GET_BATTLE,
  data
});

const getBattlesAsync = () => {
  return async dispatch => {
    const data = await getBattles();
    dispatch(actionGetBattles(data));
  };
};

const getBattleAsync = id => {
  return async dispatch => {
    const data = await getBattle(id);
    dispatch(actionGetBattle({ ...data, id }));
  };
};

export { GET_BATTLE, GET_BATTLES, getBattlesAsync, getBattleAsync };
