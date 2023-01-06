import { FILES, RANKS } from "./constants";

export const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getEventPosition = (e) => {
  if (e.clientX || e.clientX === 0) {
    return [e.clientX, e.clientY];
  }
  if (e.targetTouches?.[0]) {
    return [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
  }
  return; // touchend has no position!
};

export const allKeys = Array.prototype.concat(
  ...FILES.map((c) => RANKS.map((r) => c + r))
);

export const pos2key = (pos) => allKeys[8 * pos[0] + pos[1]];

export const getKeyAtDomPos = ({ pos, asWhite, bounds }) => {
  let file = Math.floor((8 * (pos[0] - bounds.left)) / bounds.width);
  if (!asWhite) file = 7 - file;
  let rank = 7 - Math.floor((8 * (pos[1] - bounds.top)) / bounds.height);
  if (!asWhite) rank = 7 - rank;
  return file >= 0 && file < 8 && rank >= 0 && rank < 8
    ? pos2key([file, rank])
    : undefined;
};

export const disableScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
};

export const enableScroll = () => {
  window.onscroll = () => {};
};
