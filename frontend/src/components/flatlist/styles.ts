import styled from '@emotion/styled'

export const FlatListRowStandard = styled.tr<{ hovercolor?: string }>`
  background-color: #ffffff80;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 0px;
  &:hover {
    background-color: ${({ hovercolor }) => hovercolor || '#ffffff'};
  }
`
