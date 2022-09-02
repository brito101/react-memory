import styled from "styled-components"

type ContainerProps = {
  showBackground: boolean
}

export const Container = styled.div<ContainerProps>`
  background-color: ${(props) =>
    props.showBackground === true ? "#1550ff" : "#e2e3e3"};
  height: 100px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

type IconProps = {
  opacity?: number
}

export const Icon = styled.img<IconProps>`
  opacity: ${(props) => props.opacity ?? 1};
  width: 40px;
  height: 40px;
`
