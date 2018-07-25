import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const CenteredWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 100%;
  margin: auto;
`;

const HolidayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  display: block;
  width : 250px;
  margin: 5px;
  padding: 10px;
  text-align: center;
  font-family: Lato;
  background: ${props => props.background}
`;

const InfoText = styled.p`
`;

const YearInput = styled.input`
  padding: 10px;
  width: 250px;
  font-size: 18px;
`;

export const EasterAlgoComponent = observer(({ store }) => {
  return (
    <CenteredWrapper>
      <InfoText>Enter Year</InfoText>
      <YearInput type="number" onChange={store.onEnterYear} />
      {store.AllHolidays.map(holiday => (
        <HolidayWrapper background={holiday.color} >{holiday.date}</HolidayWrapper>
      ))}
    </CenteredWrapper>
  )
})