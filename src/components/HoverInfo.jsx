import React from "react";
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

const GunCrimeContent = ({ data }) => (
  <>
    <div>Date: {data.date}</div>
    <div>Killed: {data.n_killed}</div>
    <div>Injured: {data.n_injured}</div>
    <div>Notes: {data.notes}</div>
  </>
);

const OffenderContent = ({ data }) => {
  const fullName = [
    data.name?.givenName,
    data.name?.middleName,
    data.name?.surName,
  ]
    .filter(Boolean)
    .join(" ");

  const residentialLocation = data.locations?.find((loc) => loc.type === "R");

  return (
    <>
      <div>Name: {fullName}</div>
      <div>Age: {data.age}</div>
      <div>Street: {residentialLocation?.streetAddress}</div>
      <div>City: {residentialLocation?.city}</div>
      <div>Jurisdiction: {data.jurisdictionId}</div>
      <div>Absconder: {data.absconder ? "Yes" : "No"}</div>
    </>
  );
};

const HoverInfo = React.memo(({ hoverInfo }) => {
  const { object, x, y } = hoverInfo || {};

  if (!object) {
    return null;
  }

  const type = hoverInfo?.object?.incident_id
    ? LAYER_TYPES.GUN_CRIME
    : LAYER_TYPES.OFFENDER;

  const renderContent = () => {
    switch (type) {
      case LAYER_TYPES.GUN_CRIME:
        return <GunCrimeContent data={object} />;

      case LAYER_TYPES.OFFENDER:
        return <OffenderContent data={object} />;

      default:
        return null;
    }
  };

  return (
    <TooltipContainer x={x} y={y}>
      {renderContent()}
    </TooltipContainer>
  );
});

export default HoverInfo;
