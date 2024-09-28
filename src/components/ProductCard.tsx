type ProductCardProps = {
    id: number;
    title: string;
    price: number;
    image: string;
  };
  
  const ProductCard = ({ id, title, price, image }: ProductCardProps) => (
    <div className="border p-4 rounded-lg shadow">
      <img src={image} alt={title} className="w-full h-48 object-contain mb-2" />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm">${price}</p>
    </div>
  );
  
  export default ProductCard;
  