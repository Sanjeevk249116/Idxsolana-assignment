export const profileReducer = (
  state = { profileLoading: false, profile: {} },
  { type, payload }
) => {
  switch (type) {
    case "PROFILE_LOADING":
      return { ...state, profileLoading: true };
    case "PROFILE_SUCCESS":
      return { ...state, profile: payload, profileLoading: false };
    case "PROFILE_FAILED":
      return { ...state, profileLoading: false };
    default:
      return state;
  }
};
