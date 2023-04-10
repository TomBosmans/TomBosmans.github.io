import { useLoaderData } from "react-router-dom"

export function usePageData<T>() {
  return useLoaderData() as T
}
