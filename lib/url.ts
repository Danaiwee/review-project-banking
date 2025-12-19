import qs from "query-string";

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params); // id=123 >> {id: "123"}

  currentUrl[key] = value;
  return qs.stringifyUrl(
    {
      url: window.location.pathname, // /dashboard
      query: currentUrl,
    },
    { skipNull: true } //ignore the null value
  );
};
