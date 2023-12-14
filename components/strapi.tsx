import { GRAPHQL_URL }  from "@/components/constants";

/*

  Strapi Request Function 

*/
export async function requestData(
    graphqlQuery: string,
    graphqlVariables: { [key: string]: string | number | string[] | number[] |  undefined },
    revalidate: number | undefined
  ) {


    const { data } = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: graphqlVariables,
      }),
      next: { revalidate: revalidate },
    }).then((res) => res.json());
  
    return data ?? null;
  }