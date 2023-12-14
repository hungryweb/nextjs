const ProductCard = (props: any) => {
    return (
      <>
        <p>{props.data.attributes.title}</p>
      </>
    );
};

export default ProductCard;