import axios, { type AxiosError } from "axios";

export async function uploadSvgCode(svgData: string): Promise<{ key: string }> | null {
  return axios
    .post("/local", { path: "/upload-svg", svgData: svgData })
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export async function getSignedURL(
  objectKey: string
): Promise<{ signedUrl: string }> | null {
  return axios
    .post("/local", {
      path: "/get-signed-url",
      key: objectKey,
    })
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
