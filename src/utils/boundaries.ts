import { GameObject } from "../game-objects";

type Interval = {
  start: number;
  end: number;
};

const intervalWithLesserOrEqualStart = (l: Interval, r: Interval): Interval =>
  l.start < r.start ? l : r;
const intervalWithGreaterOrEqualStart = (l: Interval, r: Interval): Interval =>
  l.start < r.start ? r : l;

export const objectsAreColliding = (l: GameObject, r: GameObject): boolean => {
  const l_xInterval: Interval = { start: l.x, end: l.x + l.width };
  const l_yInterval: Interval = { start: l.y, end: l.y + l.height };
  const r_xInterval: Interval = { start: r.x, end: r.x + r.width };
  const r_yInterval: Interval = { start: r.y, end: r.y + r.width };

  // order l and r by who has lesser start value for x
  const orderedXIntervals: Array<Interval> = [
    intervalWithLesserOrEqualStart(l_xInterval, r_xInterval),
    intervalWithGreaterOrEqualStart(l_xInterval, r_xInterval),
  ];
  // order l and r by who has lesser start value for y
  const orderedYIntervals: Array<Interval> = [
    intervalWithLesserOrEqualStart(l_yInterval, r_yInterval),
    intervalWithGreaterOrEqualStart(l_yInterval, r_yInterval),
  ];

  const xIntervalsOverlap: boolean =
    orderedXIntervals[0].end >= orderedXIntervals[1].start;
  const yIntervalsOverlap: boolean =
    orderedYIntervals[0].end >= orderedYIntervals[1].start;

  return xIntervalsOverlap && yIntervalsOverlap;
};
