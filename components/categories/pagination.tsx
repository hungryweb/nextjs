"use client";

import { useState, useEffect } from 'react';
import { getCategoryProductsData } from "@/components/categories/requests"
import ProductCard from "@/components/products/card"

const Pagination = (props: any) => {
  const [start, setStart] = useState(false);
  const [meta, setMeta] = useState(props.meta);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(props.params.page);

  let listingParams: any = {
    page: page + 1,
    sorting: props.params.sorting,
    filters: props.params.filters,
    category_id: props.params.category_id
 }  

  const fetchMoreData = async () => {
    if(start){
        const products = await getCategoryProductsData(listingParams);
        setMeta(products.products.meta);
        setData(prevProducts => [...prevProducts, ...products.products.data]);
        setPage(page + 1);
    }
  };

  useEffect(() => {
    setStart(true);
    fetchMoreData();
  }, []);

  return (
    <>
        <p>Pagination Params: {JSON.stringify(meta)}</p>
        {data.map((product: any) => (
            <ProductCard key={product.id} data={product} />
        ))}

        {page} - {meta.pagination.pageCount}

        {meta.pagination.pageCount > page ? <button onClick={fetchMoreData}>Load more</button> : null}
      
    </>
  );
};

export default Pagination;