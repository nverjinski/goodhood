import styled from "styled-components";
import { LAYER_TYPES } from "@constants/layers";

const TooltipContainer = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;

  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;

  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-family: sans-serif;
  transform: translate(10px, -10px);
`;

const renderGunCrimeContent = (data) => {
  return (
    <>
      <div>Date: {data.date}</div>
      <div>Killed: {data.n_killed}</div>
      <div>Injured: {data.n_injured}</div>
      <div>Notes: {data.notes}</div>
    </>
  );
};

const renderOffenderContent = (data) => {
  const fullName = [
    data.name?.givenName,
    data.name?.middleName,
    data.name?.surName,
  ]
    .filter(Boolean)
    .join(" ");

  const residentialLocation = data.locations.filter(
    (loc) => loc.type === "R"
  )?.[0];
  const streetAddress = residentialLocation.streetAddress;
  const city = residentialLocation.city;

  return (
    <>
      <div>Name: {fullName}</div>
      <div>Age: {data.age}</div>
      <div>Street: {streetAddress}</div>
      <div>City: {city}</div>
      <div>Jurisdiction: {data.jurisdictionId}</div>
      <div>Absconder: {data.absconder ? "Yes" : "No"}</div>
    </>
  );
};

const renderContent = (type, data) => {
  switch (type) {
    case LAYER_TYPES.GUN_CRIME:
      return renderGunCrimeContent(data);

    case LAYER_TYPES.OFFENDER:
      return renderOffenderContent(data);

    default:
      return null;
  }
};

const HoverInfo = ({ hoverInfo }) => {
  if (!hoverInfo || !hoverInfo.object) {
    return null;
  }
  const type = hoverInfo?.object?.incident_id
    ? LAYER_TYPES.GUN_CRIME
    : LAYER_TYPES.OFFENDER;

  return (
    <TooltipContainer x={hoverInfo.x} y={hoverInfo.y}>
      {renderContent(type, hoverInfo.object)}
    </TooltipContainer>
  );
};

export default HoverInfo;
