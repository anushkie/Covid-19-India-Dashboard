import { get } from "./default";
const nodeBaseUrl = "http://127.0.0.1:5500";
export const getConfirmCases = async () => {
  const response = await get(nodeBaseUrl + "/confirm-cases");
  return response;
};

export const getConfirmDeathss = async () => {
  const response = await get(nodeBaseUrl + "/confirm-deaths");
  return response;
};

export const getRecoveredCases = async () => {
  const response = await get(nodeBaseUrl + "/confirm-recovered");
  return response;
};

export const getVaccinated = async () => {
  const response = await get(nodeBaseUrl + "/confirm-vaccinated");
  return response;
};

export const getStackData = async () => {
  const response = await get(nodeBaseUrl + "/stack-wise-district-data");
  return response;
};
