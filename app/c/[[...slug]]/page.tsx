import Pagination from "@/components/categories/pagination"
import { getCategoryData, getCategoryProductsData } from "@/components/categories/requests"
import { getLastElement } from "@/components/helpers"
import { notFound } from "next/navigation"
import ProductCard from "@/components/products/card"

type Props = {
  params: { slug: string[] };
  searchParams: any;
};

export default async function Categories({ params, searchParams }: Props) {

    let lastCategory: any = getLastElement( params.slug )
    let data: any = await getCategoryData({ category: lastCategory })
    data = data.categories.data[0] ?? null

    //console.log(data)
  
    if (data === null){
      return notFound()
    }

    let page: number = searchParams.page ?? 1
    let sorting: string = "name:asc"
    let filters: any = {}

    let listingParams: any = {
        page: Number(page),
        sorting: sorting,
        filters: filters,
        category_id: Number(data.id)
    }

    const products: any = await getCategoryProductsData(listingParams)

    //console.log(products)    

    return (
        <>
            <div>
                <h1>Category: {data.attributes.title}</h1>
                <p>Params: {JSON.stringify(params)}</p>
                <p>Search Params: {JSON.stringify(searchParams)}</p>

                {/* PAGINATION */}
                <p>Total: {JSON.stringify(products?.products?.meta?.pagination.total)}</p>
                <p>Pagination Params: {JSON.stringify(products?.products?.meta?.pagination)}</p>

                {products?.products?.data.map((product: any) => (
                    <ProductCard key={product.id} data={product} />
                ))}



                <Pagination params={listingParams} meta={products?.products?.meta} />
            </div>
        </>
    );
}

