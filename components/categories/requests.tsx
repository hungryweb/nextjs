import { requestData } from "@/components/strapi";
import { PRODUCTS_PER_PAGE }  from "@/components/constants";

// typescript namespace for category data
export namespace CategoryDataQueryResult {
    export interface Root {
      categories: Categories;
    }
  
    export interface Categories {
      data: Data[];
    }
  
    export interface Data {
      id: string;
      attributes: Attributes;
    }
  
    export interface Attributes {
      title: string;
      description: any;
      seo: Seo;
      subcategories: Subcategories;
    }
  
    export interface Seo {
      slug: string;
      title: string;
      description: string;
      image: Image;
    }
  
    export interface Image {
      data: any;
    }
  
    export interface Subcategories {
      data: any[];
    }
}

export async function getCategoryData(params: {
    category: string | undefined;
  }): Promise<CategoryDataQueryResult.Root> {
    
    let graphqlQuery = `
    query GetCategoryData( $slug: String! ){
      categories(filters:{ seo: { slug:{ eqi: $slug } }}) {
          data{
              id
              attributes{
                  title
                  description
                  seo{
                      slug
                      title
                      description
                      image{
                          data {
                              attributes {
                                  url
                                  formats
                              }
                          }
                      }                    
                  }  
                  subcategories{
                    data{
                        id
                        attributes{
                          title
  
                          subcategories{
                            data{
                              id
                              attributes{
                                title
                                seo{
                                  slug
                                }
                              }
                            }
                          }                         
  
                          seo{
                            slug
                            image{
                              data {
                                attributes {
                                  url
                                  formats
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }     
                }       
      }
  }
  `;
  
    return requestData(graphqlQuery, {
        slug: params.category,
    }, 10);
}



export async function getCategoryProductsData(params: {
    page: number | undefined;
    sorting: string | undefined;
    filters: any;
    category_id: number;
  }) {

    //Logs    
    console.log(params);


    let graphqlQuery = `
    query GetCategoryProducts( $category_id: ID!, $status: String!, $page: Int, $items_per_page: Int ){
        products(
            filters:{ status:{ eq: $status } , categories: { id:{ eqi: $category_id } }}
            pagination: { page: $page, pageSize: $items_per_page }
      ) {
            data{
                id
                attributes{
                    title
                    seo{
                        slug
                    }
                  vendor{
                    data{
                      attributes{
                        company
                      }
                    }
                  }
                  images{
                    data {
                        attributes {
                            url
                            formats
                        }
                    }
                  }
  
                  feed{
                      url
                  }
  
                }     
            }
              meta {
                  pagination {
                      page
                      pageSize
                      total
                      pageCount
                  }
              }          
        }
    }
  `;
  
    //Build variable for request  
    let variables = {
        category_id: Number(params.category_id),
        status: "Active",
        page: Number(params.page) ?? 1,
        items_per_page: Number(PRODUCTS_PER_PAGE)
    }

    //Logs
    console.log(variables);    

    //Make request
    return requestData(graphqlQuery, variables, 10);
  }  