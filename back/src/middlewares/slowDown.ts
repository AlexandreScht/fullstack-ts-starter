import mw from '@middlewares/mw';

export const slowDown = (ms: number) => mw(async (req, res, next) => setTimeout(() => next(), ms));

export default slowDown;
