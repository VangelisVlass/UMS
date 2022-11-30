export const actionFactory = (sliceName, actionName) => {
  const action = (payload) => ({
    type: `${sliceName}/${actionName}`,
    payload,
  });

  action.type = `${sliceName}/${actionName}`;

  return action;
};