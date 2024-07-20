// utils/storageUtils.js

/**
 * 상태를 로컬스토리지에 저장합니다.
 * @param {object} state - 저장할 상태 객체
 */
export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("appState", serializedState);
  } catch (error) {
    console.error("Could not save state:", error);
  }
};

/**
 * 로컬스토리지에서 상태를 로드합니다.
 * @returns {object} - 로드된 상태 객체
 */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("appState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Could not load state:", error);
    return undefined;
  }
};
