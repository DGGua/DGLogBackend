export type ResCode = 200000;
export const ResData: Record<ResCode, string> = {
  200000: "OK",
};

export function resData<D>(
  code: ResCode,
  data: D,
  msg: string = ResData[code]
) {
  return { code, data, msg };
}
