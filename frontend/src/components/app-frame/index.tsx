import { Wrapper } from "./styles";
import { AppFrameProps } from "./types";

export const AppFrame = (props: AppFrameProps): JSX.Element => {
  return <Wrapper>{props.children}</Wrapper>;
};
