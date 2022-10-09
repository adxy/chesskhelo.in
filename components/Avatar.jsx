import styled from "styled-components";

import { AVATAR_SIZES } from "../utils/constants";

const getContainerSize = ({ thumbnailSize }) => {
  switch (thumbnailSize) {
    case AVATAR_SIZES.small:
      return ({ theme }) => theme.avatar.size.small;
    case AVATAR_SIZES.large:
      return ({ theme }) => theme.avatar.size.large;
    case AVATAR_SIZES.extraLarge:
      return ({ theme }) => theme.avatar.size.extraLarge;
    default:
      return ({ theme }) => theme.avatar.size.medium;
  }
};

const getFontSize = ({ thumbnailSize }) =>
  thumbnailSize == AVATAR_SIZES.medium
    ? "16px"
    : thumbnailSize == AVATAR_SIZES.large
    ? "20px"
    : thumbnailSize == AVATAR_SIZES.extraLarge
    ? "70px"
    : "16px";

const Img = styled.img`
  height: ${getContainerSize};
  width: ${getContainerSize};
  border-radius: 50%;
`;

const ImgSquare = styled.img`
  height: ${getContainerSize};
  width: ${getContainerSize};
`;

const NoImg = styled.div`
  height: ${getContainerSize};
  width: ${getContainerSize};
  border-radius: 50%;
  font-size: ${getFontSize};
  position: relative;
  background-color: ${({ theme }) => theme.colors.primary.blue};
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.colors.primary.yellow};
  }
`;

export default function RoundThumbnail({
  src,
  thumbnailSize,
  userName = "",
  squareImage = false,
}) {
  return (
    <>
      {src ? (
        squareImage ? (
          <ImgSquare
            src={src}
            thumbnailSize={thumbnailSize}
            alt={`user avatar`}
          />
        ) : (
          <Img src={src} thumbnailSize={thumbnailSize} alt={`user avatar`} />
        )
      ) : (
        <NoImg thumbnailSize={thumbnailSize}>
          {userName && (
            <span>{userName.toString().slice(0, 1).toUpperCase()}</span>
          )}
        </NoImg>
      )}
    </>
  );
}
